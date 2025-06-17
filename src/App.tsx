
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ElevateQualificazioni from "./pages/ElevateQualificazioni";
import IncrementoDLPA from "./pages/IncrementoDLPA";
import FondoSegretarioComunale from "./pages/FondoSegretarioComunale";
import FondoDirigenza from "./pages/FondoDirigenza";
import FondoPersonaleDipendente from "./pages/FondoPersonaleDipendente";
import NuovoLimiteFondo from "./pages/NuovoLimiteFondo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/elevate-qualificazioni" element={<ElevateQualificazioni />} />
          <Route path="/incremento-dl-pa" element={<IncrementoDLPA />} />
          <Route path="/fondo-segretario-comunale" element={<FondoSegretarioComunale />} />
          <Route path="/fondo-dirigenza" element={<FondoDirigenza />} />
          <Route path="/fondo-personale-dipendente" element={<FondoPersonaleDipendente />} />
          <Route path="/nuovo-limite-fondo" element={<NuovoLimiteFondo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
