export const getAuthorizationToken = (): string | null => {
  return localStorage.getItem('AuthorizationToken');
};

export const setAuthorizationToken = (token: string): void => {
  localStorage.setItem('AuthorizationToken', token);
};

export const removeAuthorizationToken = (): void => {
  localStorage.removeItem('AuthorizationToken');
};
