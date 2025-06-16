import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

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

  return (
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

                {/* Risorse Escluse dal Limite */}
                <div>
                  <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                    🔵 RISORSE DECENTRATE ESCLUSE DAL LIMITE DEL SALARIO ACCESSORIO
                  </h3>
                  <div className="space-y-3 bg-blue-50 p-4 rounded">
                    <div>
                      <Label htmlFor="specifici">Specifici disposizioni di legge (€)</Label>
                      <Input
                        id="specifici"
                        type="number"
                        value={riseSpecifciDisposizioni}
                        onChange={(e) => setRiseSpecificiDisposizioni(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contributi">Contributi enti terzi per progetti (€)</Label>
                      <Input
                        id="contributi"
                        type="number"
                        value={risContributoEntiTerziProgetti}
                        onChange={(e) => setRisContributoEntiTerziProgetti(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="perfezionamento">Perfezionamento professionale (€)</Label>
                      <Input
                        id="perfezionamento"
                        type="number"
                        value={risPerfezioneProfessionale}
                        onChange={(e) => setRisPerfezioneProfessionale(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="trasferimenti">Trasferimento di personale (€)</Label>
                      <Input
                        id="trasferimenti"
                        type="number"
                        value={trasferimentoPersonale}
                        onChange={(e) => setTrasferimentoPersonale(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="integrative">Risorse integrative L. 125/2013 (€)</Label>
                      <Input
                        id="integrative"
                        type="number"
                        value={riseIntegrativeL125}
                        onChange={(e) => setRiseIntegrativeL125(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="segreteria2">Risorse Segreteria (€)</Label>
                      <Input
                        id="segreteria2"
                        type="number"
                        value={risorseSegreteria}
                        onChange={(e) => setRisorseSegreteria(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="incentivazioni">Incentivazioni 2018 (€)</Label>
                      <Input
                        id="incentivazioni"
                        type="number"
                        value={incentivazioni2018}
                        onChange={(e) => setIncentivazioni2018(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Incrementi Soggetti al Limite */}
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                    🟢 INCREMENTI SOGGETTI AL LIMITE DEL SALARIO ACCESSORIO
                  </h3>
                  <div className="space-y-3 bg-green-50 p-4 rounded">
                    <div>
                      <Label htmlFor="ccnl2018">Incrementi CCNL 2018 (€)</Label>
                      <Input
                        id="ccnl2018"
                        type="number"
                        value={incCCNL2018}
                        onChange={(e) => setIncCCNL2018(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ccnl2022">Incrementi CCNL 2022 (€)</Label>
                      <Input
                        id="ccnl2022"
                        type="number"
                        value={incCCNL2022}
                        onChange={(e) => setIncCCNL2022(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="limitedecentrato">Incremento limite decentrato (€)</Label>
                      <Input
                        id="limitedecentrato"
                        type="number"
                        value={incLimiteDecentrato}
                        onChange={(e) => setIncLimiteDecentrato(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Parte Stabile - Soggette */}
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                    🟢 SOGGETTE AL LIMITE DEL SALARIO ACCESSORIO (Parte Stabile)
                  </h3>
                  <div className="space-y-3 bg-green-50 p-4 rounded">
                    <div>
                      <Label htmlFor="consolidato">Valore consolidato anno precedente (€)</Label>
                      <Input
                        id="consolidato"
                        type="number"
                        value={valoreConsolidato}
                        onChange={(e) => setValoreConsolidato(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="incrementiprec">Incrementi CCNL precedenti (€)</Label>
                      <Input
                        id="incrementiprec"
                        type="number"
                        value={incrementiCCNLPrecedenti}
                        onChange={(e) => setIncrementiCCNLPrecedenti(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assegni">Assegni ad personam (€)</Label>
                      <Input
                        id="assegni"
                        type="number"
                        value={assegniAdPersonam}
                        onChange={(e) => setAssegniAdPersonam(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div className="bg-white p-3 rounded">
                      <Label className="text-sm font-medium">Cessazioni Anno Precedente</Label>
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

                {/* Parte Variabile */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-1">Parte Variabile (Art. 79, c. 2)</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="economie">a) Economie fondo anno precedente (€)</Label>
                      <Input
                        id="economie"
                        type="number"
                        value={economieFondo}
                        onChange={(e) => setEconomieFondo(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nuoviservizi">b) Risorse attivazione nuovi servizi (€)</Label>
                      <Input
                        id="nuoviservizi"
                        type="number"
                        value={risorseNuoviServizi}
                        onChange={(e) => setRisorseNuoviServizi(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsor">c) Proventi da sponsorizzazioni (€)</Label>
                      <Input
                        id="sponsor"
                        type="number"
                        value={proventiSponsorizz}
                        onChange={(e) => setProventiSponsorizz(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="entiterzi">d) Contributi enti terzi (UE, Stato, Regioni) (€)</Label>
                      <Input
                        id="entiterzi"
                        type="number"
                        value={contributiEntiTerzi}
                        onChange={(e) => setContributiEntiTerzi(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recuperoevas">e) Recupero evasione ICI/IMU/TARI (€)</Label>
                      <Input
                        id="recuperoevas"
                        type="number"
                        value={risorseRecuperoEvasione}
                        onChange={(e) => setRisorseRecuperoEvasione(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dirittisegr">f) Diritti di segreteria e rogito (€)</Label>
                      <Input
                        id="dirittisegr"
                        type="number"
                        value={proventiDirittiSegreteria}
                        onChange={(e) => setProventiDirittiSegreteria(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="l125">g) Risorse L. 125/2013 (€)</Label>
                      <Input
                        id="l125"
                        type="number"
                        value={risorseL125}
                        onChange={(e) => setRisorseL125(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condoni">h) Proventi condoni edilizi (€)</Label>
                      <Input
                        id="condoni"
                        type="number"
                        value={proventiCondoniEdilizi}
                        onChange={(e) => setProventiCondoniEdilizi(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specifiche">i) Specifiche disposizioni di legge (€)</Label>
                      <Input
                        id="specifiche"
                        type="number"
                        value={specificheDisposizioni}
                        onChange={(e) => setSpecificheDisposizioni(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="performance">l) Performance organizzativa (art. 59, c. 1-bis, D.Lgs. 150/09) (€)</Label>
                      <Input
                        id="performance"
                        type="number"
                        value={risorsePerformanceOrg}
                        onChange={(e) => setRisorsePerformanceOrg(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="l145">m) Risorse L. 145/2018 (c. 1091) (€)</Label>
                      <Input
                        id="l145"
                        type="number"
                        value={risorseL145}
                        onChange={(e) => setRisorseL145(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Incrementi e Rimodulazione Fondo ex art. 79, c. 2 - VARIABILI */}
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                    🟢 INCREMENTI E RIMODULAZIONE FONDO ex art. 79, c. 2 - VARIABILI
                  </h3>
                  <div className="space-y-3 bg-green-50 p-4 rounded">
                    <div>
                      <Label htmlFor="progressioni">Risorse per progressioni tra aree (€)</Label>
                      <Input
                        id="progressioni"
                        type="number"
                        value={risorseProgressioni}
                        onChange={(e) => setRisorseProgressioni(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="efficientamento">Efficientamento servizi (€)</Label>
                      <Input
                        id="efficientamento"
                        type="number"
                        value={risorseEfficientamento}
                        onChange={(e) => setRisorseEfficientamento(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="flessione">Flessione orario di lavoro (€)</Label>
                      <Input
                        id="flessione"
                        type="number"
                        value={risorseFlessioneOrario}
                        onChange={(e) => setRisorseFlessioneOrario(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="altrerisorse">Altre risorse per incremento (€)</Label>
                      <Input
                        id="altrerisorse"
                        type="number"
                        value={altreRisorseIncremento}
                        onChange={(e) => setAltreRisorseIncremento(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Copertura Finanziaria */}
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                    🟢 COPERTURA FINANZIARIA
                  </h3>
                  <div className="space-y-3 bg-green-50 p-4 rounded">
                    <div>
                      <Label htmlFor="titolo1">Risorse Titolo 1 (€)</Label>
                      <Input
                        id="titolo1"
                        type="number"
                        value={risorseTitolo1}
                        onChange={(e) => setRisorseTitolo1(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="capitolo">Risorse Capitolo (€)</Label>
                      <Input
                        id="capitolo"
                        type="number"
                        value={risorseCapitolo}
                        onChange={(e) => setRisorseCapitolo(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="superifici">Risorse Superifici (€)</Label>
                      <Input
                        id="superifici"
                        type="number"
                        value={risorseSuperifici}
                        onChange={(e) => setRisorseSuperifici(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fondi">Risorse Fondi Europei (€)</Label>
                      <Input
                        id="fondi"
                        type="number"
                        value={risorseFondiEuropei}
                        onChange={(e) => setRisorseFondiEuropei(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Fondi Speciali per Specifiche Destinazioni */}
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                    🟢 FONDI SPECIALI PER SPECIFICHE DESTINAZIONI
                  </h3>
                  <div className="space-y-3 bg-green-50 p-4 rounded">
                    <div>
                      <Label htmlFor="lavoriubs">Fondo Lavori UBS (€)</Label>
                      <Input
                        id="lavoriubs"
                        type="number"
                        value={fondoLavoriUBS}
                        onChange={(e) => setFondoLavoriUBS(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="altrilavori">Fondo Altri Lavori (€)</Label>
                      <Input
                        id="altrilavori"
                        type="number"
                        value={fondoAltriLavori}
                        onChange={(e) => setFondoAltriLavori(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destinazioni">Specifiche Destinazioni (€)</Label>
                      <Input
                        id="destinazioni"
                        type="number"
                        value={specificheDestinazioni}
                        onChange={(e) => setSpecificheDestinazioni(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
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
  );
};

export default Index;
