import { useState } from 'react';
import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, useIonViewDidEnter,
}from '@ionic/react';
import { getUserInfo } from '../services/GithubService';
import './Tab3.css';



const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
     name: 'No se ha cargar el usuario',
     username: 'no - username',
     bio: 'No se puede cargar la biografía',
     avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAb-53XKyzLA_K30grZ0KcODhamFpjSn9dQ&s',
  });

const loadUserInfo = async () => {
   const response = await getUserInfo();
   if(response){
    setUserInfo({
      name: response.name,
      username: response.login,
      bio: response.bio,
      avatar_url: response.avatar_url,
    });
   }
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
         <IonCard>
        <img 
          alt="Cristopher Vallejo Amagua" 
          src={userInfo.avatar_url} />
        <IonCardHeader>
          <IonCardTitle>{userInfo.name}</IonCardTitle>
          <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
        </IonCardHeader>

      <IonCardContent>
        {userInfo.bio}
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
