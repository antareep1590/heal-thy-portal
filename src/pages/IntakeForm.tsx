import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const IntakeForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const orderNumber = searchParams.get('order') || 'N/A';
  const product = searchParams.get('product') || 'semaglutide';

  // Mock intake form questions based on product
  const questions = [
    {
      id: 'age',
      title: 'What is your age?',
      type: 'number',
      required: true,
      placeholder: 'Enter your age',
      validation: (value: string) => {
        const age = parseInt(value);
        return age >= 18 && age <= 100 ? null : 'Age must be between 18 and 100';
      }
    },
    {
      id: 'weight',
      title: 'What is your current weight?',
      type: 'number',
      required: true,
      placeholder: 'Enter weight in lbs',
      validation: (value: string) => {
        const weight = parseInt(value);
        return weight > 0 ? null : 'Please enter a valid weight';
      }
    },
    {
      id: 'height',
      title: 'What is your height?',
      type: 'height',
      required: true,
    },
    {
      id: 'biological_sex',
      title: 'What is your biological sex?',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      id: 'medical_conditions',
      title: 'Do you have any of the following medical conditions?',
      type: 'checkbox',
      required: false,
      options: [
        'Diabetes (Type 1 or 2)',
        'Heart disease or cardiovascular issues',
        'Kidney disease',
        'Liver disease',
        'Thyroid disorders',
        'Eating disorders',
        'Mental health conditions',
        'None of the above'
      ]
    },
    {
      id: 'medications',
      title: 'List all medications, supplements, and vitamins you\'re currently taking',
      type: 'textarea',
      required: false,
      placeholder: 'Include prescription medications, over-the-counter drugs, vitamins, and supplements...'
    },
    {
      id: 'weight_goal',
      title: 'What is your target weight loss goal?',
      type: 'select',
      required: true,
      options: [
        { value: '5-10', label: '5-10 lbs' },
        { value: '10-20', label: '10-20 lbs' },
        { value: '20-30', label: '20-30 lbs' },
        { value: '30-50', label: '30-50 lbs' },
        { value: '50+', label: '50+ lbs' }
      ]
    },
    {
      id: 'previous_medications',
      title: 'Have you tried weight loss medications before?',
      type: 'radio',
      required: true,
      options: [
        { value: 'no', label: 'No, this is my first time' },
        { value: 'yes-glp1', label: 'Yes, GLP-1 medications (Ozempic, Wegovy, etc.)' },
        { value: 'yes-other', label: 'Yes, other weight loss medications' }
      ]
    },
    {
      id: 'eating_habits',
      title: 'Describe your current eating habits',
      type: 'textarea',
      required: true,
      placeholder: 'Tell us about your typical daily meals, snacking patterns, and any challenges you face with appetite control...'
    },
    {
      id: 'exercise_frequency',
      title: 'How often do you exercise?',
      type: 'select',
      required: true,
      options: [
        { value: 'none', label: 'Never/Rarely' },
        { value: '1-2', label: '1-2 times per week' },
        { value: '3-4', label: '3-4 times per week' },
        { value: '5+', label: '5+ times per week' },
        { value: 'daily', label: 'Daily' }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = questions[currentQuestion];

  const handleNext = () => {
    const currentValue = responses[currentQ.id];
    
    // Validate required fields
    if (currentQ.required && (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0))) {
      toast({
        title: "Required Field",
        description: "Please answer this question before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Run custom validation
    if (currentQ.validation && currentValue) {
      const error = currentQ.validation(currentValue);
      if (error) {
        toast({
          title: "Invalid Input",
          description: error,
          variant: "destructive",
        });
        return;
      }
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate(`/thank-you?order=${orderNumber}`);
    }
  };

  const handleSubmit = async () => {
    try {
      // Mock API call to save responses
      console.log('Submitting intake form responses:', responses);
      
      toast({
        title: "Intake Form Complete",
        description: "Your responses have been saved successfully.",
      });

      // Navigate to pre-consultation page
      navigate(`/pre-consultation?order=${orderNumber}&product=${product}`);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const updateResponse = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const renderQuestion = () => {
    const currentValue = responses[currentQ.id];

    switch (currentQ.type) {
      case 'number':
        return (
          <div>
            <Label htmlFor={currentQ.id}>{currentQ.title}</Label>
            <Input
              id={currentQ.id}
              type="number"
              placeholder={currentQ.placeholder}
              value={currentValue || ''}
              onChange={(e) => updateResponse(e.target.value)}
              className="mt-2"
            />
          </div>
        );

      case 'height':
        return (
          <div>
            <Label>{currentQ.title}</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input
                placeholder="Feet"
                type="number"
                min="1"
                max="8"
                value={currentValue?.feet || ''}
                onChange={(e) => updateResponse({ ...currentValue, feet: e.target.value })}
              />
              <Input
                placeholder="Inches"
                type="number"
                min="0"
                max="11"
                value={currentValue?.inches || ''}
                onChange={(e) => updateResponse({ ...currentValue, inches: e.target.value })}
              />
            </div>
          </div>
        );

      case 'radio':
        return (
          <div>
            <Label>{currentQ.title}</Label>
            <RadioGroup
              value={currentValue || ''}
              onValueChange={updateResponse}
              className="mt-2"
            >
              {currentQ.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'checkbox':
        return (
          <div>
            <Label>{currentQ.title}</Label>
            <div className="mt-2 space-y-2">
              {currentQ.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={currentValue?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      const newValue = currentValue || [];
                      if (checked) {
                        updateResponse([...newValue, option]);
                      } else {
                        updateResponse(newValue.filter((item: string) => item !== option));
                      }
                    }}
                  />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'select':
        return (
          <div>
            <Label>{currentQ.title}</Label>
            <Select value={currentValue || ''} onValueChange={updateResponse}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {currentQ.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'textarea':
        return (
          <div>
            <Label htmlFor={currentQ.id}>{currentQ.title}</Label>
            <Textarea
              id={currentQ.id}
              placeholder={currentQ.placeholder}
              value={currentValue || ''}
              onChange={(e) => updateResponse(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Medical Intake Form</h1>
                <p className="text-gray-600">Please answer the following questions to help us provide the best care.</p>
              </div>
              
              {renderQuestion()}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button onClick={handleNext}>
            {currentQuestion === totalQuestions - 1 ? (
              <>
                Submit Form
                <ArrowRight className="h-4 w-4 ml-2" />
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

export default IntakeForm;