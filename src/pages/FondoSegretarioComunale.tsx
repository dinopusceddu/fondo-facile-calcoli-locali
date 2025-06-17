
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FondoSegretarioComunale = () => {
  const navigate = useNavigate();
  
  // Risorse Stabili
  const [art3c6, setArt3c6] = useState<string>('');
  const [art58c1, setArt58c1] = useState<string>('');
  const [art60c1, setArt60c1] = useState<string>('');
  const [art60c3, setArt60c3] = useState<string>('');
  const [art60c5, setArt60c5] = useState<string>('');
  const [art56c1g, setArt56c1g] = useState<string>('');
  const [art56c1h, setArt56c1h] = useState<string>('');

  // Risorse Variabili
  const [art56c1f, setArt56c1f] = useState<string>('');
  const [art56c1i, setArt56c1i] = useState<string>('');
  const [art8c3, setArt8c3] = useState<string>('');
  const [art61c2, setArt61c2] = useState<string>('');
  const [art61c2bis, setArt61c2bis] = useState<string>('');
  const [art61c2ter, setArt61c2ter] = useState<string>('');
  const [art61c3, setArt61c3] = useState<string>('');

  // Percentuale di copertura
  const [percentualeCopertura, setPercentualeCopertura] = useState<string>('100.00');

  const parseNumber = useCallback((value: string): number => {
    const cleaned = value.replace(/[^\d,-]/g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }, []);

  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  // Calcoli
  const sommaRisorseStabili = parseNumber(art3c6) + parseNumber(art58c1) + parseNumber(art60c1) + 
    parseNumber(art60c3) + parseNumber(art60c5) + parseNumber(art56c1g) + parseNumber(art56c1h);

  const sommaRisorseVariabili = parseNumber(art56c1f) + parseNumber(art56c1i) + parseNumber(art8c3) + 
    parseNumber(art61c2) + parseNumber(art61c2bis) + parseNumber(art61c2ter) + parseNumber(art61c3);

  const totaleRisorseConLimite = sommaRisorseStabili + parseNumber(art56c1f) + parseNumber(art56c1i) + 
    parseNumber(art8c3) + parseNumber(art61c2) + parseNumber(art61c2bis) + parseNumber(art61c2ter);

  const totaleRisorse = sommaRisorseStabili + sommaRisorseVariabili;

  const totaleRisorseEffettive = totaleRisorse * (parseNumber(percentualeCopertura) / 100);

  const resetForm = () => {
    setArt3c6('');
    setArt58c1('');
    setArt60c1('');
    setArt60c3('');
    setArt60c5('');
    setArt56c1g('');
    setArt56c1h('');
    setArt56c1f('');
    setArt56c1i('');
    setArt8c3('');
    setArt61c2('');
    setArt61c2bis('');
    setArt61c2ter('');
    setArt61c3('');
    setPercentualeCopertura('100.00');
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            Fondo Segretario Comunale
          </h1>
        </div>

        <div className="space-y-6">
          {/* Risorse Stabili */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-xl">RISORSE STABILI</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 3 c. 6 CCNL del 01.03.2011
                    </label>
                    <Input
                      type="text"
                      value={art3c6}
                      onChange={(e) => setArt3c6(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>A seguito del conglobamento di cui al comma 5, con decorrenza dal 31.12.2009, i valori complessivi annui lordi, per tredici mensilità, della retribuzione di posizione dei segretari comunali e provinciali</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 58 c. 1 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art58c1}
                      onChange={(e) => setArt58c1(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Con decorrenza dal 1° gennaio 2021, i valori complessivi annui lordi, per tredici mensilità, della retribuzione di posizione (riportare il solo differenziale di aumento rispetto il CCNL precedente che non rileva ai fini del limite)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 60 c. 1 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art60c1}
                      onChange={(e) => setArt60c1(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>La retribuzione di posizione è erogata, in base alle classi demografiche degli enti, entro i seguenti valori minimi e massimi complessivi annui lordi per tredici mensilità</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 60 c. 3 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art60c3}
                      onChange={(e) => setArt60c3(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Nei comuni capoluogo, nelle province e nelle città metropolitane la soglia massima della retribuzione di posizione può essere autonomamente rideterminata fino al 15%</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 60 c. 5 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art60c5}
                      onChange={(e) => setArt60c5(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gli enti assicurano che la retribuzione di posizione non sia inferiore a quella stabilita nell'Ente per l'incarico dirigenziale più elevato in essere</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 56 c. 1 CCNL del 16.07.2024 - lett. g)
                    </label>
                    <Input
                      type="text"
                      value={art56c1g}
                      onChange={(e) => setArt56c1g(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Retribuzione aggiuntiva per sedi convenzionate, ove spettante (risorse che non rilevano sul limite del salario accessorio)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 56 c. 1 CCNL del 16.07.2024 - lett. h)
                    </label>
                    <Input
                      type="text"
                      value={art56c1h}
                      onChange={(e) => setArt56c1h(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Indennità di reggenza o supplenza ove spettante (risorse che non rilevano sul limite del salario accessorio)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-800">SOMMA RISORSE STABILI</span>
                    <span className="font-bold text-blue-900 text-lg">
                      {formatCurrency(sommaRisorseStabili)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risorse Variabili */}
          <Card className="shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-xl">RISORSE VARIABILI</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 56 c. 1 CCNL del 16.07.2024 - lett. f)
                    </label>
                    <Input
                      type="text"
                      value={art56c1f}
                      onChange={(e) => setArt56c1f(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Diritti di segreteria, ove spettanti in base alle vigenti disposizioni di legge in materia (risorse che non rilevano sul limite del salario accessorio)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 56 c. 1 CCNL del 16.07.2024 - lett. i)
                    </label>
                    <Input
                      type="text"
                      value={art56c1i}
                      onChange={(e) => setArt56c1i(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Altri compensi previsti da norme di legge (risorse che non rilevano sul limite del salario accessorio)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 8 c. 3 dl 13/2023 (PNRR)
                    </label>
                    <Input
                      type="text"
                      value={art8c3}
                      onChange={(e) => setArt8c3(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Per i segretari comunali e provinciali, incremento percentuale (in misura non superiore al 5 per cento) del trattamento accessorio oltre il limite di cui all'articolo 23, comma 2, del decreto legislativo 25 maggio 2017, n. 75</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 61 c. 2 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art61c2}
                      onChange={(e) => setArt61c2(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gli enti destinano a tale compenso (retribuzione di risultato), un importo non superiore al 10% del monte salari erogato a ciascun segretario nell'anno a cui è riferita la valutazione</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 61 c. 2-bis CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art61c2bis}
                      onChange={(e) => setArt61c2bis(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gli enti possono elevare fino al 15% il limite percentuale di cui al comma 2, nei casi di segretari di enti con dirigenza, enti privi di dirigenza con incarico apicale temporaneo, segretari di Unioni di comuni, enti interessati da calamità naturali</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 61 c. 2-ter CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art61c2ter}
                      onChange={(e) => setArt61c2ter(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>I limiti di cui ai commi 2 e 2-bis possono essere superati negli enti metropolitani, qualora sia valutata l'esigenza di un allineamento rispetto alle retribuzioni complessive di livello più elevato corrisposte alla dirigenza dell'ente</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Art. 61 c. 3 CCNL del 16.07.2024
                    </label>
                    <Input
                      type="text"
                      value={art61c3}
                      onChange={(e) => setArt61c3(e.target.value)}
                      placeholder="€ 0,00"
                      className="font-mono"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>In attuazione di quanto previsto dall'art. 1, comma 604 della L. n. 234/2021 (Legge di bilancio 2022), le amministrazioni possono incrementare le risorse di cui al comma 2 (retribuzione di risultato), di un importo non superiore allo 0,22% del monte salari 2018 relativo ai segretari comunali e provinciali</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-800">SOMMA RISORSE VARIABILI</span>
                    <span className="font-bold text-green-900 text-lg">
                      {formatCurrency(sommaRisorseVariabili)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Totali */}
          <Card className="shadow-lg">
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle className="text-xl">RIEPILOGO TOTALI</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-800">Totale risorse che rilevano ai fini del limite del salario accessorio</span>
                    <span className="font-bold text-purple-900 text-lg">
                      {formatCurrency(totaleRisorseConLimite)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">TOTALE RISORSE</span>
                    <span className="font-bold text-gray-900 text-lg">
                      {formatCurrency(totaleRisorse)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentuale di copertura del posto di Segretario a carico dell'Ente nell'anno di riferimento
                    </label>
                    <Input
                      type="text"
                      value={percentualeCopertura}
                      onChange={(e) => setPercentualeCopertura(e.target.value)}
                      placeholder="100,00%"
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-yellow-800">TOTALE RISORSE EFFETTIVAMENTE DISPONIBILI</span>
                    <span className="font-bold text-yellow-900 text-xl">
                      {formatCurrency(totaleRisorseEffettive)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pulsante Reset */}
          <div className="flex justify-center">
            <Button onClick={resetForm} variant="outline" size="lg">
              Azzera tutti i campi
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FondoSegretarioComunale;
