import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { Passwords } from './../pages/Passwords';

//login
export async function getUserByName(usernameToFind) {
  const usersRef = ref(database, 'users');

  try {
    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const usersArray = Object.values(data);

      const user = usersArray.find((user) => user.username === usernameToFind);
      if (user) {
        return user;
      } else {
        return null;
      }
    } else {
      console.error('Invalid data format');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
//paswords
export async function getPasswordByUserID(userIdToFind) {
  const usersRef = ref(database, 'passwords');

  try {
    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const passwordsArray = Object.values(data);

      const passwords = passwordsArray.find((user) => user.userID === userIdToFind);
      if (passwords) {
        return passwords;
      } else {
        return null;
      }
    } else {
      console.error('Invalid data format');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


