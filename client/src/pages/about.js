import m from "mithril";
import CSS from "../styles";

export class About {
  view() {
    return m(CSS.page, [
      m('.cf.pa2', [
        m('.fl.w-100.ph2', [
          m('h1.pv2.tc', 'About Us'),
          m('h2.tc', 'Premium apparel, top notch quality, amazing value, Ultrabodiez.')
        ])
      ])
    ]);
  }
}

const link = {
  path: "/about",
  module: About,
  title: "About Page",
  allowed: true
};

export default link;
