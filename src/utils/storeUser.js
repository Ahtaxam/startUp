const KEY = "user";
export const storeCurrentUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

export const authorizationHeader = (headers, storeState) => {
  const result = JSON.parse(localStorage.getItem(KEY));
  if (result) {
    headers.set("Authorization", `Bearer ${result.token}`);
  }
  return headers;
};

export const logoutUser = () => {
  localStorage.removeItem(KEY);
};
