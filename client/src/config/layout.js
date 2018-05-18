import m from 'mithril';
import Components from "../components";

const {Body, Header} = Components;

export default class Layout {
  view(props) {
    console.log(props);
    const {attrs, children} = props;
    return m(
      'main', [
        m(Header, {...attrs}),
      ],
      m(Body, children)
    );
  }
}
