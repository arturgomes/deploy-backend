export const TOKEN_KEY = "@couponFeed-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getName = () => localStorage.getItem("usr");
export const getId = () => localStorage.getItem("ui");
export const login = (token, name, id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("usr", name);
  localStorage.setItem("ui", id);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("usr");
  localStorage.removeItem("ui");
};