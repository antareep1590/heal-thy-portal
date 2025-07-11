import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  Calendar as CalendarIcon, 
  Pause, 
  Play, 
  X, 
  AlertTriangle, 
  CheckCircle,
  Receipt,
  Truck,
  RotateCcw,
  Eye,
  CreditCard,
  Plus,
  Trash2,
  Star,
  LogOut,
  User
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MyAccount = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
      name: "John Doe"
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "09/25",
      isDefault: false,
      name: "John Doe"
    }
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

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
    }
  ];

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      date: new Date("2024-01-15"),
      productName: "Semaglutide",
      dosage: "0.25mg",
      total: 299.00,
      status: "delivered",
      trackingNumber: "1Z999AA1234567890",
      canReorder: true,
      image: "/placeholder.svg"
    },
    {
      id: "ORD-2024-002", 
      date: new Date("2024-02-18"),
      productName: "BPC-157",
      dosage: "5mg",
      total: 199.00,
      status: "in_progress",
      trackingNumber: "1Z999BB1234567891",
      canReorder: true,
      image: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string, consultationExpiry?: Date) => {
    if (consultationExpiry) {
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
    } else {
      // For order status
      switch (status) {
        case "delivered":
          return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
        case "in_progress":
          return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
        case "refunded":
          return <Badge className="bg-red-100 text-red-800">Refunded</Badge>;
        default:
          return <Badge variant="secondary">{status}</Badge>;
      }
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const getCardIcon = (type: string) => {
    return <CreditCard className="h-6 w-6" />;
  };

  const handleAddCard = () => {
    const newMethod = {
      id: Date.now(),
      type: "visa",
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      isDefault: false,
      name: newCard.name
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const AddCardModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Payment Method</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={newCard.name}
              onChange={(e) => setNewCard({...newCard, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={newCard.number}
              onChange={(e) => setNewCard({...newCard, number: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={newCard.cvc}
                onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleAddCard}>Add Card</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your subscriptions, orders, and payment methods</p>
          </div>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Upcoming
                      </h4>
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

                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">Skip Next</Button>
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-orange-600">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="hidden md:block">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Your Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={order.image} 
                                alt={order.productName}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <div className="font-medium">{order.productName}</div>
                                <div className="text-sm text-gray-500">{order.dosage}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{order.date.toLocaleDateString()}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Receipt className="h-4 w-4 mr-1" />
                                Invoice
                              </Button>
                              {order.trackingNumber && (
                                <Button variant="outline" size="sm">
                                  <Truck className="h-4 w-4 mr-1" />
                                  Track
                                </Button>
                              )}
                              {order.canReorder && (
                                <Button variant="outline" size="sm">
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">{order.date.toLocaleDateString()}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={order.image} 
                        alt={order.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{order.productName}</div>
                        <div className="text-sm text-gray-500">{order.dosage}</div>
                        <div className="text-lg font-semibold">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Receipt className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      )}
                      {order.canReorder && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payments" className="space-y-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getCardIcon(method.type)}
                      <div>
                        <div className="font-medium">
                          •••• •••• •••• {method.last4}
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.name} • Expires {method.expiry}
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Star className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(method.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardContent className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Payment Method</h3>
                <p className="text-gray-600 mb-4">Securely save a new card for faster checkout</p>
                <AddCardModal />
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Secure Payment Processing</h4>
                    <p className="text-blue-800 text-sm mt-1">
                      Your payment information is encrypted and securely stored. We use industry-standard 
                      security measures to protect your financial data and never store your full card details.
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

export default MyAccount;