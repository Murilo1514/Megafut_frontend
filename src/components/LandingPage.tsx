import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useTheme } from "../contexts/ThemeContext";
import { 
  Trophy, 
  Users, 
  MapPin, 
  BarChart3, 
  Star,
  Play,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle,
  Target,
  Award,
  Calendar
} from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Users,
      title: "Criação de Times",
      description: "Forme seus times e convide amigos para jogar juntos"
    },
    {
      icon: Trophy,
      title: "Campeonatos",
      description: "Organize competições estruturadas com tabelas automáticas"
    },
    {
      icon: BarChart3,
      title: "Ligas Individuais",
      description: "Compete individualmente em ligas balanceadas"
    },
    {
      icon: MapPin,
      title: "Portal de Quadras",
      description: "Encontre as melhores quadras da sua região"
    },
    {
      icon: Target,
      title: "Estatísticas",
      description: "Acompanhe sua evolução com estatísticas detalhadas"
    },
    {
      icon: Award,
      title: "Cartinhas FIFA",
      description: "Ganhe cartinhas personalizadas baseadas no seu desempenho"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Jogador há 2 anos",
      content: "O MegaFut revolucionou como organizamos nossas peladas. Muito mais fácil e divertido!",
      rating: 5
    },
    {
      name: "Ana Santos",
      role: "Capitã do time Unidos FC",
      content: "As estatísticas e cartinhas deixaram tudo mais competitivo. Adoramos!",
      rating: 5
    },
    {
      name: "Pedro Oliveira",
      role: "Organizador de campeonatos",
      content: "Nunca foi tão simples organizar campeonatos. O sistema de validação é perfeito.",
      rating: 5
    }
  ];

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MegaFut</span>
          </div>
          
          <div className="flex items-center gap-4">
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
            <Button variant="ghost" onClick={onLogin}>
              Entrar
            </Button>
            <Button onClick={onRegister} className="bg-primary hover:bg-primary/90">
              Cadastrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            ⚽ A nova era do futebol amador
          </Badge>
          
          <h1 className="mb-6 text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Organize suas peladas como um profissional
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            O MegaFut é a plataforma definitiva para organizar partidas de futebol amador. 
            Crie times, organize campeonatos, encontre quadras e ganhe cartinhas personalizadas!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onRegister} className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Play className="mr-2 h-5 w-5" />
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Trophy className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            <p>Junte-se a mais de 10.000 jogadores que já usam o MegaFut</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tudo que você precisa para organizar seus jogos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Do jogo casual até competições sérias, o MegaFut tem todas as ferramentas que você precisa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como funciona?</h2>
            <p className="text-lg text-muted-foreground">
              Em poucos passos você já está jogando
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Crie sua conta</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre-se gratuitamente e complete seu perfil de jogador
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Forme seu time</h3>
              <p className="text-sm text-muted-foreground">
                Convide amigos ou entre em times existentes
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Organize jogos</h3>
              <p className="text-sm text-muted-foreground">
                Crie campeonatos, ligas ou jogos casuais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossos usuários dizem</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para revolucionar seus jogos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se à maior plataforma de futebol amador do Brasil
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onRegister} className="bg-primary hover:bg-primary/90 text-lg px-8">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onLogin} className="text-lg px-8">
              Já tenho conta
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Sem anúncios</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">MegaFut</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2025 MegaFut. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}