
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Users, MessageSquare, ThumbsUp } from "lucide-react";

const AdminDashboard = () => {
  // Mock data for visualization
  const sentimentData = [
    { name: "Positive", value: 45, count: 450 },
    { name: "Neutral", value: 35, count: 350 },
    { name: "Negative", value: 20, count: 200 },
  ];

  const categoryData = [
    { category: "Waste Mgmt", count: 120, sentiment: 65 },
    { category: "Transport", count: 98, sentiment: 72 },
    { category: "Utilities", count: 87, sentiment: 58 },
    { category: "Permits", count: 76, sentiment: 81 },
    { category: "Taxes", count: 65, sentiment: 45 },
    { category: "Safety", count: 54, sentiment: 78 },
  ];

  const weeklyData = [
    { day: "Mon", interactions: 45, feedback: 12 },
    { day: "Tue", interactions: 52, feedback: 18 },
    { day: "Wed", interactions: 38, feedback: 8 },
    { day: "Thu", interactions: 67, feedback: 22 },
    { day: "Fri", interactions: 59, feedback: 15 },
    { day: "Sat", interactions: 31, feedback: 9 },
    { day: "Sun", interactions: 28, feedback: 6 },
  ];

  const recentFeedback = [
    {
      id: 1,
      message: "The new online permit system is much easier to use!",
      sentiment: "Positive",
      category: "Permits",
      time: "2 hours ago"
    },
    {
      id: 2,
      message: "Garbage collection was delayed again this week",
      sentiment: "Negative", 
      category: "Waste Management",
      time: "4 hours ago"
    },
    {
      id: 3,
      message: "Bus routes are well planned in our area",
      sentiment: "Positive",
      category: "Transport",
      time: "6 hours ago"
    },
    {
      id: 4,
      message: "Need better information about tax deadlines",
      sentiment: "Neutral",
      category: "Taxes",
      time: "8 hours ago"
    }
  ];

  const COLORS = {
    Positive: "#10B981",
    Neutral: "#F59E0B", 
    Negative: "#EF4444"
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "text-green-600 bg-green-50";
      case "Negative": return "text-red-600 bg-red-50"; 
      case "Neutral": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Real-time insights into citizen engagement and sentiment analysis</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Citizens</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45%</div>
            <p className="text-xs text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8s</div>
            <p className="text-xs text-muted-foreground">-0.2s from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sentiment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>Overall citizen sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Service Category Performance</CardTitle>
            <CardDescription>Feedback count and satisfaction by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" name="Feedback Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Activity Trends</CardTitle>
          <CardDescription>Daily interactions and feedback over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="interactions" stroke="#3B82F6" strokeWidth={2} name="Interactions" />
              <Line type="monotone" dataKey="feedback" stroke="#10B981" strokeWidth={2} name="Feedback" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Citizen Feedback</CardTitle>
          <CardDescription>Latest feedback with AI sentiment analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-2">{item.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                  {item.sentiment}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
