const auth = {
  isAuthenticated() {
    if (typeof window === 'undefined') {
      return false;
    }
    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    }
    return false;
  },

  authenticate(jwt, userId, username, userCreated) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
      sessionStorage.setItem('_id', JSON.stringify(userId));
      sessionStorage.setItem('username', JSON.stringify(username));
      sessionStorage.setItem('userCreated', JSON.stringify(userCreated));
    }
  },

  clearJWT() {
    if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
  },

  clearUserData() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('_id');
      sessionStorage.removeItem('username');
    }
  },

  clearCookie() {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  setUsername(username) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('username', JSON.stringify(username));
    }
  },

  getUsername() {
    if (typeof window === 'undefined') { return ''; }
    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('username'));
    }
    return '';
  },
  getUserId() {
    if (typeof window === 'undefined') { return ''; }
    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('_id'));
    }
    return '';
  },
  getUserCreated() {
    if (typeof window === 'undefined') { return ''; }
    if (sessionStorage.getItem('userCreated')) {
      return JSON.parse(sessionStorage.getItem('userCreated'));
    }
    return '';
  }
}

export default auth;

