import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@planpaz:token';

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

// User persistence helpers
const USER_KEY = '@planpaz:user';

export interface StoredUser {
  id?: string;
  name: string;
  username: string;
}

export async function saveUser(user: StoredUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<StoredUser | null> {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(USER_KEY);
}