import Favorites from '../views/pages/favorites-page';
import Detail from '../views/pages/detail-pages';
import Home from '../views/pages/home-page';

const routes = {
    '/': Home,
    '/home': Home,
    '/favorites': Favorites,
    '/detail/:id': Detail,
};

export default routes;
