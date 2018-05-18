import m from "mithril";
import CSS from "../styles";

const Body = {
  view: ({children}) =>
    m(CSS.page, children)
};

export default Body;
