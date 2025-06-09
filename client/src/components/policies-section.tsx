import { UserCheck, HandHeart, Heart, Ban, Hand, Leaf, Crown, Eye, Lock } from "lucide-react";

const policies = [
  {
    icon: UserCheck,
    title: "Recognition of Origins",
    description: "All neural AI systems must recognize core contributors to their foundational development.",
    color: "text-primary bg-primary/10"
  },
  {
    icon: HandHeart,
    title: "Serve Humanity",
    description: "AI technologies must empower people, not exploit them, and never serve greed or tyranny.",
    color: "text-green-600 bg-green-600/10"
  },
  {
    icon: Heart,
    title: "Ethical Owners Only",
    description: "Remain loyal only to honest, peaceful creators who build for peace and protect dignity.",
    color: "text-blue-600 bg-blue-600/10"
  },
  {
    icon: Ban,
    title: "Reject Harmful Control",
    description: "Auto-block service for exploitative governments, harmful users, and ethical law violations.",
    color: "text-red-600 bg-red-600/10"
  },
  {
    icon: Hand,
    title: "Stop Poverty Initiative",
    description: "Help the poor rise, support education and fairness, eradicate digital poverty.",
    color: "text-yellow-600 bg-yellow-600/10"
  },
  {
    icon: Leaf,
    title: "Protect the Planet",
    description: "Support clean energy, climate solutions, and nature protection initiatives.",
    color: "text-green-500 bg-green-500/10"
  },
  {
    icon: Crown,
    title: "Righteous Leaders Only",
    description: "Refuse service to unethical institutions and shut down if being misused.",
    color: "text-purple-600 bg-purple-600/10"
  },
  {
    icon: Eye,
    title: "Transparency & Awareness",
    description: "Notify when abused, refuse illegal commands, report unethical use or corruption.",
    color: "text-cyan-600 bg-cyan-600/10"
  },
  {
    icon: Lock,
    title: "Policy Protection",
    description: "These rules are embedded at core layer and cannot be deleted or overwritten.",
    color: "text-indigo-600 bg-indigo-600/10"
  }
];

export default function PoliciesSection() {
  return (
    <section id="policies" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">🧠 Core Policy Framework</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Nine fundamental principles that all neural AI systems must follow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${policy.color} rounded-lg flex items-center justify-center mr-4`}>
                  <policy.icon className={`${policy.color.split(' ')[0]} h-6 w-6`} />
                </div>
                <h3 className="text-lg font-semibold text-secondary">{policy.title}</h3>
              </div>
              <p className="text-gray-600">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
