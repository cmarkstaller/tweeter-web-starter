import { Status } from "tweeter-shared";
import { View } from "./Presenter";
import { StatusService } from "../model/service/StatusService";
import { PagedItemPresenter } from "./PagedItemPresenter";

export interface StatusItemView extends View {
  addItems: (newItems: Status[]) => void;
}

export abstract class StatusItemPresenter extends PagedItemPresenter<
  Status,
  StatusService
> {
  protected createService(): StatusService {
    return new StatusService();
  }
}
