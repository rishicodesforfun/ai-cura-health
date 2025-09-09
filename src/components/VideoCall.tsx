"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Camera,
  CameraOff,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface VideoCallProps {
  doctorName: string;
  specialty: string;
  onEndCall: () => void;
}

const VideoCall = ({ doctorName, specialty, onEndCall }: VideoCallProps) => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [callQuality, setCallQuality] = useState("good");
  const [isRecording, setIsRecording] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate video call connection
  useEffect(() => {
    // Simulate connection delay
    const connectionTimer = setTimeout(() => {
      setConnectionStatus("connected");
      
      // Simulate getting local video stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.error("Error accessing media devices:", err);
            setConnectionStatus("error");
          });
      }
    }, 2000);

    // Start call duration timer
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectionTimer);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    // In a real app, you would actually mute the audio track here
  };

  const toggleVideo = () => {
    setIsVideoMuted(!isVideoMuted);
    // In a real app, you would actually turn off the video track here
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const endCall = () => {
    setIsCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onEndCall();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected": return "bg-green-100 text-green-800";
      case "connecting": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case "connected": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "connecting": return <Clock className="h-4 w-4 text-yellow-600 animate-spin" />;
      case "error": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Video Consultation</h1>
            <p className="text-gray-600">Connected with your healthcare provider</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getConnectionStatusColor()}>
              {getConnectionStatusIcon()}
              {connectionStatus === "connecting" ? "Connecting..." : 
               connectionStatus === "connected" ? "Connected" : 
               connectionStatus === "error" ? "Connection Error" : "Unknown"}
            </Badge>
            <Button 
              variant="destructive" 
              onClick={endCall}
              className="flex items-center gap-2"
            >
              <PhoneOff className="h-4 w-4" />
              End Call
            </Button>
          </div>
        </div>

        {/* Video Call Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Patient Video */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                You
              </CardTitle>
              <CardDescription>Your camera feed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video 
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {isVideoMuted && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <CameraOff className="h-12 w-12 text-white" />
                  </div>
                )}
                {!isCallActive && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="text-center text-white">
                      <PhoneOff className="h-12 w-12 mx-auto mb-2" />
                      <p>Call ended</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Doctor Video */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                Dr. {doctorName}
              </CardTitle>
              <CardDescription>{specialty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video 
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {connectionStatus === "connecting" && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                    <p>Connecting to Dr. {doctorName}...</p>
                  </div>
                )}
                {connectionStatus === "error" && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <p>Connection failed. Please check your internet.</p>
                  </div>
                )}
                {!isCallActive && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="text-center text-white">
                      <PhoneOff className="h-12 w-12 mx-auto mb-2" />
                      <p>Call ended</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call Controls */}
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Call Duration */}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{formatTime(callDuration)}</span>
              </div>

              {/* Call Quality */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  callQuality === "excellent" ? "bg-green-500" :
                  callQuality === "good" ? "bg-yellow-500" :
                  "bg-red-500"
                }`}></div>
                <span className="text-sm text-gray-600">Quality: {callQuality}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                <Button 
                  variant={isAudioMuted ? "destructive" : "outline"}
                  size="sm"
                  onClick={toggleAudio}
                  className="flex items-center gap-2"
                >
                  {isAudioMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isAudioMuted ? "Unmute" : "Mute"}
                </Button>
                
                <Button 
                  variant={isVideoMuted ? "destructive" : "outline"}
                  size="sm"
                  onClick={toggleVideo}
                  className="flex items-center gap-2"
                >
                  {isVideoMuted ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                  {isVideoMuted ? "Video On" : "Video Off"}
                </Button>

                <Button 
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={toggleRecording}
                  className="flex items-center gap-2"
                >
                  {isRecording ? <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> : <div className="w-2 h-2 bg-gray-400 rounded-full" />}
                  {isRecording ? "Stop Recording" : "Record"}
                </Button>
                
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={endCall}
                  className="flex items-center gap-2"
                >
                  <PhoneOff className="h-4 w-4" />
                  End Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Notes */}
        <Card className="mt-6 border-purple-200">
          <CardHeader>
            <CardTitle>Consultation Notes</CardTitle>
            <CardDescription>
              Your doctor will provide recommendations and next steps during this call
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-800">
                During your consultation, Dr. {doctorName} will review your symptoms, 
                discuss potential treatment options, and provide personalized recommendations 
                based on your health history and current condition.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call Summary */}
        <Card className="mt-6 border-purple-200">
          <CardHeader>
            <CardTitle>Call Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{formatTime(callDuration)}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {isRecording ? "Active" : "Not Active"}
                </div>
                <div className="text-sm text-gray-600">Recording</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {connectionStatus === "connected" ? "Good" : "Poor"}
                </div>
                <div className="text-sm text-gray-600">Connection</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoCall;