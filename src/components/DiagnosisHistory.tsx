import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Trash2,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HistoryItem {
  id: number;
  date: string;
  symptoms: string;
  result: {
    condition: string;
    confidence: number;
    description: string;
    severity: 'low' | 'medium' | 'high';
    recommendations: string[];
    medications: string[];
    consultationNeeded: boolean;
  };
}

const DiagnosisHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem('aicura-history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const deleteItem = (id: number) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('aicura-history', JSON.stringify(newHistory));
    toast({
      title: "Deleted",
      description: "Health assessment removed from history.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredHistory = history.filter(item => 
    filter === 'all' || item.result.severity === filter
  );

  if (history.length === 0) {
    return (
      <Card className="health-card border-0">
        <CardContent className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Health Assessments Yet</h3>
          <p className="text-muted-foreground mb-4">
            Your health assessment history will appear here after you complete your first analysis.
          </p>
          <Button variant="medical">
            Start Health Check
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="health-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Health Assessment History
              </CardTitle>
              <CardDescription>
                View and manage your past health assessments and AI recommendations.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="flex items-center gap-1">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="all">All Severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="health-card border-0">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{formatDate(item.date)}</span>
                  <Badge className={getSeverityColor(item.result.severity)}>
                    {item.result.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {item.result.confidence}% confidence
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Condition */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1">{item.result.condition}</h3>
                <p className="text-sm text-muted-foreground">
                  Symptoms: {item.symptoms.slice(0, 100)}
                  {item.symptoms.length > 100 && '...'}
                </p>
              </div>

              {/* Consultation Warning */}
              {item.result.consultationNeeded && (
                <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg mb-4">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Professional consultation was recommended
                  </span>
                </div>
              )}

              {/* Expanded Content */}
              {expandedItems.has(item.id) && (
                <div className="space-y-4 border-t border-border pt-4">
                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">Assessment Details</h4>
                    <p className="text-sm text-muted-foreground">{item.result.description}</p>
                  </div>

                  {/* Full Symptoms */}
                  <div>
                    <h4 className="font-medium mb-2">Reported Symptoms</h4>
                    <p className="text-sm text-muted-foreground">{item.symptoms}</p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <div className="space-y-1">
                      {item.result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-success mt-1" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <h4 className="font-medium mb-2">Suggested Medications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.result.medications.map((med, index) => (
                        <div key={index} className="p-2 bg-secondary/10 rounded text-sm">
                          {med}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && filter !== 'all' && (
        <Card className="health-card border-0">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No assessments found with {filter} severity.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnosisHistory;