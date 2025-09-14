import { useState, useMemo } from "react";
import { Student } from "@/types/student";
import StudentTable from "./StudentTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Filter, Code, Smartphone, Shield, Brain, Cloud, Palette, Users2, Camera, Brush, Megaphone, FileText, MessageSquare, Truck, Wrench } from "lucide-react";

interface StudentDashboardProps {
  students: Student[];
}

const PORTFOLIO_TYPES = {
  web: { name: "Web Development", icon: Code, color: "bg-blue-500" },
  app: { name: "Mobile App Development", icon: Smartphone, color: "bg-green-500" },
  cybersecurity: { name: "Cybersecurity", icon: Shield, color: "bg-red-500" },
  aiml: { name: "AI/ML", icon: Brain, color: "bg-purple-500" },
  cloud: { name: "Cloud Computing", icon: Cloud, color: "bg-sky-500" },
  uiux: { name: "UI/UX Design", icon: Palette, color: "bg-pink-500" },
  hr: { name: "Human Resources", icon: Users2, color: "bg-orange-500" },
  media: { name: "Media & Content", icon: Camera, color: "bg-yellow-500" },
  design: { name: "Graphic Design", icon: Brush, color: "bg-indigo-500" },
  marketing: { name: "Marketing", icon: Megaphone, color: "bg-teal-500" },
  doc: { name: "Documentation & Editorial", icon: FileText, color: "bg-gray-500" },
  pr: { name: "PR & Outreach", icon: MessageSquare, color: "bg-cyan-500" },
  log: { name: "Logistics & Operations", icon: Truck, color: "bg-amber-500" },
  custom: { name: "Custom Portfolio", icon: Wrench, color: "bg-slate-500" }
};

const StudentDashboard = ({ students }: StudentDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [portfolioFilter, setPortfolioFilter] = useState<string>("ALL");

  const stats = useMemo(() => {
    const total = students.length;
    const portfolioCounts: { [key: string]: number } = {};
    
    // Count students by portfolio
    students.forEach(student => {
      student.selectedPortfolios.forEach(portfolio => {
        portfolioCounts[portfolio] = (portfolioCounts[portfolio] || 0) + 1;
      });
    });
    
    return { total, portfolioCounts };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPortfolio = portfolioFilter === "ALL" || 
        student.selectedPortfolios.includes(portfolioFilter);
      
      return matchesSearch && matchesPortfolio;
    });
  }, [students, searchTerm, portfolioFilter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Student Applications</h1>
              <p className="text-muted-foreground mt-1">
                Manage and review student applications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredStudents.length} of {students.length} students
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          {Object.entries(stats.portfolioCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([portfolio, count]) => {
              const portfolioInfo = PORTFOLIO_TYPES[portfolio as keyof typeof PORTFOLIO_TYPES];
              if (!portfolioInfo) return null;
              
              const IconComponent = portfolioInfo.icon;
              return (
                <Card key={portfolio}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{portfolioInfo.name}</p>
                        <p className="text-2xl font-bold">{count}</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${portfolioInfo.color.replace('bg-', 'text-')}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, roll number, email, or branch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={portfolioFilter === "ALL" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPortfolioFilter("ALL")}
                >
                  All Portfolios
                </Button>
                {Object.entries(PORTFOLIO_TYPES).map(([key, portfolio]) => (
                  <Button
                    key={key}
                    variant={portfolioFilter === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPortfolioFilter(key)}
                    className="flex items-center gap-2"
                  >
                    <portfolio.icon className="h-4 w-4" />
                    {portfolio.name}
                    {stats.portfolioCounts[key] && (
                      <Badge variant="secondary" className="ml-1">
                        {stats.portfolioCounts[key]}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <StudentTable students={filteredStudents} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;