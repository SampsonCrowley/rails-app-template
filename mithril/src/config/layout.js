import Components from "../components";

const {Body, Header} = Components;

export default class Layout {
  view({attrs, children}) {
    console.log({attrs, children});
    return m(
      'main', [
        m(Header, {links: links, ...attrs}),
      ],
      m(Body, children)
    );
  }
};
