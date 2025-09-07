import { useState } from "react";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AppSidebar } from "./components/AppSidebar";
import { HomeScreen } from "./components/HomeScreen";
import { TeamsScreen } from "./components/TeamsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LandingPage } from "./components/LandingPage";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { Trophy, BarChart3, MapPin, MessageSquare, Settings } from "lucide-react";

type AppState = "landing" | "login" | "register" | "app";

function AppContent() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [activeScreen, setActiveScreen] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAppState("app");
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setAppState("app");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAppState("landing");
    setActiveScreen("home");
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />;
      case "times":
        return <TeamsScreen />;
      case "profile":
        return <ProfileScreen />;
      case "competitions":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Campeonatos</h2>
            <p className="text-muted-foreground">Organize competições estruturadas</p>
            <p className="text-sm text-muted-foreground mt-1">Em desenvolvimento...</p>
          </div>
        );
      case "leagues":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Ligas</h2>
            <p className="text-muted-foreground">Competições entre jogadores individuais</p>
            <p className="text-sm text-muted-foreground mt-1">Em desenvolvimento...</p>
          </div>
        );
      case "courts":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Portal de Quadras</h2>
            <p className="text-muted-foreground">Encontre quadras na sua região</p>
            <p className="text-sm text-muted-foreground mt-1">Em desenvolvimento...</p>
          </div>
        );
      case "players":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Buscar Jogadores</h2>
            <p className="text-muted-foreground">Encontre jogadores para completar sua partida</p>
            <p className="text-sm text-muted-foreground mt-1">Em desenvolvimento...</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Settings className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Configurações</h2>
            <p className="text-muted-foreground">Personalize sua experiência</p>
            <p className="text-sm text-muted-foreground mt-1">Em desenvolvimento...</p>
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  // Render different screens based on app state
  switch (appState) {
    case "landing":
      return (
        <LandingPage 
          onLogin={() => setAppState("login")} 
          onRegister={() => setAppState("register")}
        />
      );
    
    case "login":
      return (
        <LoginScreen 
          onLogin={handleLogin}
          onBackToLanding={() => setAppState("landing")}
          onGoToRegister={() => setAppState("register")}
        />
      );
    
    case "register":
      return (
        <RegisterScreen 
          onRegister={handleRegister}
          onBackToLanding={() => setAppState("landing")}
          onGoToLogin={() => setAppState("login")}
        />
      );
    
    case "app":
      return (
        <SidebarProvider>
          <div className={`flex h-screen w-full ${theme}`}>
            <AppSidebar 
              activeScreen={activeScreen} 
              onScreenChange={setActiveScreen}
              onLogout={handleLogout}
            />
            <SidebarInset className="flex-1">
              <main className="flex flex-col h-full">
                {renderScreen()}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      );
    
    default:
      return null;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}