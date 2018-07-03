import { Alert } from 'react-native';

export function createUser(username, pass, email, gcmToken, uuid) {
  return fetch('http://192.168.137.1:3000/api/user/add-user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        userName: username,
        password: pass,
        email,
        gcmToken,
        uuid,
      },
    }),
  })
    .then(response => response.json())
    .catch((error) => {
      Alert.alert(`Error :  ${error}`);
    });
}
