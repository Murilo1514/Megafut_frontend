import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";
import { 
  Home, 
  Users, 
  Trophy, 
  Calendar, 
  Settings, 
  BarChart3,
  User,
  MapPin,
  MessageSquare,
  Sun,
  Moon,
  ArrowLeft
} from "lucide-react";

interface AppSidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  onLogout?: () => void;
}

const navigationItems = [
  { title: "Home", icon: Home, key: "home" },
  { title: "Times", icon: Users, key: "times" },
  { title: "Campeonatos", icon: Trophy, key: "competitions" },
  { title: "Ligas", icon: BarChart3, key: "leagues" },
  { title: "Quadras", icon: MapPin, key: "courts" },
  { title: "Jogadores", icon: MessageSquare, key: "players" },
  { title: "Meu Perfil", icon: User, key: "profile" },
  { title: "Configurações", icon: Settings, key: "settings" },
];

export function AppSidebar({ activeScreen, onScreenChange, onLogout }: AppSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">MegaFut</h2>
              <p className="text-sm text-muted-foreground">Futebol amador</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                isActive={activeScreen === item.key}
                tooltip={item.title}
                onClick={() => onScreenChange(item.key)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => onScreenChange("profile")}>
              <User className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-sm">João Silva</span>
                <span className="text-xs text-muted-foreground">Atacante</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {onLogout && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onLogout} className="text-destructive hover:text-destructive">
                <ArrowLeft className="h-4 w-4" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}