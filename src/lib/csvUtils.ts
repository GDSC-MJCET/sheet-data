import { Student } from '@/types/student';

export interface CSVDownloadOptions {
  filename: string;
  data: Student[];
  filterType?: 'all' | 'hr' | 'app' | 'portfolio';
  portfolioType?: string;
}

export const convertStudentsToCSV = (students: Student[]): string => {
  if (students.length === 0) return '';

  // Define CSV headers
  const headers = [
    'Name',
    'Roll Number',
    'Email',
    'Phone Number',
    'Branch',
    'Year',
    'LinkedIn',
    'GitHub',
    'Previous Work',
    'Selected Portfolios',
    'Portfolio 1',
    'Portfolio 2',
    'Status',
    'Submitted At',
    'Created At'
  ];

  // Convert students to CSV rows
  const rows = students.map(student => [
    `"${student.name}"`,
    `"${student.rollNo}"`,
    `"${student.email}"`,
    `"${student.phoneNo}"`,
    `"${student.branch}"`,
    `"${student.year}"`,
    `"${student.linkedin}"`,
    `"${student.github}"`,
    `"${student.previousWork}"`,
    `"${student.selectedPortfolios.join(', ')}"`,
    `"${student.portfolio1 || ''}"`,
    `"${student.portfolio2 || ''}"`,
    `"${student.status}"`,
    `"${new Date(student.submittedAt).toLocaleString()}"`,
    `"${new Date(student.createdAt).toLocaleString()}"`
  ]);

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  
  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const filterStudentsForDownload = (
  students: Student[], 
  filterType: 'all' | 'hr' | 'app' | 'portfolio',
  portfolioType?: string
): Student[] => {
  switch (filterType) {
    case 'hr':
      return students.filter(student => 
        student.selectedPortfolios.includes('hr')
      );
    case 'app':
      return students.filter(student => 
        student.selectedPortfolios.includes('app')
      );
    case 'portfolio':
      if (!portfolioType) return students;
      return students.filter(student => 
        student.selectedPortfolios.includes(portfolioType)
      );
    case 'all':
    default:
      return students;
  }
};

export const generateFilename = (
  filterType: 'all' | 'hr' | 'app' | 'portfolio',
  portfolioType?: string,
  totalCount?: number
): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  switch (filterType) {
    case 'hr':
      return `students_hr_${timestamp}.csv`;
    case 'app':
      return `students_app_${timestamp}.csv`;
    case 'portfolio':
      if (!portfolioType) return `students_${timestamp}.csv`;
      return `students_${portfolioType}_${timestamp}.csv`;
    case 'all':
    default:
      return `students_all_${totalCount || 'data'}_${timestamp}.csv`;
  }
};
