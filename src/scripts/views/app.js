import NaviListFunction from '../utils/navi-list-function';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ moreNaviButton, naviList, mainContent }) {
        this._moreNaviButton = moreNaviButton;
        this._naviList = naviList;
        this._mainContent = mainContent;

        this._initialNaviAppShell();
    }

    _initialNaviAppShell() {
        NaviListFunction.init({
        moreNaviButton: this._moreNaviButton,
        naviList: this._naviList,
        mainContent: this._mainContent,
        });
    }

    async renderPage() {
        const windowsUrl = UrlParser.parsingActiveUrlWithCombiner();
        const loadedPage = routes[windowsUrl];
        this._mainContent.innerHTML = await loadedPage.render();
        await loadedPage.afterRender();

        const skip_element = document.querySelector('.skip-link');
        skip_element.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#main').focus(onfocus);
        });
    }
}
export default App;
