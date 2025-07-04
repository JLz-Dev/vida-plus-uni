import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProfileSettingsScreen } from './features/ProfileSettingScreen';
import { AdminDashboard, BedManagementScreen, ReportsScreen, UserManagementScreen } from './features/admin/pages/';
import { LoginScreen, PatientRegistrationScreen } from './features/auth/pages';
import { AppointmentBookingScreen, MyAppointmentsScreen, PatientDashboard, PatientMedicalHistoryScreen } from './features/patients/pages';
import { DigitalPrescriptionScreen, ElectronicPatientRecordScreen, ProfessionalDashboard, ProfessionalScheduleScreen } from './features/professionals/pages';

import { useState, useEffect } from 'react'
export function App() {
  // Use state to simulate authentication status and user role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'paciente', 'profissional', 'administrador'
  // Use state to simulate routing
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'register', 'dashboard', etc.

  // Simulate initial authentication check or token loading
  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or session storage
    // For this demo, we start at the login screen
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentScreen('login');
  };

  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'register') {
        return <PatientRegistrationScreen onNavigate={handleNavigate} />;
      }
      return <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
    }

    // Render dashboards based on role
    if (currentScreen === 'dashboard') {
      if (userRole === 'paciente') {
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><PatientDashboard onNavigate={handleNavigate} /></DashboardLayout>;
      } else if (userRole === 'profissional') {
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><ProfessionalDashboard onNavigate={handleNavigate} /></DashboardLayout>;
      } else if (userRole === 'administrador') {
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><AdminDashboard onNavigate={handleNavigate} /></DashboardLayout>;
      }
    }

    // Render specific screens based on user role and currentScreen state
    switch (currentScreen) {
      // Paciente
      case 'agendar-consulta':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><AppointmentBookingScreen onNavigate={handleNavigate} /></DashboardLayout>;
      case 'minhas-consultas':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><MyAppointmentsScreen onNavigate={handleNavigate} /></DashboardLayout>;
      case 'historico-clinico':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><PatientMedicalHistoryScreen /></DashboardLayout>;

      // Profissional de Saúde
      case 'teleconsulta':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><TeleconsultationScreen /></DashboardLayout>;
      case 'gestao-agenda':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><ProfessionalScheduleScreen /></DashboardLayout>;
      case 'prontuario-eletronico':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><ElectronicPatientRecordScreen /></DashboardLayout>;
      case 'receitas-digitais':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><DigitalPrescriptionScreen /></DashboardLayout>;

      // Administrador
      case 'gestao-usuarios':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><UserManagementScreen /></DashboardLayout>;
      case 'gestao-internacoes':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><BedManagementScreen /></DashboardLayout>;
      case 'relatorios':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><ReportsScreen /></DashboardLayout>;

      // Comum a todos
      case 'configuracoes-perfil':
        return <DashboardLayout userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate}><ProfileSettingsScreen userRole={userRole} /></DashboardLayout>;

      default:
        return <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {renderScreen()}
    </div>
  );
};

