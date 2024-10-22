import DetailPage from '../view/pages/detail.js';
import FavoritePage from '../view/pages/favorite.js';
import ListPage from '../view/pages/list.js';

const routes = {
  '/': ListPage,
  '/favorite': FavoritePage,
  '/detail/:id': DetailPage,
};

export default routes;
