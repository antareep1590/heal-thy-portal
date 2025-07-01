
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
}

const BreadcrumbNav = ({ currentStep, totalSteps, onBack, canGoBack }: BreadcrumbNavProps) => {
  const steps = [
    { label: "Product Details", completed: true },
    { label: "General Questionnaire", completed: currentStep > 1 },
    { label: "Product Intake Form", completed: currentStep > 2 },
    { label: "Checkout", completed: false }
  ];

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        disabled={!canGoBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Breadcrumb Navigation */}
      <div className="hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center">
                <BreadcrumbItem>
                  {index === currentStep ? (
                    <BreadcrumbPage className="font-semibold text-blue-600">
                      {step.label}
                    </BreadcrumbPage>
                  ) : step.completed ? (
                    <BreadcrumbLink className="text-green-600 font-medium">
                      {step.label}
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-gray-400">{step.label}</span>
                  )}
                </BreadcrumbItem>
                {index < steps.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default BreadcrumbNav;
