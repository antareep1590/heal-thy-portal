
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import QuestionCard from "../QuestionCard";

interface QuestionData {
  id: string;
  text: string;
  type: 'input' | 'radio' | 'checkbox' | 'select' | 'textarea' | 'number' | 'multi-checkbox';
  options?: string[];
  required?: boolean;
  validation?: (value: any) => boolean;
  skipLogic?: (value: any) => number; // Returns question index to skip to
}

interface QuestionFlowManagerProps {
  questions: QuestionData[];
  onComplete: (answers: Record<string, any>, isEligible: boolean) => void;
  title: string;
}

const QuestionFlowManager = ({ questions, onComplete, title }: QuestionFlowManagerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [eligibilityFlags, setEligibilityFlags] = useState<Record<string, boolean>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];
  
  const canGoNext = !currentQuestion.required || 
    (currentAnswer !== undefined && currentAnswer !== '' && currentAnswer !== null);
  
  const canGoPrevious = currentQuestionIndex > 0;

  const handleAnswerChange = (questionId: string, value: any, affectsEligibility?: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (affectsEligibility !== undefined) {
      setEligibilityFlags(prev => ({ ...prev, [questionId]: affectsEligibility }));
    }
  };

  const handleNext = () => {
    const question = questions[currentQuestionIndex];
    const answer = answers[question.id];
    
    // Check skip logic
    if (question.skipLogic) {
      const skipToIndex = question.skipLogic(answer);
      if (skipToIndex >= 0 && skipToIndex < questions.length) {
        setCurrentQuestionIndex(skipToIndex);
        return;
      }
    }
    
    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Check overall eligibility
      const isEligible = !Object.values(eligibilityFlags).some(flag => flag === false);
      onComplete(answers, isEligible);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestionInput = (question: QuestionData) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'input':
        return (
          <Input
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter your answer"
            className="text-base"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const numValue = parseInt(e.target.value);
              handleAnswerChange(question.id, numValue);
              
              // Age validation for eligibility
              if (question.id === 'age') {
                handleAnswerChange(question.id, numValue, numValue >= 18 && numValue <= 80);
              }
            }}
            placeholder="Enter number"
            className="text-base"
          />
        );

      case 'radio':
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => handleAnswerChange(question.id, val)}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleAnswerChange(question.id, val)}>
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multi-checkbox':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={option}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    let newValues;
                    if (checked) {
                      newValues = [...selectedValues, option];
                    } else {
                      newValues = selectedValues.filter((v: string) => v !== option);
                    }
                    handleAnswerChange(question.id, newValues);
                    
                    // Check for disqualifying conditions
                    if (question.id === 'conditions') {
                      const hasDisqualifyingCondition = newValues.some((condition: string) => 
                        condition.includes("Heart disease") || condition.includes("Kidney disease")
                      );
                      handleAnswerChange(question.id, newValues, !hasDisqualifyingCondition);
                    }
                  }}
                />
                <Label htmlFor={option} className="text-base font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter your answer"
            rows={4}
            className="text-base"
          />
        );

      default:
        return null;
    }
  };

  return (
    <QuestionCard
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      questionText={currentQuestion.text}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
    >
      {renderQuestionInput(currentQuestion)}
    </QuestionCard>
  );
};

export default QuestionFlowManager;
