
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, ArrowLeft, AlertTriangle, TrendingUp, Calculator, Plus, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Dipendente2018 {
  id: string;
  matricola: string;
  percentualePartTime: number;
}

interface DipendenteRiferimento {
  id: string;
  matricola: string;
  percentualePartTime: number;
  cedoliniEmessi: number;
}

const NuovoLimiteFondo = () => {
  const navigate = useNavigate();
  
  // Input states
  const [limiteSalario2016, setLimiteSalario2016] = useState("");
  const [annoRiferimento, setAnnoRiferimento] = useState("2024");
  
  // Dipendenti 2018
  const [dipendenti2018, setDipendenti2018] = useState<Dipendente2018[]>([]);
  const [nuovaMatricola2018, setNuovaMatricola2018] = useState("");
  const [nuovaPercentuale2018, setNuovaPercentuale2018] = useState("");
  
  // Dipendenti anno di riferimento
  const [dipendentiRiferimento, setDipendentiRiferimento] = useState<DipendenteRiferimento[]>([]);
  const [nuovaMatricolaRif, setNuovaMatricolaRif] = useState("");
  const [nuovaPercentualeRif, setNuovaPercentualeRif] = useState("");
  const [nuoviCedoliniRif, setNuoviCedoliniRif] = useState("");
  
  // Calculated results
  const [equivalenti2018, setEquivalenti2018] = useState(0);
  const [equivalentiRiferimento, setEquivalentiRiferimento] = useState(0);
  const [differenzaEquivalenti, setDifferenzaEquivalenti] = useState(0);
  const [incrementoTetto, setIncrementoTetto] = useState(0);
  const [incrementoPercentuale, setIncrementoPercentuale] = useState(0);

  // Aggiungi dipendente 2018
  const aggiungiDipendente2018 = () => {
    if (nuovaMatricola2018 && nuovaPercentuale2018) {
      const nuovoDipendente: Dipendente2018 = {
        id: Date.now().toString(),
        matricola: nuovaMatricola2018,
        percentualePartTime: parseFloat(nuovaPercentuale2018) || 100
      };
      setDipendenti2018([...dipendenti2018, nuovoDipendente]);
      setNuovaMatricola2018("");
      setNuovaPercentuale2018("");
    }
  };

  // Rimuovi dipendente 2018
  const rimuoviDipendente2018 = (id: string) => {
    setDipendenti2018(dipendenti2018.filter(d => d.id !== id));
  };

  // Aggiungi dipendente riferimento
  const aggiungiDipendenteRiferimento = () => {
    if (nuovaMatricolaRif && nuovaPercentualeRif && nuoviCedoliniRif) {
      const nuovoDipendente: DipendenteRiferimento = {
        id: Date.now().toString(),
        matricola: nuovaMatricolaRif,
        percentualePartTime: parseFloat(nuovaPercentualeRif) || 100,
        cedoliniEmessi: parseFloat(nuoviCedoliniRif) || 0
      };
      setDipendentiRiferimento([...dipendentiRiferimento, nuovoDipendente]);
      setNuovaMatricolaRif("");
      setNuovaPercentualeRif("");
      setNuoviCedoliniRif("");
    }
  };

  // Rimuovi dipendente riferimento
  const rimuoviDipendenteRiferimento = (id: string) => {
    setDipendentiRiferimento(dipendentiRiferimento.filter(d => d.id !== id));
  };

  // Calculate all values automatically when inputs change
  useEffect(() => {
    const limite = parseFloat(limiteSalario2016) || 0;

    // Calcola equivalenti 2018
    const eq2018 = dipendenti2018.reduce((sum, dip) => {
      return sum + (dip.percentualePartTime / 100);
    }, 0);

    // Calcola equivalenti anno di riferimento
    const eqRif = dipendentiRiferimento.reduce((sum, dip) => {
      const fractioneAnno = dip.cedoliniEmessi / 12;
      const fractionePartTime = dip.percentualePartTime / 100;
      return sum + (fractioneAnno * fractionePartTime);
    }, 0);

    // Differenza equivalenti
    const diff = eqRif - eq2018;

    // Calcolo incremento: (limite 2016 / equivalenti 2018) × differenza equivalenti
    let incremento = 0;
    let incPerc = 0;
    
    if (limite > 0 && eq2018 > 0) {
      incremento = (limite / eq2018) * diff;
      incPerc = limite > 0 ? (incremento / limite) * 100 : 0;
    }

    setEquivalenti2018(eq2018);
    setEquivalentiRiferimento(eqRif);
    setDifferenzaEquivalenti(diff);
    setIncrementoTetto(incremento);
    setIncrementoPercentuale(incPerc);
  }, [limiteSalario2016, dipendenti2018, dipendentiRiferimento]);

  // Chart data
  const chartData = [
    {
      anno: "2016",
      fondo: parseFloat(limiteSalario2016) || 0,
      equivalenti: equivalenti2018
    },
    {
      anno: annoRiferimento,
      fondo: (parseFloat(limiteSalario2016) || 0) + incrementoTetto,
      equivalenti: equivalentiRiferimento
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
      limiteSalario2016,
      dipendenti2018,
      dipendentiRiferimento,
      annoRiferimento,
      risultati: {
        equivalenti2018,
        equivalentiRiferimento,
        differenzaEquivalenti,
        incrementoTetto,
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
            Il calcolo si basa sull'invarianza media pro-capite e considera l'organico reale.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Dati di Base
              </CardTitle>
              <CardDescription>
                Inserisci i dati di partenza per il calcolo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="limiteSalario2016">Limite del Salario Accessorio 2016 (€)</Label>
                  <Input
                    id="limiteSalario2016"
                    type="number"
                    step="0.01"
                    value={limiteSalario2016}
                    onChange={(e) => setLimiteSalario2016(e.target.value)}
                    placeholder="Es. 150000.00"
                  />
                </div>

                <div>
                  <Label htmlFor="annoRiferimento">Anno di Riferimento</Label>
                  <Input
                    id="annoRiferimento"
                    type="number"
                    value={annoRiferimento}
                    onChange={(e) => setAnnoRiferimento(e.target.value)}
                    placeholder="2024"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dipendenti 2018 Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personale al 31/12/2018
              </CardTitle>
              <CardDescription>
                Inserisci i dipendenti in servizio al 31 dicembre 2018
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="matricola2018">Matricola</Label>
                  <Input
                    id="matricola2018"
                    value={nuovaMatricola2018}
                    onChange={(e) => setNuovaMatricola2018(e.target.value)}
                    placeholder="Es. 001"
                  />
                </div>
                <div>
                  <Label htmlFor="percentuale2018">% Part-time</Label>
                  <Input
                    id="percentuale2018"
                    type="number"
                    min="1"
                    max="100"
                    value={nuovaPercentuale2018}
                    onChange={(e) => setNuovaPercentuale2018(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="button" onClick={aggiungiDipendente2018} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi
                  </Button>
                </div>
              </div>

              {dipendenti2018.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matricola</TableHead>
                      <TableHead>% Part-time</TableHead>
                      <TableHead>Equivalente</TableHead>
                      <TableHead>Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dipendenti2018.map((dip) => (
                      <TableRow key={dip.id}>
                        <TableCell>{dip.matricola}</TableCell>
                        <TableCell>{dip.percentualePartTime}%</TableCell>
                        <TableCell>{(dip.percentualePartTime / 100).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => rimuoviDipendente2018(dip.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Dipendenti Equivalenti al 31/12/2018</p>
                <p className="text-2xl font-bold text-blue-800">{equivalenti2018.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Dipendenti Anno Riferimento Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personale Anno {annoRiferimento} (PIAO)
              </CardTitle>
              <CardDescription>
                Inserisci i dipendenti previsti dal Piano Integrato di Attività e Organizzazione
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="matricolaRif">Matricola</Label>
                  <Input
                    id="matricolaRif"
                    value={nuovaMatricolaRif}
                    onChange={(e) => setNuovaMatricolaRif(e.target.value)}
                    placeholder="Es. 001"
                  />
                </div>
                <div>
                  <Label htmlFor="percentualeRif">% Part-time</Label>
                  <Input
                    id="percentualeRif"
                    type="number"
                    min="1"
                    max="100"
                    value={nuovaPercentualeRif}
                    onChange={(e) => setNuovaPercentualeRif(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="cedoliniRif">Cedolini Emessi</Label>
                  <Input
                    id="cedoliniRif"
                    type="number"
                    min="1"
                    max="12"
                    value={nuoviCedoliniRif}
                    onChange={(e) => setNuoviCedoliniRif(e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="button" onClick={aggiungiDipendenteRiferimento} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi
                  </Button>
                </div>
              </div>

              {dipendentiRiferimento.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matricola</TableHead>
                      <TableHead>% Part-time</TableHead>
                      <TableHead>Cedolini</TableHead>
                      <TableHead>Equivalente</TableHead>
                      <TableHead>Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dipendentiRiferimento.map((dip) => {
                      const equivalente = (dip.cedoliniEmessi / 12) * (dip.percentualePartTime / 100);
                      return (
                        <TableRow key={dip.id}>
                          <TableCell>{dip.matricola}</TableCell>
                          <TableCell>{dip.percentualePartTime}%</TableCell>
                          <TableCell>{dip.cedoliniEmessi}</TableCell>
                          <TableCell>{equivalente.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => rimuoviDipendenteRiferimento(dip.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-600">Dipendenti Equivalenti Anno {annoRiferimento}</p>
                <p className="text-2xl font-bold text-green-800">{equivalentiRiferimento.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {parseFloat(limiteSalario2016) > 0 && (equivalenti2018 > 0 || equivalentiRiferimento > 0) && (
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

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-600">Equivalenti {annoRiferimento}</p>
                      <p className="text-2xl font-bold text-green-800">{equivalentiRiferimento.toFixed(2)}</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-yellow-600">Differenza Equivalenti</p>
                      <p className="text-2xl font-bold text-yellow-800">{differenzaEquivalenti.toFixed(2)}</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-red-600">Incremento Tetto Fondo</p>
                      <p className="text-2xl font-bold text-red-800">€ {incrementoTetto.toFixed(2)}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-purple-600">Nuovo Limite {annoRiferimento}</p>
                      <p className="text-2xl font-bold text-purple-800">€ {((parseFloat(limiteSalario2016) || 0) + incrementoTetto).toFixed(2)}</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-orange-600">Incremento %</p>
                      <p className="text-2xl font-bold text-orange-800">{incrementoPercentuale.toFixed(2)}%</p>
                    </div>
                  </div>

                  {/* Alerts */}
                  {incrementoTetto < 0 && (
                    <Alert className="mt-4 border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Attenzione:</strong> L'incremento risulta negativo, indicando una riduzione del tetto del fondo.
                      </AlertDescription>
                    </Alert>
                  )}

                  {Math.abs(incrementoPercentuale) > 20 && (
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
                  <CardTitle>Confronto Limite 2016 vs Nuovo Limite {annoRiferimento}</CardTitle>
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
              <h4 className="font-semibold">1. Calcolo Dipendenti Equivalenti 2018</h4>
              <p className="text-sm text-gray-600">
                Equivalenti = Σ (% Part-time di ogni dipendente / 100)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">2. Calcolo Dipendenti Equivalenti Anno di Riferimento</h4>
              <p className="text-sm text-gray-600">
                Equivalenti = Σ [(Cedolini emessi / 12) × (% Part-time / 100)]
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">3. Incremento del Tetto</h4>
              <p className="text-sm text-gray-600">
                Incremento = (Limite 2016 / Equivalenti 2018) × (Equivalenti Riferimento - Equivalenti 2018)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">4. Considerazioni</h4>
              <p className="text-sm text-gray-600">
                • Part-time valorizzato in percentuale (es. 70% = 0,7 equivalenti)<br/>
                • Nuovi ingressi valorizzati pro-rata sui cedolini emessi<br/>
                • Calcolo basato sull'organico reale e previsto dal PIAO
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NuovoLimiteFondo;
