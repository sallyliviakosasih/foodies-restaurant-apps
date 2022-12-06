import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.scss';
import './components/search-bar';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const moreNaviDrawerButton = document.querySelector('#more-navi-list');
const naviDrawer = document.querySelector('#navi-list');
const mainPage = document.querySelector('#main');

const app = new App({
 moreNaviButton: moreNaviDrawerButton,
 naviList: naviDrawer,
 mainContent: mainPage,
});

window.addEventListener('hashchange', () => {
    app.renderPage();
  });

window.addEventListener('load', () => {
   app.renderPage();
   swRegister();
});
