import { FakeData, User, UserDto } from "tweeter-shared";
import { FollowsDao } from "../../dao/dao_interfaces/FollowsDao";
import { UserDao } from "../../dao/dao_interfaces/UserDao";
import { Factory } from "../../factory/Factory";
import { DataPage } from "../../dao/entities/DataPage";
import { Follower } from "../../dao/entities/Follower";

export class FollowService {
  // private followsDao: FollowsDao;
  // private userDao: UserDao;

  // constructor(factory: Factory) {
  //   this.followsDao = factory.getFollowsDao();
  //   this.userDao = factory.getUserDao();
  // }

  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    // TODO: Replace with the result of calling server
    // const data: DataPage<Follower> = await this.followsDao.getPageOfFollowers(
    //   userAlias,
    //   pageSize,
    //   lastItem?.alias
    // );
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    // TODO: Replace with the result of calling server
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  private async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }
}
