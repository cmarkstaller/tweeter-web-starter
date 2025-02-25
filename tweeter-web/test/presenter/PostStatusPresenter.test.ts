import { AuthToken, Status, User } from "tweeter-shared";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenters/PostStatusPresenter";
import {
  instance,
  mock,
  verify,
  spy,
  when,
  anything,
  match,
  deepEqual,
  capture,
} from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model/service/StatusService";

describe("PostStatusPresenter", () => {
  let mockPostStatusPresenterView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;

  const authToken = new AuthToken("abc123", Date.now());
  const user = new User("Christopher", "Markstaller", "Chris", "myimage");
  const status = new Status("Here is my post", user, anything());

  beforeEach(() => {
    mockPostStatusPresenterView = mock<PostStatusView>();
    const mockPostStatusPresenterViewInstance = instance(
      mockPostStatusPresenterView
    );

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusPresenterViewInstance)
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockUserServiceInstance = instance(mockStatusService);

    when(postStatusPresenterSpy.statusService).thenReturn(
      mockUserServiceInstance
    );
  });

  it("The presenter tells the view to display a posting status message.", async () => {
    await postStatusPresenter.submitPost(user, authToken, "Here is my post");
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0)
    ).once();
  });

  it("The presenter calls postStatus on the post status service with the correct status string and auth token.", async () => {
    await postStatusPresenter.submitPost(user, authToken, "Here is my post");
    console.log(authToken);
    console.log(status);

    verify(
      mockStatusService.postStatus(
        authToken,
        deepEqual(new Status("Here is my post", user, anything()))
      )
    ).once();
  });

  it("When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.", async () => {
    await postStatusPresenter.submitPost(user, authToken, "Here is my post");

    verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
    verify(mockPostStatusPresenterView.setPost("")).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)
    ).once();

    verify(mockPostStatusPresenterView.displayErrorMessage(anything())).never();
  });

  it("When posting of the status is not successful, the presenter tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message.", async () => {
    const error = new Error("An error occured");
    when(
      mockStatusService.postStatus(
        authToken,
        deepEqual(new Status("Here is my post", user, anything()))
      )
    ).thenThrow(error);

    await postStatusPresenter.submitPost(user, authToken, "Here is my post");

    verify(
      mockPostStatusPresenterView.displayErrorMessage(
        "Failed to post the status because of exception: An error occured"
      )
    ).once();

    verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();

    verify(mockPostStatusPresenterView.setPost("")).never();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)
    ).never();
  });
});
