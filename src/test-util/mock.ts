import { of } from 'rxjs';

export const mockAuthService = {
  login: () => {},
  logout: () => {},
  getUser: () => of({}),
  getToken: () => {},
  getParsedToken: () => {},
  removeToken: () => {},
  checkValidityToken: () => true
};
