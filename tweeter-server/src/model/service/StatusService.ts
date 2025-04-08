import {
  AuthToken,
  FakeData,
  Status,
  StatusDto,
  TweeterResponse,
  UserDto,
} from "tweeter-shared";
import { FollowsDao } from "../../dao/dao_interfaces/FollowsDao";
import { ImageDao } from "../../dao/dao_interfaces/ImageDao";
import { UserDao } from "../../dao/dao_interfaces/UserDao";
import { Factory } from "../../factory/Factory";
import { StoryDao } from "../../dao/dao_interfaces/StoryDao";
import { StatusEntity } from "../../dao/entities/StoryEntity";
import { DataPage } from "../../dao/entities/DataPage";
import { FeedDao } from "../../dao/dao_interfaces/FeedDao";
import { FollowEntity } from "../../dao/entities/FollowEntity";
import { AuthTokenDao } from "../../dao/dao_interfaces/AuthTokenDao";

export class StatusService {
  private userDao: UserDao;
  private imageDao: ImageDao;
  private storyDao: StoryDao;
  private feedDao: FeedDao;
  private followsDao: FollowsDao;
  private authTokenDao: AuthTokenDao;

  constructor(factory: Factory) {
    this.userDao = factory.getUserDao();
    this.imageDao = factory.getImageDao();
    this.storyDao = factory.getStoryDao();
    this.feedDao = factory.getFeedDao();
    this.followsDao = factory.getFollowsDao();
    this.authTokenDao = factory.getAuthTokenDao();
  }

  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    if (!(await this.authTokenDao.checkAuthToken(token))) {
      throw new Error("Error Authenticating. Login again");
    }
    const data: DataPage<StatusEntity> = await this.storyDao.getPageOfStories(
      userAlias,
      pageSize,
      lastItem?.timestamp
    );
    var dtos: StatusDto[] = [];

    for (const statusEntity of data.values) {
      const userEntity = await this.userDao.getUser(statusEntity.alias);
      const fileName: string = `${userEntity!.alias}_Image`;
      const imageUrl = await this.imageDao.getImage(fileName);
      console.log("Here is my image url" + imageUrl);
      const userDto: UserDto = {
        firstName: userEntity!.firstName,
        lastName: userEntity!.lastName,
        alias: userEntity!.alias,
        imageUrl: imageUrl,
      };
      const statusDto: StatusDto = {
        post: statusEntity.post,
        user: userDto,
        timestamp: statusEntity.time_stamp,
      };

      dtos.push(statusDto);
    }

    return [dtos, data.hasMorePages];
  }

  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    if (!(await this.authTokenDao.checkAuthToken(token))) {
      throw new Error("Error Authenticating. Login again");
    }
    const data: DataPage<StatusDto> = await this.feedDao.getPageOfFeed(
      userAlias,
      pageSize,
      lastItem?.timestamp
    );

    return [data.values, data.hasMorePages];
  }

  public async postStatus(
    token: string,
    newStatus: StatusDto
  ): Promise<boolean> {
    if (!(await this.authTokenDao.checkAuthToken(token))) {
      throw new Error("Error Authenticating. Login again");
    }
    const statusEntity: StatusEntity = {
      alias: newStatus.user.alias,
      time_stamp: newStatus.timestamp,
      post: newStatus.post,
    };

    await this.storyDao.putStory(statusEntity);

    // const dataPage = await this.followsDao.getAllFollowers(statusEntity.alias);
    // const followers: FollowEntity[] = dataPage.values;
    // for (const entity of followers) {
    //   const followerAlias: string = entity.followerHandle;

    //   await this.feedDao.putFeed(followerAlias, newStatus);
    // }
    return true;
  }

  private async getFakeData(
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      Status.fromDto(lastItem),
      pageSize
    );
    const dtos = items.map((status) => status.dto);
    return [dtos, hasMore];
  }
}
