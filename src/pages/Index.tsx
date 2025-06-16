
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

  // Input States - Parte Stabile (Art. 79, c. 1)
  const [valoreConsolidato, setValoreConsolidato] = useState<number>(0);
  const [incrementiCCNLPrecedenti, setIncrementiCCNLPrecedenti] = useState<number>(0);
  const [assegniAdPersonam, setAssegniAdPersonam] = useState<number>(0);
  const [dipendentiCessati, setDipendentiCessati] = useState<number>(0);
  const [retribuzioneMediaCessati, setRetribuzioneMediaCessati] = useState<number>(0);
  const [altreRisorseStabili, setAltreRisorseStabili] = useState<number>(0);

  // Input States - Parte Variabile (Art. 79, c. 2)
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

  // Input States - Incrementi CCNL (Art. 80)
  const [risorseProgressioni, setRisorseProgressioni] = useState<number>(0);

  // Calculated Values
  const [risultati, setRisultati] = useState({
    parteStabile: {
      valoreConsolidato: 0,
      incrementiCCNL: 0,
      assegniAdPersonam: 0,
      risorseCessazioni: 0,
      altreRisorse: 0,
      totale: 0
    },
    parteVariabile: {
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
    incrementiCCNL: {
      incrementoPersonale: 0,
      incrementoMonteSalari: 0,
      progressioni: 0,
      totale: 0
    },
    totaleFondo: 0,
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
    // Calcoli Parte Stabile
    const risorseCessazioni = dipendentiCessati * retribuzioneMediaCessati;
    const totaleParteStabile = valoreConsolidato + incrementiCCNLPrecedenti + assegniAdPersonam + risorseCessazioni + altreRisorseStabili;

    // Calcoli Parte Variabile
    const totaleParteVariabile = economieFondo + risorseNuoviServizi + proventiSponsorizz + 
      contributiEntiTerzi + risorseRecuperoEvasione + proventiDirittiSegreteria + 
      risorseL125 + proventiCondoniEdilizi + specificheDisposizioni + 
      risorsePerformanceOrg + risorseL145;

    // Calcoli Incrementi CCNL
    const incrementoPersonale = numeroDipendenti * 84.50 * (mesiDecorrenza / 12);
    const incrementoMonteSalari = monteSalari2018 * 0.0022;
    const totaleIncrementiCCNL = incrementoPersonale + incrementoMonteSalari + risorseProgressioni;

    // Calcoli Finali
    const totaleFondo = totaleParteStabile + totaleParteVariabile + totaleIncrementiCCNL;
    const limiteTetto = trattamentoAccessorio2016;
    const sforamento = Math.max(0, totaleFondo - limiteTetto);
    const disponibilita = Math.max(0, limiteTetto - totaleFondo);
    const rispettaLimite = totaleFondo <= limiteTetto;

    setRisultati({
      parteStabile: {
        valoreConsolidato,
        incrementiCCNL: incrementiCCNLPrecedenti,
        assegniAdPersonam,
        risorseCessazioni,
        altreRisorse: altreRisorseStabili,
        totale: totaleParteStabile
      },
      parteVariabile: {
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
        totale: totaleParteVariabile
      },
      incrementiCCNL: {
        incrementoPersonale,
        incrementoMonteSalari,
        progressioni: risorseProgressioni,
        totale: totaleIncrementiCCNL
      },
      totaleFondo,
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
    valoreConsolidato, incrementiCCNLPrecedenti, assegniAdPersonam, dipendentiCessati, 
    retribuzioneMediaCessati, altreRisorseStabili, economieFondo, risorseNuoviServizi,
    proventiSponsorizz, contributiEntiTerzi, risorseRecuperoEvasione, proventiDirittiSegreteria,
    risorseL125, proventiCondoniEdilizi, specificheDisposizioni, risorsePerformanceOrg,
    risorseL145, risorseProgressioni
  ]);

  const ResultRow = ({ description, reference, amount, isTotal = false }: {
    description: string;
    reference: string;
    amount: number;
    isTotal?: boolean;
  }) => (
    <div className={`grid grid-cols-3 gap-4 py-2 ${isTotal ? 'border-t-2 border-gray-300 font-bold bg-gray-50' : ''}`}>
      <div className="text-sm">{description}</div>
      <div className="text-xs text-gray-600">{reference}</div>
      <div className={`text-right font-mono ${isTotal ? 'text-lg font-bold' : ''}`}>
        {formatCurrency(amount)}
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
            Artt. 79 e 80 CCNL - Verifica limite art. 23, c. 2, D.Lgs. 75/2017
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

                {/* Parte Stabile */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-1">Parte Stabile (Art. 79, c. 1)</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="consolidato">a) Valore consolidato anno precedente (€)</Label>
                      <Input
                        id="consolidato"
                        type="number"
                        value={valoreConsolidato}
                        onChange={(e) => setValoreConsolidato(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="incrementiprec">b) Incrementi CCNL precedenti (€)</Label>
                      <Input
                        id="incrementiprec"
                        type="number"
                        value={incrementiCCNLPrecedenti}
                        onChange={(e) => setIncrementiCCNLPrecedenti(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assegni">c) Assegni ad personam (€)</Label>
                      <Input
                        id="assegni"
                        type="number"
                        value={assegniAdPersonam}
                        onChange={(e) => setAssegniAdPersonam(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <Label className="text-sm font-medium">d) Cessazioni Anno Precedente</Label>
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
                    <div>
                      <Label htmlFor="altrestabili">e) Altre risorse stabili (€)</Label>
                      <Input
                        id="altrestabili"
                        type="number"
                        value={altreRisorseStabili}
                        onChange={(e) => setAltreRisorseStabili(Number(e.target.value))}
                        className="mt-1"
                      />
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

                {/* Incrementi CCNL */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-1">Incrementi CCNL (Art. 80)</h3>
                  <div>
                    <Label htmlFor="progressioni">Risorse per progressioni tra aree (art. 15) (€)</Label>
                    <Input
                      id="progressioni"
                      type="number"
                      value={risorseProgressioni}
                      onChange={(e) => setRisorseProgressioni(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* SEZIONE RISULTATI */}
          <div className="space-y-6">
            
            {/* Parte Stabile Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-900">A) PARTE STABILE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                    <div>DESCRIZIONE</div>
                    <div>RIFERIMENTO NORMATIVO</div>
                    <div className="text-right">IMPORTO</div>
                  </div>
                  
                  <ResultRow 
                    description="Valore consolidato al 31.12 dell'anno precedente"
                    reference="Art. 79, c. 1, lett. a)"
                    amount={risultati.parteStabile.valoreConsolidato}
                  />
                  <ResultRow 
                    description="Incrementi da CCNL precedenti"
                    reference="Art. 79, c. 1, lett. b)"
                    amount={risultati.parteStabile.incrementiCCNL}
                  />
                  <ResultRow 
                    description="Assegni ad personam non riassorbibili"
                    reference="Art. 79, c. 1, lett. c)"
                    amount={risultati.parteStabile.assegniAdPersonam}
                  />
                  <ResultRow 
                    description="Risorse stabili da cessazioni"
                    reference="Art. 79, c. 1, lett. d)"
                    amount={risultati.parteStabile.risorseCessazioni}
                  />
                  <ResultRow 
                    description="Altre risorse stabili"
                    reference="Art. 79, c. 1, lett. e)"
                    amount={risultati.parteStabile.altreRisorse}
                  />
                  <ResultRow 
                    description="TOTALE PARTE STABILE"
                    reference=""
                    amount={risultati.parteStabile.totale}
                    isTotal={true}
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
                  <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                    <div>DESCRIZIONE</div>
                    <div>RIFERIMENTO NORMATIVO</div>
                    <div className="text-right">IMPORTO</div>
                  </div>
                  
                  <ResultRow 
                    description="Economie fondo anno precedente"
                    reference="Art. 79, c. 2, lett. a)"
                    amount={risultati.parteVariabile.economie}
                  />
                  <ResultRow 
                    description="Risorse per attivazione nuovi servizi"
                    reference="Art. 79, c. 2, lett. b)"
                    amount={risultati.parteVariabile.nuoviServizi}
                  />
                  <ResultRow 
                    description="Proventi da sponsorizzazioni"
                    reference="Art. 79, c. 2, lett. c)"
                    amount={risultati.parteVariabile.sponsorizzazioni}
                  />
                  <ResultRow 
                    description="Contributi da enti terzi (UE, Stato, Regioni)"
                    reference="Art. 79, c. 2, lett. d)"
                    amount={risultati.parteVariabile.entiTerzi}
                  />
                  <ResultRow 
                    description="Risorse da recupero evasione ICI/IMU/TARI"
                    reference="Art. 79, c. 2, lett. e)"
                    amount={risultati.parteVariabile.recuperoEvasione}
                  />
                  <ResultRow 
                    description="Proventi da diritti di segreteria e rogito"
                    reference="Art. 79, c. 2, lett. f)"
                    amount={risultati.parteVariabile.dirittiSegreteria}
                  />
                  <ResultRow 
                    description="Risorse per personale L. 125/2013"
                    reference="Art. 79, c. 2, lett. g)"
                    amount={risultati.parteVariabile.risorseL125}
                  />
                  <ResultRow 
                    description="Proventi da condoni edilizi"
                    reference="Art. 79, c. 2, lett. h)"
                    amount={risultati.parteVariabile.condoniEdilizi}
                  />
                  <ResultRow 
                    description="Specifiche disposizioni di legge"
                    reference="Art. 79, c. 2, lett. i)"
                    amount={risultati.parteVariabile.specificheDisp}
                  />
                  <ResultRow 
                    description="Risorse da performance organizzativa"
                    reference="Art. 79, c. 2, lett. l)"
                    amount={risultati.parteVariabile.performanceOrg}
                  />
                  <ResultRow 
                    description="Risorse L. 145/2018 (c. 1091)"
                    reference="Art. 79, c. 2, lett. m)"
                    amount={risultati.parteVariabile.risorseL145}
                  />
                  <ResultRow 
                    description="TOTALE PARTE VARIABILE"
                    reference=""
                    amount={risultati.parteVariabile.totale}
                    isTotal={true}
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
                  <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                    <div>DESCRIZIONE</div>
                    <div>RIFERIMENTO NORMATIVO</div>
                    <div className="text-right">IMPORTO</div>
                  </div>
                  
                  <ResultRow 
                    description="Incremento per il personale in servizio"
                    reference="Art. 80, c. 1"
                    amount={risultati.incrementiCCNL.incrementoPersonale}
                  />
                  <ResultRow 
                    description="Incremento su Monte Salari 2018 (0,22%)"
                    reference="Art. 80, c. 2"
                    amount={risultati.incrementiCCNL.incrementoMonteSalari}
                  />
                  <ResultRow 
                    description="Risorse per progressioni tra aree"
                    reference="Artt. 15 e 80, c. 3"
                    amount={risultati.incrementiCCNL.progressioni}
                  />
                  <ResultRow 
                    description="TOTALE INCREMENTI CCNL"
                    reference=""
                    amount={risultati.incrementiCCNL.totale}
                    isTotal={true}
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
                      <span className="text-lg font-semibold">Totale Fondo Anno {annoRiferimento} (A+B+C):</span>
                      <span className="text-2xl font-bold text-blue-900 font-mono">
                        {formatCurrency(risultati.totaleFondo)}
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
          <p>Applicazione per il calcolo del Fondo Risorse Decentrate secondo il CCNL Funzioni Locali del 16.11.2022</p>
          <p>Riferimenti normativi: Artt. 79 e 80 CCNL - Art. 23, c. 2, D.Lgs. 75/2017</p>
        </div>

      </div>
    </div>
  );
};

export default Index;
