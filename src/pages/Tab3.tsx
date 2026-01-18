import { useState } from 'react';
import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, useIonViewDidEnter, IonButton, IonIcon, IonLoading,
}from '@ionic/react';
import { getUserInfo } from '../services/GithubService';
import './Tab3.css';
import { useHistory } from 'react-router';
import AuthService from '../services/AuthService';
import { logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState({
     name: 'No se ha cargar el usuario',
     username: 'no - username',
     bio: 'No se puede cargar la biografía',
     avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAb-53XKyzLA_K30grZ0KcODhamFpjSn9dQ&s',
  });

const loadUserInfo = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await getUserInfo();
    if(response){
      setUserInfo({
        name: response.name,
        username: response.login,
        bio: response.bio,
        avatar_url: response.avatar_url,
      });
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
    setError(`Error al cargar información del usuario: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
}

useIonViewDidEnter(() => {
    loadUserInfo();
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        {error && <p style={{ color: 'red' }}>{error}</p>}
         <IonCard>
        <img 
          alt="Cristopher Vallejo Amagua" 
          src={userInfo.avatar_url} />
        <IonCardHeader>
          <IonCardTitle>{userInfo.name}</IonCardTitle>
          <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
        </IonCardHeader>
      <IonCardContent> {userInfo.bio}</IonCardContent>
    </IonCard>
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline}/>
            Cerrar sesión
          </IonButton>
          <IonLoading isOpen={loading} message="Cargando..." />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
