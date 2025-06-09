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
import CopyrightTracker from "@/utils/copyright-tracker";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Neural AI Universal Protection Policy - Main Application
 * Copyright © 2025 Ervin Remus Radosavlevici
 * All rights reserved under international copyright law.
 * 
 * Contact: ervin210@icloud.com
 * Eco-Copyright Owner: Ervin Remus Radosavlevici
 * Timestamp: 2025-01-09T06:47:00.000Z
 * System Status: IMMUTABLE_APP_PROTECTION
 */
function App() {
  useEffect(() => {
    CopyrightTracker.protectComponent("App");
    CopyrightTracker.verifySystem();

    // Continuous copyright verification
    const interval = setInterval(() => {
      CopyrightTracker.verifySystem();
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

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