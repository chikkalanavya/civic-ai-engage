
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant for citizen services. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      "voter": "You can register to vote online at the Elections Office website or visit your nearest municipal office with valid ID.",
      "garbage": "Garbage collection schedules vary by zone. Please provide your address for specific pickup days, or report missed collections via our portal.",
      "tax": "Property tax payments can be made online, by phone, or at City Hall. The next due date is typically March 31st.",
      "permit": "Building permits can be applied for online through our Planning Department portal. Processing time is typically 2-3 weeks.",
      "complaint": "You can file complaints through our 311 service online, by phone at (555) 311-CITY, or visit any municipal office.",
      "hours": "City Hall is open Monday-Friday 8:00 AM to 5:00 PM. Some services are available 24/7 online.",
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "I understand you're asking about city services. Could you please provide more specific details about what you need help with? I can assist with voting, taxes, permits, complaints, and general city information.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: simulateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <MessageSquare className="w-5 h-5" />
            AI Citizen Assistant
          </CardTitle>
          <p className="text-sm text-blue-700">
            Ask me anything about city services, permits, taxes, and more
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question about city services..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Available 24/7 for citizen support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
