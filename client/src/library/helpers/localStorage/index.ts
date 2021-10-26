export const getAccessToken = (): string | null => {
  return localStorage.getItem('AccessToken');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('AccessToken', token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('AccessToken');
};

export const getIsCookieAccepted = (): string | null => {
  return localStorage.getItem('isCookieAccepted');
};

export const setIsCookieAccepted = (bool: 'false' | 'true'): void => {
  localStorage.setItem('isCookieAccepted', bool);
};

export const removeIsCookieAccepted = (): void => {
  localStorage.removeItem('isCookieAccepted');
};
