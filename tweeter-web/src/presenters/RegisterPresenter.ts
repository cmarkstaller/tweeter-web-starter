import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";
import { NavigateFunction } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared";

export interface RegisterView {
  displayErrorMessage: (message: string) => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
}

export class RegisterPresenter {
  private _view: RegisterView;
  private _userService: UserService;

  public constructor(view: RegisterView) {
    this._view = view;
    this._userService = new UserService();
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this._view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this._view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this._view.setImageFileExtension(fileExtension);
      }
    } else {
      this._view.setImageUrl("");
      this._view.setImageBytes(new Uint8Array());
    }
  }

  private getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean
  ) {
    try {
      this._view.setIsLoading(true);

      const [user, authToken] = await this._userService.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );

      this._view.updateUserInfo(user, user, authToken, rememberMe);
      this._view.navigate("/");
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }
}
