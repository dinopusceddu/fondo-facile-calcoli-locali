import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Mail, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FondoPersonaleDipendente = () => {
  const navigate = useNavigate();
  const [risultatiVisible, setRisultatiVisible] = useState(false);
  
  // Nuovo stato per l'incremento decreto PA
  const [incrementoDecretoPA, setIncrementoDecretoPA] = useState("");
  
  // Verifica se il modulo incremento DL PA è stato compilato
  const datiIncrementoDLPA = localStorage.getItem('incremento-dl-pa-results');
  const incrementoDisponibile = datiIncrementoDLPA ? JSON.parse(datiIncrementoDLPA).incrementoNettoEffettivo : 0;
  const hasIncrementoDLPA = !!datiIncrementoDLPA;
  
  // Risorse Stabili
  const [unicoImportoFondo, setUnicoImportoFondo] = useState("");
  const [alteProfessionalita, setAlteProfessionalita] = useState("");
  const [incremento83, setIncremento83] = useState("");
  const [incrementiStipendiali, setIncrementiStipendiali] = useState("");
  const [integrazioneRisorse, setIntegrazioneRisorse] = useState("");
  const [risorseRiassorbite, setRisorseRiassorbite] = useState("");
  const [sommeConnesse, setSommeConnesse] = useState("");
  const [quotaMinori, setQuotaMinori] = useState("");
  const [riduzioneStabile, setRiduzioneStabile] = useState("");
  const [tagliofondo, setTaglioFondo] = useState("");
  const [riduzioniATA, setRiduzioniATA] = useState("");
  const [decurtazioneFondo, setDecurtazioneFondo] = useState("");
  const [euro84Unita, setEuro84Unita] = useState("");
  const [risorseStanziate, setRisorseStanziate] = useState("");
  const [differenzialiStipendiali2022, setDifferenzialiStipendiali2022] = useState("");
  const [differenzialiB3D3, setDifferenzialiB3D3] = useState("");

  // Risorse Variabili Soggette al Limite
  const [risorseEvasione, setRisorseEvasione] = useState("");
  const [integrazioneRisorseVariabili, setIntegrazioneRisorseVariabili] = useState("");
  const [risorseCaseGioco, setRisorseCaseGioco] = useState("");
  const [importoMassimo12, setImportoMassimo12] = useState("");
  const [integrazioneArt62, setIntegrazioneArt62] = useState("");
  const [risorseAdeguamento, setRisorseAdeguamento] = useState("");

  // Risorse Variabili Non Soggette al Limite
  const [sommeDerivanti, setSommeDerivanti] = useState("");
  const [quotaRimborso, setQuotaRimborso] = useState("");
  const [pianiRazionalizzazione, setPianiRazionalizzazione] = useState("");
  const [incentiviFunzioni, setIncentiviFunzioni] = useState("");
  const [incentivCompensati, setIncentivCompensati] = useState("");
  const [risparmiStraordinario, setRisparmiStraordinario] = useState("");
  const [incrementoPercettuale, setIncrementoPercettuale] = useState("");
  const [sommeNonUtilizzate, setSommeNonUtilizzate] = useState("");
  const [incentiviIMU, setIncentiviIMU] = useState("");
  const [risparmiCertificati, setRisparmiCertificati] = useState("");
  const [risorseAccessorie, setRisorseAccessorie] = useState("");
  const [quotaIncremento22, setQuotaIncremento22] = useState("");
  const [euro84TantumUnica, setEuro84TantumUnica] = useState("");
  const [quotaTantumFondo, setQuotaTantumFondo] = useState("");
  const [incrementoPNRR, setIncrementoPNRR] = useState("");

  // Altri Campi
  const [incrementoSalario, setIncrementoSalario] = useState("");
  const [misureVincoli, setMisureVincoli] = useState("");

  const [results, setResults] = useState<any>(null);

  // Funzione per gestire il cambio del campo incremento decreto PA
  const handleIncrementoDecretoPAChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    if (numericValue <= incrementoDisponibile) {
      setIncrementoDecretoPA(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calcolo delle somme - Risorse Stabili da SOMMARE (incluso incremento decreto PA)
    const risorseStabiliPositive = [
      parseFloat(unicoImportoFondo) || 0,
      parseFloat(alteProfessionalita) || 0,
      parseFloat(incremento83) || 0,
      parseFloat(incrementiStipendiali) || 0,
      parseFloat(integrazioneRisorse) || 0,
      parseFloat(risorseRiassorbite) || 0,
      parseFloat(sommeConnesse) || 0,
      parseFloat(quotaMinori) || 0,
      parseFloat(riduzioneStabile) || 0,
      parseFloat(euro84Unita) || 0,
      parseFloat(risorseStanziate) || 0,
      parseFloat(differenzialiStipendiali2022) || 0,
      parseFloat(differenzialiB3D3) || 0,
      parseFloat(incrementoDecretoPA) || 0  // Aggiunto incremento decreto PA
    ].reduce((sum, val) => sum + val, 0);

    // Risorse Stabili da SOTTRARRE (riduzioni del fondo)
    const risorseStabiliNegative = [
      parseFloat(tagliofondo) || 0,
      parseFloat(riduzioniATA) || 0,
      parseFloat(decurtazioneFondo) || 0
    ].reduce((sum, val) => sum + val, 0);

    // Calcolo finale delle risorse stabili
    const sommaRisorseStabili = risorseStabiliPositive - risorseStabiliNegative;

    const sommaRisorseVariabiliSoggette = [
      parseFloat(risorseEvasione) || 0,
      parseFloat(integrazioneRisorseVariabili) || 0,
      parseFloat(risorseCaseGioco) || 0,
      parseFloat(importoMassimo12) || 0,
      parseFloat(integrazioneArt62) || 0,
      parseFloat(risorseAdeguamento) || 0
    ].reduce((sum, val) => sum + val, 0);

    // Calcolo delle risorse stabili DA INCLUDERE (escludendo le 5 voci specificate)
    const risorseStabiliDaIncludere = [
      parseFloat(unicoImportoFondo) || 0,
      parseFloat(alteProfessionalita) || 0,
      parseFloat(integrazioneRisorse) || 0,
      parseFloat(risorseRiassorbite) || 0,
      parseFloat(sommeConnesse) || 0,
      parseFloat(quotaMinori) || 0,
      parseFloat(riduzioneStabile) || 0,
      parseFloat(risorseStanziate) || 0
    ].reduce((sum, val) => sum + val, 0);

    // Le 3 riduzioni del fondo da sottrarre
    const riduzioniDelFondo = [
      parseFloat(tagliofondo) || 0,
      parseFloat(riduzioniATA) || 0,
      parseFloat(decurtazioneFondo) || 0
    ].reduce((sum, val) => sum + val, 0);

    // Calcolo del totale parziale secondo art. 23 c. 2 d.lgs. 75/2017
    const totaleParzialeRisorse = risorseStabiliDaIncludere + sommaRisorseVariabiliSoggette - riduzioniDelFondo;

    const sommaRisorseVariabiliNonSoggette = [
      parseFloat(sommeDerivanti) || 0,
      parseFloat(quotaRimborso) || 0,
      parseFloat(pianiRazionalizzazione) || 0,
      parseFloat(incentiviFunzioni) || 0,
      parseFloat(incentivCompensati) || 0,
      parseFloat(risparmiStraordinario) || 0,
      parseFloat(incrementoPercettuale) || 0,
      parseFloat(sommeNonUtilizzate) || 0,
      parseFloat(incentiviIMU) || 0,
      parseFloat(risparmiCertificati) || 0,
      parseFloat(risorseAccessorie) || 0,
      parseFloat(quotaIncremento22) || 0,
      parseFloat(euro84TantumUnica) || 0,
      parseFloat(quotaTantumFondo) || 0,
      parseFloat(incrementoPNRR) || 0
    ].reduce((sum, val) => sum + val, 0);

    const incrementoSal = parseFloat(incrementoSalario) || 0;
    const misureVinc = parseFloat(misureVincoli) || 0;

    const totaleRisorseEffettivamenteDisponibili = 
      sommaRisorseStabili + 
      sommaRisorseVariabiliSoggette + 
      sommaRisorseVariabiliNonSoggette + 
      incrementoSal + 
      misureVinc;

    setResults({
      sommaRisorseStabili,
      sommaRisorseVariabiliSoggette,
      totaleParzialeRisorse,
      sommaRisorseVariabiliNonSoggette,
      incrementoSal,
      misureVinc,
      totaleRisorseEffettivamenteDisponibili
    });

    setRisultatiVisible(true);
  };

  const generatePDF = () => {
    // Implementazione generazione PDF
    console.log("Generazione PDF");
  };

  const exportToCSV = () => {
    // Implementazione export CSV
    console.log("Export CSV");
  };

  const sendEmail = () => {
    // Implementazione invio email
    console.log("Invio email");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 bg-white shadow-lg max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-32 h-16 mx-auto bg-red-600 flex items-center justify-center text-white font-bold text-lg rounded">
              FP CGIL
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Fondo Personale Dipendente
          </h1>
          <p className="text-gray-600">
            Simulazione per il calcolo del fondo del personale dipendente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Risorse Stabili */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>FONTI DI FINANZIAMENTO STABILI</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Alert per incremento decreto PA se disponibile */}
              {hasIncrementoDLPA && (
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    È disponibile un incremento dal Decreto PA di massimo € {incrementoDisponibile.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 1 Unico importo del fondo del salario accessorio consolidato all'anno 2017
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={unicoImportoFondo}
                    onChange={(e) => setUnicoImportoFondo(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 1 Alte professionalità 0,20% monte salari 2001
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={alteProfessionalita}
                    onChange={(e) => setAlteProfessionalita(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. a) Incremento di 83,20 per unità di personale
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incremento83}
                    onChange={(e) => setIncremento83(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. b) Incrementi stipendiali differenziali
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incrementiStipendiali}
                    onChange={(e) => setIncrementiStipendiali(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 4 del CCNL 2001 c. 2 lett. c) RIA personale cessato l'anno precedente
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={integrazioneRisorse}
                    onChange={(e) => setIntegrazioneRisorse(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 67 del CCNL 2018 c. 2 lett. d) Trattamenti economici più favorevoli in godimento
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseRiassorbite}
                    onChange={(e) => setRisorseRiassorbite(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 15 del CCNL 1999 c. 1 lett. l) Risorse personale trasferito per delega di funzioni
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={sommeConnesse}
                    onChange={(e) => setSommeConnesse(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 15 del CCNL 1999 c. 1 lett. i) Riduzione dirigenza delle Regioni
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={quotaMinori}
                    onChange={(e) => setQuotaMinori(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 CCNL 2022. Art. 14 del CCNL 1999 c. 3 Riduzione stabile dello straordinario
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={riduzioneStabile}
                    onChange={(e) => setRiduzioneStabile(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Eventuale taglio del fondo storicizzato - Art. 9 comma 2 bis D.L. n.78/2010
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={tagliofondo}
                    onChange={(e) => setTaglioFondo(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Eventuali riduzioni del fondo per personale ATA, posizioni organizzative
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={riduzioniATA}
                    onChange={(e) => setRiduzioniATA(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 67 c. 1 CCNL 21.05.2018 decurtazione fondo posizioni organizzative
                    <span className="block text-xs text-gray-500 mt-1">(da inserire se non già compreso nella prima voce)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={decurtazioneFondo}
                    onChange={(e) => setDecurtazioneFondo(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 lett. b) CCNL 2022 Euro 84,50 per n. unità in servizio
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={euro84Unita}
                    onChange={(e) => setEuro84Unita(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 lett. c) CCNL 2022 incremento per aumento dotazione organica
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseStanziate}
                    onChange={(e) => setRisorseStanziate(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 lett. d) CCNL 2022 differenziali stipendiali personale in servizio nell'anno 2022
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={differenzialiStipendiali2022}
                    onChange={(e) => setDifferenzialiStipendiali2022(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1-bis CCNL 2022 differenze stipendiali personale inquadrato in B3 e D3
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={differenzialiB3D3}
                    onChange={(e) => setDifferenzialiB3D3(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                
                {/* Campo Incremento Decreto PA spostato alla fine */}
                {hasIncrementoDLPA && (
                  <div className="md:col-span-2 border-2 border-green-300 bg-green-50 p-4 rounded">
                    <label className="block text-sm font-medium mb-2 text-green-800">
                      <strong>Incremento Decreto PA (DL 25/2025)</strong>
                      <span className="block text-xs text-green-600 mt-1">
                        Massimo disponibile: € {incrementoDisponibile.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                      </span>
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={incrementoDecretoPA}
                      onChange={(e) => handleIncrementoDecretoPAChange(e.target.value)}
                      placeholder="€ 0,00"
                      max={incrementoDisponibile}
                      className="border-green-400 focus:border-green-600"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Risorse Variabili Soggette al Limite */}
          <Card>
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle>FONTI DI FINANZIAMENTO VARIABILI SOGGETTE AL LIMITE</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 4 del CCNL del 5/10/2001 c. 3) Recupero evasione ICI
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseEvasione}
                    onChange={(e) => setRisorseEvasione(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 4 del CCNL 5/10/2001 c. 2 RIA anno in corso
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={integrazioneRisorseVariabili}
                    onChange={(e) => setIntegrazioneRisorseVariabili(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 67 del CCNL del 21.05.2018 c. 3 lett. g) Risorse destinate ai trattamenti accessori personale delle case da gioco
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseCaseGioco}
                    onChange={(e) => setRisorseCaseGioco(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 2 lett. b) CCNL 2022 1,2 % MS 1997
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={importoMassimo12}
                    onChange={(e) => setImportoMassimo12(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 67 del CCNL del 21.05.2018 c. 3 lett. k) Risorse personale trasferito per delega di funzioni
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={integrazioneArt62}
                    onChange={(e) => setIntegrazioneArt62(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 2 lett. c) CCNL 2022 Risorse incremento del Fondo
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseAdeguamento}
                    onChange={(e) => setRisorseAdeguamento(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risorse Variabili Non Soggette al Limite */}
          <Card>
            <CardHeader className="bg-green-600 text-white">
              <CardTitle>FONTI DI FINANZIAMENTO VARIABILI NON SOGGETTE AL LIMITE</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 15 del CCNL 1/4/1999 c. 1 lett. d) Somme derivanti dall'attuazione dell'art. 43
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={sommeDerivanti}
                    onChange={(e) => setSommeDerivanti(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 54 CCNL 14/9/2000 Quota parte rimborso spese per notificazione atti
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={quotaRimborso}
                    onChange={(e) => setQuotaRimborso(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ART. 15 c. 1 lett. K), ART. 16, COMMI 4, 5 e 6 DL 98/2011 Piani di razionalizzazione
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={pianiRazionalizzazione}
                    onChange={(e) => setPianiRazionalizzazione(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 15 c.1 lett. k) CCNL 1998-2001 Incentivi per funzioni tecniche
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incentiviFunzioni}
                    onChange={(e) => setIncentiviFunzioni(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 18 c. lett. h) e Art. 67 del CCNL del 21.05.2018 c. 3 lett. c) Incentivi spese del giudizio
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incentivCompensati}
                    onChange={(e) => setIncentivCompensati(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 15, comma 1, del CCNL 1/4/1999 lett. m) Eventuali risparmi derivanti
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risparmiStraordinario}
                    onChange={(e) => setRisparmiStraordinario(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 67 del CCNL del 21.05.2018 c. 3 lett. j) Incremento percettuale dell'importo
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incrementoPercettuale}
                    onChange={(e) => setIncrementoPercettuale(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 80 c. 1 CCNL 2022, Somme non utilizzate negli esercizi precedenti
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={sommeNonUtilizzate}
                    onChange={(e) => setSommeNonUtilizzate(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Legge 145 del 30.12.2018 art. 1 c. 1091 Incentivi legati alla riscossione degli accertamenti
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incentiviIMU}
                    onChange={(e) => setIncentiviIMU(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Legge 178/2020 art. 1 c. 870 Risparmi certificati sui buoni pasto
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risparmiCertificati}
                    onChange={(e) => setRisparmiCertificati(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dl 135/2018 art. 11 c. 1 lett. b) Risorse accessorie eventuali
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={risorseAccessorie}
                    onChange={(e) => setRisorseAccessorie(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 3 CCNL 2022 0,22% del monte salari anno 2018
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={quotaIncremento22}
                    onChange={(e) => setQuotaIncremento22(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 1 lett. b) CCNL 2022 Euro 84,50 una tantum annualità 2021 e 2022
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={euro84TantumUnica}
                    onChange={(e) => setEuro84TantumUnica(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 79 c. 3 CCNL 2022 0,22% del monte salari anno 2018 una tantum annualità 2022
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={quotaTantumFondo}
                    onChange={(e) => setQuotaTantumFondo(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    DL 13/2023 art. 8 c. 3. Al fine di garantire maggiore efficienza ed efficacia dell'azione amministrativa
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incrementoPNRR}
                    onChange={(e) => setIncrementoPNRR(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Altri Campi */}
          <Card>
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle>ALTRE VOCI</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 33 c. 2 dl 34/2019 Eventuale incremento salario accessorio in deroga
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={incrementoSalario}
                    onChange={(e) => setIncrementoSalario(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 4 DL 16/2014 Misure conseguenti al mancato rispetto di vincoli finanziari
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={misureVincoli}
                    onChange={(e) => setMisureVincoli(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
            >
              Calcola Fondo
            </Button>
          </div>
        </form>

        {/* Risultati */}
        {risultatiVisible && results && (
          <Card className="mt-8">
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle>Risultati del Calcolo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded">
                    <h3 className="font-bold text-red-800 mb-2">SOMMA RISORSE STABILI</h3>
                    <p className="text-2xl font-bold text-red-600">
                      € {results.sommaRisorseStabili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-bold text-blue-800 mb-2">SOMMA RISORSE VARIABILI SOGGETTE AL LIMITE</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      € {results.sommaRisorseVariabiliSoggette.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded">
                    <h3 className="font-bold text-orange-800 mb-2">TOTALE PARZIALE RISORSE PER IL FONDO</h3>
                    <p className="text-2xl font-bold text-orange-600">
                      € {results.totaleParzialeRisorse.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                    <span className="text-xs text-gray-500">
                      (secondo art. 23 c. 2 d.lgs. 75/2017)
                    </span>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <h3 className="font-bold text-green-800 mb-2">SOMMA RISORSE VARIABILI NON SOGGETTE AL LIMITE</h3>
                    <p className="text-2xl font-bold text-green-600">
                      € {results.sommaRisorseVariabiliNonSoggette.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-gray-800 text-white p-4 rounded md:col-span-2">
                    <h3 className="font-bold mb-2">TOTALE RISORSE EFFETTIVAMENTE DISPONIBILI</h3>
                    <p className="text-3xl font-bold">
                      € {results.totaleRisorseEffettivamenteDisponibili.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <Button onClick={generatePDF} className="bg-red-600 hover:bg-red-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Genera Report PDF
                  </Button>
                  <Button onClick={exportToCSV} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Esporta in CSV
                  </Button>
                  <Button onClick={sendEmail} variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Invia Report via Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FondoPersonaleDipendente;