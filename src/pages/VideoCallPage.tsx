"use client";

import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Clock, Phone, Video } from "lucide-react";
import VideoCall from "@/components/VideoCall";

const VideoCallPage = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    specialty: string;
    rating: number;
    experience: string;
  } | null>(null);

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      rating: 4.8,
      experience: "15 years",
      available: true
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.9,
      experience: "20 years",
      available: true
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      rating: 4.7,
      experience: "12 years",
      available: false
    }
  ];

  const startCall = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setSelectedDoctor(null);
  };

  if (isCallActive && selectedDoctor) {
    return (
      <VideoCall 
        doctorName={selectedDoctor.name}
        specialty={selectedDoctor.specialty}
        onEndCall={endCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Connect with a Doctor</h1>
              <p className="text-gray-600">Video consultations with healthcare professionals</p>
            </div>
          </div>
        </div>

        {/* Available Doctors */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Available Doctors
              </CardTitle>
              <CardDescription>
                Select a doctor to start a video consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor, index) => (
                  <Card key={index} className="border-purple-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </div>
                        <Badge variant={doctor.available ? "default" : "secondary"}>
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                className={`text-sm ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{doctor.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience} experience</span>
                        </div>
                        
                        {doctor.available ? (
                          <Button 
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            onClick={() => startCall(doctor)}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Start Video Call
                          </Button>
                        ) : (
                          <Button disabled className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Not Available
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>How Video Consultations Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Select a Doctor</h3>
                  <p className="text-sm text-gray-600">
                    Choose from our network of qualified healthcare professionals
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Start the Call</h3>
                  <p className="text-sm text-gray-600">
                    Connect via video with just one click from your device
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Get Expert Advice</h3>
                  <p className="text-sm text-gray-600">
                    Receive personalized medical recommendations and next steps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;