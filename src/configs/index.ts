const Config = (function () {
  let BASE_IMAGE_URL = ''; // Private variable

  return {
    setBaseImageUrl(url: string) {
      if (typeof url === 'string') {
        BASE_IMAGE_URL = url;
      } else {
        // eslint-disable-next-line no-console
        console.error('Invalid URL: Base Image URL must be a string');
      }
    },
    getBaseImageUrl() {
      return BASE_IMAGE_URL;
    },
  };
})();

export default Config;
