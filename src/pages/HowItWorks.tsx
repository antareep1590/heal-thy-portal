import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  UserCheck, 
  Package, 
  Truck, 
  Clock, 
  Shield, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: "Choose Your Treatment",
      description: "Browse our range of FDA-approved treatments and select the one that's right for you.",
      icon: UserCheck,
      details: [
        "Browse treatment categories",
        "Read detailed product information",
        "Compare options and pricing"
      ]
    },
    {
      step: 2,
      title: "Complete Health Assessment",
      description: "Answer a few questions about your health history and goals to ensure treatment safety.",
      icon: MessageSquare,
      details: [
        "Quick 5-10 minute questionnaire",
        "Medical history review",
        "Goal setting and expectations"
      ]
    },
    {
      step: 3,
      title: "Doctor Review & Approval",
      description: "Our licensed physicians review your information and approve your personalized treatment plan.",
      icon: Shield,
      details: [
        "Board-certified physician review",
        "Personalized dosage recommendations",
        "Safety checks and contraindications"
      ]
    },
    {
      step: 4,
      title: "Prescription & Delivery",
      description: "Your medication is prepared at our certified pharmacy and shipped directly to your door.",
      icon: Package,
      details: [
        "Prepared at certified pharmacy",
        "Discreet packaging",
        "Temperature-controlled shipping"
      ]
    },
    {
      step: 5,
      title: "Ongoing Support",
      description: "Continue with regular check-ins and adjust your treatment as needed with physician guidance.",
      icon: Truck,
      details: [
        "Regular health check-ins",
        "Dosage adjustments",
        "24/7 support access"
      ]
    }
  ];

  const features = [
    {
      title: "Fast & Convenient",
      description: "Get started in minutes, no waiting rooms or appointments needed",
      icon: Clock
    },
    {
      title: "Licensed Physicians",
      description: "All treatments reviewed and approved by board-certified doctors",
      icon: Shield
    },
    {
      title: "Discreet Delivery",
      description: "Your privacy is protected with secure, unmarked packaging",
      icon: Package
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How HealthPortal Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized healthcare treatments delivered to your door in 5 simple steps. 
            Our licensed physicians ensure safe, effective care tailored to your needs.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.step} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex items-center gap-4 md:flex-col md:text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        Step {step.step}
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-lg">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="hidden md:flex items-center">
                        <ArrowRight className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose HealthPortal?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <Card className="bg-blue-50 border-blue-200 mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Expected Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5-10 min</div>
                <p className="text-gray-700">Health Assessment</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24-48 hrs</div>
                <p className="text-gray-700">Physician Review</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1-2 days</div>
                <p className="text-gray-700">Prescription Processing</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2-5 days</div>
                <p className="text-gray-700">Delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of patients who trust HealthPortal for their health needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate('/products')}
              >
                Browse Treatments
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/support')}
              >
                Have Questions?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;