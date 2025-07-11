import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: ""
  });
  const { toast } = useToast();

  const faqs = [
    {
      question: "How long does it take to get my prescription?",
      answer: "After physician approval, your prescription is typically processed within 1-2 business days and shipped via overnight delivery. Most patients receive their medication within 3-5 business days of approval."
    },
    {
      question: "Are the medications FDA-approved?",
      answer: "Yes, all medications we prescribe are FDA-approved. We only work with licensed, certified pharmacies that follow strict quality and safety standards."
    },
    {
      question: "How do I know if a treatment is right for me?",
      answer: "Our health assessment questionnaire and physician review process ensures that treatments are safe and appropriate for your specific health profile. Our doctors will only approve treatments that are suitable for you."
    },
    {
      question: "Can I pause or cancel my subscription?",
      answer: "Yes, you can pause your subscription for up to 3 months or cancel at any time through your account dashboard. For pauses longer than 3 months, you may need a new consultation."
    },
    {
      question: "What if I experience side effects?",
      answer: "Contact our medical team immediately if you experience any concerning side effects. We provide 24/7 support and can adjust your treatment or dosage as needed."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use HIPAA-compliant security measures to protect your personal health information. All data is encrypted and stored securely."
    },
    {
      question: "Do you accept insurance?",
      answer: "Currently, we do not accept insurance. However, we strive to keep our treatments affordable and offer transparent pricing with no hidden fees."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer refunds for unopened, unused medications within 30 days of delivery. Please contact support to initiate a refund request."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with a support specialist",
      availability: "Mon-Fri, 8AM-8PM EST",
      action: "1-800-HEALTH",
      primary: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "support@healthportal.com",
      primary: false
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent successfully",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our support team is here to assist you every step of the way. Find answers to common questions or get in touch directly.
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className={`relative ${method.primary ? 'ring-2 ring-blue-600' : ''}`}>
                {method.primary && (
                  <Badge className="absolute -top-2 left-4 bg-blue-600">
                    Recommended
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    {method.availability}
                  </div>
                  <Button 
                    className={method.primary ? "w-full" : "w-full"} 
                    variant={method.primary ? "default" : "outline"}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium text-left">
                        {faq.question}
                      </CardTitle>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Couldn't find what you're looking for? Try different keywords or contact support directly.
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200 mt-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900">Medical Emergency</h4>
                    <p className="text-red-800 text-sm mt-1">
                      If you're experiencing a medical emergency, please call 911 immediately or go to your nearest emergency room. 
                      Do not use this form for urgent medical concerns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Support;