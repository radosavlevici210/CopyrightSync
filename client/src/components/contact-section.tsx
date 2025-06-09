import { useState } from "react";
import { Mail, User, Calendar, Dna, UserCheck, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose, details }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Verification Request Sent",
          description: result.message,
        });
        setEmail("");
        setPurpose("");
        setDetails("");
      } else {
        throw new Error("Failed to send verification request");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">📞 Contact & Verification</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            For legal or technical verification requests
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Official Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-primary mr-4 h-6 w-6" />
                  <span className="text-lg">ervin210@icloud.com</span>
                </div>
                <div className="flex items-center">
                  <User className="text-primary mr-4 h-6 w-6" />
                  <span className="text-lg">Ervin Remus Radosavlevici</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-primary mr-4 h-6 w-6" />
                  <span className="text-lg">Policy Date: 2025-06-08</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Verification Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Dna className="text-yellow-600 mr-3 mt-1 h-5 w-5" />
                    DNA signature verification required
                  </li>
                  <li className="flex items-start">
                    <UserCheck className="text-yellow-600 mr-3 mt-1 h-5 w-5" />
                    Facial recognition authentication
                  </li>
                  <li className="flex items-start">
                    <FileSignature className="text-yellow-600 mr-3 mt-1 h-5 w-5" />
                    Handwriting sample validation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send Verification Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Purpose of verification"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Additional details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Verification Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Advanced AI technology and neural network systems"
              className="rounded-2xl shadow-2xl w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
