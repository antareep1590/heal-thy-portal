
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Package, Calendar as CalendarIcon, Pause, Play, X, AlertTriangle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MySubscriptions = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock subscription data
  const subscriptions = [
    {
      id: 1,
      productName: "Semaglutide",
      dosage: "0.25mg",
      status: "active",
      price: 299,
      nextBilling: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      nextShipment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      consultationExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      shipmentHistory: [
        { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), status: "delivered" },
        { date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), status: "delivered" },
      ]
    },
    {
      id: 2,
      productName: "BPC-157",
      dosage: "5mg",
      status: "active", 
      price: 199,
      nextBilling: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      nextShipment: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      consultationExpiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      shipmentHistory: [
        { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), status: "delivered" },
      ]
    },
    {
      id: 3,
      productName: "NAD+ Therapy",
      dosage: "100mg",
      status: "reconsult_needed",
      price: 349,
      nextBilling: null,
      nextShipment: null,
      consultationExpiry: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Expired
      shipmentHistory: [
        { date: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000), status: "delivered" },
        { date: new Date(Date.now() - 125 * 24 * 60 * 60 * 1000), status: "delivered" },
      ]
    }
  ];

  const getStatusBadge = (status: string, consultationExpiry: Date) => {
    const now = new Date();
    const isExpiringSoon = consultationExpiry.getTime() - now.getTime() < 14 * 24 * 60 * 60 * 1000;
    
    if (status === "reconsult_needed") {
      return <Badge variant="destructive">Reconsult Required</Badge>;
    }
    if (isExpiringSoon && status === "active") {
      return <Badge className="bg-orange-100 text-orange-800">Consultation Expires Soon</Badge>;
    }
    if (status === "active") {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
    if (status === "paused") {
      return <Badge variant="secondary">Paused</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const SkipShipmentModal = ({ subscription }: { subscription: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Skip Next</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skip Next Shipment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            You're about to skip your next shipment of {subscription.productName}. 
            Your billing date will be pushed back by one month.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> You can only skip up to 2 consecutive shipments before requiring a new consultation.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm Skip</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const RescheduleModal = ({ subscription }: { subscription: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Reschedule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Delivery</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-4">
              Select a new date for your next {subscription.productName} delivery:
            </p>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date > new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)}
              className="rounded-md border"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm New Date</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const PauseSubscriptionModal = ({ subscription }: { subscription: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-orange-600">
          <Pause className="h-4 w-4 mr-1" />
          Pause
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pause Subscription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            How long would you like to pause your {subscription.productName} subscription?
          </p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select pause duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 month</SelectItem>
              <SelectItem value="2">2 months</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
            </SelectContent>
          </Select>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> Pausing for more than 3 months will require a new consultation to resume.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Pause Subscription</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
          <p className="text-gray-600">Manage your active treatments and upcoming deliveries</p>
        </div>

        <div className="space-y-6">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {subscription.productName}
                      <Badge variant="outline">{subscription.dosage}</Badge>
                    </CardTitle>
                    <p className="text-gray-600 text-sm mt-1">
                      ${subscription.price}/month
                    </p>
                  </div>
                  {getStatusBadge(subscription.status, subscription.consultationExpiry)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Status-specific alerts */}
                {subscription.status === "reconsult_needed" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-semibold text-red-800">Consultation Required</h4>
                        <p className="text-red-700 text-sm mt-1">
                          Your consultation expired on {subscription.consultationExpiry.toLocaleDateString()}. 
                          Complete a new consultation to resume your subscription.
                        </p>
                        <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                          Schedule Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {subscription.status === "active" && new Date(subscription.consultationExpiry.getTime() - Date.now()) < new Date(14 * 24 * 60 * 60 * 1000) && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Consultation Expires Soon</h4>
                        <p className="text-orange-700 text-sm mt-1">
                          Your consultation expires on {subscription.consultationExpiry.toLocaleDateString()}.
                          Schedule a renewal to avoid interruption.
                        </p>
                        <Button size="sm" variant="outline" className="mt-3 border-orange-300 text-orange-700">
                          Renew Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscription Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Upcoming
                    </h4>
                    {subscription.nextShipment ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next shipment:</span>
                          <span className="font-medium">{subscription.nextShipment.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next billing:</span>
                          <span className="font-medium">{subscription.nextBilling?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Consultation valid until:</span>
                          <span className="font-medium">{subscription.consultationExpiry.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Subscription paused</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Shipments</h4>
                    <div className="space-y-2">
                      {subscription.shipmentHistory.slice(0, 3).map((shipment, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{shipment.date.toLocaleDateString()}</span>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-green-600 capitalize">{shipment.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {subscription.status === "active" && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <SkipShipmentModal subscription={subscription} />
                    <RescheduleModal subscription={subscription} />
                    <PauseSubscriptionModal subscription={subscription} />
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Subscription */}
        <Card className="mt-8 border-dashed">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Another Treatment</h3>
            <p className="text-gray-600 mb-4">Explore our comprehensive range of personalized treatments</p>
            <Button onClick={() => window.location.href = '/products'}>
              Browse Treatments
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default MySubscriptions;
