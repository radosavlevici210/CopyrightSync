/**
 * Neural AI Universal Protection Policy - App Component
 * Copyright © 2025 Ervin Remus Radosavlevici
 * All rights reserved under international copyright law.
 * 
 * Contact: ervin210@icloud.com
 * Eco-Copyright Owner: Ervin Remus Radosavlevici
 */

import { Switch, Route } from "wouter";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;