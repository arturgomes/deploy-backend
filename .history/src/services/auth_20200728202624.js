export const TOKEN_KEY = "tk";
export const isAuthenticated = () => localStorage.getItem("ui") !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getName = () => localStorage.getItem("usr");
export const getId = () => localStorage.getItem("ui");
export const getTu = () => localStorage.getItem("tu");
export const getUser = () => localStorage.getItem("tu") === '897316929176464ebc9ad085f31e7284' ? "customer" : "retail"
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
  localStorage.clear();
};