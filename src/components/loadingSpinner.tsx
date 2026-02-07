import React from "react";
import { IonSpinner } from "@ionic/react";
import "./loadingSpinner.css";

interface LoadingSpinnerProps {
  isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
  if (!isOpen) return null;
    
    return (
        <div className="loading-overlay">
            <IonSpinner name="circular" color="primary" className="spinner"/>
        </div>
    );
} 

export default LoadingSpinner;