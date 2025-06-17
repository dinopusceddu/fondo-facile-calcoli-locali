
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, ArrowLeft, AlertTriangle, TrendingUp, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const NuovoLimiteFondo = () => {
  const navigate = useNavigate();
  
  // Input states
  const [fondoBase2018, setFondoBase2018] = useState("");
  const [cedolini2018, setCedolini2018] = useState("");
  const [cedoliniTarget, setCedoliniTarget] = useState("");
  const [annoTarget, setAnnoTarget] = useState("2024");
  
  // Calculated results
  const [equivalenti2018, setEquivalenti2018] = useState(0);
  const [equivalentiTarget, setEquivalentiTarget] = useState(0);
  const [mediaProcapite, setMediaProcapite] = useState(0);
  const [nuovoLimite, setNuovoLimite] = useState(0);
  const [incrementoAssoluto, setIncrementoAssoluto] = useState(0);
  const [incrementoPercentuale, setIncrementoPercentuale] = useState(0);

  // Calculate all values automatically when inputs change
  useEffect(() => {
    const fondo = parseFloat(fondoBase2018) || 0;
    const ced2018 = parseFloat(cedolini2018) || 0;
    const cedTarget = parseFloat(cedoliniTarget) || 0;

    if (fondo > 0 && ced2018 > 0 && cedTarget > 0) {
      // Calcolo equivalenti
      const eq2018 = ced2018 / 12;
      const eqTarget = cedTarget / 12;
      
      // Media pro-capite anno 2018
      const media = fondo / eq2018;
      
      // Nuovo limite anno target
      const limite = media * eqTarget;
      const incAss = limite - fondo;
      const incPerc = (incAss / fondo) * 100;

      setEquivalenti2018(eq2018);
      setEquivalentiTarget(eqTarget);
      setMediaProcapite(media);
      setNuovoLimite(limite);
      setIncrementoAssoluto(incAss);
      setIncrementoPercentuale(incPerc);
    } else {
      // Reset all calculations if inputs are invalid
      setEquivalenti2018(0);
      setEquivalentiTarget(0);
      setMediaProcapite(0);
      setNuovoLimite(0);
      setIncrementoAssoluto(0);
      setIncrementoPercentuale(0);
    }
  }, [fondoBase2018, cedolini2018, cedoliniTarget]);

  // Chart data
  const chartData = [
    {
      anno: "2018",
      fondo: parseFloat(fondoBase2018) || 0,
      equivalenti: equivalenti2018
    },
    {
      anno: annoTarget,
      fondo: nuovoLimite,
      equivalenti: equivalentiTarget
    }
  ];

  const chartConfig = {
    fondo: {
      label: "Fondo (€)",
      color: "#dc2626"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calcolo completato:", {
      fondoBase2018,
      cedolini2018,
      cedoliniTarget,
      annoTarget,
      risultati: {
        equivalenti2018,
        equivalentiTarget,
        mediaProcapite,
        nuovoLimite,
        incrementoAssoluto,
        incrementoPercentuale
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 bg-white shadow-lg max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla Home
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-red-600" />
              Nuovo Limite Fondo Salario Accessorio
            </h1>
            <p className="text-gray-600 mt-1">
              Calcolo automatico del nuovo limite garantendo l'invarianza del valore medio pro-capite
            </p>
          </div>
        </div>

        {/* Normative Reference */}
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Riferimenti normativi:</strong> Art. 33 c. 2 D.L. 34/2019, interpretazioni RGS/Corte dei Conti per inclusioni part-time e tempo determinato. 
            Il calcolo si basa sull'invarianza media pro-capite e considera l'organico reale su cedolini effettivamente emessi.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Dati di Input
              </CardTitle>
              <CardDescription>
                Inserisci i dati necessari per il calcolo del nuovo limite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fondoBase2018">Fondo Base 2018 (€)</Label>
                  <Input
                    id="fondoBase2018"
                    type="number"
                    step="0.01"
                    value={fondoBase2018}
                    onChange={(e) => setFondoBase2018(e.target.value)}
                    placeholder="Es. 150000.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fondo complessivo: contrattazione integrativa + posizioni organizzative
                  </p>
                </div>

                <div>
                  <Label htmlFor="annoTarget">Anno Target</Label>
                  <Input
                    id="annoTarget"
                    type="number"
                    value={annoTarget}
                    onChange={(e) => setAnnoTarget(e.target.value)}
                    placeholder="2024"
                  />
                </div>

                <div>
                  <Label htmlFor="cedolini2018">Cedolini Totali Emessi 2018</Label>
                  <Input
                    id="cedolini2018"
                    type="number"
                    step="0.01"
                    value={cedolini2018}
                    onChange={(e) => setCedolini2018(e.target.value)}
                    placeholder="Es. 240.50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Somma di tutti i cedolini emessi (part-time calcolato pro-rata)
                  </p>
                </div>

                <div>
                  <Label htmlFor="cedoliniTarget">Cedolini Totali Emessi {annoTarget}</Label>
                  <Input
                    id="cedoliniTarget"
                    type="number"
                    step="0.01"
                    value={cedoliniTarget}
                    onChange={(e) => setCedoliniTarget(e.target.value)}
                    placeholder="Es. 264.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Somma di tutti i cedolini emessi nell'anno target
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {nuovoLimite > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Risultati del Calcolo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-600">Equivalenti 2018</p>
                      <p className="text-2xl font-bold text-blue-800">{equivalenti2018.toFixed(2)}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-600">Equivalenti {annoTarget}</p>
                      <p className="text-2xl font-bold text-blue-800">{equivalentiTarget.toFixed(2)}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-600">Media Pro-capite 2018</p>
                      <p className="text-2xl font-bold text-green-800">€ {mediaProcapite.toFixed(2)}</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-red-600">Nuovo Limite {annoTarget}</p>
                      <p className="text-2xl font-bold text-red-800">€ {nuovoLimite.toFixed(2)}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-purple-600">Incremento Assoluto</p>
                      <p className="text-2xl font-bold text-purple-800">€ {incrementoAssoluto.toFixed(2)}</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-orange-600">Incremento %</p>
                      <p className="text-2xl font-bold text-orange-800">{incrementoPercentuale.toFixed(2)}%</p>
                    </div>
                  </div>

                  {/* Alerts */}
                  {incrementoAssoluto < 0 && (
                    <Alert className="mt-4 border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Attenzione:</strong> L'incremento risulta negativo, indicando una riduzione del fondo base.
                      </AlertDescription>
                    </Alert>
                  )}

                  {incrementoPercentuale > 20 && (
                    <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <strong>Nota:</strong> L'incremento percentuale risulta elevato ({incrementoPercentuale.toFixed(2)}%). 
                        Verificare la correttezza dei dati inseriti.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Chart Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Confronto Fondo Base vs Nuovo Limite</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis dataKey="anno" />
                        <YAxis />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value, name) => [
                            `€ ${Number(value).toLocaleString('it-IT', { minimumFractionDigits: 2 })}`,
                            name === 'fondo' ? 'Fondo' : name
                          ]}
                        />
                        <Bar dataKey="fondo" fill="var(--color-fondo)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          )}

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Calcola Nuovo Limite
            </Button>
          </div>
        </form>

        {/* Methodology Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Metodologia di Calcolo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">1. Calcolo Personale Equivalente</h4>
              <p className="text-sm text-gray-600">
                Equivalenti = Cedolini Totali / 12 (considera part-time come frazione e nuovi ingressi pro-rata)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">2. Valore Medio Pro-capite (2018)</h4>
              <p className="text-sm text-gray-600">
                Media = Fondo Base 2018 / Equivalenti 2018
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">3. Nuovo Limite Anno Target</h4>
              <p className="text-sm text-gray-600">
                Nuovo Limite = Media Pro-capite × Equivalenti Target
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">4. Inclusioni</h4>
              <p className="text-sm text-gray-600">
                • Part-time valorizzato in frazioni secondo cedolini<br/>
                • Dipendenti a tempo determinato e indeterminato inclusi<br/>
                • Organico reale basato su cedolini effettivi
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NuovoLimiteFondo;
