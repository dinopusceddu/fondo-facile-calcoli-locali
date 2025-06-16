
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElevateQualificazioni = () => {
  const navigate = useNavigate();
  
  // Risorse Stabili
  const [art17c2, setArt17c2] = useState<number>(0);
  const [art17c3, setArt17c3] = useState<number>(0);
  const [art17c5, setArt17c5] = useState<number>(0);
  const [art23c5, setArt23c5] = useState<number>(0);
  
  // Risorse Variabili
  const [art17c4, setArt17c4] = useState<number>(0);
  const [art79c3, setArt79c3] = useState<number>(0);
  
  // Calcoli Finali
  const [art23c2, setArt23c2] = useState<number>(0);
  const [art33c2, setArt33c2] = useState<number>(0);
  
  // Somme calcolate
  const [sommaStabili, setSommaStabili] = useState<number>(0);
  const [sommaVariabili, setSommaVariabili] = useState<number>(0);
  const [totaleRisorse, setTotaleRisorse] = useState<number>(0);

  // Calcolo automatico delle somme
  useEffect(() => {
    const stabili = art17c2 + art17c3 + art17c5 + art23c5;
    setSommaStabili(stabili);
  }, [art17c2, art17c3, art17c5, art23c5]);

  useEffect(() => {
    const variabili = art17c4 + art79c3;
    setSommaVariabili(variabili);
  }, [art17c4, art79c3]);

  useEffect(() => {
    const totale = sommaStabili + sommaVariabili + art23c2 + art33c2;
    setTotaleRisorse(totale);
  }, [sommaStabili, sommaVariabili, art23c2, art33c2]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al Fondo Principale
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fondo Elevate Qualificazioni
          </h1>
          <p className="text-gray-600">
            Calcolo delle risorse disponibili per le Elevate Qualificazioni
          </p>
        </div>

        <div className="grid gap-6">
          {/* Risorse Stabili */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Risorse Stabili</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art17c2">Art. 17 c. 2 CCNL del 16.11.2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>L'importo della retribuzione di posizione varia da un minimo di € 5.000 ad un massimo di € 18.000 lordi per tredici mensilità</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art17c2"
                    type="number"
                    value={art17c2 || ''}
                    onChange={(e) => setArt17c2(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art17c3">Art. 17 c. 3 CCNL del 16.11.2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Nelle ipotesi considerate nell'art. 16, comma 4, l'importo varia da € 3.000 ad € 9.500 annui lordi per tredici mensilità</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art17c3"
                    type="number"
                    value={art17c3 || ''}
                    onChange={(e) => setArt17c3(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art17c5">Art. 17 c. 5 CCNL del 16.11.2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Conferimento ad interim: ulteriore importo dal 15% al 25% del valore economico della retribuzione di posizione</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art17c5"
                    type="number"
                    value={art17c5 || ''}
                    onChange={(e) => setArt17c5(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art23c5">Art. 23 c. 5 CCNL del 16.11.2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Maggiorazione per diverse sedi di lavoro: fino al 30% della retribuzione di posizione</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art23c5"
                    type="number"
                    value={art23c5 || ''}
                    onChange={(e) => setArt23c5(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold">SOMMA RISORSE STABILI</span>
                <span className="text-xl font-bold text-blue-700">
                  {formatCurrency(sommaStabili)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Risorse Variabili */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Risorse Variabili</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art17c4">Art. 17 c. 4 CCNL del 16.11.2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Retribuzione di risultato: quota non inferiore al 15% delle risorse complessive</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art17c4"
                    type="number"
                    value={art17c4 || ''}
                    onChange={(e) => setArt17c4(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art79c3">Art. 79 c. 3 CCNL 2022</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>0,22% del monte salari anno 2018 con decorrenza dal 01.01.2022</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art79c3"
                    type="number"
                    value={art79c3 || ''}
                    onChange={(e) => setArt79c3(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-semibold">SOMMA RISORSE VARIABILI</span>
                <span className="text-xl font-bold text-green-700">
                  {formatCurrency(sommaVariabili)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Calcoli Finali */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">Calcoli Finali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art23c2">Art. 23 c. 2 dlgs 75/2017</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Eventuale decurtazione o incremento annuale rispetto il tetto complessivo del salario accessorio dell'anno 2016</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art23c2"
                    type="number"
                    value={art23c2 || ''}
                    onChange={(e) => setArt23c2(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art33c2">Art. 33 c. 2 dl 34/2019</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Eventuale incremento salario accessorio in deroga realizzabile nell'anno</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art33c2"
                    type="number"
                    value={art33c2 || ''}
                    onChange={(e) => setArt33c2(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
                <span className="text-lg font-bold">TOTALE RISORSE EFFETTIVAMENTE DISPONIBILI</span>
                <span className="text-2xl font-bold text-purple-700">
                  {formatCurrency(totaleRisorse)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Riepilogo */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">Riepilogo Calcolo</CardTitle>
              <CardDescription>
                Dettaglio del calcolo finale delle risorse disponibili
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Risorse Stabili:</span>
                  <span className="font-medium">{formatCurrency(sommaStabili)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risorse Variabili:</span>
                  <span className="font-medium">{formatCurrency(sommaVariabili)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Art. 23 c. 2 dlgs 75/2017:</span>
                  <span className="font-medium">{formatCurrency(art23c2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Art. 33 c. 2 dl 34/2019:</span>
                  <span className="font-medium">{formatCurrency(art33c2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTALE:</span>
                  <span>{formatCurrency(totaleRisorse)}</span>
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
