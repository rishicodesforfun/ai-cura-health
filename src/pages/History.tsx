"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Calendar, 
  User, 
  Weight, 
  AlertTriangle,
  Download,
  Filter,
  Eye
} from "lucide-react";

interface HealthRecord {
  id: string;
  userId: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  symptoms: string;
  image?: File | null;
  createdAt: string;
  diagnosis?: {
    condition: string;
    confidence: number;
    severity: "low" | "medium" | "high";
  };
}

const History = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<HealthRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load records from localStorage
    const storedRecords = localStorage.getItem("aicura_health_records");
    const userData = JSON.parse(localStorage.getItem("aicura_users") || "[]");
    
    if (storedRecords) {
      const parsedRecords: HealthRecord[] = JSON.parse(storedRecords);
      // Add user information to records
      const recordsWithUserInfo = parsedRecords.map(record => {
        const user = userData.find((u: any) => u.id === record.userId);
        return {
          ...record,
          name: user?.name || "Unknown User",
          age: user?.age || "",
          gender: user?.gender || "",
          weight: user?.weight || ""
        };
      });
      setRecords(recordsWithUserInfo);
      setFilteredRecords(recordsWithUserInfo);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter records based on search term
    if (searchTerm) {
      const filtered = records.filter(record =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis?.condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  }, [searchTerm, records]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aicura_health_records.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Records...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health History</h1>
            <p className="text-gray-600">Track your health records and symptom history over time</p>
          </div>
          <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search records</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name, symptoms, or diagnosis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {filteredRecords.length} of {records.length} records
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records Grid */}
        {filteredRecords.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Health Records Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "No records match your search criteria." : "Complete a health assessment to see your records here."}
              </p>
              <Button onClick={() => window.location.href = "/"}>
                Start New Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{record.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {formatDate(record.createdAt)}
                      </CardDescription>
                    </div>
                    {record.diagnosis && (
                      <Badge className={getSeverityColor(record.diagnosis.severity)}>
                        {record.diagnosis.severity}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {record.age}y, {record.gender}
                      </div>
                      {record.weight && (
                        <div className="flex items-center gap-1">
                          <Weight className="h-4 w-4" />
                          {record.weight}kg
                        </div>
                      )}
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h4 className="font-medium text-sm mb-1">Symptoms</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {record.symptoms}
                      </p>
                    </div>

                    {/* Diagnosis */}
                    {record.diagnosis && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Diagnosis</h4>
                        <div className="bg-blue-50 rounded p-2">
                          <p className="font-medium text-sm">{record.diagnosis.condition}</p>
                          <p className="text-xs text-gray-600">
                            Confidence: {record.diagnosis.confidence}%
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Data Usage Notice */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Data Usage for AI Training</h4>
                <p className="text-sm text-blue-700">
                  Your health records are stored securely and will be used to improve our AI diagnostic models. 
                  All data is anonymized and aggregated for research purposes. You can export your data at any time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default History;