import Role from "./Role";

export default interface StorageObject {
  email:String;
  username:String;
  fullName:string;
  token:String;
  roles:Role[];
  isActive:boolean
}
