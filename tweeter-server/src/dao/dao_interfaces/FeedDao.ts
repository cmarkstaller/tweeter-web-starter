import { StatusDto } from "tweeter-shared";
import { DataPage } from "../entities/DataPage";
import { StatusEntity } from "../entities/StoryEntity";

export interface FeedDao {
  putFeed(followerAlias: string, status: StatusDto): Promise<void>;
  getPageOfFeed(
    alias: string,
    pageSize: number,
    timestamp: number | undefined
  ): Promise<DataPage<StatusDto>>;
}
