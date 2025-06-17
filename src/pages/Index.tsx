
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // FONTI DI FINANZIAMENTO STABILI
  const [art79c1_unico, setArt79c1_unico] = useState<number>(0);
  const [art79c1_alte, setArt79c1_alte] = useState<number>(0);
  const [art79c1_incremento83, setArt79c1_incremento83] = useState<number>(0);
  const [art79c1_incrementiStip, setArt79c1_incrementiStip] = useState<number>(0);
  const [art79c1_integrazione, setArt79c1_integrazione] = useState<number>(0);
  const [art79c1_riassorbite, setArt79c1_riassorbite] = useState<number>(0);
  const [art79c1_trasferiti, setArt79c1_trasferiti] = useState<number>(0);
  const [art79c1_regioni, setArt79c1_regioni] = useState<number>(0);
  const [art79c1_straordinario, setArt79c1_straordinario] = useState<number>(0);
  const [taglioFondo, setTaglioFondo] = useState<number>(0);
  const [riduzioni, setRiduzioni] = useState<number>(0);
  const [art67decurtazione, setArt67decurtazione] = useState<number>(0);
  const [art79c1b_8450, setArt79c1b_8450] = useState<number>(0);
  const [art79c1c_incremento, setArt79c1c_incremento] = useState<number>(0);
  const [art79c1d_differenziali, setArt79c1d_differenziali] = useState<number>(0);
  const [art79c1bis_b3d3, setArt79c1bis_b3d3] = useState<number>(0);

  // FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE
  const [art4_evasione, setArt4_evasione] = useState<number>(0);
  const [art4_integrazione, setArt4_integrazione] = useState<number>(0);
  const [art67_casinoPersonale, setArt67_casinoPersonale] = useState<number>(0);
  const [art79c2b_12perc, setArt79c2b_12perc] = useState<number>(0);
  const [art67_integrazione62, setArt67_integrazione62] = useState<number>(0);
  const [art79c2c_adeguamento, setArt79c2c_adeguamento] = useState<number>(0);

  // CALCOLO DEL RISPETTO DEI LIMITI
  const [art23_decurtazione, setArt23_decurtazione] = useState<number>(0);

  // FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE
  const [art15_sponsorizzazioni, setArt15_sponsorizzazioni] = useState<number>(0);
  const [art54_notificazioni, setArt54_notificazioni] = useState<number>(0);
  const [art15_razionalizzazione, setArt15_razionalizzazione] = useState<number>(0);
  const [art15_incentivi, setArt15_incentivi] = useState<number>(0);
  const [art18_spese, setArt18_spese] = useState<number>(0);
  const [art15_risparmi, setArt15_risparmi] = useState<number>(0);
  const [art67_regioni, setArt67_regioni] = useState<number>(0);
  const [art80_nonUtilizzate, setArt80_nonUtilizzate] = useState<number>(0);
  const [legge145_imu, setLegge145_imu] = useState<number>(0);
  const [legge178_buoni, setLegge178_buoni] = useState<number>(0);
  const [dl135_assunzioni, setDl135_assunzioni] = useState<number>(0);
  const [art79c3_022perc, setArt79c3_022perc] = useState<number>(0);
  const [art79c1b_tantum, setArt79c1b_tantum] = useState<number>(0);
  const [art79c3_tantum, setArt79c3_tantum] = useState<number>(0);
  const [dl13_pnrr, setDl13_pnrr] = useState<number>(0);

  // Altri campi
  const [art33_incremento, setArt33_incremento] = useState<number>(0);
  const [art4dl16_vincoli, setArt4dl16_vincoli] = useState<number>(0);

  // Calcoli
  const sommaRisorseStabili = art79c1_unico + art79c1_alte + art79c1_incremento83 + art79c1_incrementiStip + 
    art79c1_integrazione + art79c1_riassorbite + art79c1_trasferiti + art79c1_regioni + art79c1_straordinario +
    taglioFondo + riduzioni + art67decurtazione + art79c1b_8450 + art79c1c_incremento + art79c1d_differenziali + art79c1bis_b3d3;

  const sommaRisorseVariabiliSoggette = art4_evasione + art4_integrazione + art67_casinoPersonale + 
    art79c2b_12perc + art67_integrazione62 + art79c2c_adeguamento;

  const totaleParziale = sommaRisorseStabili + sommaRisorseVariabiliSoggette;

  const sommaRisorseVariabiliNonSoggette = art15_sponsorizzazioni + art54_notificazioni + art15_razionalizzazione +
    art15_incentivi + art18_spese + art15_risparmi + art67_regioni + art80_nonUtilizzate + legge145_imu +
    legge178_buoni + dl135_assunzioni + art79c3_022perc + art79c1b_tantum + art79c3_tantum + dl13_pnrr;

  const totaleRisorseEffettivamente = sommaRisorseStabili + sommaRisorseVariabiliSoggette + art23_decurtazione + 
    sommaRisorseVariabiliNonSoggette + art33_incremento + art4dl16_vincoli;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
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

          {/* FONTI DI FINANZIAMENTO STABILI */}
          <Card className="shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Fonti di Finanziamento Stabili
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse stabili disponibili per il fondo</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Unico importo fondo salario accessorio consolidato 2017</Label>
                  <Input
                    type="number"
                    value={art79c1_unico || ''}
                    onChange={(e) => setArt79c1_unico(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Alte professionalità 0,20% monte salari 2001</Label>
                  <Input
                    type="number"
                    value={art79c1_alte || ''}
                    onChange={(e) => setArt79c1_alte(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Incremento di 83,20 per unità personale</Label>
                  <Input
                    type="number"
                    value={art79c1_incremento83 || ''}
                    onChange={(e) => setArt79c1_incremento83(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Incrementi stipendiali differenziali</Label>
                  <Input
                    type="number"
                    value={art79c1_incrementiStip || ''}
                    onChange={(e) => setArt79c1_incrementiStip(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Integrazione risorse retribuzione individuale anzianità</Label>
                  <Input
                    type="number"
                    value={art79c1_integrazione || ''}
                    onChange={(e) => setArt79c1_integrazione(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Eventuali risorse riassorbite</Label>
                  <Input
                    type="number"
                    value={art79c1_riassorbite || ''}
                    onChange={(e) => setArt79c1_riassorbite(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Somme personale trasferito</Label>
                  <Input
                    type="number"
                    value={art79c1_trasferiti || ''}
                    onChange={(e) => setArt79c1_trasferiti(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Regioni quota minori oneri</Label>
                  <Input
                    type="number"
                    value={art79c1_regioni || ''}
                    onChange={(e) => setArt79c1_regioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 CCNL 2022 - Riduzione stabile straordinario</Label>
                  <Input
                    type="number"
                    value={art79c1_straordinario || ''}
                    onChange={(e) => setArt79c1_straordinario(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Eventuale taglio fondo storicizzato Art. 9 D.L. 78/2010</Label>
                  <Input
                    type="number"
                    value={taglioFondo || ''}
                    onChange={(e) => setTaglioFondo(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Eventuali riduzioni fondo personale ATA, posizioni organizzative</Label>
                  <Input
                    type="number"
                    value={riduzioni || ''}
                    onChange={(e) => setRiduzioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 67 c. 1 CCNL 2018 - Decurtazione fondo posizioni organizzative</Label>
                  <Input
                    type="number"
                    value={art67decurtazione || ''}
                    onChange={(e) => setArt67decurtazione(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 lett. b) CCNL 2022 - Euro 84,50 per unità</Label>
                  <Input
                    type="number"
                    value={art79c1b_8450 || ''}
                    onChange={(e) => setArt79c1b_8450(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 lett. c) CCNL 2022 - Incremento stabile consistenza personale</Label>
                  <Input
                    type="number"
                    value={art79c1c_incremento || ''}
                    onChange={(e) => setArt79c1c_incremento(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 lett. d) CCNL 2022 - Differenziali stipendiali 2022</Label>
                  <Input
                    type="number"
                    value={art79c1d_differenziali || ''}
                    onChange={(e) => setArt79c1d_differenziali(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1-bis CCNL 2022 - Differenze stipendiali B3 e D3</Label>
                  <Input
                    type="number"
                    value={art79c1bis_b3d3 || ''}
                    onChange={(e) => setArt79c1bis_b3d3(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Somma Risorse Stabili:</span>
                  <span className="text-green-600">€ {sommaRisorseStabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE */}
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Fonti di Finanziamento Variabili Soggette al Limite
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse variabili soggette ai limiti normativi</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 4 CCNL 2001 - Risorse da recupero evasione ICI</Label>
                  <Input
                    type="number"
                    value={art4_evasione || ''}
                    onChange={(e) => setArt4_evasione(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 4 CCNL 2001 - Integrazione risorse retribuzione individuale</Label>
                  <Input
                    type="number"
                    value={art4_integrazione || ''}
                    onChange={(e) => setArt4_integrazione(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 67 CCNL 2018 - Risorse personale case da gioco</Label>
                  <Input
                    type="number"
                    value={art67_casinoPersonale || ''}
                    onChange={(e) => setArt67_casinoPersonale(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 2 lett. b) CCNL 2022 - 1,2% monte salari 1997</Label>
                  <Input
                    type="number"
                    value={art79c2b_12perc || ''}
                    onChange={(e) => setArt79c2b_12perc(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 67 CCNL 2018 - Integrazione art. 62 personale trasferito</Label>
                  <Input
                    type="number"
                    value={art67_integrazione62 || ''}
                    onChange={(e) => setArt67_integrazione62(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 2 lett. c) CCNL 2022 - Risorse adeguamento disponibilità</Label>
                  <Input
                    type="number"
                    value={art79c2c_adeguamento || ''}
                    onChange={(e) => setArt79c2c_adeguamento(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Somma Risorse Variabili Soggette al Limite:</span>
                  <span className="text-orange-600">€ {sommaRisorseVariabiliSoggette.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CALCOLO DEL RISPETTO DEI LIMITI */}
          <Card className="shadow-lg">
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle>Calcolo del Rispetto dei Limiti del Salario Accessorio</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span>Totale parziale risorse disponibili per confronto con tetto 2016:</span>
                <span className="font-semibold text-purple-600">€ {totaleParziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Art. 23 c. 2 dlgs 75/2017 - Eventuale decurtazione/incremento annuale rispetto tetto 2016</Label>
                <Input
                  type="number"
                  value={art23_decurtazione || ''}
                  onChange={(e) => setArt23_decurtazione(Number(e.target.value) || 0)}
                  placeholder="0,00"
                  className="text-right"
                />
              </div>
            </CardContent>
          </Card>

          {/* FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                Fonti di Finanziamento Variabili Non Soggette al Limite
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Risorse variabili non soggette ai limiti normativi</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 15 CCNL 1999 - Sponsorizzazioni e contributi utenza</Label>
                  <Input
                    type="number"
                    value={art15_sponsorizzazioni || ''}
                    onChange={(e) => setArt15_sponsorizzazioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 54 CCNL 2000 - Rimborso spese notificazioni</Label>
                  <Input
                    type="number"
                    value={art54_notificazioni || ''}
                    onChange={(e) => setArt54_notificazioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 15 DL 98/2011 - Piani razionalizzazione e riqualificazione</Label>
                  <Input
                    type="number"
                    value={art15_razionalizzazione || ''}
                    onChange={(e) => setArt15_razionalizzazione(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 15 CCNL 1998 - Incentivi funzioni tecniche</Label>
                  <Input
                    type="number"
                    value={art15_incentivi || ''}
                    onChange={(e) => setArt15_incentivi(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 18 CCNL 2018 - Incentivi spese giudizio e compensi</Label>
                  <Input
                    type="number"
                    value={art18_spese || ''}
                    onChange={(e) => setArt18_spese(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 15 CCNL 1999 - Risparmi da disciplina straordinario</Label>
                  <Input
                    type="number"
                    value={art15_risparmi || ''}
                    onChange={(e) => setArt15_risparmi(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 67 CCNL 2018 - Regioni e Città Metropolitane</Label>
                  <Input
                    type="number"
                    value={art67_regioni || ''}
                    onChange={(e) => setArt67_regioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 80 CCNL 2022 - Somme non utilizzate esercizi precedenti</Label>
                  <Input
                    type="number"
                    value={art80_nonUtilizzate || ''}
                    onChange={(e) => setArt80_nonUtilizzate(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Legge 145/2018 - Incentivi IMU e TARI</Label>
                  <Input
                    type="number"
                    value={legge145_imu || ''}
                    onChange={(e) => setLegge145_imu(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Legge 178/2020 - Risparmi buoni pasto 2020</Label>
                  <Input
                    type="number"
                    value={legge178_buoni || ''}
                    onChange={(e) => setLegge178_buoni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">DL 135/2018 - Risorse accessorie assunzioni in deroga</Label>
                  <Input
                    type="number"
                    value={dl135_assunzioni || ''}
                    onChange={(e) => setDl135_assunzioni(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 3 CCNL 2022 - 0,22% monte salari 2018</Label>
                  <Input
                    type="number"
                    value={art79c3_022perc || ''}
                    onChange={(e) => setArt79c3_022perc(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 1 lett. b) CCNL 2022 - Una tantum 2021-2022</Label>
                  <Input
                    type="number"
                    value={art79c1b_tantum || ''}
                    onChange={(e) => setArt79c1b_tantum(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 79 c. 3 CCNL 2022 - Una tantum 2022</Label>
                  <Input
                    type="number"
                    value={art79c3_tantum || ''}
                    onChange={(e) => setArt79c3_tantum(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">DL 13/2023 - Incremento per progetti PNRR</Label>
                  <Input
                    type="number"
                    value={dl13_pnrr || ''}
                    onChange={(e) => setDl13_pnrr(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Somma Risorse Variabili Non Soggette al Limite:</span>
                  <span className="text-blue-600">€ {sommaRisorseVariabiliNonSoggette.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ALTRI CAMPI E TOTALE FINALE */}
          <Card className="shadow-lg">
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Altri Elementi e Totale Finale</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Art. 4 DL 16/2014 - Misure conseguenti mancato rispetto vincoli finanziari</Label>
                  <Input
                    type="number"
                    value={art4dl16_vincoli || ''}
                    onChange={(e) => setArt4dl16_vincoli(Number(e.target.value) || 0)}
                    placeholder="0,00"
                    className="text-right"
                  />
                </div>
              </div>
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
      </div>
    </TooltipProvider>
  );
};

export default Index;
