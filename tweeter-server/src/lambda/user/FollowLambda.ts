import type { FollowResponse, UserRequest } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: UserRequest
): Promise<FollowResponse> => {
  const userService = new UserService();
  const [numFollower, numFollowee] = await userService.follow(
    request.token,
    request.user
  );

  return {
    success: true,
    message: null,
    numFollower: numFollower,
    numFollowee: numFollowee,
  };
};
