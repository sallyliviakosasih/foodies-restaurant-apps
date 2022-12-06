const UrlParser = {
    parsingActiveUrlWithCombiner() {
      const activeUrl = window.location.hash.slice(1).toLowerCase();
      const splitedActiveUrl = this._urlSplitter(activeUrl);
      return this._urlCombiner(splitedActiveUrl);
      },

    parsingActiveUrlWithoutCombiner() {
      const activeUrl = window.location.hash.slice(1).toLowerCase();
      return this._urlSplitter(activeUrl);
    },

    _urlSplitter(url) {
      const splittedUrl = url.split('/');
      return {
        resource: splittedUrl[1] || null,
        id: splittedUrl[2] || null,
        verb: splittedUrl[3] || null,
      };
    },

    _urlCombiner(url) {
      return (url.resource ? `/${url.resource}` : '/')
      + (url.id ? '/:id' : '')
      + (url.verb ? `${url.verb}` : '');
    },
  };
export default UrlParser;
