import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle,
}from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAb-53XKyzLA_K30grZ0KcODhamFpjSn9dQ&s" />
        <IonCardHeader>
          <IonCardTitle>Cristopher Vallejo</IonCardTitle>
          <IonCardSubtitle>Desarrollo Móvil</IonCardSubtitle>
        </IonCardHeader>

      <IonCardContent>
        El framework Ionic permite crear aplicaciones móviles y de escritorio utilizando tecnologías web como HTML, CSS y JavaScript, facilitando el desarrollo multiplataforma con una sola base de código.
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
