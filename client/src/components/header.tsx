import { Shield, Brain, CheckCircle, Dna } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-lg border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 neural-gradient rounded-xl flex items-center justify-center">
              <Brain className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary">Neural AI Protection Policy</h1>
              <p className="text-gray-600 text-sm">Universal Protection & Compliance System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Active
            </div>
            <div className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center">
              <Dna className="h-4 w-4 mr-2" />
              DNA Verified
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
