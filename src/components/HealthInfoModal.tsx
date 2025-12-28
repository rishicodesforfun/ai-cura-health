"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Users, 
  ArrowRight,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface HealthInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (forSelf: boolean) => void;
}

interface OptionConfig {
  title: string;
  description: string;
  icon: typeof User;
  iconClass: string;
  badge: React.ReactNode;
  checkColor: string;
  features: string[];
  cardBorder: string;
  cardBg: string;
  cardHover: string;
}

const OPTIONS_CONFIG: Record<"self" | "other", OptionConfig> = {
  self: {
    title: "For Myself",
    description: "This health information will be saved to your personal health history and used to track your health over time.",
    icon: User,
    iconClass: "text-cyan-600",
    badge: <Badge className="bg-green-100 text-green-800">Personal History</Badge>,
    checkColor: "text-green-600",
    features: [
      "Saved to your personal health history",
      "Track health trends over time",
      "Personalized health insights"
    ],
    cardBorder: "border-cyan-500",
    cardBg: "bg-cyan-50",
    cardHover: "hover:border-cyan-300 hover:bg-cyan-50"
  },
  other: {
    title: "For Someone Else",
    description: "This health information will be used for analysis only and won't be saved to any personal profile.",
    icon: Users,
    iconClass: "text-blue-600",
    badge: <Badge variant="outline">One-time Analysis</Badge>,
    checkColor: "text-blue-600",
    features: [
      "One-time analysis only",
      "No personal data storage",
      "Anonymous processing"
    ],
    cardBorder: "border-blue-500",
    cardBg: "bg-blue-50",
    cardHover: "hover:border-blue-300 hover:bg-blue-50"
  }
};

interface OptionCardProps {
  config: OptionConfig;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard = ({ config, isSelected, onClick }: OptionCardProps) => {
  const Icon = config.icon;
  
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
        isSelected 
          ? `${config.cardBorder} ${config.cardBg} shadow-md` 
          : `border-transparent bg-gray-50 hover:bg-gray-100`
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full bg-white shadow-sm ${config.iconClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{config.title}</h3>
            {config.badge}
          </div>
          <p className="text-sm text-gray-600 mb-3">{config.description}</p>
          <ul className="space-y-1">
            {config.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-500">
                <CheckCircle className={`h-3 w-3 mr-2 ${config.checkColor}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className={`h-4 w-4 rounded-full ${config.checkColor.replace('text-', 'bg-')}`} />
          </div>
        )}
      </div>
    </div>
  );
};

const HealthInfoModal = ({ isOpen, onClose, onSubmit }: HealthInfoModalProps) => {
  const [selectedOption, setSelectedOption] = useState<"self" | "other" | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption === "self");
      onClose();
    }
  };

  const renderOption = (type: "self" | "other") => {
    return (
      <OptionCard
        config={OPTIONS_CONFIG[type]}
        isSelected={selectedOption === type}
        onClick={() => setSelectedOption(type)}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-cyan-600" />
            Health Information
          </DialogTitle>
          <DialogDescription>
            Who is this health information for?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Please let us know if you're filling out this health information for yourself or for someone else. This helps us determine how to store and manage the data.
          </div>

          <div className="space-y-3">
            {renderOption("self")}
            {renderOption("other")}
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealthInfoModal;