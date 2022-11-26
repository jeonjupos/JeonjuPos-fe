import Cookies from 'js-cookie';

const DEFAULT_EXPIRES_DAY = 1;

class CookieService {
  private readonly cookies = Cookies;

  constructor() {
    this.cookies = Cookies;
  }

  setCookie(key: string, value: any, expires: number | Date = DEFAULT_EXPIRES_DAY) {
    this.cookies.set(key, value, { expires: expires || undefined });
  }

  getCookie(key: string) {
    return this.cookies.get(key);
  }

  setObjectCookie(object: { [key: string]: any }) {
    Object.entries(object).forEach(([key, value]) => {
      if ([null, undefined].includes(value)) this.removeCookie(key);
      else this.setCookie(key, value);
    });
  }

  removeCookie(key: string) {
    this.cookies.remove(key);
  }
}

export default CookieService;
