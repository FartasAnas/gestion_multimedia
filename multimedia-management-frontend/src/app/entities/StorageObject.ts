import Role from "./Role";

export default interface StorageObject {
  email:String;
  username:String;
  token:String;
  roles:Role[]
}
