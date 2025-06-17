
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FondoDirigenza = () => {
  const navigate = useNavigate();

  // RISORSE STABILI
  const [art57c2a_unico, setArt57c2a_unico] = useState<number>(0);
  const [art57c2a_ria, setArt57c2a_ria] = useState<number>(0);
  const [art56c1_incremento, setArt56c1_incremento] = useState<number>(0);
  const [art57c2c_anzianita, setArt57c2c_anzianita] = useState<number>(0);
  const [art57c2e_risorse, setArt57c2e_risorse] = useState<number>(0);
  const [art39c1_201perc, setArt39c1_201perc] = useState<number>(0);

  // RISORSE VARIABILI
  const [art57c2b_disposizioni, setArt57c2b_disposizioni] = useState<number>(0);
  const [art57c2d_onnicomprensivita, setArt57c2d_onnicomprensivita] = useState<number>(0);
  const [art57c2e_variabili, setArt57c2e_variabili] = useState<number>(0);
  const [art57c3_residui, setArt57c3_residui] = useState<number>(0);
  const [dl13_pnrr, setDl13_pnrr] = useState<number>(0);
  const [art39c1_046perc, setArt39c1_046perc] = useState<number>(0);
  const [art39c1_201perc_recupero, setArt39c1_201perc_recupero] = useState<number>(0);
  const [art39c2_022perc, setArt39c2_022perc] = useState<number>(0);
  const [art33_incremento, setArt33_incremento] = useState<number>(0);

  // CALCOLO DEL RISPETTO DEI LIMITI
  const [art23_decurtazione, setArt23_decurtazione] = useState<number>(0);
  const [art4dl16_vincoli, setArt4dl16_vincoli] = useState<number>(0);

  // Calcoli
  const sommaRisorseStabili = art57c2a_unico + art57c2a_ria + art56c1_incremento + art57c2c_anzianita + 
    art57c2e_risorse + art39c1_201perc;

  const sommaRisorseVariabili = art57c2b_disposizioni + art57c2d_onnicomprensivita + art57c2e_variabili + 
    art57c3_residui + dl13_pnrr + art39c1_046perc + art39c1_201perc_recupero + art39c2_022perc + art33_incremento;

  const totaleParziale = sommaRisorseStabili + sommaRisorseVariabili;

  const totaleRisorseEffettivamente = totaleParziale + art23_decurtazione + art4dl16_vincoli;

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Fondo della Dirigenza - Calcolo CCNL 2024
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Fondo Risorse Decentrate
            </Button>
            <Button
              onClick={() => navigate('/elevate-qualificazioni')}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Elevate Qualificazioni
            </Button>
            <Button
              onClick={() => navigate('/fondo-segretario-comunale')}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Fondo Segretario Comunale
            </Button>
          </div>
        </div>

        {/* RISORSE STABILI */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              Risorse Stabili
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Risorse stabili disponibili per il fondo dirigenza</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. a) CCNL del 17.12.2020 - Unico importo annuale risorse certe e stabili destinate a retribuzione di posizione e di risultato</Label>
                <Input
                  type="number"
                  value={art57c2a_unico || ''}
                  onChange={(e) => setArt57c2a_unico(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. a) CCNL del 17.12.2020 - La RIA del personale dirigenziale cessato fino al 31 dicembre del 2020</Label>
                <Input
                  type="number"
                  value={art57c2a_ria || ''}
                  onChange={(e) => setArt57c2a_ria(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 56 c. 1 CCNL del 17.12.2020 - Incremento 1,53% sul monte salari anno 2015 dirigenti</Label>
                <Input
                  type="number"
                  value={art56c1_incremento || ''}
                  onChange={(e) => setArt56c1_incremento(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. c) CCNL del 17.12.2020 - Retribuzioni individuali di anzianità non più corrisposte</Label>
                <Input
                  type="number"
                  value={art57c2c_anzianita || ''}
                  onChange={(e) => setArt57c2c_anzianita(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. e) CCNL del 17.12.2020 - Risorse autonomamente stanziate dagli enti</Label>
                <Input
                  type="number"
                  value={art57c2e_risorse || ''}
                  onChange={(e) => setArt57c2e_risorse(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 39 c. 1 del CCNL del 16.07.2024 - Incremento 2,01% monte salari dirigenza anno 2018 dal 2021</Label>
                <Input
                  type="number"
                  value={art39c1_201perc || ''}
                  onChange={(e) => setArt39c1_201perc(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Somma Risorse Stabili:</span>
                <span className="text-purple-600">€ {sommaRisorseStabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RISORSE VARIABILI */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-pink-600 text-white">
            <CardTitle className="flex items-center gap-2">
              Risorse Variabili
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Risorse variabili per il fondo dirigenza</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. b) CCNL del 17.12.2020 - Risorse previste da disposizioni di legge</Label>
                <Input
                  type="number"
                  value={art57c2b_disposizioni || ''}
                  onChange={(e) => setArt57c2b_disposizioni(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. d) CCNL del 17.12.2020 - Somme dall'applicazione del principio di onnicomprensività</Label>
                <Input
                  type="number"
                  value={art57c2d_onnicomprensivita || ''}
                  onChange={(e) => setArt57c2d_onnicomprensivita(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 2 lett. e) CCNL del 17.12.2020 - Risorse autonomamente stanziate (variabili)</Label>
                <Input
                  type="number"
                  value={art57c2e_variabili || ''}
                  onChange={(e) => setArt57c2e_variabili(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 57 c. 3 CCNL del 17.12.2020 - Importi residui una tantum per retribuzione di risultato</Label>
                <Input
                  type="number"
                  value={art57c3_residui || ''}
                  onChange={(e) => setArt57c3_residui(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">DL 13/2023 art. 8 c. 3 - Incremento PNRR fino al 5% componente stabile</Label>
                <Input
                  type="number"
                  value={dl13_pnrr || ''}
                  onChange={(e) => setDl13_pnrr(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 39 c. 1 del CCNL del 16.07.2024 - Recupero incremento 0,46% monte salari 2018 anno 2020</Label>
                <Input
                  type="number"
                  value={art39c1_046perc || ''}
                  onChange={(e) => setArt39c1_046perc(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 39 c. 1 del CCNL del 16.07.2024 - Recupero incremento 2,01% monte salari 2018 anni 2021-2023</Label>
                <Input
                  type="number"
                  value={art39c1_201perc_recupero || ''}
                  onChange={(e) => setArt39c1_201perc_recupero(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 39 c. 2 del CCNL del 16.07.2024 - Incremento fino 0,22% monte salari 2018 valorizzazione personale</Label>
                <Input
                  type="number"
                  value={art39c2_022perc || ''}
                  onChange={(e) => setArt39c2_022perc(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 33 c. 2 dl 34/2019 - Eventuale incremento salario accessorio in deroga</Label>
                <Input
                  type="number"
                  value={art33_incremento || ''}
                  onChange={(e) => setArt33_incremento(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Somma Risorse Variabili:</span>
                <span className="text-pink-600">€ {sommaRisorseVariabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CALCOLO DEL RISPETTO DEI LIMITI */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-indigo-600 text-white">
            <CardTitle>Calcolo del Rispetto dei Limiti del Salario Accessorio</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>Totale parziale risorse disponibili per il fondo anno corrente:</span>
              <span className="font-semibold text-indigo-600">€ {totaleParziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 23 c. 2 dlgs 75/2017 - Eventuale decurtazione o aumento annuale rispetto il tetto 2016</Label>
                <Input
                  type="number"
                  value={art23_decurtazione || ''}
                  onChange={(e) => setArt23_decurtazione(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 4 DL 16/2014 - Misure conseguenti al mancato rispetto di vincoli finanziari</Label>
                <Input
                  type="number"
                  value={art4dl16_vincoli || ''}
                  onChange={(e) => setArt4dl16_vincoli(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TOTALE FINALE */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle>Totale Finale</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Totale Risorse Effettivamente Disponibili:</span>
                <span className={`${totaleRisorseEffettivamente >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  € {totaleRisorseEffettivamente.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default FondoDirigenza;
