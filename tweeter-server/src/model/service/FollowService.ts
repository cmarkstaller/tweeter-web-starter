import { FakeData, User, UserDto } from "tweeter-shared";
import { FollowsDao } from "../../dao/dao_interfaces/FollowsDao";
import { UserDao } from "../../dao/dao_interfaces/UserDao";
import { Factory } from "../../factory/Factory";
import { DataPage } from "../../dao/entities/DataPage";
import { FollowEntity } from "../../dao/entities/FollowEntity";
import { UserEntity } from "../../dao/entities/UserEntity";
import { ImageDao } from "../../dao/dao_interfaces/ImageDao";
import { AuthTokenDao } from "../../dao/dao_interfaces/AuthTokenDao";

export class FollowService {
  private followsDao: FollowsDao;
  private userDao: UserDao;
  private imageDao: ImageDao;
  private authTokenDao: AuthTokenDao;

  constructor(factory: Factory) {
    this.followsDao = factory.getFollowsDao();
    this.userDao = factory.getUserDao();
    this.imageDao = factory.getImageDao();
    this.authTokenDao = factory.getAuthTokenDao();
  }

  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    if (!(await this.authTokenDao.checkAuthToken(token))) {
      throw new Error("Error Authenticating. Login again");
    }

    const data: DataPage<FollowEntity> =
      await this.followsDao.getPageOfFollowers(
        userAlias,
        pageSize,
        lastItem?.alias
      );
    var aliases: string[] = [];
    for (const follower of data.values) {
      aliases.push(follower.followerHandle);
    }

    var dtos: UserDto[] = [];
    for (const alias of aliases) {
      const userEntity = await this.userDao.getUser(alias);
      if (userEntity == undefined) {
        throw new Error(
          "Retreiving userEntities from database. In follow Service"
        );
      }
      const fileName: string = `${alias}_Image`;
      const imageUrl = await this.imageDao.getImage(fileName);
      const userDto: UserDto = {
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        alias: userEntity.alias,
        imageUrl: imageUrl,
      };
      dtos.push(userDto);
    }
    //return this.getFakeData(lastItem, pageSize, userAlias);
    return [dtos, data.hasMorePages];
  }

  public async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    if (!(await this.authTokenDao.checkAuthToken(token))) {
      throw new Error("Error Authenticating. Login again");
    }
    const data: DataPage<FollowEntity> =
      await this.followsDao.getPageOfFollowees(
        userAlias,
        pageSize,
        lastItem?.alias
      );
    var aliases: string[] = [];
    for (const follower of data.values) {
      aliases.push(follower.followeeHandle);
    }

    var dtos: UserDto[] = [];
    for (const alias of aliases) {
      const userEntity = await this.userDao.getUser(alias);
      if (userEntity == undefined) {
        throw new Error(
          "Retreiving userEntities from database. In follow Service"
        );
      }
      const fileName: string = `${alias}_Image`;
      const imageUrl = await this.imageDao.getImage(fileName);
      const userDto: UserDto = {
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        alias: userEntity.alias,
        imageUrl: imageUrl,
      };
      dtos.push(userDto);
    }
    //return this.getFakeData(lastItem, pageSize, userAlias);
    return [dtos, data.hasMorePages];
  }

  // private async getFakeData(
  //   lastItem: UserDto | null,
  //   pageSize: number,
  //   userAlias: string
  // ): Promise<[UserDto[], boolean]> {
  //   const [items, hasMore] = FakeData.instance.getPageOfUsers(
  //     User.fromDto(lastItem),
  //     pageSize,
  //     userAlias
  //   );
  //   const dtos = items.map((user) => user.dto);
  //   return [dtos, hasMore];
  // }
}
