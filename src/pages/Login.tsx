import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle,IonToolbar } from "@ionic/react";
import "./Login.css";
import { logoGithub } from "ionicons/icons";
import { useState } from "react";
import AuthService from "../services/AuthService";



const Login:React.FC = () => {

    const [userName, setUserName] =  useState('');
    const [token, setToken] =  useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!userName || !token) {
            setError('Por favor, complete ambos campos.');
            return;
        }
        const success = AuthService.login(userName, token);
        if (success) {
            window.location.href = '/tab1';
        }else{
            setError('Error al iniciar sesión.');
        }

    };

    return (
         <IonPage>
            <IonHeader>
                <IonToolbar>
                     <IonTitle>Inicio de sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" >
                <div className="login-container">
                   <IonIcon icon={logoGithub} className="login-logo"/>
                   <h1>Iniciar sesión con GitHub</h1>
                   <form onSubmit={handleLogin} className="login-form">
                     <IonInput
                         className="login-field"
                         label="Usuario de GitHub"
                         labelPlacement="floating"
                         fill="outline"
                         type="text"
                         value={userName}
                         onIonChange={e => setUserName(e.detail.value!)}
                         required
                      />
                      <IonInput
                         className="login-field"
                         label="Token de acceso personal"
                         labelPlacement="floating"
                         fill="outline"
                         type="password"
                         value={token}
                         onIonChange={e => setToken(e.detail.value!)}
                         required
                      />
                        
                        {error && (
                            <IonText color="danger" className="error-message">
                                {error}
                            </IonText>
                        )}

                      <IonButton expand="block" type="submit">
                             Iniciar sesión
                      </IonButton>
                </form>
                </div>
                
            </IonContent>
         </IonPage>
         
    );
}

export default Login;