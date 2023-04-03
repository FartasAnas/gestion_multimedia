import KeywordObject from "./KeywordObject";

export default interface FileObject {
  id?:number;
  createdBy?:String;
  fileName?:String;
  description?:String;
  creationDate?:Date;
  category?:String;
  type?:String;
  size?:String
  version?:String;
  state?:String;
  keywords?:KeywordObject[]
}
