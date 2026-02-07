import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle,IonToolbar } from "@ionic/react";
import "./Login.css";
import { logoGithub } from "ionicons/icons";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { getUserInfo } from '../services/GithubService';
import { useHistory } from 'react-router-dom';



const Login:React.FC = () => {

    const [userName, setUserName] =  useState('');
    const [token, setToken] =  useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    // Redirect if already authenticated
    if (AuthService.isAuthenticated()) {
        history.replace('/tab1');
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!userName || !token) {
            setError('Por favor, complete ambos campos.');
            return;
        }
        const success = AuthService.login(userName, token);
        if (!success) {
            setError('Error al guardar credenciales.');
            return;
        }

        // Validate credentials by requesting /user
        try {
            const user = await getUserInfo();
            if (user && user.login) {
                history.replace('/tab1');
                return;
            } else {
                AuthService.logout();
                setError('Credenciales inválidas. Verifica tu token.');
            }
        } catch (err) {
            AuthService.logout();
            setError('No se pudo validar el token.');
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