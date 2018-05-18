import m from "mithril";
import CSS from "../styles";

export class Home {
  view() {
    return m(CSS.page, [
      m('.cf.pa2', [
        m('.fl.w-100.w-50-ns.ph2', [
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/beast_mode.jpg"].db.w-100')
          ]),
          m('a[href="#"].no-underline.pv2.grow.db', [
            m('img[src="image/rockin.jpg"].db.w-100')
          ]),
          m('a[href="#"].no-underline.pv2.grow.db', [
            m('img[src="image/eye_candy.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2 grow db no-underline black', [
            m('img[src="image/fly.jpg"].db.w-100')
          ])
        ]),
        m('.fl.w-50.w-25-ns.ph2', [
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/rockin.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/fly.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/eye_candy.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/fly.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/rockin.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/eye_candy.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/flex.jpg"].db.w-100')
          ]),
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/fly.jpg"].db.w-100')
          ]),
        ]),
        m('.fl.w-50.w-25-ns.ph2', [
          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/flex.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/eye_candy.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="image/fly.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="https://s3-us-west-2.amazonaws.com/prnt/cc-shanee_960.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="https://s3-us-west-2.amazonaws.com/prnt/ZachHurd-190111s_960.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="https://s3-us-west-2.amazonaws.com/prnt/hw170211pie-cargo_960.jpg"].db.w-100')
          ]),

          m('a[href="#"].pv2.grow.db.no-underline.black', [
            m('img[src="https://s3-us-west-2.amazonaws.com/prnt/adam-stern-191110_960.jpg"].db.w-100')
          ]),
        ])
      ])
    ]);
  }
}

const link = {
  path: "/",
  module: Home,
  title: "Home Page",
  allowed: true
};

export default link;
