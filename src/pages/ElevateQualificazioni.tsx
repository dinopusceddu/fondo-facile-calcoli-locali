
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElevateQualificazioni = () => {
  const [art17c2, setArt17c2] = useState<number>(0);
  const [art17c3, setArt17c3] = useState<number>(0);
  const [art17c5, setArt17c5] = useState<number>(0);
  const [art23c5, setArt23c5] = useState<number>(0);
  const [art17c4, setArt17c4] = useState<number>(0);
  const [art79c3, setArt79c3] = useState<number>(0);
  const [art23c2, setArt23c2] = useState<number>(0);
  const [art33c2, setArt33c2] = useState<number>(0);

  const navigate = useNavigate();

  const totaleRisorseStabili = art17c2 + art17c3 + art17c5 + art23c5;
  const totaleRisorseVariabili = art17c4 + art79c3;
  const totaleRisorseEffettivamenteDisponibili = totaleRisorseStabili + totaleRisorseVariabili + art23c2 + art33c2;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Calcolo Elevate Qualificazioni</h1>
            <p className="text-lg text-gray-600">
              Strumento per il calcolo delle risorse per le Elevate Qualificazioni
            </p>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mt-4"
            >
              Torna al Fondo Risorse Decentrate
            </Button>
          </div>

          {/* RISORSE STABILI */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Risorse Stabili
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse stabili per le Elevate Qualificazioni secondo il CCNL</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Inserisci gli importi delle risorse stabili disponibili
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="art17c2" className="text-sm font-medium">
                  Art. 17 c. 2 CCNL del 16.11.2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art17c2"
                        type="number"
                        value={art17c2 || ''}
                        onChange={(e) => setArt17c2(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>L'importo della retribuzione di posizione varia da un minimo di € 5.000 ad un massimo di € 18.000 lordi per tredici mensilità, sulla base della graduazione di ciascuna posizione.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="art17c3" className="text-sm font-medium">
                  Art. 17 c. 3 CCNL del 16.11.2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art17c3"
                        type="number"
                        value={art17c3 || ''}
                        onChange={(e) => setArt17c3(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Nelle ipotesi considerate nell'art. 16, comma 4, l'importo della retribuzione di posizione varia da un minimo di € 3.000 ad un massimo di € 9.500 annui lordi per tredici mensilità.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="art17c5" className="text-sm font-medium">
                  Art. 17 c. 5 CCNL del 16.11.2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art17c5"
                        type="number"
                        value={art17c5 || ''}
                        onChange={(e) => setArt17c5(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Nell'ipotesi di conferimento ad un lavoratore di un incarico ad interim, è attribuito un ulteriore importo dal 15% al 25% del valore economico della retribuzione di posizione prevista per l'incarico di EQ oggetto del conferimento ad interim.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="art23c5" className="text-sm font-medium">
                  Art. 23 c. 5 CCNL del 16.11.2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art23c5"
                        type="number"
                        value={art23c5 || ''}
                        onChange={(e) => setArt23c5(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Al fine di compensare la maggiore gravosità della prestazione svolta in diverse sedi di lavoro, l'ente utilizzatore può corrispondere una maggiorazione della retribuzione di posizione attribuita, di importo non superiore al 30% della stessa.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Somma Risorse Stabili:</span>
                  <span className="text-blue-600">€ {totaleRisorseStabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RISORSE VARIABILI */}
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Risorse Variabili
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse variabili per le Elevate Qualificazioni</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="text-orange-100">
                Inserisci gli importi delle risorse variabili disponibili
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="art17c4" className="text-sm font-medium">
                  Art. 17 c. 4 CCNL del 16.11.2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art17c4"
                        type="number"
                        value={art17c4 || ''}
                        onChange={(e) => setArt17c4(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Gli enti definiscono i criteri per la determinazione e per l'erogazione annuale della retribuzione di risultato degli incarichi di EQ, destinando a tale particolare voce retributiva una quota non inferiore al 15% delle risorse complessivamente finalizzate alla erogazione della retribuzione di posizione e di risultato di tutti gli incarichi previsti dal proprio ordinamento.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="art79c3" className="text-sm font-medium">
                  Art. 79 c. 3 CCNL 2022
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art79c3"
                        type="number"
                        value={art79c3 || ''}
                        onChange={(e) => setArt79c3(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>0,22% del monte salari anno 2018 con decorrenza dal 01.01.2022, quota d'incremento del fondo proporzionale (non rileva ai fini del limite).</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Somma Risorse Variabili:</span>
                  <span className="text-orange-600">€ {totaleRisorseVariabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ARTICOLI AGGIUNTIVI */}
          <Card className="shadow-lg">
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle>Articoli Aggiuntivi</CardTitle>
              <CardDescription className="text-purple-100">
                Inserisci eventuali decurtazioni o incrementi annuali
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="art23c2" className="text-sm font-medium">
                  Art. 23 c. 2 dlgs 75/2017
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art23c2"
                        type="number"
                        value={art23c2 || ''}
                        onChange={(e) => setArt23c2(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Eventuale decurtazione o incremento annuale rispetto il tetto complessivo del salario accessorio dell'anno 2016.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="art33c2" className="text-sm font-medium">
                  Art. 33 c. 2 dl 34/2019
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="art33c2"
                        type="number"
                        value={art33c2 || ''}
                        onChange={(e) => setArt33c2(Number(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-right pr-8"
                      />
                      <Info className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Eventuale incremento salario accessorio in deroga realizzabile nell'anno.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* TOTALE FINALE */}
          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardTitle className="text-xl">Calcoli Finali</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span>Somma Risorse Stabili:</span>
                  <span className="font-semibold text-blue-600">€ {totaleRisorseStabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>Somma Risorse Variabili:</span>
                  <span className="font-semibold text-orange-600">€ {totaleRisorseVariabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>Art. 23 c. 2 dlgs 75/2017:</span>
                  <span className="font-semibold text-purple-600">€ {art23c2.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>Art. 33 c. 2 dl 34/2019:</span>
                  <span className="font-semibold text-purple-600">€ {art33c2.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Totale Risorse Effettivamente Disponibili:</span>
                    <span className={`${totaleRisorseEffettivamenteDisponibili >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      € {totaleRisorseEffettivamenteDisponibili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ElevateQualificazioni;
