import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [fondiStatali, setFondiStatali] = useState<number>(0);
  const [fondiRegionali, setFondiRegionali] = useState<number>(0);
  const [fondiEuropei, setFondiEuropei] = useState<number>(0);
  const [personaleArt3, setPersonaleArt3] = useState<number>(0);
  const [personaleArt90, setPersonaleArt90] = useState<number>(0);
  const [lavoroStraordinario, setLavoroStraordinario] = useState<number>(0);
  const [indennita, setIndennita] = useState<number>(0);
  const [premiProduttivita, setPremiProduttivita] = useState<number>(0);
  const [progressioniEconomiche, setProgressioniEconomiche] = useState<number>(0);
  const [altriInterventi, setAltriInterventi] = useState<number>(0);

  const navigate = useNavigate();

  const totaleFondiAggiuntivi = fondiStatali + fondiRegionali + fondiEuropei;
  const totaleUtilizzi = personaleArt3 + personaleArt90 + lavoroStraordinario + indennita + premiProduttivita + progressioniEconomiche + altriInterventi;
  const totaleEffettivamenteDisponibile = totaleFondiAggiuntivi - totaleUtilizzi;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Calcolo Fondo Risorse Decentrate</h1>
            <p className="text-lg text-gray-600">
              Strumento per il calcolo delle risorse disponibili per il personale
            </p>
            <Button
              onClick={() => navigate('/elevate-qualificazioni')}
              variant="outline"
              className="mt-4"
            >
              Vai alle Elevate Qualificazioni
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Fondi Aggiuntivi
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse aggiuntive disponibili per il personale</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Inserisci gli importi dei fondi aggiuntivi disponibili
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fondiStatali" className="text-sm font-medium">
                    Fondi Statali
                  </Label>
                  <Input
                    id="fondiStatali"
                    type="number"
                    value={fondiStatali || ''}
                    onChange={(e) => setFondiStatali(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fondiRegionali" className="text-sm font-medium">
                    Fondi Regionali
                  </Label>
                  <Input
                    id="fondiRegionali"
                    type="number"
                    value={fondiRegionali || ''}
                    onChange={(e) => setFondiRegionali(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fondiEuropei" className="text-sm font-medium">
                    Fondi Europei
                  </Label>
                  <Input
                    id="fondiEuropei"
                    type="number"
                    value={fondiEuropei || ''}
                    onChange={(e) => setFondiEuropei(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Totale Fondi Aggiuntivi:</span>
                  <span className="text-blue-600">€ {totaleFondiAggiuntivi.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Utilizzi del Fondo
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Spese e utilizzi delle risorse del fondo</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="text-red-100">
                Inserisci gli importi delle spese previste
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personaleArt3" className="text-sm font-medium">
                    Personale Art. 3
                  </Label>
                  <Input
                    id="personaleArt3"
                    type="number"
                    value={personaleArt3 || ''}
                    onChange={(e) => setPersonaleArt3(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personaleArt90" className="text-sm font-medium">
                    Personale Art. 90
                  </Label>
                  <Input
                    id="personaleArt90"
                    type="number"
                    value={personaleArt90 || ''}
                    onChange={(e) => setPersonaleArt90(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lavoroStraordinario" className="text-sm font-medium">
                    Lavoro Straordinario
                  </Label>
                  <Input
                    id="lavoroStraordinario"
                    type="number"
                    value={lavoroStraordinario || ''}
                    onChange={(e) => setLavoroStraordinario(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indennita" className="text-sm font-medium">
                    Indennità
                  </Label>
                  <Input
                    id="indennita"
                    type="number"
                    value={indennita || ''}
                    onChange={(e) => setIndennita(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premiProduttivita" className="text-sm font-medium">
                    Premi di Produttività
                  </Label>
                  <Input
                    id="premiProduttivita"
                    type="number"
                    value={premiProduttivita || ''}
                    onChange={(e) => setPremiProduttivita(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progressioniEconomiche" className="text-sm font-medium">
                    Progressioni Economiche
                  </Label>
                  <Input
                    id="progressioniEconomiche"
                    type="number"
                    value={progressioniEconomiche || ''}
                    onChange={(e) => setProgressioniEconomiche(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="altriInterventi" className="text-sm font-medium">
                    Altri Interventi
                  </Label>
                  <Input
                    id="altriInterventi"
                    type="number"
                    value={altriInterventi || ''}
                    onChange={(e) => setAltriInterventi(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Totale Utilizzi:</span>
                  <span className="text-red-600">€ {totaleUtilizzi.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardTitle className="text-xl">Risultato Finale</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span>Totale Fondi Aggiuntivi:</span>
                  <span className="font-semibold text-blue-600">€ {totaleFondiAggiuntivi.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>Totale Utilizzi:</span>
                  <span className="font-semibold text-red-600">€ {totaleUtilizzi.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Risorse Effettivamente Disponibili:</span>
                    <span className={`${totaleEffettivamenteDisponibile >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      € {totaleEffettivamenteDisponibile.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
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

export default Index;
