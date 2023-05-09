export default interface Role {
  id?:number
  name:string
  description:string
  action:{
    id?:number
    image:boolean
    video:boolean
    pictogram:boolean
    document:boolean
  }
  isActive:boolean
}
