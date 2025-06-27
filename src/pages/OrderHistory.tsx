
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Receipt, Truck, RotateCcw, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderHistory = () => {
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
    },
    {
      id: "ORD-2023-089",
      date: new Date("2023-12-10"),
      productName: "NAD+ Therapy",
      dosage: "100mg",
      total: 349.00,
      status: "refunded",
      trackingNumber: null,
      canReorder: false,
      image: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string) => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">View and manage your previous orders</p>
        </div>

        {/* Desktop Table View */}
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

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-4">Start your health journey with our personalized treatments</p>
              <Button onClick={() => window.location.href = '/products'}>
                Browse Treatments
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
