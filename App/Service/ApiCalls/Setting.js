import { Alert } from 'react-native';

export function getUserSetting(profileId) {
  return fetch(`http://192.168.137.1:3000/api/setting/get-user-setting?profileId=${profileId}`, {
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
