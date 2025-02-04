import { usersController } from "./users.repository";
import { UsersSearchDTO } from "./dto/users.dto";

const usersService = usersController();

export const getUsers = async (
  request: UsersSearchDTO
): Promise<ModelUsersResponse> => {
  const res: ModelUsersResponse = await usersService.getUsers(request);
  return res;
};
