
import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import QuestionFlowManager from "@/components/consultation/QuestionFlowManager";
import CompletionScreen from "@/components/consultation/CompletionScreen";
import { generalQuestions, productIntakeQuestions } from "@/data/consultationQuestions";

const ConsultationFlow = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentFlow, setCurrentFlow] = useState<'general' | 'product' | 'complete'>('general');
  const [generalAnswers, setGeneralAnswers] = useState({});
  const [productAnswers, setProductAnswers] = useState({});
  const [isEligible, setIsEligible] = useState(true);

  const dosage = searchParams.get('dosage');
  const duration = searchParams.get('duration');

  const handleGeneralComplete = (answers: Record<string, any>, eligible: boolean) => {
    setGeneralAnswers(answers);
    setIsEligible(eligible);
    
    if (!eligible) {
      setCurrentFlow('complete');
    } else {
      setCurrentFlow('product');
    }
  };

  const handleProductComplete = (answers: Record<string, any>, eligible: boolean) => {
    setProductAnswers(answers);
    setIsEligible(eligible && isEligible); // Combine with previous eligibility
    setCurrentFlow('complete');
  };

  const handleProceedToCheckout = () => {
    // Store consultation data
    localStorage.setItem('lastConsultation', new Date().toISOString());
    localStorage.setItem('consultationAnswers', JSON.stringify({
      general: generalAnswers,
      product: productAnswers
    }));
    
    navigate(`/checkout?product=${productId}&dosage=${dosage}&duration=${duration}`);
  };

  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case 'general':
        return (
          <QuestionFlowManager
            questions={generalQuestions}
            onComplete={handleGeneralComplete}
            title="General Health Assessment"
          />
        );
      
      case 'product':
        return (
          <QuestionFlowManager
            questions={productIntakeQuestions}
            onComplete={handleProductComplete}
            title="Semaglutide Assessment"
          />
        );
      
      case 'complete':
        return (
          <CompletionScreen
            isEligible={isEligible}
            onProceed={handleProceedToCheckout}
            title="Assessment Complete"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderCurrentFlow()}
    </div>
  );
};

export default ConsultationFlow;
