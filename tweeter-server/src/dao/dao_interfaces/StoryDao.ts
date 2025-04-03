import { DataPage } from "../entities/DataPage";
import { StatusEntity } from "../entities/StoryEntity";

export interface StoryDao {
  putStory(status: StatusEntity): Promise<void>;
  getPageOfStories(
    alias: string,
    pageSize: number,
    time_stamp: number | undefined
  ): Promise<DataPage<StatusEntity>>;
}
