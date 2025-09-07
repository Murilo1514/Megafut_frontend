import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit,
  Camera,
  Settings,
  Target
} from "lucide-react";

// Posições de futebol e futsal
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

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Meu Perfil de Jogador</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações e estatísticas no MegaFut
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Edit className="h-4 w-4" />
            Editar Perfil
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card de Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar e Info Básica */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" value="João Silva" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="posicao" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Posição
                      </Label>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="atacante">
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
                        <Badge variant="outline" className="gap-1">
                          <Target className="h-3 w-3" />
                          Atual
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Informações de Contato */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input id="email" value="joao.silva@megafut.com" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input id="telefone" value="+55 11 99999-9999" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localizacao" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Localização
                  </Label>
                  <Input id="localizacao" value="São Paulo, SP - Brasil" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-ingresso" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data de Ingresso
                  </Label>
                  <Input id="data-ingresso" value="15 de Janeiro, 2021" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Times Participantes</p>
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                    <p className="text-2xl font-semibold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Target className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jogos Disputados</p>
                    <p className="text-2xl font-semibold">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configurações de Conta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações de Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notificações por Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações sobre times e competições
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Autenticação em Duas Etapas</h4>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ativar
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Alterar Senha</h4>
                  <p className="text-sm text-muted-foreground">
                    Última alteração há 3 meses
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}