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

const HealthInfoModal = ({ isOpen, onClose, onSubmit }: HealthInfoModalProps) => {
  const [selectedOption, setSelectedOption] = useState<"self" | "other" | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption === "self");
      onClose();
    }
  };

  const getOptionIcon = (option: "self" | "other") => {
    if (option === "self") {
      return <User className="h-6 w-6 text-cyan-600" />;
    } else {
      return <Users className="h-6 w-6 text-blue-600" />;
    }
  };

  const getOptionTitle = (option: "self" | "other") => {
    if (option === "self") {
      return "For Myself";
    } else {
      return "For Someone Else";
    }
  };

  const getOptionDescription = (option: "self" | "other") => {
    if (option === "self") {
      return "This health information will be saved to your personal health history and used to track your health over time.";
    } else {
      return "This health information will be used for analysis only and won't be saved to any personal profile.";
    }
  };

  const getOptionBadge = (option: "self" | "other") => {
    if (option === "self") {
      return <Badge className="bg-green-100 text-green-800">Personal History</Badge>;
    } else {
      return <Badge variant="outline">One-time Analysis</Badge>;
    }
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
            {/* For Myself Option */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedOption === "self" 
                  ? "border-cyan-500 bg-cyan-50 shadow-md" 
                  : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
              }`}
              onClick={() => setSelectedOption("self")}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getOptionIcon("self")}
                    <div>
                      <CardTitle className="text-lg">{getOptionTitle("self")}</CardTitle>
                      <CardDescription className="text-sm">
                        {getOptionDescription("self")}
                      </CardDescription>
                    </div>
                  </div>
                  {getOptionBadge("self")}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Saved to your personal health history</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Track health trends over time</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Personalized health insights</span>
                </div>
              </CardContent>
            </Card>

            {/* For Someone Else Option */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedOption === "other" 
                  ? "border-blue-500 bg-blue-50 shadow-md" 
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() => setSelectedOption("other")}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getOptionIcon("other")}
                    <div>
                      <CardTitle className="text-lg">{getOptionTitle("other")}</CardTitle>
                      <CardDescription className="text-sm">
                        {getOptionDescription("other")}
                      </CardDescription>
                    </div>
                  </div>
                  {getOptionBadge("other")}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>One-time analysis only</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>No personal data storage</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Anonymous processing</span>
                </div>
              </CardContent>
            </Card>
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