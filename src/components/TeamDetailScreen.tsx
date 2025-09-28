import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  Trophy, 
  Calendar,
  Target,
  History,
  Edit,
  MapPin,
  Clock,
  Star
} from "lucide-react";

// Mock data para demonstração
const teamData = {
  id: 1,
  name: "Pelada FC",
  description: "Time de futebol amador da zona sul de São Paulo com foco em diversão e competitividade.",
  memberCount: 18,
  foundedYear: 2020,
  category: "Futebol",
  achievements: 12,
  location: "São Paulo, SP",
  averageRating: 4.2
};

const teamPlayers = [
  { 
    id: 1, 
    name: "João Silva", 
    username: "joaosilva",
    position: "atacante",
    teamPosition: "centroavante",
    overallRating: 78,
    gamesPlayed: 45,
    goals: 23,
    assists: 12
  },
  { 
    id: 2, 
    name: "Maria Costa", 
    username: "mariacosta",
    position: "meio-campo-central",
    teamPosition: "meio-campo-central",
    overallRating: 82,
    gamesPlayed: 67,
    goals: 8,
    assists: 25
  },
  { 
    id: 3, 
    name: "Pedro Lima", 
    username: "pedrolima",
    position: "goleiro",
    teamPosition: "goleiro",
    overallRating: 85,
    gamesPlayed: 34,
    goals: 0,
    assists: 2
  },
  { 
    id: 4, 
    name: "Ana Souza", 
    username: "anasouza",
    position: "zagueiro-central",
    teamPosition: "zagueiro-central",
    overallRating: 76,
    gamesPlayed: 52,
    goals: 3,
    assists: 5
  }
];

const matchHistory = [
  {
    id: 1,
    opponent: "Unidos da Vila",
    date: "2024-01-15",
    result: "victory",
    score: "3-1",
    location: "Quadra Central",
    type: "Amistoso",
    duration: "90 min"
  },
  {
    id: 2,
    opponent: "Galera do Ibirapuera", 
    date: "2024-01-08",
    result: "draw",
    score: "2-2",
    location: "Parque Ibirapuera",
    type: "Liga Regional",
    duration: "90 min"
  },
  {
    id: 3,
    opponent: "Futsal Brothers",
    date: "2024-01-02",
    result: "defeat",
    score: "1-3",
    location: "Arena Central",
    type: "Copa Amadora",
    duration: "80 min"
  },
  {
    id: 4,
    opponent: "Raça e Paixão FC",
    date: "2023-12-18",
    result: "victory",
    score: "4-2",
    location: "Campo do Bairro",
    type: "Amistoso",
    duration: "90 min"
  },
  {
    id: 5,
    opponent: "Amigos United",
    date: "2023-12-10",
    result: "victory",
    score: "2-0",
    location: "Quadra Central",
    type: "Liga Regional",
    duration: "90 min"
  }
];

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

interface TeamDetailScreenProps {
  onBack: () => void;
}

export function TeamDetailScreen({ onBack }: TeamDetailScreenProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getPositionLabel = (positionValue: string) => {
    const position = posicoesFutebol.find(p => p.value === positionValue);
    return position ? position.label : positionValue;
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'victory': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
      case 'draw': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
      case 'defeat': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
      default: return 'text-muted-foreground';
    }
  };

  const getResultText = (result: string) => {
    switch (result) {
      case 'victory': return 'Vitória';
      case 'draw': return 'Empate';
      case 'defeat': return 'Derrota';
      default: return result;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{teamData.name}</h1>
            <p className="text-muted-foreground">{teamData.description}</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Edit className="h-4 w-4" />
            Editar Time
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {teamData.memberCount} jogadores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Desde {teamData.foundedYear}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {teamData.achievements} conquistas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {teamData.averageRating}/5.0 avaliação
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="players">Elenco</TabsTrigger>
              <TabsTrigger value="matches">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Team Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modalidade:</span>
                      <Badge variant="outline">{teamData.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Localização:</span>
                      <span>{teamData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fundado em:</span>
                      <span>{teamData.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avaliação média:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{teamData.averageRating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas Recentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vitórias:</span>
                      <span className="font-medium text-green-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empates:</span>
                      <span className="font-medium text-yellow-600">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Derrotas:</span>
                      <span className="font-medium text-red-600">1</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última partida:</span>
                      <span className="font-medium">15/01/2024</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="players" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Elenco ({teamPlayers.length} jogadores)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamPlayers.map((player) => (
                      <div key={player.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{player.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              Overall: {player.overallRating}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">@{player.username}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {getPositionLabel(player.teamPosition)}
                            </Badge>
                            {player.position !== player.teamPosition && (
                              <Badge variant="secondary" className="text-xs">
                                Original: {getPositionLabel(player.position)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Jogos</p>
                              <p className="font-medium">{player.gamesPlayed}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Gols</p>
                              <p className="font-medium">{player.goals}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Assist.</p>
                              <p className="font-medium">{player.assists}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Histórico de Partidas ({matchHistory.length} jogos)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchHistory.map((match) => (
                      <div key={match.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">vs {match.opponent}</h4>
                            <Badge 
                              className={`text-xs ${getResultColor(match.result)}`}
                              variant="secondary"
                            >
                              {getResultText(match.result)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {match.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {match.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {match.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {match.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {match.score}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}