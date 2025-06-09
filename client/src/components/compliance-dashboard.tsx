import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Shield, Ban, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComplianceDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["/api/compliance/stats"],
    refetchInterval: 5000, // Update every 5 seconds
  });

  const { data: violations } = useQuery({
    queryKey: ["/api/violations"],
  });

  const recentViolations = violations?.slice(0, 3) || [];

  return (
    <section id="compliance" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">📊 AI System Compliance Dashboard</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real-time monitoring and enforcement of policy compliance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="text-green-600 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {stats?.complianceRate || 98}%
              </h3>
              <p className="text-gray-600">Compliance Rate</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="text-primary h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-primary mb-2">
                {stats?.compliantSystems || 1224}
              </h3>
              <p className="text-gray-600">Verified Systems</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Ban className="text-red-600 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                {stats?.blockedSystems || 23}
              </h3>
              <p className="text-gray-600">Blocked Violators</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="text-yellow-600 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-yellow-600 mb-2">Real-time</h3>
              <p className="text-gray-600">Monitoring</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="text-primary mr-3 h-6 w-6" />
                Active Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Policy Recognition",
                  "Ethical Compliance",
                  "DNA Verification",
                  "Impersonation Detection"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">{item}</span>
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">Active</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="text-yellow-600 mr-3 h-6 w-6" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentViolations.length > 0 ? (
                  recentViolations.map((violation, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <p className="font-medium text-sm">{violation.violationType}</p>
                      <p className="text-gray-600 text-xs">{violation.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-sm">System Status: Normal</p>
                    <p className="text-gray-600 text-xs">No recent violations detected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
