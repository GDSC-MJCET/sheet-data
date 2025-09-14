import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Download, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StudentTableRowProps {
  student: Student;
}

const StudentTableRow = ({ student }: StudentTableRowProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "destructive";
      default:
        return "warning";
    }
  };

  const handleResumeDownload = () => {
    if (student.resume) {
      window.open(student.resume, '_blank');
    }
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{student.name}</TableCell>
      <TableCell>{student.rollNo}</TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>{student.phoneNo}</TableCell>
      <TableCell>{student.branch}</TableCell>
      <TableCell>{student.year}</TableCell>
      <TableCell>
        <Badge variant={getStatusVariant(student.status) as any}>
          {student.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {student.selectedPortfolios.map((portfolio) => (
            <Badge key={portfolio} variant="secondary" className="text-xs">
              {portfolio}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="max-w-xs">
        <div className="truncate" title={student.previousWork}>
          {student.previousWork || "-"}
        </div>
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(student.submittedAt), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          {student.resume && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleResumeDownload}
              className="h-8 w-8 p-0"
              title="Download Resume"
            >
              <Download className="h-3 w-3" />
            </Button>
          )}
          {student.linkedin && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(student.linkedin, '_blank')}
              className="h-8 w-8 p-0"
              title="View LinkedIn"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;