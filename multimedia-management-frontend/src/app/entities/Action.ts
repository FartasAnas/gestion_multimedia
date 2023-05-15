import Category from "./Category";

export default interface Action {
  id?:number
  category:Category
  image:boolean
  video:boolean
  pictogram:boolean
  document:boolean
}
