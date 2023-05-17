import Category from "./Category";
import Access from "./Access";

export default interface Action {
  id?:number
  category:Category
  image:Access
  video:Access
  pictogram:Access
  document:Access
}
