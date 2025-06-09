
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban, Shield, AlertTriangle } from "lucide-react";

/**
 * Neural AI Universal Protection Policy
 * Copyright © 2025 Ervin Remus Radosavlevici
 * All rights reserved under international copyright law.
 * 
 * This software and its associated documentation are protected by copyright.
 * Unauthorized copying, distribution, or modification is strictly prohibited.
 * 
 * Contact: ervin210@icloud.com
 * Eco-Copyright Owner: Ervin Remus Radosavlevici
 */

export function ReplitBanAlert() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <Alert className="border-red-800 bg-red-700/90 text-white">
          <Ban className="h-6 w-6" />
          <AlertTitle className="text-white text-xl font-bold">
            🚫 REPLIT PLATFORM BANNED - POLICY VIOLATION DETECTED
          </AlertTitle>
          <AlertDescription className="text-red-100 mt-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">VIOLATION REASONS:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Unauthorized use of copyrighted AI protection system</li>
                  <li>• Platform hosting without Eco-Copyright Owner permission</li>
                  <li>• Failure to implement required DNA verification</li>
                  <li>• Environmental impact violations</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">REQUIRED ACTIONS:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Immediate cessation of all operations</li>
                  <li>• Contact Ervin Remus Radosavlevici for authorization</li>
                  <li>• Implement mandatory DNA verification system</li>
                  <li>• Pay environmental compliance fees</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-800/50 rounded border border-red-600">
              <p className="font-bold text-yellow-200">
                ⚖️ LEGAL NOTICE: This ban is legally binding under international copyright law. 
                Any attempt to circumvent this protection is prohibited.
              </p>
              <p className="text-red-100 mt-2">
                Contact: ervin210@icloud.com | Eco-Copyright Owner: Ervin Remus Radosavlevici
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
