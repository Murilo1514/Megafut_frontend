import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Users, 
  Trophy, 
  Calendar, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Activity,
  Target
} from "lucide-react";

export function HomeScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Bem-vindo ao MegaFut! ⚽</h1>
            <p className="text-muted-foreground">
              Olá, João! Organize suas partidas e conquiste a vitória.
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Novo Jogo
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Meus Times</p>
                    <p className="text-2xl font-semibold">3</p>
                    <p className="text-xs text-primary">+1 este mês</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <Trophy className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Partidas Jogadas</p>
                    <p className="text-2xl font-semibold">47</p>
                    <p className="text-xs text-primary">+3 esta semana</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Activity className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Gols Marcados</p>
                    <p className="text-2xl font-semibold">23</p>
                    <p className="text-xs text-primary">+2 este mês</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                    <Target className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Overall Atual</p>
                    <p className="text-2xl font-semibold">82</p>
                    <p className="text-xs text-primary">Carta Rara</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Atividades Recentes e Próximos Eventos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Atividades Recentes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Atividades Recentes
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Você marcou um hat-trick!</p>
                    <p className="text-xs text-muted-foreground">Conquista desbloqueada - 2 horas atrás</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Novo convite para o time "Pelada FC"</p>
                    <p className="text-xs text-muted-foreground">1 dia atrás</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Sua avaliação melhorou - Overall 82</p>
                    <p className="text-xs text-muted-foreground">2 dias atrás</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Eventos
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver calendário
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex-1">
                    <p className="font-medium">Pelada FC vs Amigos United</p>
                    <p className="text-sm text-muted-foreground">Campo do Ibirapuera - São Paulo</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">Hoje</p>
                    <p className="text-xs text-muted-foreground">19:00</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                  <div className="flex-1">
                    <p className="font-medium">Treino da Manhã</p>
                    <p className="text-sm text-muted-foreground">Preparação para liga</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Amanhã</p>
                    <p className="text-xs text-muted-foreground">08:00</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                  <div className="flex-1">
                    <p className="font-medium">Campeonato Semanal</p>
                    <p className="text-sm text-muted-foreground">Rodada 3 - Vila Madalena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Sáb</p>
                    <p className="text-xs text-muted-foreground">15:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance dos Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Seus Times - Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pelada FC</span>
                    <Badge className="bg-primary text-primary-foreground">1º lugar</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">92%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unidos da Vila</span>
                    <Badge variant="secondary">3º lugar</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-muted rounded-full">
                      <div className="h-2 bg-primary/70 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">78%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Amigos United</span>
                    <Badge variant="outline">5º lugar</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-muted rounded-full">
                      <div className="h-2 bg-primary/50 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">65%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}