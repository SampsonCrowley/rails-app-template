import m from 'mithril';
import Layout from './layout';

export default class Routes {
  constructor() {
    this._routes = {
    };
  }

  register({
    module,
    path =  "/",
    title =  "DefaultAppName",
  }) {
    if(!module) return false;
    this._routes[path] = {
      render: () => m(Layout, {title}, m(module))
    };
    return true;
  }

  list() {
    return {...this._routes};
  }
}
