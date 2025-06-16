import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

const Index = () => {
  // Input States - Dati Generali
  const [annoRiferimento, setAnnoRiferimento] = useState<number>(2024);
  const [monteSalari2018, setMonteSalari2018] = useState<number>(0);
  const [numeroDipendenti, setNumeroDipendenti] = useState<number>(0);
  const [mesiDecorrenza, setMesiDecorrenza] = useState<number>(12);
  const [trattamentoAccessorio2016, setTrattamentoAccessorio2016] = useState<number>(0);

  // Input States - Risorse Decentrate Escluse dal Limite del Salario Accessorio
  const [riseSpecifciDisposizioni, setRiseSpecificiDisposizioni] = useState<number>(0);
  const [risContributoEntiTerziProgetti, setRisContributoEntiTerziProgetti] = useState<number>(0);
  const [risPerfezioneProfessionale, setRisPerfezioneProfessionale] = useState<number>(0);
  const [trasferimentoPersonale, setTrasferimentoPersonale] = useState<number>(0);
  const [riseIntegrativeL125, setRiseIntegrativeL125] = useState<number>(0);
  const [risorseSegreteria, setRisorseSegreteria] = useState<number>(0);
  const [incentivazioni2018, setIncentivazioni2018] = useState<number>(0);

  // Input States - Incrementi Soggetti al Limite del Salario Accessorio
  const [incCCNL2018, setIncCCNL2018] = useState<number>(0);
  const [incCCNL2022, setIncCCNL2022] = useState<number>(0);
  const [incLimiteDecentrato, setIncLimiteDecentrato] = useState<number>(0);

  // Input States - Soggette al Limite (Parte Stabile)
  const [valoreConsolidato, setValoreConsolidato] = useState<number>(0);
  const [incrementiCCNLPrecedenti, setIncrementiCCNLPrecedenti] = useState<number>(0);
  const [assegniAdPersonam, setAssegniAdPersonam] = useState<number>(0);
  const [dipendentiCessati, setDipendentiCessati] = useState<number>(0);
  const [retribuzioneMediaCessati, setRetribuzioneMediaCessati] = useState<number>(0);

  // Incrementi e Rimodulazione Fondo ex art. 79, c. 2 - VARIABILI
  const [economieFondo, setEconomieFondo] = useState<number>(0);
  const [risorseNuoviServizi, setRisorseNuoviServizi] = useState<number>(0);
  const [proventiSponsorizz, setProventiSponsorizz] = useState<number>(0);
  const [contributiEntiTerzi, setContributiEntiTerzi] = useState<number>(0);
  const [risorseRecuperoEvasione, setRisorseRecuperoEvasione] = useState<number>(0);
  const [proventiDirittiSegreteria, setProventiDirittiSegreteria] = useState<number>(0);
  const [risorseL125, setRisorseL125] = useState<number>(0);
  const [proventiCondoniEdilizi, setProventiCondoniEdilizi] = useState<number>(0);
  const [specificheDisposizioni, setSpecificheDisposizioni] = useState<number>(0);
  const [risorsePerformanceOrg, setRisorsePerformanceOrg] = useState<number>(0);
  const [risorseL145, setRisorseL145] = useState<number>(0);

  // Incrementi Finanziamento Fondo ex art. 80
  const [risorseProgressioni, setRisorseProgressioni] = useState<number>(0);
  const [risorseEfficientamento, setRisorseEfficientamento] = useState<number>(0);
  const [risorseFlessioneOrario, setRisorseFlessioneOrario] = useState<number>(0);
  const [altreRisorseIncremento, setAltreRisorseIncremento] = useState<number>(0);

  // Copertura Finanziaria
  const [risorseTitolo1, setRisorseTitolo1] = useState<number>(0);
  const [risorseCapitolo, setRisorseCapitolo] = useState<number>(0);
  const [risorseSuperifici, setRisorseSuperifici] = useState<number>(0);
  const [risorseFondiEuropei, setRisorseFondiEuropei] = useState<number>(0);

  // Fondi Speciali per Specifiche Destinazioni
  const [fondoLavoriUBS, setFondoLavoriUBS] = useState<number>(0);
  const [fondoAltriLavori, setFondoAltriLavori] = useState<number>(0);
  const [specificheDestinazioni, setSpecificheDestinazioni] = useState<number>(0);

  // Calculated Values
  const [risultati, setRisultati] = useState({
    escluse: {
      specificiDisposizioni: 0,
      contributiEntiTerzi: 0,
      perfezioneProfessionale: 0,
      trasferimenti: 0,
      integrative: 0,
      segreteria: 0,
      incentivazioni: 0,
      totale: 0
    },
    incrementiSoggetti: {
      ccnl2018: 0,
      ccnl2022: 0,
      limiteDecentrato: 0,
      totale: 0
    },
    soggette: {
      valoreConsolidato: 0,
      incrementiCCNL: 0,
      assegniAdPersonam: 0,
      risorseCessazioni: 0,
      totale: 0
    },
    variabili: {
      economie: 0,
      nuoviServizi: 0,
      sponsorizzazioni: 0,
      entiTerzi: 0,
      recuperoEvasione: 0,
      dirittiSegreteria: 0,
      risorseL125: 0,
      condoniEdilizi: 0,
      specificheDisp: 0,
      performanceOrg: 0,
      risorseL145: 0,
      totale: 0
    },
    incrementi: {
      incrementoPersonale: 0,
      incrementoMonteSalari: 0,
      progressioni: 0,
      efficientamento: 0,
      flessione: 0,
      altreRisorse: 0,
      totale: 0
    },
    copertura: {
      titolo1: 0,
      capitolo: 0,
      superifici: 0,
      fondiEuropei: 0,
      totale: 0
    },
    fondiSpeciali: {
      lavoriUBS: 0,
      altriLavori: 0,
      specifiche: 0,
      totale: 0
    },
    totaleFondo: 0,
    totaleArt23: 0,
    limiteTetto: 0,
    sforamento: 0,
    disponibilita: 0,
    rispettaLimite: true
  });

  // Utility function for currency formatting
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Main calculation function
  const calcolaRisultati = () => {
    // Calcoli Risorse Escluse dal Limite
    const totaleEscluse = riseSpecifciDisposizioni + risContributoEntiTerziProgetti + 
      risPerfezioneProfessionale + trasferimentoPersonale + riseIntegrativeL125 + 
      risorseSegreteria + incentivazioni2018;

    // Calcoli Incrementi Soggetti al Limite
    const totaleIncrementiSoggetti = incCCNL2018 + incCCNL2022 + incLimiteDecentrato;

    // Calcoli Soggette al Limite (Parte Stabile)
    const risorseCessazioni = dipendentiCessati * retribuzioneMediaCessati;
    const totaleSoggette = valoreConsolidato + incrementiCCNLPrecedenti + 
      assegniAdPersonam + risorseCessazioni;

    // Calcoli Parte Variabile
    const totaleVariabili = economieFondo + risorseNuoviServizi + proventiSponsorizz + 
      contributiEntiTerzi + risorseRecuperoEvasione + proventiDirittiSegreteria + 
      risorseL125 + proventiCondoniEdilizi + specificheDisposizioni + 
      risorsePerformanceOrg + risorseL145;

    // Calcoli Incrementi CCNL
    const incrementoPersonale = numeroDipendenti * 84.50 * (mesiDecorrenza / 12);
    const incrementoMonteSalari = monteSalari2018 * 0.0022;
    const totaleIncrementi = incrementoPersonale + incrementoMonteSalari + 
      risorseProgressioni + risorseEfficientamento + risorseFlessioneOrario + 
      altreRisorseIncremento;

    // Calcoli Copertura Finanziaria
    const totaleCopertura = risorseTitolo1 + risorseCapitolo + risorseSuperifici + 
      risorseFondiEuropei;

    // Calcoli Fondi Speciali
    const totaleFondiSpeciali = fondoLavoriUBS + fondoAltriLavori + specificheDestinazioni;

    // Calcoli Finali
    const totaleFondo = totaleEscluse + totaleIncrementiSoggetti + totaleSoggette + 
      totaleVariabili + totaleIncrementi + totaleCopertura + totaleFondiSpeciali;
    
    // Totale soggetto al limite art. 23 (escludendo le voci escluse)
    const totaleArt23 = totaleIncrementiSoggetti + totaleSoggette + totaleVariabili + 
      totaleIncrementi + totaleCopertura + totaleFondiSpeciali;
    
    const limiteTetto = trattamentoAccessorio2016;
    const sforamento = Math.max(0, totaleArt23 - limiteTetto);
    const disponibilita = Math.max(0, limiteTetto - totaleArt23);
    const rispettaLimite = totaleArt23 <= limiteTetto;

    setRisultati({
      escluse: {
        specificiDisposizioni: riseSpecifciDisposizioni,
        contributiEntiTerzi: risContributoEntiTerziProgetti,
        perfezioneProfessionale: risPerfezioneProfessionale,
        trasferimenti: trasferimentoPersonale,
        integrative: riseIntegrativeL125,
        segreteria: risorseSegreteria,
        incentivazioni: incentivazioni2018,
        totale: totaleEscluse
      },
      incrementiSoggetti: {
        ccnl2018: incCCNL2018,
        ccnl2022: incCCNL2022,
        limiteDecentrato: incLimiteDecentrato,
        totale: totaleIncrementiSoggetti
      },
      soggette: {
        valoreConsolidato,
        incrementiCCNL: incrementiCCNLPrecedenti,
        assegniAdPersonam,
        risorseCessazioni,
        totale: totaleSoggette
      },
      variabili: {
        economie: economieFondo,
        nuoviServizi: risorseNuoviServizi,
        sponsorizzazioni: proventiSponsorizz,
        entiTerzi: contributiEntiTerzi,
        recuperoEvasione: risorseRecuperoEvasione,
        dirittiSegreteria: proventiDirittiSegreteria,
        risorseL125,
        condoniEdilizi: proventiCondoniEdilizi,
        specificheDisp: specificheDisposizioni,
        performanceOrg: risorsePerformanceOrg,
        risorseL145,
        totale: totaleVariabili
      },
      incrementi: {
        incrementoPersonale,
        incrementoMonteSalari,
        progressioni: risorseProgressioni,
        efficientamento: risorseEfficientamento,
        flessione: risorseFlessioneOrario,
        altreRisorse: altreRisorseIncremento,
        totale: totaleIncrementi
      },
      copertura: {
        titolo1: risorseTitolo1,
        capitolo: risorseCapitolo,
        superifici: risorseSuperifici,
        fondiEuropei: risorseFondiEuropei,
        totale: totaleCopertura
      },
      fondiSpeciali: {
        lavoriUBS: fondoLavoriUBS,
        altriLavori: fondoAltriLavori,
        specifiche: specificheDestinazioni,
        totale: totaleFondiSpeciali
      },
      totaleFondo,
      totaleArt23,
      limiteTetto,
      sforamento,
      disponibilita,
      rispettaLimite
    });
  };

  // Recalculate when any input changes
  useEffect(() => {
    calcolaRisultati();
  }, [
    annoRiferimento, monteSalari2018, numeroDipendenti, mesiDecorrenza, trattamentoAccessorio2016,
    riseSpecifciDisposizioni, risContributoEntiTerziProgetti, risPerfezioneProfessionale,
    trasferimentoPersonale, riseIntegrativeL125, risorseSegreteria, incentivazioni2018,
    incCCNL2018, incCCNL2022, incLimiteDecentrato, valoreConsolidato, incrementiCCNLPrecedenti,
    assegniAdPersonam, dipendentiCessati, retribuzioneMediaCessati, economieFondo,
    risorseNuoviServizi, proventiSponsorizz, contributiEntiTerzi, risorseRecuperoEvasione,
    proventiDirittiSegreteria, risorseL125, proventiCondoniEdilizi, specificheDisposizioni,
    risorsePerformanceOrg, risorseL145, risorseProgressioni, risorseEfficientamento,
    risorseFlessioneOrario, altreRisorseIncremento, risorseTitolo1, risorseCapitolo,
    risorseSuperifici, risorseFondiEuropei, fondoLavoriUBS, fondoAltriLavori, specificheDestinazioni
  ]);

  const ResultRow = ({ description, reference, amount, isTotal = false, isExcluded = false }: {
    description: string;
    reference: string;
    amount: number;
    isTotal?: boolean;
    isExcluded?: boolean;
  }) => (
    <div className={`grid grid-cols-4 gap-4 py-2 ${isTotal ? 'border-t-2 border-gray-300 font-bold bg-gray-50' : ''} ${isExcluded ? 'bg-blue-50' : ''}`}>
      <div className="text-sm">{description}</div>
      <div className="text-xs text-gray-600">{reference}</div>
      <div className={`text-right font-mono ${isTotal ? 'text-lg font-bold' : ''}`}>
        {formatCurrency(amount)}
      </div>
      <div className="text-xs text-center">
        <span className={`px-2 py-1 rounded text-white ${isExcluded ? 'bg-blue-500' : 'bg-green-500'}`}>
          {isExcluded ? 'ESCLUSE' : 'SOGGETTE'}
        </span>
      </div>
    </div>
  );

  const TooltipInput = ({ id, label, value, onChange, tooltip, type = "number" }: {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    tooltip: string;
    type?: string;
  }) => (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Label htmlFor={id}>{label}</Label>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1"
      />
    </div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Calcolo Fondo Risorse Decentrate
            </h1>
            <p className="text-lg text-gray-600">
              Comparto Funzioni Locali - CCNL 16.11.2022
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Verifica completa con distinzione voci soggette/escluse dal limite art. 23, c. 2, D.Lgs. 75/2017
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* SEZIONE DATI DI INPUT */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">📋 Dati di Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Dati Generali */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 border-b pb-1">Dati Generali</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="anno">Anno di Riferimento</Label>
                        <Input
                          id="anno"
                          type="number"
                          value={annoRiferimento}
                          onChange={(e) => setAnnoRiferimento(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="montesalari">Monte Salari Anno 2018 (€)</Label>
                        <Input
                          id="montesalari"
                          type="number"
                          value={monteSalari2018}
                          onChange={(e) => setMonteSalari2018(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dipendenti">N° Dipendenti al 31/12 anno precedente</Label>
                        <Input
                          id="dipendenti"
                          type="number"
                          value={numeroDipendenti}
                          onChange={(e) => setNumeroDipendenti(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mesi">Mesi decorrenza incremento CCNL</Label>
                        <Select value={mesiDecorrenza.toString()} onValueChange={(value) => setMesiDecorrenza(Number(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="tetto2016">Trattamento Accessorio 2016 - Limite (€)</Label>
                        <Input
                          id="tetto2016"
                          type="number"
                          value={trattamentoAccessorio2016}
                          onChange={(e) => setTrattamentoAccessorio2016(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* PARTE STABILE */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 PARTE STABILE - SOGGETTE AL LIMITE DEL SALARIO ACCESSORIO
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="consolidato"
                        label="Valore consolidato anno precedente (€)"
                        value={valoreConsolidato}
                        onChange={setValoreConsolidato}
                        tooltip="Valore del fondo costituito al 31.12 dell'anno precedente, al netto degli istituti variabili"
                      />
                      
                      <TooltipInput
                        id="incrementiprec"
                        label="Incrementi CCNL precedenti (€)"
                        value={incrementiCCNLPrecedenti}
                        onChange={setIncrementiCCNLPrecedenti}
                        tooltip="Importi derivanti dall'applicazione dei CCNL precedenti all'ultimo sottoscritto"
                      />
                      
                      <TooltipInput
                        id="assegni"
                        label="Assegni ad personam (€)"
                        value={assegniAdPersonam}
                        onChange={setAssegniAdPersonam}
                        tooltip="Assegni ad personam non riassorbibili di cui all'art. 30, comma 1, lett. c)"
                      />
                      
                      <div className="bg-white p-3 rounded">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          Cessazioni Anno Precedente
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Risorse stabili conseguenti alla cessazione dal servizio di personale dirigente e di comparto, anche a domanda, nell'anno precedente</p>
                            </TooltipContent>
                          </Tooltip>
                        </Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <Label htmlFor="cessati" className="text-xs">N° Dipendenti cessati</Label>
                            <Input
                              id="cessati"
                              type="number"
                              value={dipendentiCessati}
                              onChange={(e) => setDipendentiCessati(Number(e.target.value))}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="retribmedia" className="text-xs">Retrib. acc. media annua (€)</Label>
                            <Input
                              id="retribmedia"
                              type="number"
                              value={retribuzioneMediaCessati}
                              onChange={(e) => setRetribuzioneMediaCessati(Number(e.target.value))}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* PARTE VARIABILE - SOGGETTE AL LIMITE */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 PARTE VARIABILE - SOGGETTE AL LIMITE DEL SALARIO ACCESSORIO
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="economie"
                        label="Economie fondo anno precedente (€)"
                        value={economieFondo}
                        onChange={setEconomieFondo}
                        tooltip="Economie del fondo relative all'anno precedente"
                      />
                      
                      <TooltipInput
                        id="nuoviservizi"
                        label="Risorse per attivazione nuovi servizi (€)"
                        value={risorseNuoviServizi}
                        onChange={setRisorseNuoviServizi}
                        tooltip="Risorse conseguenti alla attivazione di nuovi servizi o ad incrementi di quelli esistenti"
                      />
                      
                      <TooltipInput
                        id="condoni"
                        label="Proventi condoni edilizi (€)"
                        value={proventiCondoniEdilizi}
                        onChange={setProventiCondoniEdilizi}
                        tooltip="Proventi derivanti dai condoni edilizi"
                      />
                      
                      <TooltipInput
                        id="performance"
                        label="Performance organizzativa (art. 59, c. 1-bis, D.Lgs. 150/09) (€)"
                        value={risorsePerformanceOrg}
                        onChange={setRisorsePerformanceOrg}
                        tooltip="Risorse per la performance organizzativa ex art. 59, comma 1-bis, del D.Lgs. 150/2009"
                      />
                      
                      <TooltipInput
                        id="l145"
                        label="Risorse L. 145/2018 (c. 1091) (€)"
                        value={risorseL145}
                        onChange={setRisorseL145}
                        tooltip="Risorse derivanti dalla Legge 145/2018, comma 1091"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* PARTE VARIABILE - NON SOGGETTE AL LIMITE */}
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                      🔵 PARTE VARIABILE - NON SOGGETTE AL LIMITE DEL SALARIO ACCESSORIO
                    </h3>
                    <div className="space-y-3 bg-blue-50 p-4 rounded">
                      <TooltipInput
                        id="sponsor"
                        label="Proventi da sponsorizzazioni (€)"
                        value={proventiSponsorizz}
                        onChange={setProventiSponsorizz}
                        tooltip="Proventi derivanti da contratti di sponsorizzazione o accordi di collaborazione con soggetti privati"
                      />
                      
                      <TooltipInput
                        id="entiterzi"
                        label="Contributi da enti terzi (UE, Stato, Regioni) (€)"
                        value={contributiEntiTerzi}
                        onChange={setContributiEntiTerzi}
                        tooltip="Contributi e finanziamenti dell'Unione europea e di organismi internazionali dello Stato e delle Regioni per progettualità specifiche"
                      />
                      
                      <TooltipInput
                        id="recuperoevas"
                        label="Recupero evasione ICI/IMU/TARI (€)"
                        value={risorseRecuperoEvasione}
                        onChange={setRisorseRecuperoEvasione}
                        tooltip="Proventi derivanti dall'attività di recupero dell'evasione ICI/IMU/TARI"
                      />
                      
                      <TooltipInput
                        id="dirittisegr"
                        label="Diritti di segreteria e rogito (€)"
                        value={proventiDirittiSegreteria}
                        onChange={setProventiDirittiSegreteria}
                        tooltip="Proventi derivanti dai diritti di segreteria e di rogito"
                      />
                      
                      <TooltipInput
                        id="l125"
                        label="Risorse L. 125/2013 (€)"
                        value={risorseL125}
                        onChange={setRisorseL125}
                        tooltip="Risorse per il personale previste dalla Legge 125/2013"
                      />
                      
                      <TooltipInput
                        id="specifiche"
                        label="Specifiche disposizioni di legge (€)"
                        value={specificheDisposizioni}
                        onChange={setSpecificheDisposizioni}
                        tooltip="Risorse derivanti da specifiche disposizioni di legge che incrementano il trattamento accessorio"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Risorse Escluse dal Limite */}
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                      🔵 ALTRE RISORSE ESCLUSE DAL LIMITE DEL SALARIO ACCESSORIO
                    </h3>
                    <div className="space-y-3 bg-blue-50 p-4 rounded">
                      <TooltipInput
                        id="specificiescl"
                        label="Specifici disposizioni di legge escluse (€)"
                        value={riseSpecifciDisposizioni}
                        onChange={setRiseSpecificiDisposizioni}
                        tooltip="Risorse specifiche previste da disposizioni di legge e escluse dal calcolo del limite"
                      />
                      
                      <TooltipInput
                        id="contributi"
                        label="Contributi enti terzi per progetti (€)"
                        value={risContributoEntiTerziProgetti}
                        onChange={setRisContributoEntiTerziProgetti}
                        tooltip="Contributi di enti terzi per progetti specifici esclusi dal limite"
                      />
                      
                      <TooltipInput
                        id="perfezionamento"
                        label="Perfezionamento professionale (€)"
                        value={risPerfezioneProfessionale}
                        onChange={setRisPerfezioneProfessionale}
                        tooltip="Risorse destinate ad attività di perfezionamento professionale"
                      />
                      
                      <TooltipInput
                        id="trasferimenti"
                        label="Trasferimento di personale (€)"
                        value={trasferimentoPersonale}
                        onChange={setTrasferimentoPersonale}
                        tooltip="Risorse relative al trasferimento di personale"
                      />
                      
                      <TooltipInput
                        id="integrative"
                        label="Risorse integrative L. 125/2013 (€)"
                        value={riseIntegrativeL125}
                        onChange={setRiseIntegrativeL125}
                        tooltip="Risorse integrative previste dalla Legge 125/2013"
                      />
                      
                      <TooltipInput
                        id="segreteria2"
                        label="Risorse Segreteria (€)"
                        value={risorseSegreteria}
                        onChange={setRisorseSegreteria}
                        tooltip="Risorse specifiche per la segreteria"
                      />
                      
                      <TooltipInput
                        id="incentivazioni"
                        label="Incentivazioni 2018 (€)"
                        value={incentivazioni2018}
                        onChange={setIncentivazioni2018}
                        tooltip="Incentivazioni previste per l'anno 2018"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Incrementi Soggetti al Limite */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 INCREMENTI SOGGETTI AL LIMITE DEL SALARIO ACCESSORIO
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="ccnl2018"
                        label="Incrementi CCNL 2018 (€)"
                        value={incCCNL2018}
                        onChange={setIncCCNL2018}
                        tooltip="Incrementi derivanti dal CCNL 2018"
                      />
                      
                      <TooltipInput
                        id="ccnl2022"
                        label="Incrementi CCNL 2022 (€)"
                        value={incCCNL2022}
                        onChange={setIncCCNL2022}
                        tooltip="Incrementi derivanti dal CCNL 2022"
                      />
                      
                      <TooltipInput
                        id="limitedecentrato"
                        label="Incremento limite decentrato (€)"
                        value={incLimiteDecentrato}
                        onChange={setIncLimiteDecentrato}
                        tooltip="Incrementi del limite decentrato"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Incrementi e Rimodulazione Fondo ex art. 79, c. 2 - VARIABILI */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 INCREMENTI E RIMODULAZIONE FONDO ex art. 79, c. 2 - VARIABILI
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="progressioni"
                        label="Risorse per progressioni tra aree (€)"
                        value={risorseProgressioni}
                        onChange={setRisorseProgressioni}
                        tooltip="Risorse destinate alle progressioni tra aree professionali"
                      />
                      
                      <TooltipInput
                        id="efficientamento"
                        label="Efficientamento servizi (€)"
                        value={risorseEfficientamento}
                        onChange={setRisorseEfficientamento}
                        tooltip="Risorse derivanti dall'efficientamento dei servizi"
                      />
                      
                      <TooltipInput
                        id="flessione"
                        label="Flessione orario di lavoro (€)"
                        value={risorseFlessioneOrario}
                        onChange={setRisorseFlessioneOrario}
                        tooltip="Risorse conseguenti alla flessione dell'orario di lavoro"
                      />
                      
                      <TooltipInput
                        id="altrerisorse"
                        label="Altre risorse per incremento (€)"
                        value={altreRisorseIncremento}
                        onChange={setAltreRisorseIncremento}
                        tooltip="Altre risorse destinate all'incremento del fondo"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Copertura Finanziaria */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 COPERTURA FINANZIARIA
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="titolo1"
                        label="Risorse Titolo 1 (€)"
                        value={risorseTitolo1}
                        onChange={setRisorseTitolo1}
                        tooltip="Risorse provenienti dal Titolo 1 del bilancio"
                      />
                      
                      <TooltipInput
                        id="capitolo"
                        label="Risorse Capitolo (€)"
                        value={risorseCapitolo}
                        onChange={setRisorseCapitolo}
                        tooltip="Risorse provenienti da specifici capitoli di bilancio"
                      />
                      
                      <TooltipInput
                        id="superifici"
                        label="Risorse Superfici (€)"
                        value={risorseSuperifici}
                        onChange={setRisorseSuperifici}
                        tooltip="Risorse derivanti dalla gestione delle superfici"
                      />
                      
                      <TooltipInput
                        id="fondi"
                        label="Risorse Fondi Europei (€)"
                        value={risorseFondiEuropei}
                        onChange={setRisorseFondiEuropei}
                        tooltip="Risorse provenienti da fondi europei"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Fondi Speciali per Specifiche Destinazioni */}
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                      🟢 FONDI SPECIALI PER SPECIFICHE DESTINAZIONI
                    </h3>
                    <div className="space-y-3 bg-green-50 p-4 rounded">
                      <TooltipInput
                        id="lavoriubs"
                        label="Fondo Lavori UBS (€)"
                        value={fondoLavoriUBS}
                        onChange={setFondoLavoriUBS}
                        tooltip="Fondo per lavori presso Uffici di Base Speciali"
                      />
                      
                      <TooltipInput
                        id="altrilavori"
                        label="Fondo Altri Lavori (€)"
                        value={fondoAltriLavori}
                        onChange={setFondoAltriLavori}
                        tooltip="Fondo per altri tipi di lavori specifici"
                      />
                      
                      <TooltipInput
                        id="destinazioni"
                        label="Specifiche Destinazioni (€)"
                        value={specificheDestinazioni}
                        onChange={setSpecificheDestinazioni}
                        tooltip="Fondi per specifiche destinazioni normative"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>

            {/* SEZIONE RISULTATI */}
            <div className="space-y-6">
              
              {/* Risorse Escluse Results */}
              <Card className="border-blue-300">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">🔵 RISORSE ESCLUSE DAL LIMITE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                      <div>DESCRIZIONE</div>
                      <div>RIFERIMENTO NORMATIVO</div>
                      <div className="text-right">IMPORTO</div>
                      <div className="text-center">LIMITE ART. 23</div>
                    </div>
                    
                    <ResultRow 
                      description="Specifici disposizioni di legge"
                      reference="Varie disposizioni"
                      amount={risultati.escluse.specificiDisposizioni}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Contributi enti terzi per progetti"
                      reference="Art. 79, c. 2"
                      amount={risultati.escluse.contributiEntiTerzi}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Perfezionamento professionale"
                      reference="Art. 79, c. 2"
                      amount={risultati.escluse.perfezioneProfessionale}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Trasferimento di personale"
                      reference="Art. 79, c. 2"
                      amount={risultati.escluse.trasferimenti}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Risorse integrative L. 125/2013"
                      reference="L. 125/2013"
                      amount={risultati.escluse.integrative}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Risorse Segreteria"
                      reference="Art. 79, c. 2"
                      amount={risultati.escluse.segreteria}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="Incentivazioni 2018"
                      reference="Pregresse disposizioni"
                      amount={risultati.escluse.incentivazioni}
                      isExcluded={true}
                    />
                    <ResultRow 
                      description="TOTALE RISORSE ESCLUSE"
                      reference=""
                      amount={risultati.escluse.totale}
                      isTotal={true}
                      isExcluded={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Incrementi Soggetti al Limite Results */}
              <Card className="border-green-300">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900">🟢 INCREMENTI SOGGETTI AL LIMITE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                      <div>DESCRIZIONE</div>
                      <div>RIFERIMENTO NORMATIVO</div>
                      <div className="text-right">IMPORTO</div>
                      <div className="text-center">LIMITE ART. 23</div>
                    </div>
                    
                    <ResultRow 
                      description="Incrementi CCNL 2018"
                      reference="Art. 79, c. 2"
                      amount={risultati.incrementiSoggetti.ccnl2018}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Incrementi CCNL 2022"
                      reference="Art. 79, c. 2"
                      amount={risultati.incrementiSoggetti.ccnl2022}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Incremento limite decentrato"
                      reference="Art. 80"
                      amount={risultati.incrementiSoggetti.limiteDecentrato}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="TOTALE INCREMENTI SOGGETTI AL LIMITE"
                      reference=""
                      amount={risultati.incrementiSoggetti.totale}
                      isTotal={true}
                      isExcluded={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Parte Stabile Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-900">A) PARTE STABILE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                      <div>DESCRIZIONE</div>
                      <div>RIFERIMENTO NORMATIVO</div>
                      <div className="text-right">IMPORTO</div>
                      <div className="text-center">LIMITE ART. 23</div>
                    </div>
                    
                    <ResultRow 
                      description="Valore consolidato al 31.12 dell'anno precedente"
                      reference="Art. 79, c. 1, lett. a)"
                      amount={risultati.soggette.valoreConsolidato}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Incrementi da CCNL precedenti"
                      reference="Art. 79, c. 1, lett. b)"
                      amount={risultati.soggette.incrementiCCNL}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Assegni ad personam non riassorbibili"
                      reference="Art. 79, c. 1, lett. c)"
                      amount={risultati.soggette.assegniAdPersonam}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse stabili da cessazioni"
                      reference="Art. 79, c. 1, lett. d)"
                      amount={risultati.soggette.risorseCessazioni}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="TOTALE PARTE STABILE"
                      reference=""
                      amount={risultati.soggette.totale}
                      isTotal={true}
                      isExcluded={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Parte Variabile Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-900">B) PARTE VARIABILE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                      <div>DESCRIZIONE</div>
                      <div>RIFERIMENTO NORMATIVO</div>
                      <div className="text-right">IMPORTO</div>
                      <div className="text-center">LIMITE ART. 23</div>
                    </div>
                    
                    <ResultRow 
                      description="Economie fondo anno precedente"
                      reference="Art. 79, c. 2, lett. a)"
                      amount={risultati.variabili.economie}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse per attivazione nuovi servizi"
                      reference="Art. 79, c. 2, lett. b)"
                      amount={risultati.variabili.nuoviServizi}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Proventi da sponsorizzazioni"
                      reference="Art. 79, c. 2, lett. c)"
                      amount={risultati.variabili.sponsorizzazioni}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Contributi da enti terzi (UE, Stato, Regioni)"
                      reference="Art. 79, c. 2, lett. d)"
                      amount={risultati.variabili.entiTerzi}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse da recupero evasione ICI/IMU/TARI"
                      reference="Art. 79, c. 2, lett. e)"
                      amount={risultati.variabili.recuperoEvasione}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Proventi da diritti di segreteria e rogito"
                      reference="Art. 79, c. 2, lett. f)"
                      amount={risultati.variabili.dirittiSegreteria}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse per personale L. 125/2013"
                      reference="Art. 79, c. 2, lett. g)"
                      amount={risultati.variabili.risorseL125}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Proventi da condoni edilizi"
                      reference="Art. 79, c. 2, lett. h)"
                      amount={risultati.variabili.condoniEdilizi}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Specifiche disposizioni di legge"
                      reference="Art. 79, c. 2, lett. i)"
                      amount={risultati.variabili.specificheDisp}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse da performance organizzativa"
                      reference="Art. 79, c. 2, lett. l)"
                      amount={risultati.variabili.performanceOrg}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse L. 145/2018 (c. 1091)"
                      reference="Art. 79, c. 2, lett. m)"
                      amount={risultati.variabili.risorseL145}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="TOTALE PARTE VARIABILE"
                      reference=""
                      amount={risultati.variabili.totale}
                      isTotal={true}
                      isExcluded={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Incrementi CCNL Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">C) INCREMENTI CCNL 16.11.2022</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                      <div>DESCRIZIONE</div>
                      <div>RIFERIMENTO NORMATIVO</div>
                      <div className="text-right">IMPORTO</div>
                      <div className="text-center">LIMITE ART. 23</div>
                    </div>
                    
                    <ResultRow 
                      description="Incremento per il personale in servizio"
                      reference="Art. 80, c. 1"
                      amount={risultati.incrementi.incrementoPersonale}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Incremento su Monte Salari 2018 (0,22%)"
                      reference="Art. 80, c. 2"
                      amount={risultati.incrementi.incrementoMonteSalari}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Risorse per progressioni tra aree"
                      reference="Artt. 15 e 80, c. 3"
                      amount={risultati.incrementi.progressioni}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Efficientamento servizi"
                      reference="Art. 80, c. 4"
                      amount={risultati.incrementi.efficientamento}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Flessione orario di lavoro"
                      reference="Art. 80, c. 5"
                      amount={risultati.incrementi.flessione}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="Altre risorse per incremento"
                      reference="Art. 80, c. 6"
                      amount={risultati.incrementi.altreRisorse}
                      isExcluded={false}
                    />
                    <ResultRow 
                      description="TOTALE INCREMENTI CCNL"
                      reference=""
                      amount={risultati.incrementi.totale}
                      isTotal={true}
                      isExcluded={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Riepilogo e Verifica Limiti */}
              <Card className="border-2 border-gray-400">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-900">🎯 RIEPILOGO E VERIFICA LIMITI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Totale Fondo Anno {annoRiferimento} (tutte le voci):</span>
                        <span className="text-2xl font-bold text-blue-900 font-mono">
                          {formatCurrency(risultati.totaleFondo)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Totale soggetto al limite Art. 23 D.Lgs. 75/2017:</span>
                        <span className="text-2xl font-bold text-orange-900 font-mono">
                          {formatCurrency(risultati.totaleArt23)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Limite di spesa (Tetto 2016) - Art. 23, c. 2, D.Lgs. 75/2017:</span>
                        <span className="text-lg font-semibold font-mono">
                          {formatCurrency(risultati.limiteTetto)}
                        </span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      risultati.rispettaLimite 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-red-50 border-red-300'
                    }`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold mb-2 ${
                          risultati.rispettaLimite ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {risultati.rispettaLimite ? '✅ LIMITE RISPETTATO' : '❌ LIMITE SFORATO'}
                        </div>
                        
                        {risultati.rispettaLimite ? (
                          <div>
                            <p className="text-green-700 font-semibold">
                              Disponibilità residua: {formatCurrency(risultati.disponibilita)}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-red-700 font-semibold">
                              Sforamento: {formatCurrency(risultati.sforamento)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 bg-white p-4 rounded-lg">
            <p>Applicazione per il calcolo completo del Fondo Risorse Decentrate secondo il CCNL Funzioni Locali del 16.11.2022</p>
            <p>Include distinzione tra voci soggette ed escluse dal limite dell'art. 23, c. 2, D.Lgs. 75/2017</p>
          </div>

        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;
