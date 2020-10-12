import CONFIG from "../config";
export const { BASE_URL } = CONFIG;

export const USER = {
  login: () => `${BASE_URL}/api/login`,
  register: () => `${BASE_URL}/api/register`,
  logout: () => `${BASE_URL}/api/logout`,
};

export const INSTANCE = {
  getInstances: () => `${BASE_URL}/api/instances`,
  toggleInstance: (action, id) => `${BASE_URL}/api/instances/${action}/${id}`,
};
