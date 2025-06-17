
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportCalcoli = () => {
  const navigate = useNavigate();
  
  // Stati per il calcolo del rispetto dei limiti
  const [totaleRisorse, setTotaleRisorse] = useState("");
  const [decurtazioneIncremento, setDecurtazioneIncremento] = useState("");
  
  // Mock data per il nuovo limite 2025 - in futuro questi dati verranno dalla pagina precedente
  const nuovoLimite2025 = 175000; // Esempio
  
  // Simulo i dati che arriverebbero dalla pagina fondo-personale-dipendente
  // In futuro questi verranno passati tramite context o props
  const totaleParzialeCalcolato = 150000; // Esempio

  useEffect(() => {
    // Qui in futuro riceveremo i dati dalla pagina fondo-personale-dipendente
    setTotaleRisorse(totaleParzialeCalcolato.toFixed(2));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calcolo rispetto limiti completato");
  };

  const generatePDF = () => {
    console.log("Generazione PDF report");
  };

  const exportToCSV = () => {
    console.log("Export CSV report");
  };

  const sendEmail = () => {
    console.log("Invio email report");
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
            Report Calcoli Fondo
          </h1>
          <p className="text-gray-600">
            Riepilogo dei calcoli effettuati per il fondo del personale dipendente
          </p>
        </div>

        {/* Nuovo Limite 2025 */}
        <Card className="mb-8">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle>NUOVO LIMITE 2025</CardTitle>
            <CardDescription className="text-green-100">
              Limite calcolato per l'anno 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-green-600 mb-2">Nuovo Limite Fondo Salario Accessorio 2025</p>
                <p className="text-4xl font-bold text-green-800">
                  € {nuovoLimite2025.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Calcolo Rispetto Limiti */}
          <Card>
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle>CALCOLO DEL RISPETTO DEI LIMITI DEL SALARIO ACCESSORIO</CardTitle>
              <CardDescription className="text-orange-100">
                Verifica del rispetto dei limiti normativi
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Totale parziale risorse disponibili per il fondo anno corrente
                    <span className="block text-xs text-gray-500 mt-1">(Calcolato automaticamente dalla pagina Fondo Personale Dipendente)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={totaleRisorse}
                    readOnly
                    className="bg-gray-100"
                    placeholder="€ 0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Art. 23 c. 2 dlgs 75/2017 Eventuale decurtazione o incremento annuale
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={decurtazioneIncremento}
                    onChange={(e) => setDecurtazioneIncremento(e.target.value)}
                    placeholder="€ 0,00"
                  />
                </div>
              </div>

              {/* Risultato finale */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">TOTALE FINALE RISPETTO LIMITI</h3>
                <div className="text-2xl font-bold text-gray-800">
                  € {((parseFloat(totaleRisorse) || 0) + (parseFloat(decurtazioneIncremento) || 0)).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
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
              Conferma Calcoli
            </Button>
          </div>
        </form>

        {/* Azioni Report */}
        <Card className="mt-8">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle>Azioni Report</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportCalcoli;
