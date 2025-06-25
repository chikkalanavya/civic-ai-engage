
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Users, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import FeedbackForm from "@/components/FeedbackForm";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [activeView, setActiveView] = useState("home");

  const renderContent = () => {
    switch (activeView) {
      case "chat":
        return <ChatInterface />;
      case "feedback":
        return <FeedbackForm />;
      case "dashboard":
        return <AdminDashboard />;
      default:
        return <HomePage setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      {renderContent()}
    </div>
  );
};

const HomePage = ({ setActiveView }: { setActiveView: (view: string) => void }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          Intelligent Citizen Engagement Platform
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">Citizen AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Streamline communication between government and citizens with AI-powered assistance, 
          real-time sentiment analysis, and intelligent data insights.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => setActiveView("chat")} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Conversation
          </Button>
          <Button 
            onClick={() => setActiveView("feedback")} 
            variant="outline" 
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
          >
            Share Feedback
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-gray-900">AI Assistant</CardTitle>
            <CardDescription className="text-gray-600">
              Get instant answers to civic queries with our intelligent conversational AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setActiveView("chat")} 
              variant="outline" 
              className="w-full"
            >
              Try Now
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-gray-900">Sentiment Analysis</CardTitle>
            <CardDescription className="text-gray-600">
              Share your feedback and help us understand citizen sentiment through AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setActiveView("feedback")} 
              variant="outline" 
              className="w-full"
            >
              Give Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-gray-900">Analytics Dashboard</CardTitle>
            <CardDescription className="text-gray-600">
              Real-time insights and data visualization for government administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setActiveView("dashboard")} 
              variant="outline" 
              className="w-full"
            >
              View Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Platform Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Citizens Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">2s</div>
            <div className="text-gray-600">Avg Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
