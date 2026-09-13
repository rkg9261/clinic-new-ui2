// src/utils/auth.js

export const getAuthToken = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  return token;
};


export const getAuthHeaders = () => {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  return {
    Authorization:
      token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`,

    "Content-Type":
      "application/json",
  };
};