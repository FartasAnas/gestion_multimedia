import SideBarContentObject from "./SideBarContentObject";

export default interface SideBarItemObject {
  content: SideBarContentObject
  hasChildren: boolean;
  children?: {
    content: SideBarContentObject;
  }[];
}
