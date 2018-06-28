import { Alert } from 'react-native';

export function getTest() {
  return fetch('http://192.168.137.1:3000/api/login/test', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch((error) => {
      Alert.alert(`Error :  ${error}`);
    });
}

export function authenticate(username, pass) {
  return fetch('http://192.168.137.1:3000/api/login/authenticate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        userName: username,
        password: pass,
      },
    }),
  })
    .then(response => response.json())
    .catch((error) => {
      Alert.alert(`Error :  ${error}`);
    });
}
