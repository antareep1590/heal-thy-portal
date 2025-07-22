
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, CreditCard, X, Edit2, Tag } from "lucide-react";
import Header from "@/components/Header";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const productId = searchParams.get('product');
  const dosage = searchParams.get('dosage');
  const duration = searchParams.get('duration') || '1';
  const relatedProductIds = searchParams.get('relatedProducts')?.split(',').filter(Boolean) || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [selectedRelatedProducts, setSelectedRelatedProducts] = useState<string[]>(relatedProductIds);
  const [isLoggedIn] = useState(false); // Mock login state
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [tempDosage, setTempDosage] = useState(dosage || '0.25mg');
  const [tempDuration, setTempDuration] = useState(duration);

  const subscriptionPlans = [
    { value: "1", label: "1 month", discount: 0 },
    { value: "3", label: "3 months", discount: 10 },
    { value: "6", label: "6 months", discount: 15 },
    { value: "12", label: "12 months", discount: 20 }
  ];

  // Mock product data
  const product = {
    name: "Semaglutide",
    dosages: [
      { value: "0.25mg", label: "0.25mg (Starting dose)", price: 299 },
      { value: "0.5mg", label: "0.5mg (Maintenance)", price: 349 },
      { value: "1.0mg", label: "1.0mg (Maximum)", price: 399 },
    ]
  };

  // Mock related products data
  const relatedProductsData = [
    { id: "2", name: "B12 Injection", price: 99 },
    { id: "3", name: "Tirzepatide", price: 399 }
  ];

  const getDiscountedPrice = (price: number) => {
    return price * (1 - couponDiscount / 100);
  };

  const selectedDosagePrice = product.dosages.find(d => d.value === (editingProduct === 'main' ? tempDosage : dosage))?.price || 299;
  const selectedDuration = editingProduct === 'main' ? tempDuration : duration;
  const relatedProductsTotal = selectedRelatedProducts.reduce((total, productId) => {
    const relatedProduct = relatedProductsData.find(p => p.id === productId);
    return total + (relatedProduct?.price || 0);
  }, 0);
  const subtotal = (selectedDosagePrice + relatedProductsTotal) * parseInt(selectedDuration);
  const totalPrice = getDiscountedPrice(subtotal);
  const consultationFee = 49;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveRelatedProduct = (productId: string) => {
    setSelectedRelatedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'FIRST20': 20
    };
    
    const discount = validCoupons[couponCode as keyof typeof validCoupons] || 0;
    setCouponDiscount(discount);
    
    if (discount === 0 && couponCode) {
      alert('Invalid coupon code');
    }
  };

  const handleSaveProductChanges = () => {
    // Update URL params with new selections
    const newParams = new URLSearchParams(searchParams);
    newParams.set('dosage', tempDosage);
    newParams.set('duration', tempDuration);
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
    setEditingProduct(null);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (!isLoggedIn && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Mock successful checkout
    console.log("Checkout submitted:", formData);
    
    // Simulate account creation and login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    
    // Navigate to thank you page
    const relatedProductsParam = selectedRelatedProducts.length > 0 
      ? `&relatedProducts=${selectedRelatedProducts.join(',')}` 
      : '';
    navigate(`/thank-you?total=${totalPrice + consultationFee}${relatedProductsParam}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Creation (if not logged in) */}
            {!isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    An account will be created to manage your orders and subscriptions
                  </p>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      I accept the Terms of Service, Privacy Policy, and HIPAA Consent. I understand this medication requires a valid prescription from a licensed physician.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Main Product */}
                      <TableRow className="bg-blue-50/50">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          {editingProduct === 'main' ? (
                            <Select value={tempDosage} onValueChange={setTempDosage}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {product.dosages.map(d => (
                                  <SelectItem key={d.value} value={d.value}>{d.value}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            dosage
                          )}
                        </TableCell>
                        <TableCell>
                          {editingProduct === 'main' ? (
                            <Select value={tempDuration} onValueChange={setTempDuration}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {subscriptionPlans.map(plan => (
                                  <SelectItem key={plan.value} value={plan.value}>
                                    {plan.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            subscriptionPlans.find(p => p.value === selectedDuration)?.label
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${selectedDosagePrice * parseInt(selectedDuration)}
                        </TableCell>
                        <TableCell>
                          {editingProduct === 'main' ? (
                            <div className="flex space-x-1">
                              <Button size="sm" onClick={handleSaveProductChanges}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setEditingProduct('main')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>

                      {/* Related Products */}
                      {selectedRelatedProducts.map(productId => {
                        const relatedProduct = relatedProductsData.find(p => p.id === productId);
                        if (!relatedProduct) return null;
                        
                        return (
                          <TableRow key={productId}>
                            <TableCell className="font-medium">{relatedProduct.name}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                              {subscriptionPlans.find(p => p.value === selectedDuration)?.label}
                            </TableCell>
                            <TableCell className="font-semibold">
                              ${relatedProduct.price * parseInt(selectedDuration)}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveRelatedProduct(productId)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Coupon Code */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4" />
                    <Label htmlFor="coupon">Coupon Code</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id="coupon"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {couponDiscount > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Coupon applied! {couponDiscount}% discount
                    </p>
                  )}
                </div>

                <Separator />

                {/* Pricing Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({couponDiscount}%):</span>
                      <span>-${(subtotal * couponDiscount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Treatment cost:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consultation fee:</span>
                    <span>${consultationFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${(totalPrice + consultationFee).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full text-lg py-6"
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                >
                  Complete Purchase
                </Button>

                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
