import { Student, ApiResponse } from '@/types/student';

const API_BASE_URL = 'https://api.gdgcmjcet.in';

export class ApiService {
  static async fetchApplications(): Promise<Student[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error('API returned success: false');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }
}
