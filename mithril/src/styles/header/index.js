import style from "./header.styl";

const HEADER = {
  main: `header.${style.headerWrapper}`,
  cover: `.${style.cover}`,
  content: `.${style.content}`,
  nav: `nav.${style.nav}.${style.center}.${style.dt}.${style.white}`,
  menuCell: `.${style.dtc}.${style.vMid}.${style.tRight}`,
  menuLink: `a.${style.bBox}.${style.grow}.${style.menuLink}.${style.link}`,
  logoCell: `.${style.dtc}.${style.vMid}.${style.w4}`,
  logoLink: `a[href="/"].${style.dib}.${style.grow}.${style.bBox}.${style.h4}.${style.w4}.${style.p1}`,
  logo: `img[src="image/logo.png"].${style.link}.${style.white}`,
  banner: `.${style.tCenter}`,
};

export default HEADER;
