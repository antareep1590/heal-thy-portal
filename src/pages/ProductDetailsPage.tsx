
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, Clock, Shield, Truck, AlertCircle, CheckCircle, Play, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDosage, setSelectedDosage] = useState("");
  const [subscriptionDuration, setSubscriptionDuration] = useState("1");
  
  // Mock product data
  const product = {
    id: 1,
    name: "Semaglutide",
    category: "Weight Loss",
    shortDescription: "Clinical-grade GLP-1 medication for effective weight management",
    description: "Semaglutide is a GLP-1 receptor agonist that helps regulate blood sugar levels and promotes weight loss by reducing appetite and slowing gastric emptying. This FDA-approved medication has shown remarkable results in clinical trials.",
    basePrice: 299,
    rating: 4.8,
    reviews: 1247,
    dosages: [
      { value: "0.25mg", label: "0.25mg (Starting dose)", price: 299 },
      { value: "0.5mg", label: "0.5mg (Maintenance)", price: 349 },
      { value: "1.0mg", label: "1.0mg (Maximum)", price: 399 },
    ],
    benefits: [
      "Significant weight loss (10-15% body weight)",
      "Improved blood sugar control", 
      "Reduced appetite and cravings",
      "Enhanced metabolic health",
      "Cardiovascular benefits"
    ],
    howItWorks: [
      "Take your prescribed dose once weekly",
      "Monitor your progress with our app",
      "Adjust dosage as recommended by your physician",
      "Continue treatment for optimal results"
    ],
    sideEffects: [
      "Nausea (usually mild and temporary)",
      "Diarrhea or constipation",
      "Fatigue",
      "Headache",
      "Dizziness"
    ]
  };

  const selectedDosagePrice = product.dosages.find(d => d.value === selectedDosage)?.price || product.basePrice;
  const totalPrice = selectedDosagePrice * parseInt(subscriptionDuration);

  const handleProceedToCheckout = () => {
    if (selectedDosage) {
      navigate(`/checkout?product=${id}&dosage=${selectedDosage}&duration=${subscriptionDuration}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.shortDescription}</p>
              <div className="flex items-center mb-6">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">{product.rating}</span>
                <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Watch How It Works
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600">{product.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What is this treatment */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">What is {product.name}?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <Shield className="h-4 w-4 inline mr-2" />
                    FDA-approved medication prepared in state-of-the-art facilities
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-green-700">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Benefits of This Treatment
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="space-y-4">
                  {product.howItWorks.map((step, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Side Effects */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-orange-700">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  Possible Side Effects
                </h2>
                <p className="text-gray-600 mb-4">
                  Most side effects are mild and temporary. Always consult with your healthcare provider.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {product.sideEffects.map((effect, index) => (
                    <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{effect}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Choose Your Plan</h3>
                
                {/* Consultation Notice */}
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Checkout includes required consultation. You'll only need to consult once every 3 months.
                  </AlertDescription>
                </Alert>

                {/* Dosage Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Dosage
                  </label>
                  <Select value={selectedDosage} onValueChange={setSelectedDosage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your dosage" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.dosages.map(dosage => (
                        <SelectItem key={dosage.value} value={dosage.value}>
                          {dosage.label} - ${dosage.price}/month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Duration
                  </label>
                  <Select value={subscriptionDuration} onValueChange={setSubscriptionDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="2">2 Months (Save 5%)</SelectItem>
                      <SelectItem value="3">3 Months (Save 10%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-6" />

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Monthly price:</span>
                    <span>${selectedDosagePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Duration:</span>
                    <span>{subscriptionDuration} month{subscriptionDuration !== "1" ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Consultation fee:</span>
                    <span>$49</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice + 49}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full text-lg py-6"
                  onClick={handleProceedToCheckout}
                  disabled={!selectedDosage}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    FDA approved ingredients
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-2 text-blue-600" />
                    Free shipping & discrete packaging
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    Licensed physician consultation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
