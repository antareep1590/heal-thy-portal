
import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Video, Clock, Truck, Mail } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderNumber = searchParams.get('order') || Math.random().toString(36).substr(2, 9).toUpperCase();
  const totalAmount = searchParams.get('total') || '89.99';
  const relatedProductIds = searchParams.get('relatedProducts')?.split(',').filter(Boolean) || [];

  // Mock related products data
  const relatedProductsData = [
    { id: "2", name: "B12 Injection", deliveryTime: "2-3 business days" },
    { id: "3", name: "Tirzepatide", deliveryTime: "1-3 business days" }
  ];

  const selectedRelatedProducts = relatedProductsData.filter(p => relatedProductIds.includes(p.id));

  useEffect(() => {
    console.log("Thank you page loaded successfully");
  }, []);

  const handleStartConsultation = async () => {
    console.log("Starting consultation with Qualiphy API");
    
    // Simulate Qualiphy API call (placeholder)
    try {
      toast({
        title: "Consultation Starting",
        description: "Connecting you with a licensed provider...",
      });
      
      // Placeholder for actual Qualiphy integration
      // const response = await fetch('/api/qualiphy/start-consultation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ orderNumber })
      // });
      
      // Simulate delay
      setTimeout(() => {
        toast({
          title: "Provider Connected",
          description: "Your consultation is ready to begin!",
        });
      }, 2000);
      
    } catch (error) {
      console.error("Error starting consultation:", error);
      toast({
        title: "Connection Error",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Your treatment plan is ready to begin</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Awaiting Consultation</span>
              </div>
            </div>

            {/* Products with Delivery Timeline */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-4">Your Products & Delivery Timeline:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Semaglutide</p>
                    <p className="text-sm text-gray-600">Primary treatment</p>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">1-3 business days</p>
                </div>
                
                {selectedRelatedProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Additional treatment</p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{product.deliveryTime}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={() => navigate(`/intake-form?order=${orderNumber}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                size="lg"
              >
                <Video className="h-5 w-5 mr-2" />
                Start Consultation
              </Button>
              <p className="text-sm text-gray-500 text-center mt-2">
                Complete your intake form first
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Happens Next</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Join your consultation call with a licensed provider</h3>
                  <p className="text-sm text-gray-600 mt-1">Use the button above to connect immediately</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">The doctor will confirm your eligibility and prescribe the best dosage</h3>
                  <p className="text-sm text-gray-600 mt-1">Your consultation typically takes 10-15 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Your prescription will be processed and shipped within 1–3 business days</h3>
                  <p className="text-sm text-gray-600 mt-1">Discreet packaging with tracking information provided</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">You'll receive updates via email and can manage everything from "My Account"</h3>
                  <p className="text-sm text-gray-600 mt-1">Track your order, schedule follow-ups, and manage subscriptions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@hyrehealth.com" className="text-blue-600 hover:underline">
              support@hyrehealth.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
