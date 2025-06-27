
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const ConsultationFlow = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete consultation
      localStorage.setItem('lastConsultation', new Date().toISOString());
      navigate(`/consultation-summary/12345`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <GeneralQuestionnaire />;
      case 2:
        return <ProductIntakeForm />;
      case 3:
        return <CheckoutStep />;
      default:
        return <GeneralQuestionnaire />;
    }
  };

  const GeneralQuestionnaire = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">General Health Assessment</h2>
        <p className="text-gray-600">We need to understand your health background to ensure safe treatment.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="Enter your age" min="18" max="100" />
        </div>

        <div>
          <Label htmlFor="weight">Current Weight (lbs)</Label>
          <Input id="weight" type="number" placeholder="Enter your weight" />
        </div>

        <div>
          <Label htmlFor="height">Height</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Feet" type="number" min="1" max="8" />
            <Input placeholder="Inches" type="number" min="0" max="11" />
          </div>
        </div>

        <div>
          <Label>Biological Sex</Label>
          <RadioGroup defaultValue="" className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Do you have any of the following conditions?</Label>
          <div className="mt-2 space-y-3">
            {[
              "Diabetes (Type 1 or 2)",
              "Heart disease or cardiovascular issues",
              "Kidney disease",
              "Liver disease",
              "Thyroid disorders",
              "Eating disorders",
              "Mental health conditions"
            ].map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox id={condition} />
                <Label htmlFor={condition} className="text-sm">{condition}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea 
            id="medications" 
            placeholder="List all medications, supplements, and vitamins you're currently taking..."
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const ProductIntakeForm = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Semaglutide Assessment</h2>
        <p className="text-gray-600">Product-specific questions to determine the best treatment plan for you.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>What is your primary goal with this treatment?</Label>
          <RadioGroup className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weight-loss" id="weight-loss" />
              <Label htmlFor="weight-loss">Weight loss</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blood-sugar" id="blood-sugar" />
              <Label htmlFor="blood-sugar">Blood sugar control</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both weight loss and blood sugar control</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="weight-goal">Target weight loss (if applicable)</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5-10">5-10 lbs</SelectItem>
              <SelectItem value="10-20">10-20 lbs</SelectItem>
              <SelectItem value="20-30">20-30 lbs</SelectItem>
              <SelectItem value="30-50">30-50 lbs</SelectItem>
              <SelectItem value="50+">50+ lbs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Have you tried weight loss medications before?</Label>
          <RadioGroup className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no-previous" />
              <Label htmlFor="no-previous">No, this is my first time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-glp1" id="yes-glp1" />
              <Label htmlFor="yes-glp1">Yes, GLP-1 medications (Ozempic, Wegovy, etc.)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-other" id="yes-other" />
              <Label htmlFor="yes-other">Yes, other weight loss medications</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="eating-habits">Describe your current eating habits</Label>
          <Textarea 
            id="eating-habits" 
            placeholder="Tell us about your typical daily meals, snacking patterns, and any challenges you face with appetite control..."
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label>How often do you exercise?</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select exercise frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Never/Rarely</SelectItem>
              <SelectItem value="1-2">1-2 times per week</SelectItem>
              <SelectItem value="3-4">3-4 times per week</SelectItem>
              <SelectItem value="5+">5+ times per week</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Do you experience any gastrointestinal issues?</Label>
          <div className="mt-2 space-y-2">
            {[
              "Frequent nausea",
              "Chronic diarrhea",
              "Severe constipation",
              "GERD/Acid reflux",
              "Gastroparesis",
              "None of the above"
            ].map((issue) => (
              <div key={issue} className="flex items-center space-x-2">
                <Checkbox id={issue} />
                <Label htmlFor={issue} className="text-sm">{issue}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CheckoutStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Complete Your Order</h2>
        <p className="text-gray-600">Review your treatment plan and complete payment.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Treatment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product:</span>
              <span className="font-semibold">Semaglutide</span>
            </div>
            <div className="flex justify-between">
              <span>Recommended dosage:</span>
              <span className="font-semibold">0.25mg (Starting dose)</span>
            </div>
            <div className="flex justify-between">
              <span>Subscription:</span>
              <span className="font-semibold">Monthly</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span>Consultation fee:</span>
              <span>$49</span>
            </div>
            <div className="flex justify-between">
              <span>First month treatment:</span>
              <span>$299</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total today:</span>
              <span>$348</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <div>
            <Label htmlFor="billing-name">Name on Card</Label>
            <Input id="billing-name" placeholder="John Doe" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="hipaa" />
          <Label htmlFor="hipaa" className="text-sm">
            I acknowledge that I have read and agree to the HIPAA Privacy Notice
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms of Service and Treatment Consent
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="prescription" />
          <Label htmlFor="prescription" className="text-sm">
            I understand this medication requires a valid prescription from a licensed physician
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep === totalSteps ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Order
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationFlow;
