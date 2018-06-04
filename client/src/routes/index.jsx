import CalendarPage from 'pages/calendar'
import HomePage from 'pages/home'
import NotFoundPage from 'pages/not-found'

const routes = [
  {
    path: '/calendar',
    exact: true,
    component: CalendarPage,
  },
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    component: NotFoundPage
  }
]

export default routes
