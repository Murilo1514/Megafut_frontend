import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { useTheme } from "../contexts/ThemeContext";
import { 
  Trophy, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Sun,
  Moon,
  Mail,
  Lock,
  User,
  Phone,
  Github,
  Chrome,
  CheckCircle
} from "lucide-react";

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLanding: () => void;
  onGoToLogin: () => void;
}

// Posições de futebol e futsal (mesmo do ProfileScreen)
const posicoesFutebol = [
  { value: "goleiro", label: "Goleiro" },
  { value: "zagueiro-central", label: "Zagueiro Central" },
  { value: "zagueiro", label: "Zagueiro" },
  { value: "lateral-direito", label: "Lateral Direito" },
  { value: "lateral-esquerdo", label: "Lateral Esquerdo" },
  { value: "libero", label: "Líbero" },
  { value: "volante", label: "Volante" },
  { value: "meio-campo-central", label: "Meio-Campo Central" },
  { value: "meio-campo-direito", label: "Meio-Campo Direito" },
  { value: "meio-campo-esquerdo", label: "Meio-Campo Esquerdo" },
  { value: "meia-atacante", label: "Meia-Atacante" },
  { value: "atacante", label: "Atacante" },
  { value: "ponta-direita", label: "Ponta Direita" },
  { value: "ponta-esquerda", label: "Ponta Esquerda" },
  { value: "centroavante", label: "Centroavante" },
  { value: "segundo-atacante", label: "Segundo Atacante" },
  { value: "ala-direito", label: "Ala Direito (Futsal)" },
  { value: "ala-esquerdo", label: "Ala Esquerdo (Futsal)" },
  { value: "fixo", label: "Fixo (Futsal)" },
  { value: "pivo", label: "Pivô (Futsal)" }
];

export function RegisterScreen({ onRegister, onBackToLanding, onGoToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    position: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { theme, toggleTheme } = useTheme();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (step === 1) {
  //     setStep(2);
  //     return;
  //   }
    
  //   setIsLoading(true);
    
  //   // Simular cadastro
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     onRegister();
  //   }, 2000);
  // };

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.name,
          password2: formData.confirmPassword
        }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError("Erro ao fazer registro: " + (data.detail || JSON.stringify(data)));
        setIsLoading(false);
        return;
      }

      
      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      setIsLoading(false);
      onRegister();
    } catch (err) {
      setError("Erro de conexão. Tente novamente. " + (err instanceof Error ? err.message : String(err)));
      setIsLoading(false);
    }
  };


  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToLanding}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MegaFut</span>
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
      </header>

      {/* Register Form */}
      <div className="container flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">
                {step === 1 ? "Crie sua conta" : "Complete seu perfil"}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Cadastre-se gratuitamente no MegaFut" 
                  : "Algumas informações sobre você como jogador"
                }
              </CardDescription>
              
              {/* Progress indicator */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    {/* Step 1: Basic Info */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 6 caracteres"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          className="pl-10 pr-10"
                          minLength={6}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Digite a senha novamente"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 2: Player Info */}
                    <div className="space-y-2">
                      <Label htmlFor="position">Posição preferida</Label>
                      <Select value={formData.position} onValueChange={(value) => updateFormData("position", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua posição" />
                        </SelectTrigger>
                        <SelectContent>
                          {posicoesFutebol.map((posicao) => (
                            <SelectItem key={posicao.value} value={posicao.value}>
                              {posicao.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-medium mb-2">🎮 O que você ganha:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Cartinha personalizada estilo FIFA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Estatísticas detalhadas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Sistema de conquistas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Avaliação entre jogadores</span>
                        </div>
                      </div>
                    </div>
                    
                    {step === 2 && (
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setStep(1)}
                      >
                        Voltar
                      </Button>
                    )}
                  </>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : step === 1 ? "Continuar" : "Criar conta"}
                </Button>
              </form>
              
              {step === 1 && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou cadastre-se com
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Chrome className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </>
              )}
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Já tem uma conta?{" "}
                </span>
                <Button
                  variant="link"
                  className="px-0"
                  onClick={onGoToLogin}
                >
                  Faça login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}