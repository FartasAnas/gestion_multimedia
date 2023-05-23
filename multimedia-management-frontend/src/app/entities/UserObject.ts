import Role from "./Role";

export default interface UserObject {
  id:number
  email:string;
  username:string;
  firstName:string;
  lastName:string;
  function:string;
  roles:Role[];
  isActive:boolean;
}
