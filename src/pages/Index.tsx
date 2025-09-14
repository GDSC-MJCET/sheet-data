import { useState, useEffect } from "react";
import PasswordProtection from "@/components/PasswordProtection";
import StudentDashboard from "@/components/StudentDashboard";
import { Student } from "@/types/student";
import { ApiService } from "@/services/api";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.fetchApplications();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-lg font-semibold mb-2">Error</div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={fetchStudents}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <StudentDashboard students={students} />;
};

export default Index;