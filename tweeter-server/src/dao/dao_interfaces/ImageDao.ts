export interface ImageDao {
  putImage(fileName: string, imageStringBase64Encoded: string): Promise<string>;
  getImage(fileName: string): Promise<string>;
}
