
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileSpreadsheet, Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 bg-white shadow-lg max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-32 h-16 mx-auto bg-red-600 flex items-center justify-center text-white font-bold text-lg rounded">
              FP CGIL
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Simulatori Fondi Contrattuali
          </h1>
          <p className="text-gray-600">
            Strumenti di calcolo per la simulazione dei fondi contrattuali degli enti locali
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/elevate-qualificazioni')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Elevate Qualificazioni
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo fondi per le elevate qualificazioni
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Simulazione per il calcolo delle risorse stabili e variabili per le elevate qualificazioni secondo il CCNL del 16.11.2022.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/incremento-dl-pa')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Incremento DL PA
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo incremento fondo elevate qualificazioni
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Simulazione incremento potenziale del fondo del salario accessorio basata su DL 25/2025, DM 17/03/2020, L. 296/06.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/nuovo-limite-fondo')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Nuovo Limite Fondo
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo nuovo limite salario accessorio
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Calcolo automatico del nuovo limite del fondo del salario accessorio garantendo l'invarianza del valore medio pro-capite.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/fondo-personale-dipendente')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Fondo Personale Dipendente
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo fondo per il personale dipendente
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Simulazione per il calcolo del fondo del personale dipendente secondo la normativa contrattuale vigente.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/fondo-segretario-comunale')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Fondo Segretario Comunale
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo fondo per segretari comunali
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Simulazione per il calcolo del fondo dedicato ai segretari comunali secondo la normativa vigente.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/fondo-dirigenza')}>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Fondo Dirigenza
              </CardTitle>
              <CardDescription className="text-red-100">
                Calcolo fondo per la dirigenza
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Simulazione per il calcolo del fondo dedicato alla dirigenza secondo la normativa contrattuale.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Accedi al Simulatore
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>© 2024 FP CGIL Lombardia - Strumenti di simulazione per enti locali</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
