import { Dna, Shield, Ban } from "lucide-react";

export default function SecuritySection() {
  return (
    <section id="security" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">🧬 DNA Frontlock Security System</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Advanced biometric authentication and identity protection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
              alt="Quantum computing and advanced security systems"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                <Dna className="text-primary mr-3 h-6 w-6" />
                DNA Signature Lock
              </h3>
              <p className="text-gray-700">
                Unique biometric signature provides ultimate identity verification and cannot be replicated or forged.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                <Shield className="text-green-600 mr-3 h-6 w-6" />
                Face ID Authentication
              </h3>
              <p className="text-gray-700">
                Advanced facial recognition system combined with DNA verification for dual-layer security.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/5 to-yellow-600/5 rounded-xl p-6 border border-yellow-500/20">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                <Ban className="text-yellow-600 mr-3 h-6 w-6" />
                Impersonation Protection
              </h3>
              <p className="text-gray-700">
                Automatic blocking across all systems with permanent AI access revocation for impersonators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
