const NaviListFunction = {
    init({ moreNaviButton, naviList, mainContent }) {
      moreNaviButton.addEventListener('click', (ev) => {
        this._openNaviDrawer(ev, naviList);
      });

      mainContent.addEventListener('click', (ev) => {
        this._closeNaviDrawer(ev, naviList);
      });
    },

    _openNaviDrawer(event, naviList) {
      event.stopPropagation();
      naviList.classList.toggle('open');
    },

    _closeNaviDrawer(event, naviList) {
      event.stopPropagation();
      naviList.classList.remove('open');
    },
  };

export default NaviListFunction;
