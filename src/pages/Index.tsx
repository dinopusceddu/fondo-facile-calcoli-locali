
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Stato per le risorse umane
  const [personaleDirigente, setPersonaleDirigente] = useState<number>(0);
  const [personaleNonDirigente, setPersonaleNonDirigente] = useState<number>(0);
  
  // Stato per i fondi contrattuali
  const [art76c6, setArt76c6] = useState<number>(0);
  const [art77c2, setArt77c2] = useState<number>(0);
  const [art78c3, setArt78c3] = useState<number>(0);
  const [art79c1, setArt79c1] = useState<number>(0);
  const [art79c4, setArt79c4] = useState<number>(0);
  
  // Stato per eventuali altre risorse
  const [fondoRiserva, setFondoRiserva] = useState<number>(0);
  const [risorseDecentralizzate, setRisorseDecentralizzate] = useState<number>(0);
  
  // Stato per i risultati
  const [totaleRisorseUmane, setTotaleRisorseUmane] = useState<number>(0);
  const [totaleFondiContrattuali, setTotaleFondiContrattuali] = useState<number>(0);
  const [totaleAltreRisorse, setTotaleAltreRisorse] = useState<number>(0);
  const [totaleGenerale, setTotaleGenerale] = useState<number>(0);

  // Calcola automaticamente il totale delle risorse umane
  useEffect(() => {
    const totaleUmane = personaleDirigente + personaleNonDirigente;
    setTotaleRisorseUmane(totaleUmane);
  }, [personaleDirigente, personaleNonDirigente]);

  // Calcola automaticamente il totale dei fondi contrattuali
  useEffect(() => {
    const totaleFondi = art76c6 + art77c2 + art78c3 + art79c1 + art79c4;
    setTotaleFondiContrattuali(totaleFondi);
  }, [art76c6, art77c2, art78c3, art79c1, art79c4]);

  // Calcola automaticamente il totale delle altre risorse
  useEffect(() => {
    const totaleAltre = fondoRiserva + risorseDecentralizzate;
    setTotaleAltreRisorse(totaleAltre);
  }, [fondoRiserva, risorseDecentralizzate]);

  // Calcola automaticamente il totale generale
  useEffect(() => {
    const totale = totaleRisorseUmane + totaleFondiContrattuali + totaleAltreRisorse;
    setTotaleGenerale(totale);
  }, [totaleRisorseUmane, totaleFondiContrattuali, totaleAltreRisorse]);

  // Funzione per formattare i numeri in valuta
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-end mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/elevate-qualificazioni')}
            className="flex items-center gap-2"
          >
            Elevate Qualificazioni
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fondo Risorse Decentrate
          </h1>
          <p className="text-gray-600">
            Calcolo delle risorse disponibili per il personale
          </p>
        </div>

        <div className="grid gap-6">
          {/* Risorse Umane */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Risorse Umane</CardTitle>
              <CardDescription>Dettaglio delle risorse destinate al personale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="personaleDirigente">Personale Dirigente</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Importo totale delle risorse destinate al personale dirigente</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="personaleDirigente"
                    type="number"
                    value={personaleDirigente || ''}
                    onChange={(e) => setPersonaleDirigente(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="personaleNonDirigente">Personale Non Dirigente</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Importo totale delle risorse destinate al personale non dirigente</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="personaleNonDirigente"
                    type="number"
                    value={personaleNonDirigente || ''}
                    onChange={(e) => setPersonaleNonDirigente(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold">TOTALE RISORSE UMANE</span>
                <span className="text-xl font-bold text-blue-700">
                  {formatCurrency(totaleRisorseUmane)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Fondi Contrattuali */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Fondi Contrattuali</CardTitle>
              <CardDescription>Dettaglio dei fondi derivanti dalla contrattazione</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art76c6">Art. 76 c. 6 CCNL 2019/2021</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Risorse art. 76 c. 6 CCNL 2019/2021</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art76c6"
                    type="number"
                    value={art76c6 || ''}
                    onChange={(e) => setArt76c6(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art77c2">Art. 77 c. 2 CCNL 2019/2021</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Risorse art. 77 c. 2 CCNL 2019/2021</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art77c2"
                    type="number"
                    value={art77c2 || ''}
                    onChange={(e) => setArt77c2(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art78c3">Art. 78 c. 3 CCNL 2019/2021</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Risorse art. 78 c. 3 CCNL 2019/2021</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art78c3"
                    type="number"
                    value={art78c3 || ''}
                    onChange={(e) => setArt78c3(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art79c1">Art. 79 c. 1 CCNL 2019/2021</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Risorse art. 79 c. 1 CCNL 2019/2021</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art79c1"
                    type="number"
                    value={art79c1 || ''}
                    onChange={(e) => setArt79c1(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="art79c4">Art. 79 c. 4 CCNL 2019/2021</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Risorse art. 79 c. 4 CCNL 2019/2021</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="art79c4"
                    type="number"
                    value={art79c4 || ''}
                    onChange={(e) => setArt79c4(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-semibold">TOTALE FONDI CONTRATTUALI</span>
                <span className="text-xl font-bold text-green-700">
                  {formatCurrency(totaleFondiContrattuali)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Altre Risorse */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">Altre Risorse</CardTitle>
              <CardDescription>Eventuali altre risorse disponibili</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="fondoRiserva">Fondo di Riserva</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Importo del fondo di riserva utilizzabile</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="fondoRiserva"
                    type="number"
                    value={fondoRiserva || ''}
                    onChange={(e) => setFondoRiserva(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="risorseDecentralizzate">Risorse Decentrate</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Importo delle risorse decentrate disponibili</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="risorseDecentralizzate"
                    type="number"
                    value={risorseDecentralizzate || ''}
                    onChange={(e) => setRisorseDecentralizzate(Number(e.target.value) || 0)}
                    placeholder="€ 0"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="font-semibold">TOTALE ALTRE RISORSE</span>
                <span className="text-xl font-bold text-purple-700">
                  {formatCurrency(totaleAltreRisorse)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Totale Generale */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">Totale Generale</CardTitle>
              <CardDescription>
                Riepilogo del calcolo finale delle risorse disponibili
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Risorse Umane:</span>
                  <span className="font-medium">{formatCurrency(totaleRisorseUmane)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fondi Contrattuali:</span>
                  <span className="font-medium">{formatCurrency(totaleFondiContrattuali)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Altre Risorse:</span>
                  <span className="font-medium">{formatCurrency(totaleAltreRisorse)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTALE:</span>
                  <span>{formatCurrency(totaleGenerale)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;

