import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import './Tab2.css';
import { createRepository } from '../services/GithubService';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRepo = async () => {
    setError(null);
    if (repoName.trim() === '') {
      setError('El nombre del repositorio es obligatorio.');
      return;
    }
    setLoading(true);
    try {
      const repo: RepositoryItem = {
        name: repoName,
        description: description,
        imageUrl: null,
        owner: null,
        language: null,
      };
      await createRepository(repo);
      alert('Repositorio creado exitosamente.');
      history.push('/tab1');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al crear el repositorio: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='form-container'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <IonInput label="Nombre del repositorio" 
          labelPlacement="floating" 
          fill="outline" 
          placeholder="repositorio-de-ejemplo" 
          value={repoName}
          onIonChange={e => setRepoName(e.detail.value!)}
          ></IonInput>
          <br />
          <IonTextarea 
          className='form-field'
          label="Descripción del repositorio"
          labelPlacement="floating"
          fill="outline"
          placeholder="Descripción del repositorio"
          value={description}
          onIonChange={e => setDescription(e.detail.value!)}
          rows={6} ></IonTextarea>
          <IonButton expand="block"className='form-field'onClick={saveRepo}>Guardar</IonButton>
          <IonLoading isOpen={loading} message="Creando repositorio..." />
        </div>
         
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
