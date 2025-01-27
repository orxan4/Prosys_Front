import { HttpHeaders } from '@angular/common/http';

const tokenService = {
  setAccessToken: (newAccessToken: string): void => {
    sessionStorage.setItem('accessToken', newAccessToken);
  },
  deleteAccessToken: (): void => {
    sessionStorage.removeItem('accessToken');
  },
  getAccessTokenWithinHttpHeaders: (): HttpHeaders => {
    return new HttpHeaders({ Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` });
  },
  isLoggedIn: (): boolean => {
    return !!sessionStorage.getItem('accessToken');
  },
};

export default tokenService;
