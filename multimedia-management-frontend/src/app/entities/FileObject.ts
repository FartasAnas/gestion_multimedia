import KeywordObject from "./KeywordObject";
import Category from "./Category";

export default interface FileObject {
  id?:number;
  createdBy?:String;
  fileName?:String;
  description?:String;
  creationDate?:Date;
  category?:Category;
  type?:String;
  size?:String
  version?:String;
  state?:String;
  keywords?:KeywordObject[]
}
