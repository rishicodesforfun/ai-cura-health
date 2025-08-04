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
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl flex items-center justify-center float-animation">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Describe Your Symptoms
            </span>
            <br />
            <span className="text-foreground">Get AI Analysis</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Enter your symptoms and upload images for skin conditions. Get instant AI-powered preliminary health insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="xl" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white px-8 py-4 text-lg">
                Start Symptom Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="w-full sm:w-auto px-8 py-4 text-lg">
                I Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
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