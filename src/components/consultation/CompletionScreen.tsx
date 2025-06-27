
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface CompletionScreenProps {
  isEligible: boolean;
  onProceed: () => void;
  title: string;
}

const CompletionScreen = ({ isEligible, onProceed, title }: CompletionScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="animate-fade-in shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {isEligible ? (
                <>
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Great! You're Eligible
                    </h2>
                    <p className="text-gray-600">
                      Based on your responses, you appear to be a good candidate for this treatment. 
                      Let's proceed to the next step.
                    </p>
                  </div>
                  <Button 
                    onClick={onProceed}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <AlertCircle className="h-16 w-16 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      We Need More Information
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Based on your responses, this treatment may not be suitable for you at this time. 
                      We recommend consulting with a healthcare provider to discuss your options.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can also reach out to our support team for guidance on alternative treatments.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => window.location.href = 'tel:1-800-HEALTH'}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Contact Support
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletionScreen;
