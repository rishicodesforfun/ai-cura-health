import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface OptionConfig {
  title: string;
  description: string;
  icon: any; // Using any for Lucide icon component type
  iconClass: string;
  badge: React.ReactNode;
  checkColor: string;
  features: string[];
  cardBorder: string;
  cardBg: string;
  cardHover: string;
}

interface OptionCardProps {
  config: OptionConfig;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard = ({ config, isSelected, onClick }: OptionCardProps) => {
  const Icon = config.icon;
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? `${config.cardBorder} ${config.cardBg} shadow-md` 
          : `border-gray-200 ${config.cardHover}`
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${config.iconClass}`} />
            <div>
              <CardTitle className="text-lg">{config.title}</CardTitle>
              <CardDescription className="text-sm">
                {config.description}
              </CardDescription>
            </div>
          </div>
          {config.badge}
        </div>
      </CardHeader>
      
      <div className="px-6 pb-6">
        <div className="space-y-2 mb-4">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className={`h-4 w-4 ${config.checkColor}`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className={`flex items-center text-sm font-medium ${
          isSelected ? config.iconClass : "text-gray-400"
        }`}>
          {isSelected ? "Selected" : "Click to select"}
          {isSelected && <ArrowRight className="ml-2 h-4 w-4" />}
        </div>
      </div>
    </Card>
  );
};

export default OptionCard;
