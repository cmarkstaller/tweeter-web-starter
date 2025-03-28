import {
  AuthToken,
  User,
  IsFollowerRequest,
  UserRequest,
  LoginRequest,
  RegisterRequest,
  TweeterRequest,
  GetUserRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";
import { Buffer } from "buffer";

export class UserService {
  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const facade = new ServerFacade();
    const request: IsFollowerRequest = {
      token: authToken.token,
      user: user.dto,
      selectedUser: selectedUser.dto,
    };
    return facade.getIsFollowerStatus(request);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    console.log("Got a call to get followee count");
    const facade = new ServerFacade();
    const request: UserRequest = {
      token: authToken.token,
      user: user.dto,
    };
    return facade.getFolloweeCount(request);
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const facade = new ServerFacade();
    const request: UserRequest = {
      token: authToken.token,
      user: user.dto,
    };
    return facade.getFollowerCount(request);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    const facade = new ServerFacade();
    const request: UserRequest = {
      token: authToken.token,
      user: userToFollow.dto,
    };
    return facade.follow(request);
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    const facade = new ServerFacade();
    const request: UserRequest = {
      token: authToken.token,
      user: userToUnfollow.dto,
    };
    return facade.unfollow(request);
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const facade = new ServerFacade();
    const request: LoginRequest = {
      alias: alias,
      password: password,
      token: "yaggayeet",
    };

    return facade.login(request);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    let imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");
    const facade = new ServerFacade();
    const request: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      password: password,
      userImageBytes: imageStringBase64,
      imageFileExtension: imageFileExtension,
      token: "yaggayeet",
    };

    return facade.register(request);
  }

  public async logout(authToken: AuthToken): Promise<void> {
    const facade = new ServerFacade();
    const request: TweeterRequest = {
      token: authToken.token,
    };
    return facade.logout(request);
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    const facade = new ServerFacade();
    const request: GetUserRequest = {
      token: authToken.token,
      alias: alias,
    };
    return facade.getUser(request);
  }
}
