
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Semaglutide",
      category: "Weight Loss",
      description: "FDA-approved GLP-1 medication for significant weight loss and appetite control",
      price: 299,
      rating: 4.8,
      reviews: 1247,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Tirzepatide",
      category: "Weight Loss", 
      description: "Dual GIP/GLP-1 receptor agonist for enhanced weight loss results",
      price: 349,
      rating: 4.9,
      reviews: 892,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "BPC-157",
      category: "Peptides",
      description: "Body protective compound for healing and recovery enhancement",
      price: 199,
      rating: 4.7,
      reviews: 634,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "CJC-1295",
      category: "Peptides",
      description: "Growth hormone releasing peptide for anti-aging benefits",
      price: 249,
      rating: 4.6,
      reviews: 445,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "NAD+ Therapy",
      category: "Anti-Aging",
      description: "Cellular regeneration therapy for enhanced energy and longevity",
      price: 399,
      rating: 4.8,
      reviews: 312,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Testosterone Therapy",
      category: "Hormone Optimization",
      description: "Bioidentical hormone replacement for men's health optimization",
      price: 189,
      rating: 4.7,
      reviews: 789,
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Weight Loss", label: "Weight Loss" },
    { value: "Peptides", label: "Peptides" },
    { value: "Anti-Aging", label: "Anti-Aging" },
    { value: "Hormone Optimization", label: "Hormone Optimization" }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Treatments</h1>
          <p className="text-gray-600">Explore our comprehensive range of wellness treatments</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} treatment{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-4 text-center">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-bold text-blue-600">{product.name.charAt(0)}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>

                {/* Product Info */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No treatments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductListingPage;
