import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";
import { FollowsDynamoDBDao } from "../dao/dao_classes/FollowsDynamoDBDao";
import { ImageS3Dao } from "../dao/dao_classes/ImageS3Dao";
import { StatusDynamoDBDao } from "../dao/dao_classes/StatusDynamoDBDao";
import { UserDynamoDBDao } from "../dao/dao_classes/UserDynamoDBDao";
import { AuthTokenDao } from "../dao/dao_interfaces/AuthTokenDao";
import { FollowsDao } from "../dao/dao_interfaces/FollowsDao";
import { ImageDao } from "../dao/dao_interfaces/ImageDao";
import { StatusDao } from "../dao/dao_interfaces/StatusDao";
import { UserDao } from "../dao/dao_interfaces/UserDao";
import { Factory } from "./Factory";

export class DynamoDBFactory implements Factory {
  public getFollowsDao(): FollowsDao {
    return new FollowsDynamoDBDao();
  }
  public getStatusDao(): StatusDao {
    return new StatusDynamoDBDao();
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
}
