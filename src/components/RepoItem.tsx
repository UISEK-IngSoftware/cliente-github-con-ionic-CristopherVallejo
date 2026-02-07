import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import React from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{ repo: RepositoryItem }> = ({ repo }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
          <img alt='Silhouette of mountains' src={repo.imageUrl || 'https://ionicframework.com./docs/img/demons/thumbnail.svg'} />
      </IonThumbnail>
      <IonLabel>
        <h2>{repo.name}</h2>
        <p>{repo.description} </p>
        <p>
            <strong>Propietario: {repo.owner} </strong> 
        </p>  
        <p>
            <strong>Lenguaje: {repo.lenguaje} </strong>
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default RepoItem;
