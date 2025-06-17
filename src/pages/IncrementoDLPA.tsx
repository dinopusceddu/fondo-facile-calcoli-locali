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
  const [numeroDipendenti, setNumeroDipendenti] = useState<number>(0);
  const [sogliaSpesaPersonale, setSogliaSpesaPersonale] = useState<number>(0);

  // Dati per calcolo - RIVISTI
  const [stipendiTabellari2023, setStipendiTabellari2023] = useState<number>(0);
  const [componenteStabileFondo, setComponenteStabileFondo] = useState<number>(0);
  const [risorsePOEQ, setRisorsePOEQ] = useState<number>(0);
  const [spesaPersonale2023, setSpesaPersonale2023] = useState<number>(0);
  const [mediaEntrateCorrenti2021_2023, setMediaEntrateCorrenti2021_2023] = useState<number>(0);
  const [tettoSpesaPersonale296_06, setTettoSpesaPersonale296_06] = useState<number>(0);
  const [costoNuoveAssunzioni, setCostoNuoveAssunzioni] = useState<number>(0);
  const [percentualeOneri, setPercentualeOneri] = useState<number>(33);

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

    // FASE 1: Incremento Potenziale Massimo (Regola del 48%)
    const obiettivo48Percentuale = stipendiTabellari2023 * 0.48;
    const fondoAttualeComplessivo = componenteStabileFondo + risorsePOEQ;
    const incrementoPotenzialeLordo = Math.max(0, obiettivo48Percentuale - fondoAttualeComplessivo);
    
    // FASE 2: Verifica Limite di Spesa del Personale (DM 17/3/2020)
    const spesaPersonaleAttuale = spesaPersonale2023 + costoNuoveAssunzioni;
    const sogliaPercentuale = sogliaSpesaPersonale / 100; // Converti in decimale
    const limiteSostenibileDL34 = mediaEntrateCorrenti2021_2023 * sogliaPercentuale;
    const spazioDisponibileDL34 = Math.max(0, limiteSostenibileDL34 - spesaPersonaleAttuale);
    
    // FASE 3: Verifica Limite del Tetto Storico (L. 296/06)
    const margineDisponibileC557 = Math.max(0, tettoSpesaPersonale296_06 - spesaPersonaleAttuale);
    
    // FASE 4: Determinazione dello Spazio Utilizzabile Lordo
    const spazioUtilizzabileLordo = Math.min(
      incrementoPotenzialeLordo,
      spazioDisponibileDL34,
      margineDisponibileC557
    );
    
    // FASE 5: Calcolo dell'Incremento Netto Effettivo del Fondo
    const divisoreOneri = 1 + (percentualeOneri / 100);
    const incrementoNettoEffettivo = spazioUtilizzabileLordo / divisoreOneri;

    // Calcolo percentuale spese personale per controllo
    const percentualeSpesePersonaleAttuale = (spesaPersonaleAttuale / mediaEntrateCorrenti2021_2023) * 100;

    const risultati = {
      // Fase 1
      obiettivo48Percentuale,
      fondoAttualeComplessivo,
      incrementoPotenzialeLordo,
      
      // Fase 2
      spesaPersonaleAttuale,
      limiteSostenibileDL34,
      spazioDisponibileDL34,
      percentualeSpesePersonaleAttuale,
      
      // Fase 3
      margineDisponibileC557,
      
      // Fase 4 e 5
      spazioUtilizzabileLordo,
      incrementoNettoEffettivo,
      
      // Dettagli vincoli
      vincoloLimitante: spazioUtilizzabileLordo === incrementoPotenzialeLordo ? "Regola 48%" :
                       spazioUtilizzabileLordo === spazioDisponibileDL34 ? "DM 17/3/2020" : "L. 296/06"
    };

    const dati = {
      ente: {
        denominazione: denominazioneEnte,
        provincia,
        comune,
        abitanti: numeroAbitanti,
        dipendenti: numeroDipendenti,
        sogliaSpesa: sogliaSpesaPersonale
      },
      calcoli: {
        stipendiTabellari2023,
        componenteStabileFondo,
        risorsePOEQ,
        spesaPersonale2023,
        mediaEntrateCorrenti2021_2023,
        tettoSpesaPersonale296_06,
        costoNuoveAssunzioni,
        percentualeOneri
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
      `Stipendi Tabellari 2023;${datiPerReport.calcoli.stipendiTabellari2023}`,
      `Incremento Netto Effettivo;${datiPerReport.risultati.incrementoNettoEffettivo}`,
      `Spazio Utilizzabile Lordo;${datiPerReport.risultati.spazioUtilizzabileLordo}`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'incremento_dlpa_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inviaEmail = () => {
    if (!datiPerReport) return;
    
    const oggetto = encodeURIComponent("Simulazione Incremento DL PA - " + datiPerReport.ente.denominazione);
    const corpo = encodeURIComponent(`
Simulazione Incremento Fondo DL PA

Ente: ${datiPerReport.ente.denominazione}
Provincia: ${datiPerReport.ente.provincia}
Abitanti: ${datiPerReport.ente.abitanti}

Stipendi Tabellari 2023: ${formatCurrency(datiPerReport.calcoli.stipendiTabellari2023)}
Incremento Netto Effettivo: ${formatCurrency(datiPerReport.risultati.incrementoNettoEffettivo)}
Spazio Utilizzabile Lordo: ${formatCurrency(datiPerReport.risultati.spazioUtilizzabileLordo)}

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
            Simulazione Incremento Fondo DL PA
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="dipendenti">N. dipendenti che attingeranno al fondo nel 2025</Label>
                  <Input
                    id="dipendenti"
                    type="number"
                    value={numeroDipendenti || ''}
                    onChange={(e) => setNumeroDipendenti(parseNumericValue(e.target.value))}
                    required
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

          {/* Dati per Calcolo - COMPLETAMENTE RIVISTI */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Dati per Calcolo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stipendiTabellari">Stipendi tabellari del personale in servizio al 31/12/2023 (€)</Label>
                  <Input
                    id="stipendiTabellari"
                    type="number"
                    step="0.01"
                    value={stipendiTabellari2023 || ''}
                    onChange={(e) => setStipendiTabellari2023(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="componenteStabile">Componente stabile del Fondo ultimo approvato (€)</Label>
                  <Input
                    id="componenteStabile"
                    type="number"
                    step="0.01"
                    value={componenteStabileFondo || ''}
                    onChange={(e) => setComponenteStabileFondo(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="risorsePOEQ">Risorse PO / Elevate Qualificazioni ultimo approvato (€)</Label>
                  <Input
                    id="risorsePOEQ"
                    type="number"
                    step="0.01"
                    value={risorsePOEQ || ''}
                    onChange={(e) => setRisorsePOEQ(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spesaPersonale">Spesa di personale risultante dal consuntivo 2023 (€)</Label>
                  <Input
                    id="spesaPersonale"
                    type="number"
                    step="0.01"
                    value={spesaPersonale2023 || ''}
                    onChange={(e) => setSpesaPersonale2023(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mediaEntrate">Media triennio 2021-2023 delle Entrate correnti (€)</Label>
                  <Input
                    id="mediaEntrate"
                    type="number"
                    step="0.01"
                    value={mediaEntrateCorrenti2021_2023 || ''}
                    onChange={(e) => setMediaEntrateCorrenti2021_2023(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tettoSpesa">Tetto di spesa personale L. 296/06 (media 2011-13) (€)</Label>
                  <Input
                    id="tettoSpesa"
                    type="number"
                    step="0.01"
                    value={tettoSpesaPersonale296_06 || ''}
                    onChange={(e) => setTettoSpesaPersonale296_06(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costoAssunzioni">Costo annuo nuove assunzioni previste da PIAO (€)</Label>
                  <Input
                    id="costoAssunzioni"
                    type="number"
                    step="0.01"
                    value={costoNuoveAssunzioni || ''}
                    onChange={(e) => setCostoNuoveAssunzioni(parseNumericValue(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="percentualeOneri">Percentuale oneri (IRAP e contributi) (%)</Label>
                  <Input
                    id="percentualeOneri"
                    type="number"
                    step="0.01"
                    value={percentualeOneri || ''}
                    onChange={(e) => setPercentualeOneri(parseNumericValue(e.target.value))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Calcola Incremento
            </Button>
          </div>
        </form>

        {/* Risultati */}
        {risultatiCalcolo && (
          <div className="mt-8">
            <Card>
              <CardHeader className="bg-green-600 text-white">
                <CardTitle>Risultati del Calcolo - Metodo 5 Fasi</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Fase 1 */}
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-lg mb-3">Fase 1: Incremento Potenziale Massimo (Regola 48%)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Obiettivo 48%</Label>
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(risultatiCalcolo.obiettivo48Percentuale)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Fondo Attuale Complessivo</Label>
                        <div className="text-lg font-bold">
                          {formatCurrency(risultatiCalcolo.fondoAttualeComplessivo)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Incremento Potenziale Lordo</Label>
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(risultatiCalcolo.incrementoPotenzialeLordo)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fase 2 */}
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <h4 className="font-semibold text-lg mb-3">Fase 2: Limite Spesa Personale (DM 17/3/2020)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Spesa Personale Attuale</Label>
                        <div className="text-lg font-bold">
                          {formatCurrency(risultatiCalcolo.spesaPersonaleAttuale)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Limite Sostenibile DL34</Label>
                        <div className="text-lg font-bold">
                          {formatCurrency(risultatiCalcolo.limiteSostenibileDL34)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Spazio Disponibile DL34</Label>
                        <div className="text-lg font-bold text-orange-600">
                          {formatCurrency(risultatiCalcolo.spazioDisponibileDL34)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Label className="text-sm font-medium">% Spese Personale Attuale su Entrate</Label>
                      <div className={`text-lg font-bold ${risultatiCalcolo.percentualeSpesePersonaleAttuale <= sogliaSpesaPersonale ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(risultatiCalcolo.percentualeSpesePersonaleAttuale)}
                      </div>
                    </div>
                  </div>

                  {/* Fase 3 */}
                  <div className="border rounded-lg p-4 bg-purple-50">
                    <h4 className="font-semibold text-lg mb-3">Fase 3: Limite Tetto Storico (L. 296/06)</h4>
                    <div>
                      <Label className="text-sm font-medium">Margine Disponibile c.557</Label>
                      <div className="text-lg font-bold text-purple-600">
                        {formatCurrency(risultatiCalcolo.margineDisponibileC557)}
                      </div>
                    </div>
                  </div>

                  {/* Fasi 4 e 5 */}
                  <div className="border rounded-lg p-4 bg-green-50">
                    <h4 className="font-semibold text-lg mb-3">Fasi 4-5: Spazio Utilizzabile e Incremento Netto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Spazio Utilizzabile Lordo</Label>
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(risultatiCalcolo.spazioUtilizzabileLordo)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Vincolo Limitante</Label>
                        <div className="text-lg font-bold text-red-600">
                          {risultatiCalcolo.vincoloLimitante}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Incremento Netto Effettivo</Label>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(risultatiCalcolo.incrementoNettoEffettivo)}
                        </div>
                      </div>
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
