const cookie = {
  /**
   *
   * @param {String} name
   * @param {any} value
   * @param {Number} time
   */
  setItem: (name, value, time) => {
    const d = new Date();
    d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  },

  /**
   *
   * @param {String} cookieName
   * @returns
   */
  getItem: cookieName => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  /**
   *
   * @param {String} cookieName
   */
  deleteItem: cookieName => {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970;path=/;SameSite=secure`;
    console.clear();
  },
};

export { cookie as default };
