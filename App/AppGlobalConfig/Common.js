let isAuthenticated = false;

export function setAuthenticated(status) {
  isAuthenticated = status;
}

export function getAuthenticated() {
  return isAuthenticated;
}
