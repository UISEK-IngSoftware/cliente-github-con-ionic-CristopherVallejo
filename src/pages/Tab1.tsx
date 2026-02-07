import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, 
  useIonViewDidEnter, IonItemSliding, IonItemOptions, IonItemOption, 
  IonIcon, useIonAlert 
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import LoadingSpinner from '../components/loadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();

  const loadRepos = async () => {
    setLoading(true);
    try {
      const data = await fetchRepositories();
      setRepos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  // para EDITAR 
  const handleEdit = (repo: RepositoryItem) => {
    presentAlert({
      header: 'Editar Repositorio',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre', value: repo.name },
        { name: 'description', type: 'textarea', placeholder: 'Descripción', value: repo.description || '' }
      ],
      buttons: [
        'Cancelar',
        {
          text: 'Actualizar',
          handler: (data) => {
            setLoading(true);
            updateRepository(repo.owner!, repo.name, data)
              .then(() => loadRepos())
              .catch(() => alert("Error al editar"))
              .finally(() => setLoading(false));
          }
        }
      ]
    });
  };

  //  para ELIMINAR 
  const confirmDelete = (repo: RepositoryItem) => {
    presentAlert({
      header: 'Confirmar',
      message: `¿Estás seguro de eliminar ${repo.name}?`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            setLoading(true);
            deleteRepository(repo.owner!, repo.name)
              .then(() => loadRepos())
              .catch(() => alert("Error al eliminar"))
              .finally(() => setLoading(false));
          }
        }
      ]
    });
  };

  return (
    <IonPage>
      <LoadingSpinner isOpen={loading} />
      <IonHeader>
        <IonToolbar><IonTitle>Mis Repositorios</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {repos.map((repo) => (
            <IonItemSliding key={repo.name}>
              
              <RepoItem repo={repo} /> 

              <IonItemOptions side="end">
                {/* OPCIÓN EDITAR */}
                <IonItemOption color="primary" onClick={() => handleEdit(repo)}>
                  <IonIcon slot="icon-only" icon={pencil} />
                </IonItemOption>

                {/* OPCIÓN ELIMINAR */}
                <IonItemOption color="danger" onClick={() => confirmDelete(repo)}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;