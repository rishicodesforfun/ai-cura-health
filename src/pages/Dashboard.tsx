import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  User, 
  Clock, 
  FileText, 
  Plus,
  Brain,
  Heart,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import SymptomChecker from '@/components/SymptomChecker';
import DiagnosisHistory from '@/components/DiagnosisHistory';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Health Checks',
      value: '12',
      icon: Activity,
      change: '+2 this week',
      color: 'from-primary to-primary-glow'
    },
    {
      title: 'Risk Assessment',
      value: 'Low',
      icon: Shield,
      change: 'Stable',
      color: 'from-secondary to-secondary-glow'
    },
    {
      title: 'Avg Response Time',
      value: '2.3s',
      icon: Clock,
      change: 'Improved',
      color: 'from-accent to-accent-glow'
    },
    {
      title: 'Health Score',
      value: '85',
      icon: TrendingUp,
      change: '+5 points',
      color: 'from-success to-warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.displayName || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Monitor your health insights and track your wellness journey.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="checker">Health Check</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="health-card border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-success">{stat.change}</p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="health-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      Quick Health Check
                    </CardTitle>
                    <CardDescription>
                      Get instant AI-powered health insights based on your symptoms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="medical" 
                      className="w-full"
                      onClick={() => setActiveTab('checker')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Start Health Check
                    </Button>
                  </CardContent>
                </Card>

                <Card className="health-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent" />
                      Recent Analysis
                    </CardTitle>
                    <CardDescription>
                      View your latest health assessments and recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab('history')}
                    >
                      View History
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Health Tips */}
              <Card className="health-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    Personalized Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <h4 className="font-medium text-secondary mb-2">Hydration</h4>
                      <p className="text-sm text-muted-foreground">
                        Drink 8 glasses of water daily for optimal health.
                      </p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h4 className="font-medium text-accent mb-2">Exercise</h4>
                      <p className="text-sm text-muted-foreground">
                        30 minutes of moderate activity can boost your energy.
                      </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">Sleep</h4>
                      <p className="text-sm text-muted-foreground">
                        7-9 hours of quality sleep supports immune function.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Checker Tab */}
            <TabsContent value="checker">
              <SymptomChecker />
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <DiagnosisHistory />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="health-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-lg">{user?.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="health-card border-0">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        Your health data is encrypted and secure
                      </p>
                    </div>
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">HIPAA Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        We follow healthcare privacy standards
                      </p>
                    </div>
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;