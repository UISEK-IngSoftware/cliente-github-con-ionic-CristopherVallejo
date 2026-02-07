import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/loadingSpinner';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [present] = useIonToast();

  const saveRepo = async () => {
    if (!name.trim()) {
      present({ message: 'El nombre es obligatorio', duration: 2000, color: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await createRepository({ name, description });
      present({ message: '¡Repositorio creado!', duration: 2000, color: 'success' });
      setName('');
      setDescription('');
      history.push('/tab1');
    } catch (error) {
      console.error('Error al crear repositorio:', error);
      present({ message: 'Error al crear repositorio', duration: 2000, color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <LoadingSpinner isOpen={loading} />
      <IonHeader>
        <IonToolbar><IonTitle>Nuevo Repositorio</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='form-container'>
          <IonInput 
            label="Nombre" labelPlacement="floating" fill="outline" 
            value={name} onIonInput={e => setName(e.detail.value!)} 
          />
          <IonTextarea 
            label="Descripción" labelPlacement="floating" fill="outline" 
            value={description} onIonInput={e => setDescription(e.detail.value!)} 
            rows={4}
          />
          <IonButton expand="block" onClick={saveRepo}>Crear Repositorio</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;