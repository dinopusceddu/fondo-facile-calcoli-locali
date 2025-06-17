
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FileDown, Mail, FileText, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Dati di fallback per i comuni lombardi
const comuniDataGlobalSample = [
  { nome: "Milano", provincia: "MI", regione: "Lombardia", num_residenti: 1396059 },
  { nome: "Brescia", provincia: "BS", regione: "Lombardia", num_residenti: 196745 },
  { nome: "Bergamo", provincia: "BG", regione: "Lombardia", num_residenti: 122476 },
  { nome: "Monza", provincia: "MB", regione: "Lombardia", num_residenti: 123598 },
  { nome: "Como", provincia: "CO", regione: "Lombardia", num_residenti: 83320 },
  { nome: "Varese", provincia: "VA", regione: "Lombardia", num_residenti: 80511 },
  { nome: "Cremona", provincia: "CR", regione: "Lombardia", num_residenti: 72077 },
  { nome: "Pavia", provincia: "PV", regione: "Lombardia", num_residenti: 73086 },
  { nome: "Mantova", provincia: "MN", regione: "Lombardia", num_residenti: 49490 },
  { nome: "Lecco", provincia: "LC", regione: "Lombardia", num_residenti: 48131 },
  { nome: "Lodi", provincia: "LO", regione: "Lombardia", num_residenti: 45863 },
  { nome: "Sondrio", provincia: "SO", regione: "Lombardia", num_residenti: 21876 }
];

const IncrementoDLPA = () => {
  const navigate = useNavigate();
  
  // Dati dell'ente
  const [provincia, setProvincia] = useState("");
  const [comune, setComune] = useState("");
  const [denominazioneEnte, setDenominazioneEnte] = useState("");
  const [numeroAbitanti, setNumeroAbitanti] = useState<number>(0);
  const [sogliaSpesaPersonale, setSogliaSpesaPersonale] = useState<number>(0);

  // Dati per calcolo
  const [fontoStorico2016, setFontoStorico2016] = useState<number>(0);
  const [incrementoAnnuale, setIncrementoAnnuale] = useState<number>(0);
  const [spesePersonale2023, setSpesePersonale2023] = useState<number>(0);
  const [entrateCorrenti2023, setEntrateCorrenti2023] = useState<number>(0);

  // Dati per limiti spesa personale
  const [limiteSpesaPersonale, setLimiteSpesaPersonale] = useState<number>(0);
  const [mediaSpesa20112013, setMediaSpesa20112013] = useState<number>(0);
  
  // Verifiche normative
  const [rispettoLimiti, setRispettoLimiti] = useState("si");
  const [equilibrioBilancio, setEquilibrioBilancio] = useState("si");
  const [pattoDiStabilita, setPattoDiStabilita] = useState("si");

  // Risultati
  const [risultatiCalcolo, setRisultatiCalcolo] = useState<any>(null);
  const [datiPerReport, setDatiPerReport] = useState<any>(null);

  // Dati comuni
  const [comuni, setComuni] = useState<any[]>([]);
  const [province, setProvince] = useState<string[]>([]);
  const [comuniFiltrati, setComuniFiltrati] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  // Funzione per calcolare la soglia secondo DM 17/03/2020
  const getSogliaPercentualeDL34 = (abitanti: number): number => {
    if (abitanti <= 999) return 29.50;
    if (abitanti <= 1999) return 28.60;
    if (abitanti <= 2999) return 27.60;
    if (abitanti <= 4999) return 27.20;
    if (abitanti <= 9999) return 26.90;
    if (abitanti <= 59999) return 27.00;
    if (abitanti <= 249999) return 27.60;
    if (abitanti <= 1499999) return 28.80;
    return 25.30; // 1.500.000 abitanti in su
  };

  // Caricamento dati comuni all'avvio
  useEffect(() => {
    const loadComuniData = async () => {
      try {
        setIsLoadingData(true);
        console.log("Tentativo di caricamento dati da GitHub...");
        
        const response = await fetch('https://dinopusceddu.github.io/comunilombardi/italy_cities.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Dati caricati da GitHub con successo", data);
        
        // Verifica la struttura dei dati e estrai l'array corretto
        let comuniArray = [];
        if (data.Foglio1 && Array.isArray(data.Foglio1)) {
          comuniArray = data.Foglio1;
        } else if (Array.isArray(data)) {
          comuniArray = data;
        } else {
          throw new Error("Struttura dati non riconosciuta");
        }
        
        // Filtra solo i comuni della Lombardia e normalizza i campi
        const comuniLombardia = comuniArray
          .filter((comune: any) => comune.regione === "Lombardia")
          .map((comune: any) => ({
            nome: comune.comune || comune.nome,
            provincia: comune.provincia,
            regione: comune.regione,
            num_residenti: comune.num_residenti || 0
          }));
        
        console.log("Comuni Lombardia trovati:", comuniLombardia.length);
        setComuni(comuniLombardia);
        setUsingFallbackData(false);
        
      } catch (error) {
        console.error("Errore nel caricamento dei dati da GitHub:", error);
        console.log("Utilizzo dei dati di fallback locali");
        
        // Usa i dati di fallback
        setComuni(comuniDataGlobalSample);
        setUsingFallbackData(true);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadComuniData();
  }, []);

  // Popolamento dinamico delle province
  useEffect(() => {
    if (comuni.length > 0) {
      // Crea elenco univoco delle province
      const provinceUniche = [...new Set(comuni.map(c => c.provincia))].sort();
      setProvince(provinceUniche);
      console.log("Province caricate:", provinceUniche);
    }
  }, [comuni]);

  // Filtraggio comuni per provincia selezionata
  useEffect(() => {
    if (provincia && comuni.length > 0) {
      const filtrati = comuni.filter(c => c.provincia === provincia).sort((a, b) => a.nome.localeCompare(b.nome));
      setComuniFiltrati(filtrati);
      console.log(`Comuni filtrati per provincia ${provincia}:`, filtrati.length);
    } else {
      setComuniFiltrati([]);
    }
  }, [provincia, comuni]);

  // Gestione selezione comune
  const handleComuneChange = (nomeComune: string) => {
    setComune(nomeComune);
    const comuneSelezionato = comuniFiltrati.find(c => c.nome === nomeComune);
    
    if (comuneSelezionato) {
      console.log("Comune selezionato:", comuneSelezionato);
      
      // Compila automaticamente i campi
      setDenominazioneEnte(comuneSelezionato.nome);
      setNumeroAbitanti(comuneSelezionato.num_residenti);
      
      // Calcola la soglia secondo DM 17/03/2020
      const soglia = getSogliaPercentualeDL34(comuneSelezionato.num_residenti);
      setSogliaSpesaPersonale(soglia);
      
      console.log(`Soglia calcolata per ${comuneSelezionato.num_residenti} abitanti: ${soglia}%`);
    }
  };

  const parseNumericValue = (value: string): number => {
    return parseFloat(value.replace(/,/g, '.').replace(/[^\d.-]/g, '')) || 0;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const procediConCalcolo = (event: React.FormEvent) => {
    event.preventDefault();

    // FASE 1: Calcolo base incremento fondo
    const incrementoBase = fontoStorico2016 * 0.05; // 5% del fondo storico 2016
    
    // FASE 2: Calcolo incremento disponibile
    const incrementoDisponibile = incrementoBase + incrementoAnnuale;
    
    // FASE 3: Verifica limiti spesa personale
    const percentualeSpesePersonale = (spesePersonale2023 / entrateCorrenti2023) * 100;
    const rispettaLimiti = percentualeSpesePersonale <= sogliaSpesaPersonale;
    
    // FASE 4: Calcolo incremento effettivo
    let incrementoEffettivo = 0;
    if (rispettaLimiti && rispettoLimiti === "si" && equilibrioBilancio === "si" && pattoDiStabilita === "si") {
      incrementoEffettivo = incrementoDisponibile;
    } else {
      incrementoEffettivo = incrementoDisponibile * 0.5; // Riduzione del 50% se non rispetta tutti i criteri
    }
    
    // FASE 5: Calcolo fondo finale
    const fondoFinale = fontoStorico2016 + incrementoEffettivo;

    const risultati = {
      incrementoBase,
      incrementoDisponibile,
      percentualeSpesePersonale,
      rispettaLimiti,
      incrementoEffettivo,
      fondoFinale,
      risparmioPotenziale: incrementoEffettivo
    };

    const dati = {
      ente: {
        denominazione: denominazioneEnte,
        provincia,
        comune,
        abitanti: numeroAbitanti,
        sogliaSpesa: sogliaSpesaPersonale
      },
      calcoli: {
        fontoStorico2016,
        incrementoAnnuale,
        spesePersonale2023,
        entrateCorrenti2023,
        limiteSpesaPersonale,
        mediaSpesa20112013
      },
      verifiche: {
        rispettoLimiti,
        equilibrioBilancio,
        pattoDiStabilita
      },
      risultati
    };

    setRisultatiCalcolo(risultati);
    setDatiPerReport(dati);
  };

  const generaReportPDF = () => {
    // Implementazione generazione PDF con jsPDF
    console.log("Generazione PDF...", datiPerReport);
  };

  const esportaCSV = () => {
    if (!datiPerReport) return;
    
    const csvContent = [
      "Campo;Valore",
      `Denominazione Ente;${datiPerReport.ente.denominazione}`,
      `Provincia;${datiPerReport.ente.provincia}`,
      `Numero Abitanti;${datiPerReport.ente.abitanti}`,
      `Fondo Storico 2016;${datiPerReport.calcoli.fontoStorico2016}`,
      `Incremento Effettivo;${datiPerReport.risultati.incrementoEffettivo}`,
      `Fondo Finale;${datiPerReport.risultati.fondoFinale}`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'elevate_qualificazioni_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inviaEmail = () => {
    if (!datiPerReport) return;
    
    const oggetto = encodeURIComponent("Simulazione Elevate Qualificazioni - " + datiPerReport.ente.denominazione);
    const corpo = encodeURIComponent(`
Simulazione Elevate Qualificazioni

Ente: ${datiPerReport.ente.denominazione}
Provincia: ${datiPerReport.ente.provincia}
Abitanti: ${datiPerReport.ente.abitanti}

Fondo Storico 2016: ${formatCurrency(datiPerReport.calcoli.fontoStorico2016)}
Incremento Effettivo: ${formatCurrency(datiPerReport.risultati.incrementoEffettivo)}
Fondo Finale: ${formatCurrency(datiPerReport.risultati.fondoFinale)}

Generato il ${new Date().toLocaleDateString('it-IT')}
    `);
    
    window.location.href = `mailto:?subject=${oggetto}&body=${corpo}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 bg-white shadow-lg max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-32 h-16 mx-auto bg-red-600 flex items-center justify-center text-white font-bold text-lg rounded">
              FP CGIL
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Simulazione Incremento Fondo Elevate Qualificazioni
          </h1>
          <p className="text-gray-600">
            Calcolo basato su DL 25/2025, DM 17/03/2020, L. 296/06
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mt-4"
          >
            ← Torna alla Home
          </Button>
        </div>

        {/* Alert per dati di fallback */}
        {usingFallbackData && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Attenzione: Si stanno utilizzando dati di esempio. Non è stato possibile caricare l'elenco completo dei comuni.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading indicator */}
        {isLoadingData && (
          <Alert className="mb-6">
            <AlertDescription>
              Caricamento dati comuni in corso...
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={procediConCalcolo} className="space-y-8">
          {/* Informazioni Ente */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Informazioni Ente</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provincia">Seleziona Provincia</Label>
                  <Select value={provincia} onValueChange={setProvincia} disabled={isLoadingData}>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoadingData ? "Caricamento..." : "Seleziona una provincia"} />
                    </SelectTrigger>
                    <SelectContent>
                      {province.map((prov) => (
                        <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comune">Seleziona Comune</Label>
                  <Select value={comune} onValueChange={handleComuneChange} disabled={!provincia || isLoadingData}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un comune" />
                    </SelectTrigger>
                    <SelectContent>
                      {comuniFiltrati.map((com) => (
                        <SelectItem key={com.nome} value={com.nome}>{com.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="denominazione">Denominazione dell'Ente</Label>
                  <Input
                    id="denominazione"
                    value={denominazioneEnte}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="abitanti">Numero abitanti dell'Ente</Label>
                  <Input
                    id="abitanti"
                    type="number"
                    value={numeroAbitanti || ''}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sogliaSpesa">Soglia % Spesa Personale / Entrate Correnti (DM 17/03/2020)</Label>
                <Input
                  id="sogliaSpesa"
                  value={sogliaSpesaPersonale ? `${sogliaSpesaPersonale}%` : ''}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dati per Calcolo */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Dati per Calcolo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontoStorico">Fondo Storico 2016 (€)</Label>
                  <Input
                    id="fontoStorico"
                    type="number"
                    step="0.01"
                    value={fontoStorico2016 || ''}
                    onChange={(e) => setFontoStorico2016(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incrementoAnnuale">Incremento Annuale (€)</Label>
                  <Input
                    id="incrementoAnnuale"
                    type="number"
                    step="0.01"
                    value={incrementoAnnuale || ''}
                    onChange={(e) => setIncrementoAnnuale(parseNumericValue(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spesePersonale">Spese Personale 2023 (€)</Label>
                  <Input
                    id="spesePersonale"
                    type="number"
                    step="0.01"
                    value={spesePersonale2023 || ''}
                    onChange={(e) => setSpesePersonale2023(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entrateCorrenti">Entrate Correnti 2023 (€)</Label>
                  <Input
                    id="entrateCorrenti"
                    type="number"
                    step="0.01"
                    value={entrateCorrenti2023 || ''}
                    onChange={(e) => setEntrateCorrenti2023(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dati per Limiti Spesa Personale */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Dati per Limiti Spesa Personale</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="limiteSpesa">Limite Spesa Personale (€)</Label>
                  <Input
                    id="limiteSpesa"
                    type="number"
                    step="0.01"
                    value={limiteSpesaPersonale || ''}
                    onChange={(e) => setLimiteSpesaPersonale(parseNumericValue(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mediaSpesa">Media Spesa 2011-2013 (€)</Label>
                  <Input
                    id="mediaSpesa"
                    type="number"
                    step="0.01"
                    value={mediaSpesa20112013 || ''}
                    onChange={(e) => setMediaSpesa20112013(parseNumericValue(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verifiche Normative */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Verifiche Normative</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">L'ente rispetta i limiti di spesa del personale?</Label>
                  <RadioGroup value={rispettoLimiti} onValueChange={setRispettoLimiti} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="limiti-si" />
                      <Label htmlFor="limiti-si">Sì</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="limiti-no" />
                      <Label htmlFor="limiti-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">L'ente è in equilibrio di bilancio?</Label>
                  <RadioGroup value={equilibrioBilancio} onValueChange={setEquilibrioBilancio} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="equilibrio-si" />
                      <Label htmlFor="equilibrio-si">Sì</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="equilibrio-no" />
                      <Label htmlFor="equilibrio-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">L'ente rispetta il patto di stabilità?</Label>
                  <RadioGroup value={pattoDiStabilita} onValueChange={setPattoDiStabilita} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="patto-si" />
                      <Label htmlFor="patto-si">Sì</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="patto-no" />
                      <Label htmlFor="patto-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Calcola
            </Button>
          </div>
        </form>

        {/* Risultati */}
        {risultatiCalcolo && (
          <div className="mt-8">
            <Card>
              <CardHeader className="bg-green-600 text-white">
                <CardTitle>Risultati del Calcolo</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded">
                      <Label className="font-semibold">Incremento Base (5%)</Label>
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(risultatiCalcolo.incrementoBase)}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded">
                      <Label className="font-semibold">Incremento Disponibile</Label>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(risultatiCalcolo.incrementoDisponibile)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded">
                      <Label className="font-semibold">% Spese Personale / Entrate</Label>
                      <div className={`text-xl font-bold ${risultatiCalcolo.rispettaLimiti ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(risultatiCalcolo.percentualeSpesePersonale)}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded">
                      <Label className="font-semibold">Incremento Effettivo</Label>
                      <div className="text-xl font-bold text-purple-600">
                        {formatCurrency(risultatiCalcolo.incrementoEffettivo)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                    <Label className="font-semibold text-lg">Fondo Finale</Label>
                    <div className="text-3xl font-bold text-red-600">
                      {formatCurrency(risultatiCalcolo.fondoFinale)}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Azioni Aggiuntive</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={generaReportPDF} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Genera PDF
                    </Button>
                    
                    <Button onClick={esportaCSV} variant="outline" className="flex items-center gap-2">
                      <FileDown className="h-4 w-4" />
                      Esporta CSV
                    </Button>
                    
                    <Button onClick={inviaEmail} variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Invia via Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncrementoDLPA;
