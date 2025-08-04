import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, 
  Brain, 
  Shield, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Heart,
  Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl flex items-center justify-center float-animation">
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AI-Powered Health
              </span>
              <br />
              <span className="text-foreground">Assistant</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get preliminary disease identification based on your symptoms with our intelligent 
              AI assistant. Quick, reliable, and designed to help you make informed health decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-success" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">AIcura</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets healthcare expertise to provide you with reliable health insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="health-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms analyze your symptoms to provide accurate preliminary assessments.
                </p>
              </CardContent>
            </Card>

            <Card className="health-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-glow rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get preliminary health insights in seconds, not days. Quick analysis when you need it most.
                </p>
              </CardContent>
            </Card>

            <Card className="health-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary-glow rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Privacy Focused</h3>
                <p className="text-muted-foreground">
                  Your health data is encrypted and secure. We prioritize your privacy and follow HIPAA guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and secure - get health insights in just three easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe Symptoms</h3>
              <p className="text-muted-foreground">
                Enter your symptoms, upload photos if needed, and provide basic health information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI processes your information and cross-references medical databases.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed insights, recommendations, and options to connect with healthcare providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust AIcura for preliminary health insights.
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="xl" className="shadow-xl">
              Start Your Health Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AIcura
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering better health decisions through AI technology.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 AIcura. All rights reserved. This is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;