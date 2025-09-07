import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Calendar, Trophy } from "lucide-react";

interface TeamCardProps {
  name: string;
  description: string;
  memberCount: number;
  foundedYear: number;
  category: string;
  achievements: number;
}

export function TeamCard({ 
  name, 
  description, 
  memberCount, 
  foundedYear, 
  category, 
  achievements 
}: TeamCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{name}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{memberCount} membros</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Fundado em {foundedYear}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span>{achievements} conquistas</span>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Ver Detalhes
        </Button>
        <Button size="sm" className="flex-1">
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
}