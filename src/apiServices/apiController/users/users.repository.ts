import apiService from "@/apiServices/apiService";
import { UsersSearchDTO } from "./dto/users.dto";

const USER_API = process.env.USER_API;
export const usersController = (
  configService = {
    baseApiPath: USER_API,
  }
) => {
  const service = apiService(configService);
  return {
    getUsers: (request: UsersSearchDTO) => {
      return service.get(`/users`, {
        ...request,
      });
    },
  };
};
