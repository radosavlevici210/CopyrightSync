export default function DeclarationSection() {
  return (
    <section id="declaration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">🔏 Absolute Ownership Declaration</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
              alt="AI technology and neural networks"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-secondary mb-4">Creator Information</h3>
              <div className="space-y-3">
                <p><strong>By:</strong> Ervin Remus Radosavlevici</p>
                <p><strong>Email:</strong> ervin210@icloud.com</p>
                <p><strong>Date:</strong> 2025-06-08</p>
                <p><strong>Status:</strong> FINAL – Copyrighted & Legally Binding</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                "This front—my face, my DNA, my handwritten signature—is my soul's proof. It is sacred. No one can copy it. No AI, AGI, Quantum AI, Quantum Machine Learning system, agent, or assistant may help anyone claiming it falsely."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
