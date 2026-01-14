import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import './Tab2.css';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  const history= useHistory();
  const repoFormData:RepositoryItem={
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    lenguaje: null,
  };
  const setRepoName=(value:string)=>{
    repoFormData.name=value;
  }
  
  const setDescription=(value:string)=>{
    repoFormData.description=value;
  }

  const saveRepo=()=>{
    console.log('Guardando repositorio:', repoFormData);
    if(repoFormData.name.trim() === ''){
      alert('El nombre del repositorio es obligatorio.');
      return;
    }
    createRepository(repoFormData).then(()=>{
      alert('Repositorio creado exitosamente.');
      history.push('/tab1');
    }).catch((error)=>{
      console.error('Error al crear el repositorio:', error);
      alert('Error al crear el repositorio. Por favor, intente de nuevo.');
    });
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
          <IonInput label="Nombre del repositorio" 
          labelPlacement="floating" 
          fill="outline" 
          placeholder="repositorio-de-ejemplo" 
          value={repoFormData.name}
          onIonChange={e => setRepoName(e.detail.value!)}
          ></IonInput>
          <br />
          <IonTextarea 
          className='form-field'
          label="Descripción del repositorio"
          labelPlacement="floating"
          fill="outline"
          placeholder="Descripción del repositorio"
          value={repoFormData.description}
          onIonChange={e => setDescription(e.detail.value!)}
          rows={6} ></IonTextarea>
          <IonButton expand="block"className='form-field'onClick={saveRepo}>Guardar</IonButton>
        </div>
         
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
