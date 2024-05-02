import { getCurrentUser } from "./storeUser";

export const userRole = () => {
  const user = getCurrentUser();
  return user?.role;
};
