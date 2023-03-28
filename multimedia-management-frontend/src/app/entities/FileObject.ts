import User from "./User";

export default interface FileObject {
  createdBy:User;
  fileName:String;
  description:String;
  type:String;
  version:String;
  state:String;
}
