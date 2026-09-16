import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@planpaz:token';
const USER_ID_KEY = '@planpaz:user_id';
const USER_KEY = '@planpaz:user';

let memoryUserId: string | null = null;

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  memoryUserId = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_ID_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}

export async function saveUserId(userId: string) {
  memoryUserId = userId;
  await AsyncStorage.setItem(USER_ID_KEY, userId);
}

export async function getUserId(): Promise<string | null> {
  if (memoryUserId) {
    return memoryUserId;
  }
  const stored = await AsyncStorage.getItem(USER_ID_KEY);
  if (stored) {
    memoryUserId = stored;
  }
  return stored;
}

export async function removeUserId() {
  memoryUserId = null;
  await AsyncStorage.removeItem(USER_ID_KEY);
}

// User persistence helpers (informações de exibição do usuário)
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

export function decodeBase64(input: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 === 1) {
    return '';
  }

  for (let bc = 0, bs = 0, buffer: number, idx = 0; (buffer = str.charCodeAt(idx++)); ) {
    const charIdx = chars.indexOf(String.fromCharCode(buffer));
    if (~charIdx) {
      bs = bc % 4 ? bs * 64 + charIdx : charIdx;
      if (bc++ % 4) {
        output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)));
      }
    }
  }

  return output;
}

export function isUUID(value?: string | null): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value.trim());
}

export async function getCurrentAuthorId(): Promise<string> {
  try {
    // 1. Verifica se já temos o ID salvo em memória ou no AsyncStorage
    const storedId = await getUserId();
    if (isUUID(storedId)) {
      return storedId!;
    }

    const token = await getToken();
    if (!token) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }

    // 2. Tenta extrair UUID do payload do token JWT caso exista claim com formato UUID
    if (token.includes('.')) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const decodedStr = decodeBase64(payloadBase64);

        if (decodedStr) {
          const payload = JSON.parse(decodedStr);

          // Checa claims de ID no formato UUID
          const potentialId =
            payload.id ||
            payload.userId ||
            payload.authorId ||
            payload.user_id;

          if (isUUID(potentialId)) {
            await saveUserId(potentialId);
            return potentialId;
          }

          // 'sub' só é usado se for UUID (nunca se for email)
          if (isUUID(payload.sub)) {
            await saveUserId(payload.sub);
            return payload.sub;
          }
        }
      }
    }

    // 3. Busca o ID real do usuário logado via endpoint autenticado /user/settings
    // Importação dinâmica para evitar dependência circular com client.ts
    const { getUserSettings, getMinhasConfiguracoes } = require('../api/user');
    const fetchSettings = getUserSettings || getMinhasConfiguracoes;
    const settings = await fetchSettings();
    if (settings?.id && isUUID(settings.id)) {
      await saveUserId(settings.id);
      console.log('[STORAGE] UserId obtido com sucesso via user settings:', settings.id);
      return settings.id;
    }
  } catch (error) {
    console.log('[STORAGE] Erro ao obter authorId do usuário logado:', error);
  }

  throw new Error('Não foi possível identificar o usuário logado. Por favor, faça login novamente.');
}