import UserService from "../services/axios/UserService.js"

export const UseUser = async () => {
    try {
      const response = await UserService.getUser();
      return response.data;
    } catch (error) {
      return "";
    }
  };