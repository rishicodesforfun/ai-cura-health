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
        <div className="max-w-6xl mx-auto">
          {/* Simplified Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">
              Symptom Analysis
            </h1>
            <p className="text-muted-foreground">
              Describe your symptoms below for instant AI health insights
            </p>
          </div>

          {/* Main Symptom Checker - Always Visible */}
          <div className="mb-8">
            <Card className="shadow-lg border-primary/20">
              <CardContent className="p-6">
                <SymptomChecker />
              </CardContent>
            </Card>
          </div>

          {/* History Section */}
          <div>
            <DiagnosisHistory />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;