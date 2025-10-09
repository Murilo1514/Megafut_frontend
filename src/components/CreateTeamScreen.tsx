import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Plus, 
  UserPlus, 
  Trophy, 
  Calendar,
  Target,
  History,
  Edit,
  Trash2
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



// const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
// Mock data para jogadores disponíveis
// const availablePlayers = [
//   { 
//     id: 1, 
//     username: "joaosilva", 
//     name: "João Silva", 
//     position: "atacante",
//     overallRating: 78,
//     gamesPlayed: 45
//   },
//   { 
//     id: 2, 
//     username: "mariacosta", 
//     name: "Maria Costa", 
//     position: "meio-campo-central",
//     overallRating: 82,
//     gamesPlayed: 67
//   },
//   { 
//     id: 3, 
//     username: "pedrolima", 
//     name: "Pedro Lima", 
//     position: "goleiro",
//     overallRating: 85,
//     gamesPlayed: 34
//   },
//   { 
//     id: 4, 
//     username: "anasouza", 
//     name: "Ana Souza", 
//     position: "zagueiro-central",
//     overallRating: 76,
//     gamesPlayed: 52
//   },
//   { 
//     id: 5, 
//     username: "carlospereira", 
//     name: "Carlos Pereira", 
//     position: "lateral-direito",
//     overallRating: 79,
//     gamesPlayed: 38
//   }
// ];

// Mock data para histórico de partidas
const matchHistory = [
  {
    id: 1,
    opponent: "Unidos da Vila",
    date: "2024-01-15",
    result: "victory",
    score: "3-1",
    location: "Quadra Central",
    type: "Amistoso"
  },
  {
    id: 2,
    opponent: "Galera do Ibirapuera", 
    date: "2024-01-08",
    result: "draw",
    score: "2-2",
    location: "Parque Ibirapuera",
    type: "Liga Regional"
  },
  {
    id: 3,
    opponent: "Futsal Brothers",
    date: "2024-01-02",
    result: "defeat",
    score: "1-3",
    location: "Arena Central",
    type: "Copa Amadora"
  }
];

interface Player {
  id: number;
  username: string;
  name: string;
  position: string;
  teamPosition?: string;
  overallRating: number;
  gamesPlayed: number;
}

interface CreateTeamScreenProps {
  onBack: () => void;
}

export function CreateTeamScreen({ onBack }: CreateTeamScreenProps) {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamCategory, setTeamCategory] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const getPositionLabel = (positionValue: string) => {
    const position = posicoesFutebol.find(p => p.value === positionValue);
    return position ? position.label : positionValue;
  };

  const filteredPlayers = availablePlayers.filter(player => 
    player.username.toLowerCase().includes(searchUsername.toLowerCase()) ||
    player.name.toLowerCase().includes(searchUsername.toLowerCase())
  );

  const addPlayerToTeam = (player: any) => {
    if (selectedPlayers.find(p => p.id === player.id)) return;
    
    const newPlayer = {
      ...player,
      teamPosition: player.position // Inicialmente usa a posição original
    };
    
    setSelectedPlayers([...selectedPlayers, newPlayer]);
    setSearchUsername("");
    setIsSearchDialogOpen(false);
  };

  const removePlayerFromTeam = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };


  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/player/");
      const data = await response.json();

      // Transformar os dados recebidos para o formato necessário
      const formattedPlayers: Player[] = data.map((item: any) => ({
        id: item.user.id,
        username: item.user.username,
        name: item.user.username, // ou outro nome se vier do backend
        position: item.position?.toLowerCase() || "posição indefinida",
        overallRating: item.score || 0,
        gamesPlayed: 0, // você pode ajustar isso se vier do backend
      }));

      setAvailablePlayers(formattedPlayers);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
  };




  const updatePlayerPosition = (playerId: number, newPosition: string) => {
    setSelectedPlayers(selectedPlayers.map(p => 
      p.id === playerId ? { ...p, teamPosition: newPosition } : p
    ));
  };

  const handleCreateTeam = () => {
    // Aqui você implementaria a lógica para criar o time
    console.log("Creating team:", {
      name: teamName,
      description: teamDescription,
      category: teamCategory,
      players: selectedPlayers
    });
    
    // Simular criação e voltar para a tela de times
    onBack();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informações do Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">Nome do Time</Label>
            <Input 
              id="team-name"
              placeholder="Digite o nome do seu time..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team-description">Descrição</Label>
            <Textarea 
              id="team-description"
              placeholder="Descreva seu time, estilo de jogo, objetivos..."
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team-category">Modalidade</Label>
            <Select value={teamCategory} onValueChange={setTeamCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futebol">Futebol</SelectItem>
                <SelectItem value="futsal">Futsal</SelectItem>
                <SelectItem value="society">Society</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Buscar Jogadores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Adicionar Jogadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isSearchDialogOpen} 
            onOpenChange={(open) => {
              setIsSearchDialogOpen(open);
              if (open) fetchPlayers();
            }}
          >
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Search className="h-4 w-4" />
                Buscar Jogadores por Username
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Buscar Jogadores</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Digite o username..." 
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {filteredPlayers.map((player) => (
                      <div 
                        key={player.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => addPlayerToTeam(player)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">@{player.username}</p>
                          <p className="text-sm text-muted-foreground">{player.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getPositionLabel(player.position)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Overall: {player.overallRating}
                            </Badge>
                          </div>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                    
                    {filteredPlayers.length === 0 && searchUsername && (
                      <p className="text-center text-muted-foreground py-4">
                        Nenhum jogador encontrado
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Jogadores Selecionados */}
      {selectedPlayers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Elenco do Time ({selectedPlayers.length} jogadores)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">@{player.username}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="text-xs">
                        Original: {getPositionLabel(player.position)}
                      </Badge>
                      {player.teamPosition !== player.position && (
                        <Badge variant="default" className="text-xs">
                          No Time: {getPositionLabel(player.teamPosition || '')}
                        </Badge>
                      )}
                    </div>
                    
                    <Select 
                      value={player.teamPosition} 
                      onValueChange={(value) => updatePlayerPosition(player.id, value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {posicoesFutebol.map((position) => (
                          <SelectItem key={position.value} value={position.value}>
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removePlayerFromTeam(player.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Histórico de Partidas */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Partidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matchHistory.map((match) => (
              <div key={match.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">vs {match.opponent}</p>
                    <Badge 
                      variant={
                        match.result === 'victory' ? 'default' : 
                        match.result === 'draw' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {match.result === 'victory' ? 'Vitória' : 
                       match.result === 'draw' ? 'Empate' : 'Derrota'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{match.score}</span>
                    <span>{match.date}</span>
                    <span>{match.location}</span>
                    <Badge variant="outline" className="text-xs">
                      {match.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {match.score}
                  </div>
                </div>
              </div>
            ))}
            
            {matchHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma partida registrada ainda</p>
                <p className="text-sm">O histórico aparecerá aqui após as primeiras partidas</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card> */}

      {/* Resumo do Time */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do Time</Label>
              <p className="text-lg font-medium">{teamName || "Não definido"}</p>
            </div>
            <div>
              <Label>Modalidade</Label>
              <p className="text-lg font-medium">{teamCategory || "Não definida"}</p>
            </div>
          </div>
          
          <div>
            <Label>Descrição</Label>
            <p className="text-sm text-muted-foreground">
              {teamDescription || "Nenhuma descrição fornecida"}
            </p>
          </div>
          
          <div>
            <Label>Jogadores Cadastrados</Label>
            <p className="text-lg font-medium">{selectedPlayers.length} jogadores</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">
              {currentStep === 1 ? "Criar Novo Time" : 
               currentStep === 2 ? "Adicionar Jogadores" : "Finalizar Criação"}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 1 ? "Configure as informações básicas do seu time" :
               currentStep === 2 ? "Adicione jogadores e defina suas posições" : 
               "Revise e finalize a criação do seu time"}
            </p>
          </div>
        </div>
        
        {/* Steps indicator */}
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep ? 'bg-primary text-primary-foreground' :
                step < currentStep ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              <span className="text-sm font-medium">
                {step === 1 ? "Informações" : step === 2 ? "Jogadores" : "Finalizar"}
              </span>
              {step < 3 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-background p-6">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Anterior
          </Button>
          
          <div className="flex gap-2">
            {currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 && (!teamName || !teamCategory)}
                className="bg-primary hover:bg-primary/90"
              >
                Próximo
              </Button>
            ) : (
              <Button 
                onClick={handleCreateTeam}
                className="bg-primary hover:bg-primary/90"
                disabled={!teamName || !teamCategory}
              >
                Criar Time
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}