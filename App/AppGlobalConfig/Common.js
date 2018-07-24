let isAuthenticated = false;
let profileId = 0;
let userName = null;

export function setAuthenticated(status) {
  isAuthenticated = status;
}

export function getAuthenticated() {
  return isAuthenticated;
}

export function setProfileId(id) {
  profileId = id;
}

export function getProfileId() {
  return profileId;
}

export function setUserName(name) {
  userName = name;
}

export function getUserName() {
  return userName;
}

export function isValidUserLogin() {
  return userName !== null;
}
