import { AuthTokenDynamoDBDao } from "../dao/dao_classes/AuthTokenDynamoDBDao";

const AuthTokenDao = new AuthTokenDynamoDBDao();

AuthTokenDao.deleteAuthToken("1700e640-4f5c-4a27-a057-83a6e71c7740");
