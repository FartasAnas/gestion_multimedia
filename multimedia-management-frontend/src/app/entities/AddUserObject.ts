import Role from "./Role";

export default interface AddUserObject{
  id?:number
  email:string;
  username:string;
  firstName:string;
  lastName:string;
  function:string;
  password:string;
  roles:Role[];
  isActive:boolean;

}
