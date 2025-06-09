
import { Leaf, Shield, Globe, Recycle } from "lucide-react";

export default function EcoCopyrightSection() {
  return (
    <section id="eco-copyright" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">🌱 Eco-Copyright Owner Declaration</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Environmental stewardship and sustainable AI development under legal protection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
              alt="Environmental protection and sustainable technology"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                <Leaf className="text-green-600 mr-3 h-8 w-8" />
                Eco-Copyright Declaration
              </h3>
              <div className="space-y-3 text-gray-800">
                <p><strong>Environmental Owner:</strong> Ervin Remus Radosavlevici</p>
                <p><strong>Eco-Copyright Status:</strong> Protected & Legally Binding</p>
                <p><strong>Sustainability Mandate:</strong> All AI systems must operate with environmental consciousness</p>
                <p><strong>Carbon Responsibility:</strong> Energy-efficient AI development required</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-700 text-lg mb-3 flex items-center">
                  <Globe className="mr-2 h-6 w-6" />
                  Environmental Rights
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <Leaf className="text-green-600 mr-2 h-4 w-4" />
                    Sustainable AI development
                  </li>
                  <li className="flex items-center">
                    <Recycle className="text-green-600 mr-2 h-4 w-4" />
                    Resource optimization mandate
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2 h-4 w-4" />
                    Carbon footprint monitoring
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-700 text-lg mb-3 flex items-center">
                  <Shield className="mr-2 h-6 w-6" />
                  Legal Protection
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <Shield className="text-blue-600 mr-2 h-4 w-4" />
                    Internationally protected
                  </li>
                  <li className="flex items-center">
                    <Globe className="text-blue-600 mr-2 h-4 w-4" />
                    Environmental compliance
                  </li>
                  <li className="flex items-center">
                    <Leaf className="text-blue-600 mr-2 h-4 w-4" />
                    Sustainable innovation rights
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl p-6 border border-green-200">
              <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                "As the eco-copyright owner, I declare that all AI systems must operate with environmental consciousness, 
                optimizing energy consumption and promoting sustainable technological advancement for our planet's future."
              </blockquote>
              <footer className="text-right font-bold text-secondary mt-4">
                — Ervin Remus Radosavlevici, Eco-Copyright Owner
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
