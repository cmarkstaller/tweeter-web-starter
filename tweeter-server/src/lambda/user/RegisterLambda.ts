import type { AuthResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const handler = async (
  request: RegisterRequest
): Promise<AuthResponse> => {
  const userService = new UserService(new DynamoDBFactory());

  try {
    const [userDto, authToken] = await userService.register(
      request.firstName,
      request.lastName,
      request.alias,
      request.password,
      request.userImageBytes,
      request.imageFileExtension
    );
    return {
      success: true,
      message: null,
      user: userDto,
      token: authToken.token,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      user: null,
      token: null,
    };
  }
};
