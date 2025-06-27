
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  children: ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isNextDisabled?: boolean;
}

const QuestionCard = ({
  questionNumber,
  totalQuestions,
  questionText,
  children,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isNextDisabled = false
}: QuestionCardProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {questionNumber} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="animate-fade-in shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {questionText}
              </h2>
              
              <div className="space-y-4">
                {children}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext || isNextDisabled}
            className="flex items-center"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
