import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RenewalPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock user data - in real app, this would come from user context/API
  const currentPlan = {
    duration: 1, // months
    product: "Semaglutide",
    dosage: "0.5mg",
    lastConsultation: "2024-12-01",
    isConsultationValid: true
  };

  const getPlanOptions = () => {
    if (currentPlan.duration === 1) {
      return [
        {
          id: "2-month",
          duration: 2,
          price: 158,
          originalPrice: 178,
          savings: 20,
          title: "2-Month Plan",
          badge: "Most Popular"
        },
        {
          id: "3-month",
          duration: 3,
          price: 237,
          originalPrice: 267,
          savings: 30,
          title: "3-Month Plan", 
          badge: "Best Value"
        }
      ];
    } else if (currentPlan.duration === 2) {
      return [
        {
          id: "1-month",
          duration: 1,
          price: 89,
          title: "Add 1 More Month"
        }
      ];
    }
    return [];
  };

  const planOptions = getPlanOptions();
  const needsNewConsultation = currentPlan.duration >= 3;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinueToCheckout = () => {
    if (selectedPlan) {
      navigate("/checkout", { 
        state: { 
          renewal: true, 
          planId: selectedPlan,
          product: currentPlan.product,
          dosage: currentPlan.dosage
        }
      });
    }
  };

  if (needsNewConsultation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Ready to continue your treatment?</h1>
            
            <Card className="p-8">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">New Consultation Required</h2>
                <p className="text-muted-foreground">
                  You've completed a 3-month treatment cycle. To continue, you'll need a new consultation 
                  to ensure your treatment plan is still right for you.
                </p>
                <Button 
                  className="w-full mt-6"
                  onClick={() => navigate("/products")}
                >
                  Start New Consultation
                </Button>
              </div>
            </Card>

            <div className="text-sm text-muted-foreground">
              Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Ready to continue your treatment?</h1>
            <p className="text-lg text-muted-foreground">
              Extend your {currentPlan.product} subscription and keep your progress going.
            </p>
          </div>

          {/* Dosage Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Your Current Treatment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Product</div>
                  <div className="font-medium">{currentPlan.product}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Dosage</div>
                  <div className="font-medium">{currentPlan.dosage}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Consultation</div>
                  <div className="font-medium">{currentPlan.lastConsultation}</div>
                </div>
              </div>
              {currentPlan.isConsultationValid && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    Your last approved dosage will be used for this order.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plan Options */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Choose Your Extension</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {planOptions.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedPlan === plan.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <CardHeader className="relative">
                    {plan.badge && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardTitle className="flex justify-between items-center">
                      <span>{plan.title}</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${plan.price}</div>
                        {plan.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${plan.originalPrice}
                          </div>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
                    </div>
                    {plan.savings && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">You save</span>
                        <span className="font-medium text-green-600">${plan.savings}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated delivery</span>
                      <span className="font-medium">3-5 business days</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto px-8"
              disabled={!selectedPlan}
              onClick={handleContinueToCheckout}
            >
              Confirm & Continue Subscription
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Need help?</span>
              <a href="#" className="text-primary hover:underline flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RenewalPage;