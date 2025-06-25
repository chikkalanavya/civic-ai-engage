
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const analyzeSentiment = (text: string): string => {
    const positiveWords = ["good", "great", "excellent", "amazing", "wonderful", "helpful", "satisfied", "happy"];
    const negativeWords = ["bad", "terrible", "awful", "disappointed", "frustrated", "angry", "poor", "delayed"];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return "Positive";
    if (negativeCount > positiveCount) return "Negative";
    return "Neutral";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "message" && value.length > 10) {
      const detectedSentiment = analyzeSentiment(value);
      setSentiment(detectedSentiment);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Feedback Submitted Successfully!",
        description: "Thank you for your input. We'll review your feedback shortly.",
      });
    }, 1000);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "text-green-600 bg-green-50";
      case "Negative": return "text-red-600 bg-red-50";
      case "Neutral": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted and will be analyzed for sentiment and trends.
            </p>
            {sentiment && (
              <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getSentimentColor(sentiment)}`}>
                Detected Sentiment: {sentiment}
              </div>
            )}
            <div className="mt-6">
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    category: "",
                    subject: "",
                    message: "",
                  });
                  setSentiment(null);
                }}
                variant="outline"
              >
                Submit Another Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Citizen Feedback Form
          </CardTitle>
          <CardDescription>
            Share your experience with city services. Your feedback helps us improve and is analyzed using AI sentiment analysis.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Service Category</Label>
              <Select onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="transport">Public Transportation</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="permits">Permits & Licensing</SelectItem>
                  <SelectItem value="taxes">Taxes & Finance</SelectItem>
                  <SelectItem value="healthcare">Public Health</SelectItem>
                  <SelectItem value="safety">Public Safety</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief subject of your feedback"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Your Feedback</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Please provide detailed feedback about your experience..."
                className="min-h-[120px]"
                required
              />
              {sentiment && (
                <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(sentiment)}`}>
                  AI Detected Sentiment: {sentiment}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
