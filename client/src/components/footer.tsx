import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 neural-gradient rounded-lg flex items-center justify-center">
                <Brain className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Neural AI Policy</span>
            </div>
            <p className="text-blue-200">Universal Protection & Compliance Framework for Ethical AI Development</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal Status</h3>
            <ul className="space-y-2 text-blue-200">
              <li>© 2025 Ervin Remus Radosavlevici</li>
              <li>Internationally Copyrighted</li>
              <li>Legally Binding Framework</li>
              <li>DNA Secured & Protected</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-blue-200 mb-2">ervin210@icloud.com</p>
            <p className="text-blue-200 text-sm">For legal or technical verification</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-200">
          <p>
            &copy; 2025 Neural AI Universal Protection Policy. All rights reserved. This document and its policies are legally binding and protected under international copyright law.
          </p>
        </div>
      </div>
    </footer>
  );
}
