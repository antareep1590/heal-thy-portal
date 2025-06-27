
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || "all");

  const products = [
    { 
      id: 1, 
      name: "Semaglutide", 
      category: "weight-loss", 
      categoryLabel: "Weight Loss",
      price: 299, 
      rating: 4.8, 
      reviews: 1247,
      description: "Clinical-grade GLP-1 medication for effective weight management",
      dosages: ["0.25mg", "0.5mg", "1.0mg"],
      popular: true
    },
    { 
      id: 2, 
      name: "BPC-157", 
      category: "peptides", 
      categoryLabel: "Peptides",
      price: 199, 
      rating: 4.9, 
      reviews: 892,
      description: "Body Protection Compound for healing and recovery support",
      dosages: ["5mg", "10mg"],
      popular: true
    },
    { 
      id: 3, 
      name: "NAD+ Therapy", 
      category: "wellness", 
      categoryLabel: "Wellness",
      price: 349, 
      rating: 4.7, 
      reviews: 634,
      description: "Cellular energy optimization and anti-aging support",
      dosages: ["100mg", "200mg"],
      popular: false
    },
    { 
      id: 4, 
      name: "Tirzepatide", 
      category: "weight-loss", 
      categoryLabel: "Weight Loss",
      price: 399, 
      rating: 4.9, 
      reviews: 578,
      description: "Dual GIP/GLP-1 receptor agonist for advanced weight loss",
      dosages: ["2.5mg", "5.0mg", "7.5mg"],
      popular: true
    },
    { 
      id: 5, 
      name: "TB-500", 
      category: "peptides", 
      categoryLabel: "Peptides",
      price: 229, 
      rating: 4.6, 
      reviews: 445,
      description: "Thymosin Beta-4 for tissue repair and recovery",
      dosages: ["5mg", "10mg"],
      popular: false
    },
    { 
      id: 6, 
      name: "Testosterone Therapy", 
      category: "hormone-therapy", 
      categoryLabel: "Hormone Therapy",
      price: 199, 
      rating: 4.8, 
      reviews: 923,
      description: "Hormone replacement therapy for men's health optimization",
      dosages: ["100mg", "200mg"],
      popular: true
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "weight-loss", label: "Weight Loss" },
    { value: "peptides", label: "Peptides" },
    { value: "wellness", label: "Wellness" },
    { value: "hormone-therapy", label: "Hormone Therapy" },
  ];

  const filteredProducts = products
    .filter(product => 
      (filterCategory === "all" || product.category === filterCategory) &&
      (searchTerm === "" || 
       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filterCategory !== "all" 
              ? categories.find(cat => cat.value === filterCategory)?.label + " Treatments"
              : "All Treatments"
            }
          </h1>
          <p className="text-gray-600">Discover personalized treatments with expert medical consultation</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} treatment{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{product.categoryLabel}</Badge>
                  {product.popular && (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-400 ml-1">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Available dosages:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.dosages.map(dosage => (
                      <Badge key={dosage} variant="outline" className="text-xs">
                        {dosage}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <Button onClick={() => navigate(`/product/${product.id}`)}>
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No treatments found matching your criteria</p>
            <Button variant="outline" onClick={() => {setSearchTerm(""); setFilterCategory("all");}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductListingPage;
