import { IonItemSliding, IonItem, IonLabel, IonThumbnail, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import './RepoItem.css';
import React from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { pencil, trash } from 'ionicons/icons';

interface RepoItemProps {
  repo: RepositoryItem;
  onEdit: (repo: RepositoryItem) => void;
  onDelete: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
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
          {repo.language && (
            <p>
                <strong>Lenguaje: {repo.language} </strong>
            </p>
          )}
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => onEdit(repo)}>
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => onDelete(repo)}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
