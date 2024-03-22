export const saveAccessTokenToLS = async (access_token: string) => {
  try {
    localStorage.setItem("access_token", access_token);
  } catch (error) {
    console.error("Error saving access token to Local Storage:", error);
  }
};

export const getAccessTokenFromLS = async (): Promise<string | null> => {
  try {
    const result = localStorage.getItem("access_token");
    return result;
  } catch (error) {
    console.error("Error getting access token from Local Storage:", error);
    return null;
  }
};

export const clearLS = async () => {
  try {
    localStorage.removeItem("access_token");
  } catch (error) {
    console.error("Error clearing Local Storage:", error);
  }
};

export const savePhoneToLS = async (phone: string) => {
  try {
    localStorage.setItem("phoneUser", phone);
  } catch (error) {
    console.error("Error saving phone number to Local Storage:", error);
  }
};

export const saveCurrentLanguageToLS = async (language: "vi" | "china") => {
  try {
    localStorage.setItem("currentLanguage", language);
  } catch (error) {
    console.error("Error saving current language to Local Storage:", error);
  }
};

export const getCurrentLanguageFromLS = async (): Promise<string | null> => {
  try {
    const result = localStorage.getItem("currentLanguage");
    return result;
  } catch (error) {
    console.error("Error getting current language from Local Storage:", error);
    return null;
  }
};

export const getPhoneUserFromLs = async (): Promise<string | null> => {
  try {
    const result = localStorage.getItem("phoneUser");
    return result;
  } catch (error) {
    console.error("Error getting phone number from Local Storage:", error);
    return null;
  }
};
