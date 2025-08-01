
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ConsultationFlow from "./pages/ConsultationFlow";
import PostConsultationSummary from "./pages/PostConsultationSummary";
import MySubscriptions from "./pages/MySubscriptions";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYou from "./pages/ThankYou";
import IntakeForm from "./pages/IntakeForm";
import PreConsultation from "./pages/PreConsultation";
import OrderHistory from "./pages/OrderHistory";
import MyAccount from "./pages/MyAccount";
import PaymentMethods from "./pages/PaymentMethods";
import RenewalPage from "./pages/RenewalPage";
import EligibilityQuestionnaire from "./pages/EligibilityQuestionnaire";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/consultation/:productId" element={<ConsultationFlow />} />
          <Route path="/consultation-summary/:consultId" element={<PostConsultationSummary />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-subscriptions" element={<MySubscriptions />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/intake-form" element={<IntakeForm />} />
          <Route path="/pre-consultation" element={<PreConsultation />} />
          <Route path="/renewal" element={<RenewalPage />} />
          <Route path="/eligibility-questionnaire" element={<EligibilityQuestionnaire />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
