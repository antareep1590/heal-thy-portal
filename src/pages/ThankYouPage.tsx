
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Truck, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your order has been confirmed and your account has been created successfully.
          </p>

          {/* Order Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Purchase Summary</h2>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Semaglutide (0.25mg)</span>
                    <Badge variant="secondary" className="ml-2">1 Month</Badge>
                  </div>
                  <span>$299</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Consultation Fee</span>
                  <span>$49</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
                  <span>Total Paid</span>
                  <span>$348</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Estimated Shipping</h3>
                <p className="text-sm text-gray-600">
                  Your order will arrive within 3-5 business days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Tracking Info</h3>
                <p className="text-sm text-gray-600">
                  You'll receive tracking details via email shortly
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => navigate('/subscriptions')}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Manage My Subscriptions
            </Button>
            
            <div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Important Info */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Important Reminders</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• Your consultation is valid for 3 months</li>
                <li>• You can manage your subscription anytime in your account</li>
                <li>• Questions? Contact our support team 24/7</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
