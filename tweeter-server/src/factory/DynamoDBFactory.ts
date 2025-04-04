import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";
import { FeedDynamoDBDao } from "../dao/dao_classes/FeedDynamoDBDao";
import { FollowsDynamoDBDao } from "../dao/dao_classes/FollowsDynamoDBDao";
import { ImageS3Dao } from "../dao/dao_classes/ImageS3Dao";
import { StoryDynamoDBDao } from "../dao/dao_classes/StoryDynamoDBDao";
import { UserDynamoDBDao } from "../dao/dao_classes/UserDynamoDBDao";
import { AuthTokenDao } from "../dao/dao_interfaces/AuthTokenDao";
import { FeedDao } from "../dao/dao_interfaces/FeedDao";
import { FollowsDao } from "../dao/dao_interfaces/FollowsDao";
import { ImageDao } from "../dao/dao_interfaces/ImageDao";
import { StatusDao } from "../dao/dao_interfaces/StatusDao";
import { StoryDao } from "../dao/dao_interfaces/StoryDao";
import { UserDao } from "../dao/dao_interfaces/UserDao";
import { Factory } from "./Factory";

export class DynamoDBFactory implements Factory {
  public getFollowsDao(): FollowsDao {
    return new FollowsDynamoDBDao();
  }
  public getUserDao(): UserDao {
    return new UserDynamoDBDao();
  }
  public getAuthTokenDao(): AuthTokenDao {
    return new AuthTokenDynamoDBDao();
  }
  public getImageDao(): ImageDao {
    return new ImageS3Dao();
  }
  public getStoryDao(): StoryDao {
    return new StoryDynamoDBDao();
  }
  public getFeedDao(): FeedDao {
    return new FeedDynamoDBDao();
  }
}
