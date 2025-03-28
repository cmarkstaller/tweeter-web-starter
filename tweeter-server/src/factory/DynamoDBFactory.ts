import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";
import { FollowsDynamoDBDao } from "../dao/dao_classes/FollowsDynamoDBDao";
import { StatusDynamoDBDao } from "../dao/dao_classes/StatusDynamoDBDao";
import { UserDynamoDBDao } from "../dao/dao_classes/UserDynamoDBDao";
import { AuthTokenDao } from "../dao/dao_interfaces/AuthTokenDao";
import { FollowsDao } from "../dao/dao_interfaces/FollowsDao";
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
}
