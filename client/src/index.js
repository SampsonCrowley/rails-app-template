import m from "mithril";
import Pages from './pages';

import {routes} from './config';

m.route.prefix("#");

const mountNode = document.querySelector("#app-body");
Pages(routes);
m.route(mountNode, "/", routes.list());
