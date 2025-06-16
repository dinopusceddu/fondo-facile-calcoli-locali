
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

const Index = () => {
  // Input States - FONTI DI FINANZIAMENTO STABILI
  const [fondoConsolidato2017, setFondoConsolidato2017] = useState<number>(0);
  const [alteProfessionalita, setAlteProfessionalita] = useState<number>(0);
  const [incremento83_20, setIncremento83_20] = useState<number>(0);
  const [incrementiStipendiali, setIncrementiStipendiali] = useState<number>(0);
  const [integrazioneRisorse, setIntegrazioneRisorse] = useState<number>(0);
  const [risorseRiassorbite, setRisorseRiassorbite] = useState<number>(0);
  const [sommeTrasferimento, setSommeTrasferimento] = useState<number>(0);
  const [quotaMinoriOneri, setQuotaMinoriOneri] = useState<number>(0);
  const [riduzioneStabile, setRiduzioneStabile] = useState<number>(0);
  const [taglioFondo2010, setTaglioFondo2010] = useState<number>(0);
  const [riduzioniATA, setRiduzioniATA] = useState<number>(0);
  const [decurtazioneFondo, setDecurtazioneFondo] = useState<number>(0);
  const [euro84_50, setEuro84_50] = useState<number>(0);
  const [risorseStanziate, setRisorseStanziate] = useState<number>(0);
  const [differenzialiStipendiali2022, setDifferenzialiStipendiali2022] = useState<number>(0);
  const [differenzialiB3D3, setDifferenzialiB3D3] = useState<number>(0);

  // Input States - FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE
  const [recuperoEvasione, setRecuperoEvasione] = useState<number>(0);
  const [integrazioneRisorseVariabili, setIntegrazioneRisorseVariabili] = useState<number>(0);
  const [risorsePersonaleCasino, setRisorsePersonaleCasino] = useState<number>(0);
  const [monteSalari1997, setMonteSalari1997] = useState<number>(0);
  const [integrazioneArt62, setIntegrazioneArt62] = useState<number>(0);
  const [risorseAdeguamento, setRisorseAdeguamento] = useState<number>(0);

  // Input States - FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE
  const [sponsorizzazioni, setSponsorizzazioni] = useState<number>(0);
  const [rimborsoNotifiche, setRimborsoNotifiche] = useState<number>(0);
  const [pianiRazionalizzazione, setPianiRazionalizzazione] = useState<number>(0);
  const [incentiviFunzioni, setIncentiviFunzioni] = useState<number>(0);
  const [incentiviGiudizio, setIncentiviGiudizio] = useState<number>(0);
  const [risparmiStraordinario, setRisparmiStraordinario] = useState<number>(0);
  const [incrementoRegioni, setIncrementoRegioni] = useState<number>(0);
  const [sommeNonUtilizzate, setSommeNonUtilizzate] = useState<number>(0);
  const [incentiviIMUTARI, setIncentiviIMUTARI] = useState<number>(0);
  const [risparmiPasto, setRisparmiPasto] = useState<number>(0);
  const [risorseAssunzioni, setRisorseAssunzioni] = useState<number>(0);
  const [incrementoFondo022, setIncrementoFondo022] = useState<number>(0);
  const [euro84_50Tantum, setEuro84_50Tantum] = useState<number>(0);
  const [incrementoFondo2022, setIncrementoFondo2022] = useState<number>(0);
  const [incrementoPNRR, setIncrementoPNRR] = useState<number>(0);

  // Altri campi
  const [incrementoSalarioDeroga, setIncrementoSalarioDeroga] = useState<number>(0);
  const [misureVincoli, setMisureVincoli] = useState<number>(0);
  const [limiteComplessivo2016, setLimiteComplessivo2016] = useState<number>(0);

  // Calculated Values
  const [risultati, setRisultati] = useState({
    sommaStabili: 0,
    sommaVariabiliSoggette: 0,
    totaleParziale: 0,
    decurtazioneIncremento: 0,
    sommaVariabiliNonSoggette: 0,
    totaleRisorse: 0
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
    const sommaStabili = fondoConsolidato2017 + alteProfessionalita + incremento83_20 + 
      incrementiStipendiali + integrazioneRisorse + risorseRiassorbite + sommeTrasferimento + 
      quotaMinoriOneri + riduzioneStabile - taglioFondo2010 - riduzioniATA - decurtazioneFondo + 
      euro84_50 + risorseStanziate + differenzialiStipendiali2022 + differenzialiB3D3;

    const sommaVariabiliSoggette = recuperoEvasione + integrazioneRisorseVariabili + 
      risorsePersonaleCasino + monteSalari1997 + integrazioneArt62 + risorseAdeguamento;

    const totaleParziale = sommaStabili + sommaVariabiliSoggette;
    const decurtazioneIncremento = Math.max(0, totaleParziale - limiteComplessivo2016);

    const sommaVariabiliNonSoggette = sponsorizzazioni + rimborsoNotifiche + pianiRazionalizzazione + 
      incentiviFunzioni + incentiviGiudizio + risparmiStraordinario + incrementoRegioni + 
      sommeNonUtilizzate + incentiviIMUTARI + risparmiPasto + risorseAssunzioni + 
      incrementoFondo022 + euro84_50Tantum + incrementoFondo2022 + incrementoPNRR;

    const totaleRisorse = totaleParziale + sommaVariabiliNonSoggette + 
      incrementoSalarioDeroga + misureVincoli;

    setRisultati({
      sommaStabili,
      sommaVariabiliSoggette,
      totaleParziale,
      decurtazioneIncremento,
      sommaVariabiliNonSoggette,
      totaleRisorse
    });
  };

  // Recalculate when any input changes
  useEffect(() => {
    calcolaRisultati();
  }, [
    fondoConsolidato2017, alteProfessionalita, incremento83_20, incrementiStipendiali,
    integrazioneRisorse, risorseRiassorbite, sommeTrasferimento, quotaMinoriOneri,
    riduzioneStabile, taglioFondo2010, riduzioniATA, decurtazioneFondo, euro84_50,
    risorseStanziate, differenzialiStipendiali2022, differenzialiB3D3, recuperoEvasione,
    integrazioneRisorseVariabili, risorsePersonaleCasino, monteSalari1997, integrazioneArt62,
    risorseAdeguamento, sponsorizzazioni, rimborsoNotifiche, pianiRazionalizzazione,
    incentiviFunzioni, incentiviGiudizio, risparmiStraordinario, incrementoRegioni,
    sommeNonUtilizzate, incentiviIMUTARI, risparmiPasto, risorseAssunzioni,
    incrementoFondo022, euro84_50Tantum, incrementoFondo2022, incrementoPNRR,
    incrementoSalarioDeroga, misureVincoli, limiteComplessivo2016
  ]);

  const TooltipInput = ({ id, label, value, onChange, tooltip, normativo }: {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    tooltip: string;
    normativo: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <Label htmlFor={id} className="text-sm font-medium leading-tight">
            {normativo}
          </Label>
          <p className="text-xs text-gray-600 mt-1">{label}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="cursor-help mt-1">
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-sm p-3">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1"
      />
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SEZIONE INPUT */}
          <div className="space-y-6">
            
            {/* Limite 2016 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-red-900">🎯 Limite di Riferimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="limite2016">Tetto complessivo del salario accessorio dell'anno 2016 (€)</Label>
                  <Input
                    id="limite2016"
                    type="number"
                    value={limiteComplessivo2016}
                    onChange={(e) => setLimiteComplessivo2016(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FONTI DI FINANZIAMENTO STABILI */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">📋 FONTI DI FINANZIAMENTO STABILI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <TooltipInput
                  id="fondo2017"
                  label="Unico importo del fondo del salario accessorio consolidato all'anno 2017."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 1"
                  value={fondoConsolidato2017}
                  onChange={setFondoConsolidato2017}
                  tooltip="Importo consolidato del fondo per il salario accessorio riferito all'anno 2017"
                />

                <TooltipInput
                  id="alte-prof"
                  label="Alte professionalità 0,20% monte salari 2001, esclusa la quota relativa ai dirigenza, nel caso in cui tali risorse non siano state utilizzate (da inserire solo se l'importo annuale non è stato già ricompreso nell'unico importo storicizzato)."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 1"
                  value={alteProfessionalita}
                  onChange={setAlteProfessionalita}
                  tooltip="Risorse per alte professionalità calcolate come 0,20% del monte salari 2001"
                />

                <TooltipInput
                  id="inc-83-20"
                  label="Incremento di 83,20 per unità di personale in servizio al 31.12.2015 a valere dall'anno 2019 (risorse non soggette al limite)."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. a)"
                  value={incremento83_20}
                  onChange={setIncremento83_20}
                  tooltip="Incremento fisso per unità di personale in servizio, non soggetto al limite del salario accessorio"
                />

                <TooltipInput
                  id="inc-stip"
                  label="Incrementi stipendiali differenziali previsti dall'art. 64 per il personale in servizio (risorse non soggette al limite)."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. b)"
                  value={incrementiStipendiali}
                  onChange={setIncrementiStipendiali}
                  tooltip="Incrementi differenziali stipendiali per il personale in servizio"
                />

                <TooltipInput
                  id="int-ris"
                  label="Integrazione risorse dell'importo annuo della retribuzione individuale di anzianità e degli assegni ad personam in godimento da parte del personale comunque cessato dal servizio l'anno precedente (da inserire solo le nuove risorse che si liberano a partire dalle cessazioni verificatesi nell'anno precedente)."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 4 del CCNL 2001 c. 2 - art. 67 del CCNL 2018 c. 2 lett. c)"
                  value={integrazioneRisorse}
                  onChange={setIntegrazioneRisorse}
                  tooltip="Risorse liberate dalle cessazioni del personale nell'anno precedente"
                />

                <TooltipInput
                  id="ris-riass"
                  label="Eventuali risorse riassorbite ai sensi dell'art. 2, comma 3 del decreto legislativo 30 marzo 2001, n. 165/2001 (trattamenti economici più favorevoli in godimento)."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. d)"
                  value={risorseRiassorbite}
                  onChange={setRisorseRiassorbite}
                  tooltip="Risorse riassorbite da trattamenti economici più favorevoli"
                />

                <TooltipInput
                  id="somme-trasf"
                  label="Somme connesse al trattamento economico accessorio del personale trasferito agli enti del comparto a seguito processi di decentramento e delega di funzioni."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 15 del CCNL 1999 c. 1 lett. l) - art. 67 del CCNL 2018 c. 2 lett. e)"
                  value={sommeTrasferimento}
                  onChange={setSommeTrasferimento}
                  tooltip="Risorse derivanti dal trasferimento di personale da altri enti"
                />

                <TooltipInput
                  id="quota-oneri"
                  label="Per le Regioni, quota minori oneri dalla riduzione stabile di posti in organico qualifica dirigenziale, fino a 0,2% monte salari della stessa dirigenza, da destinare al fondo di cui all'art. 17, c. 2, lett. c); sono fatti salvi gli accordi di miglior favore."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 15 del CCNL 1999 c. 1 lett. i) - art. 67 del CCNL 2018 c. 2 lett. f)"
                  value={quotaMinoriOneri}
                  onChange={setQuotaMinoriOneri}
                  tooltip="Solo per le Regioni: quota derivante dalla riduzione di posti dirigenziali"
                />

                <TooltipInput
                  id="rid-stabile"
                  label="Riduzione stabile dello straordinario."
                  normativo="Art. 79 c. 1 CCNL 2022. Art. 14 del CCNL 1999 c. 3 - art. 67 del CCNL 2018 c. 2 lett. g)"
                  value={riduzioneStabile}
                  onChange={setRiduzioneStabile}
                  tooltip="Risorse derivanti dalla riduzione stabile del lavoro straordinario"
                />

                <TooltipInput
                  id="taglio-2010"
                  label="Eventuale taglio del fondo storicizzato - Art. 9 comma 2 bis D.L. n.78/2010 convertito in L.122/2010 Per il triennio 2011/2013 il tetto dei fondi per le risorse decentrate dei dipendenti e dei dirigenti non può superare quello del 2010 ed è ridotto automaticamente in proporzione alla riduzione del personale in servizio e s.m.i. da sottrarre (da inserire solo se l'importo annuale non è stato già ricompreso nell'unico importo storicizzato)."
                  normativo="Eventuale taglio del fondo storicizzato - Art. 9 comma 2 bis D.L. n.78/2010"
                  value={taglioFondo2010}
                  onChange={setTaglioFondo2010}
                  tooltip="Eventuale riduzione del fondo applicata nel triennio 2011-2013"
                />

                <TooltipInput
                  id="rid-ata"
                  label="Eventuali riduzioni del fondo per personale ATA, posizioni organizzative, processi di esternalizzazione o trasferimento di personale"
                  normativo="Eventuali riduzioni del fondo per personale ATA"
                  value={riduzioniATA}
                  onChange={setRiduzioniATA}
                  tooltip="Riduzioni dovute a trasferimenti o esternalizzazioni di personale"
                />

                <TooltipInput
                  id="decurt-fondo"
                  label="decurtazione fondo posizioni organizzative e alte professionalità, compreso il risultato, per gli enti con la dirigenza."
                  normativo="Art. 67 c. 1 CCNL 21.05.2018"
                  value={decurtazioneFondo}
                  onChange={setDecurtazioneFondo}
                  tooltip="Decurtazione per enti con dirigenza delle risorse per posizioni organizzative"
                />

                <TooltipInput
                  id="euro-84-50"
                  label="Euro 84,50 per n. unità in servizio al 31.12.2018 con decorrenza dal 01.01.2021 (da calcolarsi per intero sulle unità in servizio, risorse non soggette al limite)."
                  normativo="Art. 79 c. 1 lett. b) CCNL 2022"
                  value={euro84_50}
                  onChange={setEuro84_50}
                  tooltip="Incremento fisso per unità di personale, non soggetto al limite"
                />

                <TooltipInput
                  id="ris-stanz"
                  label="risorse stanziate dagli enti in caso di incremento stabile della consistenza di personale, in coerenza con il piano dei fabbisogni, al fine di sostenere gli oneri dei maggiori trattamenti economici del personale."
                  normativo="Art. 79 c. 1 lett. c) CCNL 2022"
                  value={risorseStanziate}
                  onChange={setRisorseStanziate}
                  tooltip="Risorse per incrementi stabili di personale"
                />

                <TooltipInput
                  id="diff-2022"
                  label="differenziali stipendiali personale in servizio nell'anno 2022 (risorse non soggette al limite)."
                  normativo="Art. 79 c. 1 lett. d) CCNL 2022"
                  value={differenzialiStipendiali2022}
                  onChange={setDifferenzialiStipendiali2022}
                  tooltip="Differenziali stipendiali per personale in servizio nel 2022"
                />

                <TooltipInput
                  id="diff-b3d3"
                  label="differenze stipendiali personale inquadrato in B3 e D3 (risorse non soggette al limite)."
                  normativo="Art. 79 c. 1-bis CCNL 2022"
                  value={differenzialiB3D3}
                  onChange={setDifferenzialiB3D3}
                  tooltip="Differenze stipendiali specifiche per categorie B3 e D3"
                />

              </CardContent>
            </Card>

            {/* FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">🟡 FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <TooltipInput
                  id="rec-evas"
                  label="Ricomprende sia le risorse derivanti dalla applicazione dell'art. 3, comma 57 della legge n. 662 del 1996 e dall'art. 59, comma 1, lett. p) del D. Lgs.n.446 del 1997 (recupero evasione ICI), sia le ulteriori risorse correlate agli effetti applicativi dell'art. 12, comma 1, lett. b) del D.L. n. 437 del 1996, convertito nella legge n. 556 del 1996."
                  normativo="Art. 4 del CCNL del 5/10/2001 c. 3), art. 15 c. 1 lett. k) CCNL 01.041999 - art. 67 del CCNL del 21.02.2018 c. 3 lett. c)"
                  value={recuperoEvasione}
                  onChange={setRecuperoEvasione}
                  tooltip="Risorse da recupero evasione fiscale ICI e altre correlate"
                />

                <TooltipInput
                  id="int-var"
                  label="Integrazione risorse dell'importo mensile residuo della retribuzione individuale di anzianità e degli assegni ad personam in godimento da parte del personale comunque cessato nell'anno in corso."
                  normativo="Art. 4 del CCNL 5/10/2001 c. 2 - art. 67 del CCNL del 21.05.2018 c. 3 lett. d)"
                  value={integrazioneRisorseVariabili}
                  onChange={setIntegrazioneRisorseVariabili}
                  tooltip="Integrazione per cessazioni nell'anno in corso"
                />

                <TooltipInput
                  id="casino"
                  label="Risorse destinate ai trattamenti accessori personale delle case da gioco."
                  normativo="Art. 67 del CCNL del 21.05.2018 c. 3 lett. g)"
                  value={risorsePersonaleCasino}
                  onChange={setRisorsePersonaleCasino}
                  tooltip="Risorse specifiche per personale delle case da gioco"
                />

                <TooltipInput
                  id="monte-1997"
                  label="Un importo massimo corrispondente all'1,2 % su base annua, del monte salari dell'anno 1997, relativo al personale destinatario del presente CCNL."
                  normativo="Art. 79 c. 2 lett. b) CCNL 2022"
                  value={monteSalari1997}
                  onChange={setMonteSalari1997}
                  tooltip="Incremento basato sull'1,2% del monte salari 1997"
                />

                <TooltipInput
                  id="int-art62"
                  label="Integrazione all'art. 62 del CCNL del 21.02.2018 c. 2 lett. e) somme connesse al trattamento economico accessorio del personale trasferito agli enti del comparto a seguito processi di decentramento e delega di funzioni."
                  normativo="Art. 67 del CCNL del 21.05.2018 c. 3 lett. k)"
                  value={integrazioneArt62}
                  onChange={setIntegrazioneArt62}
                  tooltip="Integrazione per personale trasferito con procedure di decentramento"
                />

                <TooltipInput
                  id="ris-adeg"
                  label="Risorse finalizzate ad adeguare le disponibilità del Fondo sulla base di scelte organizzative, gestionali e di politica retributiva degli enti, anche connesse ad assunzioni di personale a tempo determinato."
                  normativo="Art. 79 c. 2 lett. c) CCNL 2022"
                  value={risorseAdeguamento}
                  onChange={setRisorseAdeguamento}
                  tooltip="Risorse per adeguamento del fondo basato su scelte organizzative"
                />

              </CardContent>
            </Card>

            {/* FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-900">🟢 FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <TooltipInput
                  id="sponsor"
                  label="Somme derivanti dall'attuazione dell'art. 43, L. 449/1997 (contratti di nuove sponsorizzazione – convenzioni – contributi dell'utenza)."
                  normativo="Art. 15 del CCNL 1/4/1999 c. 1 lett. d) - Art. 67 del CCNL del 21.05.2018 c. 3 lett. a)"
                  value={sponsorizzazioni}
                  onChange={setSponsorizzazioni}
                  tooltip="Entrate da sponsorizzazioni e convenzioni con soggetti privati"
                />

                <TooltipInput
                  id="notifiche"
                  label="Quota parte rimborso spese per notificazione atti dell'amministrazione finanziaria (messi notificatori)."
                  normativo="Art. 54 CCNL 14/9/2000 - Art. 67 del CCNL del 21.05.2018 c. 3 lett. f)"
                  value={rimborsoNotifiche}
                  onChange={setRimborsoNotifiche}
                  tooltip="Rimborsi per attività di notificazione atti"
                />

                <TooltipInput
                  id="razion"
                  label="Piani di razionalizzazione e riqualificazione della spesa."
                  normativo="ART. 15 c. 1 lett. K), ART. 16, COMMI 4, 5 e 6 DL 98/2011 - Art. 67 del CCNL del 21.05.2018 c. 3 lett. b)"
                  value={pianiRazionalizzazione}
                  onChange={setPianiRazionalizzazione}
                  tooltip="Risorse da piani di razionalizzazione della spesa pubblica"
                />

                <TooltipInput
                  id="incentivi"
                  label="Incentivi per funzioni tecniche, art. 45 dlgs 36/2023, art. 76 dlgs 56/2017, per condono edilizio, per repressione illeciti edilizi, indennità centralinisti non vedenti."
                  normativo="Art. 15 c.1 lett. k) CCNL 1998-2001 - art. 67 del CCNL del 21.05.2018 c. 3 lett. c)"
                  value={incentiviFunzioni}
                  onChange={setIncentiviFunzioni}
                  tooltip="Incentivi per varie funzioni tecniche e specialistiche"
                />

                <TooltipInput
                  id="giudizio"
                  label="Incentivi spese del giudizio, compensi censimento e ISTAT."
                  normativo="Art. 18 c. lett. h) e Art. 67 del CCNL del 21.05.2018 c. 3 lett. c)"
                  value={incentiviGiudizio}
                  onChange={setIncentiviGiudizio}
                  tooltip="Compensi per attività giudiziarie e statistiche"
                />

                <TooltipInput
                  id="straord"
                  label="Eventuali risparmi derivanti dalla applicazione della disciplina dello straordinario di cui all'art. 14."
                  normativo="Art. 15, comma 1, del CCNL 1/4/1999 lett. m) - Art. 67 del CCNL del 21.05.2018 c. 3 lett. e)"
                  value={risparmiStraordinario}
                  onChange={setRisparmiStraordinario}
                  tooltip="Risparmi dalla gestione del lavoro straordinario"
                />

                <TooltipInput
                  id="regioni"
                  label="Per le Regioni a statuto ordinario e Città Metropolitane ai sensi dell'art. 23 c. 4 del dlgs 75/2017 incremento percentuale dell'importo di cui all'art. 67 c. 1 e 2."
                  normativo="Art. 67 del CCNL del 21.05.2018 c. 3 lett. j)"
                  value={incrementoRegioni}
                  onChange={setIncrementoRegioni}
                  tooltip="Incremento specifico per Regioni e Città Metropolitane"
                />

                <TooltipInput
                  id="non-util"
                  label="Somme non utilizzate negli esercizi precedenti (di parte stabile)"
                  normativo="Art. 80 c. 1 CCNL 2022"
                  value={sommeNonUtilizzate}
                  onChange={setSommeNonUtilizzate}
                  tooltip="Economie degli anni precedenti della parte stabile"
                />

                <TooltipInput
                  id="imu-tari"
                  label="Incentivi legati alla riscossione degli accertamenti IMU e TARI."
                  normativo="Legge 145 del 30.12.2018 art. 1 c. 1091"
                  value={incentiviIMUTARI}
                  onChange={setIncentiviIMUTARI}
                  tooltip="Incentivi per attività di riscossione tributi locali"
                />

                <TooltipInput
                  id="pasto"
                  label="Risparmi certificati sui buoni pasto non erogati anno 2020."
                  normativo="Legge 178/2020 art. 1 c. 870"
                  value={risparmiPasto}
                  onChange={setRisparmiPasto}
                  tooltip="Risparmi specifici sui buoni pasto non erogati nel 2020"
                />

                <TooltipInput
                  id="assunzioni"
                  label="Risorse accessorie eventuali per le assunzioni finanziate in deroga."
                  normativo="Dl 135/2018 art. 11 c. 1 lett. b)"
                  value={risorseAssunzioni}
                  onChange={setRisorseAssunzioni}
                  tooltip="Risorse per assunzioni in deroga ai vincoli"
                />

                <TooltipInput
                  id="fondo-022"
                  label="0,22% del monte salari anno 2018 con decorrenza dal 01.01.2022, quota d'incremento del fondo proporzionale."
                  normativo="Art. 79 c. 3 CCNL 2022"
                  value={incrementoFondo022}
                  onChange={setIncrementoFondo022}
                  tooltip="Incremento proporzionale basato sul monte salari 2018"
                />

                <TooltipInput
                  id="tantum"
                  label="Euro 84,50 per n. unità in servizio al 31.12.2018, quota una tantum annualità 2021 e 2022."
                  normativo="Art. 79 c. 1 lett. b) CCNL 2022"
                  value={euro84_50Tantum}
                  onChange={setEuro84_50Tantum}
                  tooltip="Quota una tantum per gli anni 2021 e 2022"
                />

                <TooltipInput
                  id="fondo-2022"
                  label="0,22% del monte salari anno 2018 con decorrenza dal 01.01.2022, quota d'incremento del fondo proporzionale, una tantum annualità 2022."
                  normativo="Art. 79 c. 3 CCNL 2022"
                  value={incrementoFondo2022}
                  onChange={setIncrementoFondo2022}
                  tooltip="Incremento una tantum per l'anno 2022"
                />

                <TooltipInput
                  id="pnrr"
                  label="Al fine di garantire maggiore efficienza ed efficacia dell'azione amministrativa in considerazione dei rilevanti impegni derivanti dall'attuazione dei progetti del PNRR e degli adempimenti connessi, per gli anni dal 2023 al 2026, gli enti locali che rispettano i requisiti di cui al comma 4 possono incrementare, oltre il limite di cui all'articolo 23, comma 2, del decreto legislativo 25 maggio 2017, n. 75, l'ammontare della componente variabile dei fondi per la contrattazione integrativa destinata al personale in servizio, anche di livello dirigenziale, in misura non superiore al 5 per cento della componente stabile di ciascuno dei fondi certificati nel 2016."
                  normativo="DL 13/2023 art. 8 c. 3"
                  value={incrementoPNRR}
                  onChange={setIncrementoPNRR}
                  tooltip="Incremento in deroga per progetti PNRR (2023-2026)"
                />

              </CardContent>
            </Card>

            {/* Altri Incrementi */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-900">🔮 Altri Incrementi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <TooltipInput
                  id="deroga"
                  label="Eventuale incremento salario accessorio in deroga realizzabile nell'anno."
                  normativo="Art. 33 c. 2 dl 34/2019"
                  value={incrementoSalarioDeroga}
                  onChange={setIncrementoSalarioDeroga}
                  tooltip="Incrementi in deroga autorizzati per l'anno corrente"
                />

                <TooltipInput
                  id="vincoli"
                  label="Misure conseguenti al mancato rispetto di vincoli finanziari posti alla contrattazione integrativa e all'utilizzo dei relativi fondi"
                  normativo="Art. 4 DL 16/2014"
                  value={misureVincoli}
                  onChange={setMisureVincoli}
                  tooltip="Misure correttive per mancato rispetto vincoli finanziari"
                />

              </CardContent>
            </Card>

          </div>

          {/* SEZIONE RISULTATI */}
          <div className="space-y-6">
            
            {/* Riepilogo Calcoli */}
            <Card className="border-2 border-blue-400">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">📊 RIEPILOGO CALCOLI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">SOMMA RISORSE STABILI:</span>
                    <span className="text-xl font-bold text-blue-900 font-mono">
                      {formatCurrency(risultati.sommaStabili)}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">SOMMA RISORSE VARIABILI SOGGETTE AL LIMITE:</span>
                    <span className="text-xl font-bold text-orange-900 font-mono">
                      {formatCurrency(risultati.sommaVariabiliSoggette)}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Totale parziale risorse disponibili per il fondo anno corrente:</span>
                    <span className="text-xl font-bold text-yellow-900 font-mono">
                      {formatCurrency(risultati.totaleParziale)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tetto complessivo salario accessorio 2016:</span>
                    <span className="text-lg font-semibold font-mono">
                      {formatCurrency(limiteComplessivo2016)}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  risultati.decurtazioneIncremento > 0 
                    ? 'bg-red-50 border-red-300' 
                    : 'bg-green-50 border-green-300'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {risultati.decurtazioneIncremento > 0 ? 'SFORAMENTO' : 'DISPONIBILITÀ'}:
                    </span>
                    <span className={`text-xl font-bold font-mono ${
                      risultati.decurtazioneIncremento > 0 ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {formatCurrency(Math.abs(risultati.totaleParziale - limiteComplessivo2016))}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">SOMMA RISORSE VARIABILI NON SOGGETTE AL LIMITE:</span>
                    <span className="text-xl font-bold text-green-900 font-mono">
                      {formatCurrency(risultati.sommaVariabiliNonSoggette)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">TOTALE RISORSE EFFETTIVAMENTE DISPONIBILI:</span>
                    <span className="text-2xl font-bold text-purple-900 font-mono">
                      {formatCurrency(risultati.totaleRisorse)}
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 bg-white p-4 rounded-lg">
          <p>Calcolo Fondo Risorse Decentrate secondo la struttura normativa del CCNL Funzioni Locali</p>
        </div>

      </div>
    </div>
  );
};

export default Index;
