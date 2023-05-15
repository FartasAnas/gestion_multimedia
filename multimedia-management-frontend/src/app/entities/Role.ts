import Action from "./Action";

export default interface Role {
  id?:number
  name:string
  description:string
  actions:Action[]
  isActive:boolean
}
