
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Users, Building, FileText, DollarSign, BarChart3, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Elevate Qualificazioni",
      description: "Calcolo per il personale con qualifiche elevate",
      icon: TrendingUp,
      path: "/elevate-qualificazioni",
      color: "bg-blue-600"
    },
    {
      title: "Incremento D.L. PA",
      description: "Simulazione incrementi secondo decreto PA",
      icon: Calculator,
      path: "/incremento-dl-pa",
      color: "bg-green-600"
    },
    {
      title: "Fondo Segretario Comunale",
      description: "Calcolo del fondo per il segretario comunale",
      icon: Building,
      path: "/fondo-segretario-comunale",
      color: "bg-purple-600"
    },
    {
      title: "Fondo Dirigenza",
      description: "Simulazione per il fondo della dirigenza",
      icon: Users,
      path: "/fondo-dirigenza",
      color: "bg-orange-600"
    },
    {
      title: "Fondo Personale Dipendente",
      description: "Calcolo completo del fondo del personale dipendente",
      icon: FileText,
      path: "/fondo-personale-dipendente",
      color: "bg-red-600"
    },
    {
      title: "Nuovo Limite Fondo",
      description: "Calcolo del nuovo limite del fondo salario accessorio",
      icon: BarChart3,
      path: "/nuovo-limite-fondo",
      color: "bg-indigo-600"
    },
    {
      title: "Report Calcoli",
      description: "Riepilogo e report dei calcoli effettuati",
      icon: ClipboardList,
      path: "/report-calcoli",
      color: "bg-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-32 h-16 mx-auto bg-red-600 flex items-center justify-center text-white font-bold text-2xl rounded-lg shadow-lg">
              FP CGIL
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Simulatore Fondi Contrattuali
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strumenti di calcolo per la simulazione dei fondi contrattuali degli enti locali. 
            Calcola incrementi, fondi dirigenza e verifica la conformità normativa.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className={`${tool.color} text-white`}>
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8" />
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 mb-4 min-h-[3rem]">
                    {tool.description}
                  </CardDescription>
                  <Button 
                    onClick={() => navigate(tool.path)}
                    className="w-full"
                    variant="outline"
                  >
                    Avvia Simulazione
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Strumenti Professionali per gli Enti Locali
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Questi strumenti sono stati sviluppati per supportare gli enti locali nel calcolo 
              dei fondi contrattuali e nella verifica della conformità normativa. Ogni simulatore 
              include i riferimenti normativi aggiornati e calcoli automatici basati sui contratti 
              collettivi nazionali di lavoro vigenti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
