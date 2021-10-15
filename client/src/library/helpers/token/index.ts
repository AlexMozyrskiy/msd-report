export const getAccessToken = (): string | null => {
  return localStorage.getItem('AccessToken');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('AccessToken', token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('AccessToken');
};
