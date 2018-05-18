import m from 'mithril';
import Layout from './layout';

export default class Routes {
  constructor() {
    this._routes = {
    };
    this._routeList = [];
  }

  register({
    module,
    path =  "/",
    title =  "DefaultAppName",
  }) {
    if(!module) return false;

    if(this._routes[path]) this._routeList.splice(this._routeList.findIndex(r => r.path === path), 1);

    this._routes[path] = {
      render: () => m(Layout, {title, links: this._routeList}, m(module)),
      title,
      path
    };

    this._routeList.push(this._routes[path]);
    return true;
  }

  list() {
    return {...this._routes};
  }
}
