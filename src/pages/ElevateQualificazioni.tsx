
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileDown, Mail, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElevateQualificazioni = () => {
  const navigate = useNavigate();
  
  // Stati per risorse stabili
  const [art17c2Retribuzione, setArt17c2Retribuzione] = useState<number>(0);
  const [art17c3Retribuzione, setArt17c3Retribuzione] = useState<number>(0);
  const [art17c5Interim, setArt17c5Interim] = useState<number>(0);
  const [art23c5Maggiorazione, setArt23c5Maggiorazione] = useState<number>(0);

  // Stati per risorse variabili
  const [art17c4Risultato, setArt17c4Risultato] = useState<number>(0);
  const [art79c3Incremento, setArt79c3Incremento] = useState<number>(0);

  // Stati per altri importi
  const [art23c2Decurtazione, setArt23c2Decurtazione] = useState<number>(0);
  const [art33c2IncrementoDerogaRealizzabile, setArt33c2IncrementoDerogaRealizzabile] = useState<number>(0);

  // Risultati calcolati
  const [risultatiCalcolo, setRisultatiCalcolo] = useState<any>(null);
  const [datiPerReport, setDatiPerReport] = useState<any>(null);

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

  const procediConCalcolo = (event: React.FormEvent) => {
    event.preventDefault();

    // Calcolo somma risorse stabili
    const sommaRisorseStabili = art17c2Retribuzione + art17c3Retribuzione + art17c5Interim + art23c5Maggiorazione;
    
    // Calcolo somma risorse variabili
    const sommaRisorseVariabili = art17c4Risultato + art79c3Incremento;
    
    // Calcolo totale risorse effettivamente disponibili
    const totaleRisorseEffettive = sommaRisorseStabili + sommaRisorseVariabili + art23c2Decurtazione + art33c2IncrementoDerogaRealizzabile;

    const risultati = {
      sommaRisorseStabili,
      sommaRisorseVariabili,
      totaleRisorseEffettive
    };

    const dati = {
      risorseStabili: {
        art17c2Retribuzione,
        art17c3Retribuzione,
        art17c5Interim,
        art23c5Maggiorazione
      },
      risorseVariabili: {
        art17c4Risultato,
        art79c3Incremento
      },
      altriImporti: {
        art23c2Decurtazione,
        art33c2IncrementoDerogaRealizzabile
      },
      risultati
    };

    setRisultatiCalcolo(risultati);
    setDatiPerReport(dati);
  };

  const generaReportPDF = () => {
    console.log("Generazione PDF...", datiPerReport);
  };

  const esportaCSV = () => {
    if (!datiPerReport) return;
    
    const csvContent = [
      "Campo;Valore",
      `Art. 17 c. 2 Retribuzione;${datiPerReport.risorseStabili.art17c2Retribuzione}`,
      `Art. 17 c. 3 Retribuzione;${datiPerReport.risorseStabili.art17c3Retribuzione}`,
      `Art. 17 c. 5 Interim;${datiPerReport.risorseStabili.art17c5Interim}`,
      `Art. 23 c. 5 Maggiorazione;${datiPerReport.risorseStabili.art23c5Maggiorazione}`,
      `Somma Risorse Stabili;${datiPerReport.risultati.sommaRisorseStabili}`,
      `Art. 17 c. 4 Risultato;${datiPerReport.risorseVariabili.art17c4Risultato}`,
      `Art. 79 c. 3 Incremento;${datiPerReport.risorseVariabili.art79c3Incremento}`,
      `Somma Risorse Variabili;${datiPerReport.risultati.sommaRisorseVariabili}`,
      `Totale Risorse Effettive;${datiPerReport.risultati.totaleRisorseEffettive}`
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
    
    const oggetto = encodeURIComponent("Simulazione Elevate Qualificazioni");
    const corpo = encodeURIComponent(`
Simulazione Elevate Qualificazioni

Risorse Stabili:
Art. 17 c. 2: ${formatCurrency(datiPerReport.risorseStabili.art17c2Retribuzione)}
Art. 17 c. 3: ${formatCurrency(datiPerReport.risorseStabili.art17c3Retribuzione)}
Art. 17 c. 5: ${formatCurrency(datiPerReport.risorseStabili.art17c5Interim)}
Art. 23 c. 5: ${formatCurrency(datiPerReport.risorseStabili.art23c5Maggiorazione)}
Somma Risorse Stabili: ${formatCurrency(datiPerReport.risultati.sommaRisorseStabili)}

Risorse Variabili:
Art. 17 c. 4: ${formatCurrency(datiPerReport.risorseVariabili.art17c4Risultato)}
Art. 79 c. 3: ${formatCurrency(datiPerReport.risorseVariabili.art79c3Incremento)}
Somma Risorse Variabili: ${formatCurrency(datiPerReport.risultati.sommaRisorseVariabili)}

Totale Risorse Effettivamente Disponibili: ${formatCurrency(datiPerReport.risultati.totaleRisorseEffettive)}

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
            Simulazione Elevate Qualificazioni
          </h1>
          <p className="text-gray-600">
            Calcolo basato su CCNL del 16.11.2022
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mt-4"
          >
            ← Torna alla Home
          </Button>
        </div>

        <form onSubmit={procediConCalcolo} className="space-y-8">
          {/* Risorse Stabili */}
          <Card>
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle>Risorse Stabili</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="art17c2">Art. 17 c. 2 CCNL del 16.11.2022 - Retribuzione di posizione (€ 5.000 - € 18.000)</Label>
                  <Input
                    id="art17c2"
                    type="number"
                    step="0.01"
                    value={art17c2Retribuzione || ''}
                    onChange={(e) => setArt17c2Retribuzione(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="art17c3">Art. 17 c. 3 CCNL del 16.11.2022 - Retribuzione di posizione (€ 3.000 - € 9.500)</Label>
                  <Input
                    id="art17c3"
                    type="number"
                    step="0.01"
                    value={art17c3Retribuzione || ''}
                    onChange={(e) => setArt17c3Retribuzione(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="art17c5">Art. 17 c. 5 CCNL del 16.11.2022 - Incarico ad interim (15%-25%)</Label>
                  <Input
                    id="art17c5"
                    type="number"
                    step="0.01"
                    value={art17c5Interim || ''}
                    onChange={(e) => setArt17c5Interim(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="art23c5">Art. 23 c. 5 CCNL del 16.11.2022 - Maggiorazione per diverse sedi (max 30%)</Label>
                  <Input
                    id="art23c5"
                    type="number"
                    step="0.01"
                    value={art23c5Maggiorazione || ''}
                    onChange={(e) => setArt23c5Maggiorazione(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risorse Variabili */}
          <Card>
            <CardHeader className="bg-green-600 text-white">
              <CardTitle>Risorse Variabili</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="art17c4">Art. 17 c. 4 CCNL del 16.11.2022 - Retribuzione di risultato (min 15%)</Label>
                  <Input
                    id="art17c4"
                    type="number"
                    step="0.01"
                    value={art17c4Risultato || ''}
                    onChange={(e) => setArt17c4Risultato(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="art79c3">Art. 79 c. 3 CCNL 2022 - Incremento 0,22% monte salari 2018</Label>
                  <Input
                    id="art79c3"
                    type="number"
                    step="0.01"
                    value={art79c3Incremento || ''}
                    onChange={(e) => setArt79c3Incremento(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Altri Importi */}
          <Card>
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle>Altri Importi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="art23c2">Art. 23 c. 2 dlgs 75/2017 - Eventuale decurtazione o incremento annuale</Label>
                  <Input
                    id="art23c2"
                    type="number"
                    step="0.01"
                    value={art23c2Decurtazione || ''}
                    onChange={(e) => setArt23c2Decurtazione(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro (positivo per incremento, negativo per decurtazione)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="art33c2">Art. 33 c. 2 dl 34/2019 - Eventuale incremento salario accessorio in deroga</Label>
                  <Input
                    id="art33c2"
                    type="number"
                    step="0.01"
                    value={art33c2IncrementoDerogaRealizzabile || ''}
                    onChange={(e) => setArt33c2IncrementoDerogaRealizzabile(parseNumericValue(e.target.value))}
                    placeholder="Inserisci importo in euro"
                  />
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
              <CardHeader className="bg-purple-600 text-white">
                <CardTitle>Risultati del Calcolo</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-600">
                      <Label className="font-semibold text-blue-800">Somma Risorse Stabili</Label>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(risultatiCalcolo.sommaRisorseStabili)}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded border-l-4 border-green-600">
                      <Label className="font-semibold text-green-800">Somma Risorse Variabili</Label>
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(risultatiCalcolo.sommaRisorseVariabili)}
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded border-l-4 border-purple-600">
                      <Label className="font-semibold text-purple-800">Totale Risorse Effettive</Label>
                      <div className="text-xl font-bold text-purple-600">
                        {formatCurrency(risultatiCalcolo.totaleRisorseEffettive)}
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

export default ElevateQualificazioni;
