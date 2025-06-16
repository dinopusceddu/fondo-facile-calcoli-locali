
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElevateQualificazioni = () => {
  const navigate = useNavigate();
  
  // Risorse Stabili
  const [art17c2, setArt17c2] = useState('');
  const [art17c3, setArt17c3] = useState('');
  const [art17c5, setArt17c5] = useState('');
  const [art23c5, setArt23c5] = useState('');
  
  // Risorse Variabili
  const [art17c4, setArt17c4] = useState('');
  const [art79c3, setArt79c3] = useState('');
  
  // Altri importi
  const [art23c2, setArt23c2] = useState('');
  const [art33c2, setArt33c2] = useState('');

  const parseValue = (value: string) => {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Calcoli automatici
  const sommaRisorseStabili = parseValue(art17c2) + parseValue(art17c3) + parseValue(art17c5) + parseValue(art23c5);
  const sommaRisorseVariabili = parseValue(art17c4) + parseValue(art79c3);
  const totaleRisorseDisponibili = sommaRisorseStabili + sommaRisorseVariabili + parseValue(art23c2) + parseValue(art33c2);

  const handleReset = () => {
    setArt17c2('');
    setArt17c3('');
    setArt17c5('');
    setArt23c5('');
    setArt17c4('');
    setArt79c3('');
    setArt23c2('');
    setArt33c2('');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al Fondo Principale
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Fondo Elevate Qualificazioni</h1>
          </div>

          {/* RISORSE STABILI */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle className="text-lg">RISORSE STABILI</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 17 c. 2 CCNL del 16.11.2022 L'importo della retribuzione di posizione varia da un minimo di € 5.000 ad un massimo di € 18.000 lordi per tredici mensilità
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Sulla base della graduazione di ciascuna posizione. Ciascun ente stabilisce la suddetta graduazione, sulla base di criteri predeterminati.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art17c2}
                    onChange={(e) => setArt17c2(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 17 c. 3 CCNL del 16.11.2022 Nelle ipotesi considerate nell'art. 16, comma 4, l'importo varia da un minimo di € 3.000 ad un massimo di € 9.500 annui lordi
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Per tredici mensilità nelle ipotesi specifiche dell'art. 16, comma 4.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art17c3}
                    onChange={(e) => setArt17c3(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 17 c. 5 CCNL del 16.11.2022 Incarico ad interim - ulteriore importo dal 15% al 25% del valore economico della retribuzione di posizione
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Per conferimento di incarico ad interim relativo ad altro incarico di EQ, nell'ambito della retribuzione di risultato.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art17c5}
                    onChange={(e) => setArt17c5(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 23 c. 5 CCNL del 16.11.2022 Maggiorazione per diverse sedi di lavoro (max 30% della retribuzione di posizione)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Per compensare la maggiore gravosità della prestazione svolta in diverse sedi di lavoro.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art23c5}
                    onChange={(e) => setArt23c5(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-blue-50 p-3 rounded-lg">
                  <Label className="text-sm font-bold col-span-2">SOMMA RISORSE STABILI</Label>
                  <div className="text-right font-bold text-blue-600">
                    {formatCurrency(sommaRisorseStabili)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RISORSE VARIABILI */}
          <Card className="mb-6">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-lg">RISORSE VARIABILI</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 17 c. 4 CCNL del 16.11.2022 Retribuzione di risultato (min 15% delle risorse complessive per posizione e risultato)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Gli enti definiscono i criteri per la determinazione e l'erogazione annuale della retribuzione di risultato degli incarichi di EQ.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art17c4}
                    onChange={(e) => setArt17c4(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 79 c. 3 CCNL 2022 0,22% del monte salari anno 2018 con decorrenza dal 01.01.2022 (non rileva ai fini del limite)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Quota d'incremento del fondo proporzionale che non rileva ai fini del limite.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art79c3}
                    onChange={(e) => setArt79c3(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-green-50 p-3 rounded-lg">
                  <Label className="text-sm font-bold col-span-2">SOMMA RISORSE VARIABILI</Label>
                  <div className="text-right font-bold text-green-600">
                    {formatCurrency(sommaRisorseVariabili)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CALCOLI FINALI */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-500 text-white">
              <CardTitle className="text-lg">CALCOLI FINALI</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 23 c. 2 dlgs 75/2017 Eventuale decurtazione o incremento annuale rispetto il tetto complessivo del salario accessorio dell'anno 2016
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Confronto con il tetto complessivo del salario accessorio dell'anno 2016.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art23c2}
                    onChange={(e) => setArt23c2(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <Label className="text-sm font-medium col-span-2">
                    Art. 33 c. 2 dl 34/2019 Eventuale incremento salario accessorio in deroga realizzabile nell'anno
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>Incremento salario accessorio in deroga per l'anno corrente.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    placeholder="€ 0,00"
                    value={art33c2}
                    onChange={(e) => setArt33c2(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
                  <Label className="text-lg font-bold col-span-2">TOTALE RISORSE EFFETTIVAMENTE DISPONIBILI</Label>
                  <div className="text-right text-xl font-bold text-yellow-700">
                    {formatCurrency(totaleRisorseDisponibili)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AZIONI */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={handleReset}>
              Reset Tutti i Campi
            </Button>
            <Button onClick={() => navigate('/')}>
              Torna al Fondo Principale
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ElevateQualificazioni;
