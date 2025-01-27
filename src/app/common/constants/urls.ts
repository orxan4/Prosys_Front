import { environment } from '../../../environments/environment';

const baseUrl: string = environment.baseUrl;

const urls = {
  auth: baseUrl + '/api/auth',
  lessons: baseUrl + '/api/lessons',
  students: baseUrl + '/api/students',
  exams: baseUrl + '/api/exams',
};

export default urls;
