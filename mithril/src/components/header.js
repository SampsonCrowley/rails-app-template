import m from "mithril";
import CSS from "../styles";

const Header = {
  view: ({ attrs: { title, links = [] }, ...attrs }) => {
    console.log(title, links, attrs);
    return m(CSS.header.main, [
      m(CSS.header.cover, [
        m(CSS.header.content, [
          m(CSS.header.nav , [
            m(CSS.header.logoCell, [
              m(CSS.header.logoLink, [
                m(CSS.header.logo, [
                  m('title', 'skull icon'),
                  m('path', {d: 'M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12'})
                ])
              ])
            ]),
            m(CSS.header.menuCell,
              links.map(
                link => (
                  m(CSS.header.menuLink, {
                    href: link.path,
                    oncreate: m.route.link
                  }, link.name)
                )
              )
            )
          ]),
          m(CSS.header.banner , [
            m(CSS.pageTitle, title || "Header"),
          ])
        ])
      ])
    ]);
  }
};

export default Header;
