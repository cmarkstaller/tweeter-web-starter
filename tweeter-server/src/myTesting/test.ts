import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";
import { DynamoDBFactory } from "../factory/DynamoDBFactory";
import { StatusService } from "../model/service/StatusService";

// Command to run -> npx ts-node src/myTesting/test.ts

// const AuthTokenDao = new AuthTokenDynamoDBDao();

// AuthTokenDao.deleteAuthToken("9be08b93-0053-40f4-8880-b13c00553975");

(async () => {
  try {
    const statusService: StatusService = new StatusService(
      new DynamoDBFactory()
    );
    const res = await statusService.loadMoreStoryItems(
      "token",
      "chris",
      10,
      null
    );
    console.log(res);
  } catch (error) {
    console.error("Error:", error);
  }
})();
