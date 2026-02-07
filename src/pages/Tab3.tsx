import React, { useState } from 'react';
import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButton, IonIcon, useIonViewDidEnter,
}from '@ionic/react';
import { getUserInfo } from '../services/GithubService';
import './Tab3.css';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { logOutOutline } from 'ionicons/icons';
import AuthService from '../services/AuthService';
// AuthService removed — using localStorage.clear() on logout


const Tab3: React.FC = () => {
  const history = useHistory();
  const[loading,setLoading]= useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
     name: 'No se ha cargar el usuario',
     username: 'no - username',
     bio: 'No se puede cargar la biografía',
     avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAb-53XKyzLA_K30grZ0KcODhamFpjSn9dQ&s',
  });

const loadUserInfo = async () => {
  setLoading(true);
   const response = await getUserInfo();
   if(response){
    setUserInfo({
      name: response.name,
      username: response.login,
      bio: response.bio || 'Sin biografía disponible',
      avatar_url: response.avatar_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAb-53XKyzLA_K30grZ0KcODhamFpjSn9dQ&s',
    });
   }
   setLoading(false);
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
          <div className='card-container'>
         <IonCard className='card'>
        <img alt="Cristopher Vallejo Amagua" src={userInfo.avatar_url} />
        <IonCardHeader>
          <IonCardTitle>{userInfo.name}</IonCardTitle>
          <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
        </IonCardHeader>
          <IonCardContent>
            {userInfo.bio}
          </IonCardContent>
          </IonCard>
            <IonButton 
                expand="block" 
                color="danger" 
                onClick={handleLogout}
                className='logout-button'
                >
              <IonIcon slot="start" icon={logOutOutline} />
                Cerrar sesión
             </IonButton>
          <LoadingSpinner isOpen={loading} />
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
