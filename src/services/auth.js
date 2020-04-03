export const TOKEN_KEY = "@_CouponFeed-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getName = () => localStorage.getItem("usr");
export const getId = () => localStorage.getItem("ui");
export const getTu = () => localStorage.getItem("tu");

export const login = (token, name, id, tu) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("usr", name);
  localStorage.setItem("ui", id);
  localStorage.setItem("tu", tu);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("usr");
  localStorage.removeItem("ui");
  localStorage.removeItem("tu");
  localStorage.clear()
};