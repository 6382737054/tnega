import React, { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import NGORegistration from './components/NGORegistration';   
import AdminDashboard from './components/AdminDashboard';
import NGODashboard from './components/NGODashboard';
import TankSelection from './components/TankSelection';
import DepartmentalDashboard from './components/DepartmentalDashboard';
import NavBar from './components/Header'; 
import Footer from './components/Footer';


const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Handle login
  const handleLogin = (type, email) => {
    console.log('Login attempt:', type, email); // Debug log
    setUserType(type);
    setUserEmail(email);
    
    // Route to appropriate dashboard based on user type
    switch (type) {
      case 'admin':
        setCurrentView('admin-dashboard');
        break;
      case 'ngo':
        setCurrentView('ngo-dashboard');
        break;
      case 'departmental':
        setCurrentView('departmental-dashboard');
        break;
      default:
        setCurrentView('login');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentView('login');
    setUserType('');
    setUserEmail('');
  };

  // Navigation handlers
  const goToRegistration = () => {
    setCurrentView('ngo-registration');
  };

  const goToLogin = () => {
    setCurrentView('login');
  };

  const goToTankSelection = () => {
    setCurrentView('tank-selection');
  };

  const goBackToNGODashboard = () => {
    setCurrentView('ngo-dashboard');
  };

  // Render appropriate component based on current view
  const renderCurrentView = () => {
    console.log('Current view:', currentView, 'User type:', userType); // Debug log
    
    switch (currentView) {
      case 'login':
        return (
          <LoginComponent 
            onLogin={handleLogin}
            onGoToRegistration={goToRegistration}
          />
        );

      case 'ngo-registration':
        return (
          <NGORegistration 
            onBack={goToLogin}
            onRegistrationComplete={goToLogin}
          />
        );

      case 'admin-dashboard':
        return (
          <AdminDashboard 
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        );

      case 'ngo-dashboard':
        return (
          <NGODashboard 
            userEmail={userEmail}
            onLogout={handleLogout}
            onNewNOCRequest={goToTankSelection}
          />
        );

      case 'tank-selection':
        return (
          <TankSelection 
            onBack={goBackToNGODashboard}
            onProceed={goBackToNGODashboard}
          />
        );

      case 'departmental-dashboard':
        return (
          <DepartmentalDashboard 
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <LoginComponent 
            onLogin={handleLogin}
            onGoToRegistration={goToRegistration}
          />
        );
    }
  };

  // Determine if we should show navbar and footer
  const showNavFooter = currentView !== 'login' && currentView !== 'ngo-registration';

  console.log('App state - currentView:', currentView, 'userType:', userType, 'userEmail:', userEmail); // Debug log

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Navigation Bar - shown on all pages except login and registration */}
      {showNavFooter && (
        <NavBar 
          userType={userType}
          userEmail={userEmail}
          onLogout={handleLogout}
          currentView={currentView}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>
      
      {/* Footer - shown on all pages except login and registration */}
      {showNavFooter && <Footer />}
    </div>
  );
};

export default App;