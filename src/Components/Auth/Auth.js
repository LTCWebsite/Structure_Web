// import Crypt from './Crypt'
import cookie from 'js-cookie'

class Auth {
  constructor() {
    try {
      if (typeof cookie.get("VIP_Inhouse_token") === "undefined") {
        this.authenticated = false
      } else {
        this.authenticated = true
      }
    } catch (err) {
      this.authenticated = false;
    }
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    // localStorage.removeItem("login")
    cookie.remove("VIP_Inhouse_token")
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();