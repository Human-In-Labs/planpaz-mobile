import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@planpaz:token';
const USER_ID_KEY = '@planpaz:user_id';
const USER_KEY = '@planpaz:user';

let memoryUserId: string | null = null;

const memoryStore = new Map<string, string>();

async function safeSetItem(
  key: string,
  value: string,
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(
      `[STORAGE] Native AsyncStorage warning for ${key}:`,
      e,
    );
  }

  memoryStore.set(key, value);
}

async function safeGetItem(
  key: string,
): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null && value !== undefined) {
      memoryStore.set(key, value);
      return value;
    }
  } catch (e) {
    console.warn(
      `[STORAGE] Native AsyncStorage warning for ${key}:`,
      e,
    );
  }

  return memoryStore.get(key) ?? null;
}

async function safeRemoveItem(
  key: string,
): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(
      `[STORAGE] Native AsyncStorage warning for ${key}:`,
      e,
    );
  }

  memoryStore.delete(key);
}

export async function saveToken(
  token: string,
): Promise<void> {
  await safeSetItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return safeGetItem(TOKEN_KEY);
}

export async function removeToken(): Promise<void> {
  memoryUserId = null;

  await safeRemoveItem(TOKEN_KEY);
  await safeRemoveItem(USER_ID_KEY);
  await safeRemoveItem(USER_KEY);
}

export async function saveUserId(
  userId: string,
): Promise<void> {
  memoryUserId = userId;
  await safeSetItem(USER_ID_KEY, userId);
}

export async function getUserId(): Promise<string | null> {
  if (memoryUserId) {
    return memoryUserId;
  }

  const stored = await safeGetItem(USER_ID_KEY);

  if (stored) {
    memoryUserId = stored;
  }

  return stored;
}

export async function removeUserId(): Promise<void> {
  memoryUserId = null;
  await safeRemoveItem(USER_ID_KEY);
}

export interface StoredUser {
  id?: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
}

export async function saveUser(
  user: StoredUser,
): Promise<void> {
  await safeSetItem(
    USER_KEY,
    JSON.stringify(user),
  );
}

export async function getUser(): Promise<StoredUser | null> {
  const json = await safeGetItem(USER_KEY);

  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json) as StoredUser;
  } catch {
    await removeUser();
    return null;
  }
}

export async function removeUser(): Promise<void> {
  await safeRemoveItem(USER_KEY);
}

export async function clearSession(): Promise<void> {
  await removeToken();
  await removeUser();
}

export function decodeBase64(input: string): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 === 1) {
    return '';
  }

  for (
    let bc = 0,
    bs = 0,
    buffer: number,
    idx = 0;
    (buffer = str.charCodeAt(idx++));
  ) {
    const charIdx = chars.indexOf(
      String.fromCharCode(buffer),
    );

    if (~charIdx) {
      bs =
        bc % 4
          ? bs * 64 + charIdx
          : charIdx;

      if (bc++ % 4) {
        output += String.fromCharCode(
          255 &
          (bs >>
            ((-2 * bc) & 6)),
        );
      }
    }
  }

  return output;
}

export function isUUID(
  value?: string | null,
): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return uuidRegex.test(value.trim());
}

export async function getCurrentAuthorId(): Promise<string> {
  try {
    const storedId = await getUserId();

    if (isUUID(storedId)) {
      return storedId!;
    }

    const token = await getToken();

    if (!token) {
      throw new Error(
        'Usuário não autenticado. Faça login para continuar.',
      );
    }

    if (token.includes('.')) {
      const parts = token.split('.');

      if (parts.length === 3) {
        const payloadBase64 = parts[1]
          .replace(/-/g, '+')
          .replace(/_/g, '/');

        const decodedStr =
          decodeBase64(payloadBase64);

        if (decodedStr) {
          const payload =
            JSON.parse(decodedStr);

          const potentialId =
            payload.id ||
            payload.userId ||
            payload.authorId ||
            payload.user_id;

          if (isUUID(potentialId)) {
            await saveUserId(potentialId);
            return potentialId;
          }

          if (isUUID(payload.sub)) {
            await saveUserId(payload.sub);
            return payload.sub;
          }
        }
      }
    }

    const {
      getUserSettings,
      getMinhasConfiguracoes,
    } = require('../api/user');

    const fetchSettings =
      getUserSettings ||
      getMinhasConfiguracoes;

    const settings = await fetchSettings();

    if (
      settings?.id &&
      isUUID(settings.id)
    ) {
      await saveUserId(settings.id);

      console.log(
        '[STORAGE] UserId obtido com sucesso via user settings:',
        settings.id,
      );

      return settings.id;
    }
  } catch (error) {
    console.log(
      '[STORAGE] Erro ao obter authorId do usuário logado:',
      error,
    );
  }

  throw new Error(
    'Não foi possível identificar o usuário logado. Por favor, faça login novamente.',
  );
}