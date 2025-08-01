
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Package, History, CreditCard, LogOut } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock login state - in real app this would come from auth context
  const isLoggedIn = true; // Set to true to show My Account
  const userName = "John"; // Mock user name

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HealthPortal</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/categories')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Treatments
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              All Products
            </button>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => navigate('/support')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/my-account')}
              >
                <User className="h-4 w-4 mr-2" />
                My Account
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-4">
              <button 
                onClick={() => {navigate('/categories'); setIsMenuOpen(false);}}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Treatments
              </button>
              <button 
                onClick={() => {navigate('/products'); setIsMenuOpen(false);}}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                All Products
              </button>
              <button 
                onClick={() => {navigate('/how-it-works'); setIsMenuOpen(false);}}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                How It Works
              </button>
              <button 
                onClick={() => {navigate('/support'); setIsMenuOpen(false);}}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Support
              </button>
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="text-sm font-medium text-gray-900 px-2 py-1">
                      Welcome, {userName}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {navigate('/my-account'); setIsMenuOpen(false);}}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
