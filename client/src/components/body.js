import m from "mithril";
import CSS from "../styles";

export default class Body {
  view({children}) {
    return m(CSS.page, children);
  }
}
