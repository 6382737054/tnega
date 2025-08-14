import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import NGORegistration from './components/Register';
import Dashboard from './pages/Dashboard';
import AppHeader from './components/Header';
import NewNOCRequest from './pages/TankSelection';
import NOCDetails from './pages/NocDetails';
import WorkflowPage from './pages/WorkflowPage';
// Layout component for pages that need header
const ProtectedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      {children}
    </div>
  );
};

// Layout component for auth pages (no header)
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App min-h-screen">
        <Routes>
          {/* Auth routes - no header */}
          <Route 
            path="/" 
            element={
              <AuthLayout>
                <LoginComponent />
              </AuthLayout>
            } 
          />
          <Route 
            path="/login" 
            element={
              <AuthLayout>
                <LoginComponent />
              </AuthLayout>
            } 
          />
          <Route 
            path="/register" 
            element={
              <AuthLayout>
                <NGORegistration />
              </AuthLayout>
            } 
          />
          
          {/* Protected routes - with header */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            } 
          />
             
          {/* Protected routes - with header */}
          <Route 
            path="/workflow" 
            element={
              <ProtectedLayout>
                <WorkflowPage />
              </ProtectedLayout>
            } 
          />
          <Route 
            path="/new-noc-request" 
            element={
              <ProtectedLayout>
                <NewNOCRequest />
              </ProtectedLayout>
            } 
          />'  <Route 
            path="/noc-details" 
            element={
              <ProtectedLayout>
                <NOCDetails />
              </ProtectedLayout>
            } 
          />'
        </Routes>
      </div>
    </Router>
  );
};

export default App;