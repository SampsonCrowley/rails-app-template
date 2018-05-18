import Home from './home';

export default (routes) => {
  routes.register({
    module: Home,
    path: '/',
    title: 'Home Page'
  })
};
