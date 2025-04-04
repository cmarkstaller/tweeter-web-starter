// // import { MemoryRouter } from "react-router-dom";
// // import PostStatus from "../../../../src/components/postStatus/PostStatus";
// // import { render, screen } from "@testing-library/react";
// // import React from "react";
// // import userEvent from "@testing-library/user-event";
// // import "@testing-library/jest-dom";
// // import { waitFor } from "@testing-library/react";

// // import { library } from "@fortawesome/fontawesome-svg-core";
// // import { fab } from "@fortawesome/free-brands-svg-icons";
// // import { PostStatusPresenter } from "../../../../src/presenters/PostStatusPresenter";
// // import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
// // library.add(fab);

// // describe("Post Status Component", () => {
// //   it("When first rendered the Post Status and Clear buttons are both disabled.", () => {
// //     const { postStatusButton, clearButton } = renderPostStatusAndGetElements();
// //     expect(postStatusButton).toBeDisabled();
// //     expect(clearButton).toBeDisabled();
// //   });

// //   it("Both buttons are enabled when the text field has text.", async () => {
// //     const { postStatusButton, clearButton, textAreaField, user } =
// //       renderPostStatusAndGetElements();

// //     await user.type(textAreaField, "a");

// //     expect(postStatusButton).toBeEnabled();
// //     expect(clearButton).toBeEnabled();
// //   });

// //   //   it("Both buttons are enabled when the text field has text.", async () => {
// //   //     const { postStatusButton, clearButton, textAreaField, user } =
// //   //       renderPostStatusAndGetElements();

// //   //     // Simulate typing into the text area
// //   //     await user.type(textAreaField, "a");

// //   //     // Use waitFor to ensure state update is reflected
// //   //     await waitFor(() => {
// //   //       expect(postStatusButton).toBeEnabled();
// //   //       expect(clearButton).toBeEnabled();
// //   //     });
// //   //   });

// //   //   it("disabled the sign in button if either field is cleared", async () => {
// //   //     const { signInButton, aliasField, passwordField, user } =
// //   //       renderLoginAndGetElements("/");

// //   //     await user.type(aliasField, "a");
// //   //     await user.type(passwordField, "b");
// //   //     expect(signInButton).toBeEnabled();

// //   //     await user.clear(aliasField);
// //   //     expect(signInButton).toBeDisabled();

// //   //     await user.type(aliasField, "1");
// //   //     expect(signInButton).toBeEnabled();

// //   //     await user.clear(passwordField);
// //   //     expect(signInButton).toBeDisabled();
// //   //   });

// //   //   it("calls the presenters login method with correct parameters when the sign-in button is pressed", async () => {
// //   //     const mockPresenter = mock<LoginPresenter>();
// //   //     const mockPresenterInstance = instance(mockPresenter);

// //   //     const originalUrl = "hhtp://someurl.com";
// //   //     const alias = "@SomeAlias";
// //   //     const password = "myPassword";

// //   //     const { signInButton, aliasField, passwordField, user } =
// //   //       renderLoginAndGetElements(originalUrl, mockPresenterInstance);

// //   //     await user.type(aliasField, alias);
// //   //     await user.type(passwordField, password);

// //   //     await user.click(signInButton);

// //   //     // verify(mockPresenter.doLogin(alias, password, originalUrl)).once();
// //   //     verify(mockPresenter.doLogin(anything(), anything(), anything())).once();
// //   //   });
// // });

// // const renderPostStatus = () => {
// //   return render(
// //     <MemoryRouter>
// //       <PostStatus />
// //     </MemoryRouter>
// //   );
// // };

// // const renderPostStatusAndGetElements = () => {
// //   const user = userEvent.setup();

// //   renderPostStatus();

// //   //   const postStatusButton = screen.getByRole("button", { name: /Post Status/i });
// //   const postStatusButton = screen.getByLabelText("postStatusButton");
// //   const clearButton = screen.getByRole("button", { name: /Clear/i });
// //   const textAreaField = screen.getByLabelText("textArea");

// //   return { postStatusButton, clearButton, textAreaField, user };
// // };

// import { render, screen } from "@testing-library/react";
// import PostStatus from "../../../../src/components/postStatus/PostStatus";
// import { MemoryRouter } from "react-router-dom";
// import React from "react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";
// import { PostStatusPresenter } from "../../../../src/presenters/PostStatusPresenter";
// import { instance, mock, verify } from "@typestrong/ts-mockito";
// import { AuthToken, User } from "tweeter-shared";
// import useUserInfo from "../../../../src/components/userInfo/UserHook";

// jest.mock("../../../../src/components/userInfo/UserHook", () => ({
//   ...jest.requireActual("../../../../src/components/userInfo/UserHook"),
//   __esModule: true,
//   default: jest.fn(),
// }));

// describe("Post Status Component", () => {
//   const mockUser = mock<User>();
//   let mockUserInstance: User;
//   const mockAuthToken = mock<AuthToken>();
//   let mockAuthTokenInstance: AuthToken;

//   beforeAll(() => {
//     mockUserInstance = instance(mockUser);
//     mockAuthTokenInstance = instance(mockAuthToken);

//     (useUserInfo as jest.Mock).mockReturnValue({
//       currentUser: mockUserInstance,
//       authToken: mockAuthTokenInstance,
//     });
//   });

//   it("starts with both the Post Status and Clear buttons disabled", () => {
//     const { postStatusButton, clearStatusButton } =
//       renderPostStatusAndGetElements();
//     expect(postStatusButton).toBeDisabled();
//     expect(clearStatusButton).toBeDisabled();
//   });

//   it("enables both buttons when the text field has text", async () => {
//     const { postStatusButton, clearStatusButton, postField, user } =
//       renderPostStatusAndGetElements();

//     await user.type(postField, "hello");

//     expect(postStatusButton).toBeEnabled();
//     expect(clearStatusButton).toBeEnabled();
//   });

//   it("disables both buttons when the text field is cleared", async () => {
//     const { postStatusButton, clearStatusButton, postField, user } =
//       renderPostStatusAndGetElements();

//     await user.type(postField, "hello");

//     expect(postStatusButton).toBeEnabled();
//     expect(clearStatusButton).toBeEnabled();

//     await user.clear(postField);

//     expect(postStatusButton).toBeDisabled();
//     expect(clearStatusButton).toBeDisabled();
//   });

//   it("calls the presenter's postStatus method with the correct parameters when the Post Status button is pressed", async () => {
//     const mockPresenter = mock<PostStatusPresenter>();
//     const mockPresenterInstance = instance(mockPresenter);

//     const postText = "hello";

//     const { postStatusButton, postField, user } =
//       renderPostStatusAndGetElements(mockPresenterInstance);

//     await user.type(postField, postText);

//     await user.click(postStatusButton);

//     verify(
//       mockPresenter.submitPost(
//         mockUserInstance,
//         mockAuthTokenInstance,
//         postText
//       )
//     ).once();
//   });
// });

// const renderPostStatus = (presenter?: PostStatusPresenter) => {
//   return render(
//     <MemoryRouter>
//       {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
//     </MemoryRouter>
//   );
// };

// const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
//   const user = userEvent.setup();

//   renderPostStatus(presenter);

//   const postStatusButton = screen.getByLabelText("postStatusButton");
//   const clearStatusButton = screen.getByRole("button", { name: /Clear/i });
//   const postField = screen.getByLabelText("postField");

//   return {
//     postStatusButton,
//     clearStatusButton,
//     postField,
//     user,
//   };
// };
