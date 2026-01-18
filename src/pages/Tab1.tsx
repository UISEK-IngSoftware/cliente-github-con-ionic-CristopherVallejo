import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, 
  IonItem, IonLabel, IonAvatar, IonItemSliding, IonItemOptions, 
  IonItemOption, IonIcon, IonAlert, IonToast, IonLoading
} from '@ionic/react';
import { trash, create} from 'ionicons/icons';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import { RepositoryItem } from '../interfaces/RepositoryItem';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchRepositories();
      setRepos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setToastMessage(`Error al cargar repositorios: ${errorMessage}`);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setShowDeleteAlert(true);
  };

  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || '');
    setShowEditAlert(true);
  };

  const confirmEdit = async () => {
    if (!editName.trim()) {
      setToastMessage('El nombre del repositorio no puede estar vacío');
      setShowToast(true);
      setShowEditAlert(false);
      return;
    }
    if (selectedRepo) {
      setLoading(true);
      try {
        await updateRepository(selectedRepo.owner!, selectedRepo.name, editName, editDescription);
        setToastMessage('Actualizado con éxito');
        setShowToast(true);
        loadData();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setToastMessage(`Error al actualizar: ${errorMessage}`);
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    }
    setShowEditAlert(false);
  };

  const confirmDelete = async () => {
    if (selectedRepo) {
      setLoading(true);
      try {
        await deleteRepository(selectedRepo.owner!, selectedRepo.name);
        setToastMessage('Eliminado con éxito');
        setShowToast(true);
        loadData();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setToastMessage(`Error al eliminar: ${errorMessage}`);
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    }
    setShowDeleteAlert(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {repos.map((repo, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src={repo.imageUrl || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'} alt="avatar" />
                </IonAvatar>
                <IonLabel>
                  <h2>{repo.name}</h2>
                  <p>{repo.description || 'Sin descripción'}</p>
                  <small>{repo.language}</small>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => handleEdit(repo)}>
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => handleDelete(repo)}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonLoading isOpen={loading} message="Cargando..." />
        <IonAlert
          isOpen={showEditAlert}
          onDidDismiss={() => setShowEditAlert(false)}
          header="Editar Repositorio"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Nombre',
              value: editName,
              handler: (e) => setEditName(e.value)
            },
            {
              name: 'description',
              type: 'text',
              placeholder: 'Descripción',
              value: editDescription,
              handler: (e) => setEditDescription(e.value)
            }
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Guardar',
              handler: confirmEdit
            }
          ]}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Eliminar Repositorio"
          message="¿Estás seguro de que quieres eliminar este repositorio?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: confirmDelete
            }
          ]}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
