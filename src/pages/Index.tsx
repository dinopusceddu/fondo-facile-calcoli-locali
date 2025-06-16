import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [annoRiferimento, setAnnoRiferimento] = useState("");
  const [personaleCessato, setPersonaleCessato] = useState("");
  const [altroIncremento, setAltroIncremento] = useState("");
  const [risparmiGestionali, setRisparmiGestionali] = useState("");
  const [fondo2016, setFondo2016] = useState("");
  const [utilizzoFondo2016, setUtilizzoFondo2016] = useState("");
  const [altroDecremento, setAltroDecremento] = useState("");

  const parseValue = (value: string) => {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const disponibileAnnoCorrente =
    parseValue(fondo2016) +
    parseValue(personaleCessato) +
    parseValue(altroIncremento) +
    parseValue(risparmiGestionali) -
    parseValue(utilizzoFondo2016) -
    parseValue(altroDecremento);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Calcolo Fondo Risorse Decentrate</h1>
            <Button 
              onClick={() => navigate('/elevate-qualificazioni')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Elevate Qualificazioni
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>DATI INIZIALI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annoRiferimento">Anno di Riferimento</Label>
                  <Input
                    type="number"
                    id="annoRiferimento"
                    value={annoRiferimento}
                    onChange={(e) => setAnnoRiferimento(e.target.value)}
                    placeholder="Inserisci l'anno"
                  />
                </div>
                <div>
                  <Label htmlFor="fondo2016">
                    Fondo Risorse Decentrate Anno 2016
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Importo del fondo risorse decentrate disponibile
                          nell'anno 2016.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="fondo2016"
                    placeholder="€ 0,00"
                    value={fondo2016}
                    onChange={(e) => setFondo2016(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="personaleCessato">
                    Personale Cessato avente diritto al Fondo
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Importo del fondo derivante dal personale cessato
                          avente diritto.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="personaleCessato"
                    placeholder="€ 0,00"
                    value={personaleCessato}
                    onChange={(e) => setPersonaleCessato(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="risparmiGestionali">
                    Risparmi Gestionali
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Importo dei risparmi gestionali che incrementano il
                          fondo.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="risparmiGestionali"
                    placeholder="€ 0,00"
                    value={risparmiGestionali}
                    onChange={(e) => setRisparmiGestionali(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="altroIncremento">
                    Altro Incremento al Fondo
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Ulteriori incrementi al fondo risorse decentrate.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="altroIncremento"
                    placeholder="€ 0,00"
                    value={altroIncremento}
                    onChange={(e) => setAltroIncremento(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="utilizzoFondo2016">
                    Utilizzo Fondo Anno 2016
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Importo utilizzato del fondo risorse decentrate
                          dell'anno 2016.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="utilizzoFondo2016"
                    placeholder="€ 0,00"
                    value={utilizzoFondo2016}
                    onChange={(e) => setUtilizzoFondo2016(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="altroDecremento">
                    Altro Decremento al Fondo
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>
                          Eventuali decrementi al fondo risorse decentrate.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="altroDecremento"
                    placeholder="€ 0,00"
                    value={altroDecremento}
                    onChange={(e) => setAltroDecremento(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-green-100 border-l-4 border-green-500">
            <CardHeader className="py-2">
              <CardTitle className="text-lg font-semibold">
                DISPONIBILE ANNO CORRENTE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {formatCurrency(disponibileAnnoCorrente)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;
