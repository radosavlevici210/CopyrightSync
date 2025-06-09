import { Brain, Dna, Shield, Network } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
            🧬✨ Neural AI Universal<br />
            <span className="text-primary">Protection Policy</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Sacred & DNA Locked - The definitive framework for ethical AI development and deployment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Dna className="text-primary h-12 w-12 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">DNA Secured</h3>
            <p className="text-gray-600">Biometric authentication system</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="text-green-600 h-12 w-12 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Legal Protection</h3>
            <p className="text-gray-600">Internationally copyrighted framework</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Network className="text-blue-600 h-12 w-12 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">AI Compliance</h3>
            <p className="text-gray-600">Universal system recognition</p>
          </div>
        </div>
      </div>
    </section>
  );
}
