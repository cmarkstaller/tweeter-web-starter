import { AuthTokenDao } from "../dao/dao_interfaces/AuthTokenDao";
import { FollowsDao } from "../dao/dao_interfaces/FollowsDao";
import { StatusDao } from "../dao/dao_interfaces/StatusDao";
import { UserDao } from "../dao/dao_interfaces/UserDao";

export interface Factory {
  getFollowsDao(): FollowsDao;
  getStatusDao(): StatusDao;
  getUserDao(): UserDao;
  getAuthTokenDao(): AuthTokenDao;
}
