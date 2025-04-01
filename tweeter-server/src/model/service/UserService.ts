import bcrypt from "bcryptjs";
import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";
import { AuthTokenDao } from "../../dao/dao_interfaces/AuthTokenDao";
import { UserDao } from "../../dao/dao_interfaces/UserDao";
import { Factory } from "../../factory/Factory";
import { UserEntity } from "../../dao/entities/UserEntity";
import { AuthTokenEntity } from "../../dao/entities/AuthTokenEntity";
import { ImageDao } from "../../dao/dao_interfaces/ImageDao";

export class UserService {
  private userDao: UserDao;
  private authTokenDao: AuthTokenDao;
  private imageDao: ImageDao;

  public constructor(factory: Factory) {
    this.userDao = factory.getUserDao();
    this.authTokenDao = factory.getAuthTokenDao();
    this.imageDao = factory.getImageDao();
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    return FakeData.instance.isFollower();
  }

  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(User.fromDto(user)!.alias);
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(User.fromDto(user)!.alias);
  }

  public async follow(
    token: string,
    userToFollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(token, userToFollow);

    return [followerCount, followeeCount];
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

    return [followerCount, followeeCount];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const userEntity: UserEntity | undefined = await this.userDao.getUser(
      alias
    );

    if (!userEntity) {
      throw new Error("Did you mean to register?");
    }
    const userPassword = userEntity.password;

    const isValidPassword = await bcrypt.compare(password, userPassword);
    if (!isValidPassword) {
      throw new Error("Error with user name or password");
    }

    const fileName: string = `${alias}_Image`;
    const imageUrl = await this.imageDao.getImage(fileName);

    const userDto: UserDto = {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      alias: alias,
      imageUrl: imageUrl,
    };

    const authToken: AuthToken = AuthToken.Generate();
    const authTokenEntity: AuthTokenEntity = {
      alias: alias,
      token: authToken.token,
      timeStamp: authToken.timestamp,
    };
    await this.authTokenDao.putAuthToken(authTokenEntity);

    return [userDto, authToken];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): Promise<[UserDto, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3

    // TODO: Replace with the result of calling the server
    // const user = FakeData.instance.firstUser;

    if ((await this.userDao.getUser(alias)) !== undefined) {
      throw new Error("User Alias already taken. Try a different one.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity: UserEntity = {
      alias,
      password: hashedPassword,
      firstName,
      lastName,
    };

    await this.userDao.putUser(userEntity);

    const fileName: string = `${alias}_Image`;
    const imageUrl = await this.imageDao.putImage(fileName, userImageBytes);

    const userDto: UserDto = {
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      imageUrl: imageUrl,
    };

    const authToken: AuthToken = AuthToken.Generate();
    const authTokenEntity: AuthTokenEntity = {
      alias: alias,
      token: authToken.token,
      timeStamp: authToken.timestamp,
    };

    await this.authTokenDao.putAuthToken(authTokenEntity);

    return [userDto, authToken];
  }

  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }

  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias)?.dto || null;
  }
}
