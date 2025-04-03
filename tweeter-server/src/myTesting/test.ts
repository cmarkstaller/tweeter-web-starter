import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";
import { FollowsDynamoDBDao } from "../dao/dao_classes/FollowsDynamoDBDao";
import { FollowEntity } from "../dao/entities/FollowEntity";
import { DynamoDBFactory } from "../factory/DynamoDBFactory";
import { StatusService } from "../model/service/StatusService";
import { UserService } from "../model/service/UserService";

// Command to run -> npx ts-node src/myTesting/test.ts

// (async () => {
//   try {
//     const userService: UserService = new UserService(
//       new DynamoDBFactory()
//     );
//     userDto: UserDto
//     const res = await userService.follow(
//       "token",
//       "chris",
//       10,
//       null
//     );
//     console.log(res);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

// const AuthTokenDao = new AuthTokenDynamoDBDao();

// AuthTokenDao.deleteAuthToken("24aecc38-db1b-434c-b443-063b7f7e1637");

// AuthTokenDao.deleteExpiredAuthTokens();

// (async () => {
//   try {
//     const statusService: StatusService = new StatusService(
//       new DynamoDBFactory()
//     );
//     const res = await statusService.loadMoreStoryItems(
//       "token",
//       "chris",
//       10,
//       null
//     );
//     console.log(res);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

// (async () => {
//   try {
//     const authTokenDao = new AuthTokenDynamoDBDao();
//     const res = await authTokenDao.getAllAuthTokens();
//     console.log(res);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

// (async () => {
//   try {
//     const authTokenDao = new AuthTokenDynamoDBDao();
//     const res = await authTokenDao.deleteExpiredAuthTokens();
//     console.log(res);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

// (async () => {
//   try {
//     const followsDao = new FollowsDynamoDBDao();
//     const followEntity: FollowEntity = {
//       followerHandle: "chris",
//       followerName: "chris",
//       followeeHandle: "@audrey",
//       followeeName: "audrey",
//     };
//     const res = await followsDao.putFollower(followEntity);
//     console.log(res);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
