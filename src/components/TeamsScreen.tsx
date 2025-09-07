import { TeamCard } from "./TeamCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Search, Filter, Users } from "lucide-react";

// Mock data para demonstração
const teams = [
  {
    id: 1,
    name: "Pelada FC",
    description: "Time de futebol amador da zona sul de São Paulo",
    memberCount: 18,
    foundedYear: 2020,
    category: "Futebol",
    achievements: 12
  },
  {
    id: 2,
    name: "Unidos da Vila",
    description: "Equipe tradicional de futsal da Vila Madalena",
    memberCount: 14,
    foundedYear: 2018,
    category: "Futsal",
    achievements: 8
  },
  {
    id: 3,
    name: "Amigos United",
    description: "Time casual para peladas de final de semana",
    memberCount: 22,
    foundedYear: 2021,
    category: "Futebol",
    achievements: 5
  },
  {
    id: 4,
    name: "Galera do Ibirapuera",
    description: "Grupo que se reúne no parque para jogar futebol",
    memberCount: 16,
    foundedYear: 2019,
    category: "Futebol",
    achievements: 15
  },
  {
    id: 5,
    name: "Futsal Brothers",
    description: "Time competitivo de futsal da região central",
    memberCount: 12,
    foundedYear: 2017,
    category: "Futsal",
    achievements: 23
  },
  {
    id: 6,
    name: "Raça e Paixão FC",
    description: "Time de veteranos acima de 35 anos",
    memberCount: 20,
    foundedYear: 2015,
    category: "Futebol",
    achievements: 31
  }
];

export function TeamsScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* Header da página principal */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Meus Times</h1>
            <p className="text-muted-foreground">
              Gerencie seus times de futebol e futsal
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Criar Time
          </Button>
        </div>
        
        {/* Filtros e busca */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar times..." 
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as modalidades</SelectItem>
              <SelectItem value="futebol">Futebol</SelectItem>
              <SelectItem value="futsal">Futsal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Lista de times */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              name={team.name}
              description={team.description}
              memberCount={team.memberCount}
              foundedYear={team.foundedYear}
              category={team.category}
              achievements={team.achievements}
            />
          ))}
        </div>
        
        {/* Estado vazio quando não há times */}
        {teams.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum time encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Comece criando seu primeiro time
            </p>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Criar Primeiro Time
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}