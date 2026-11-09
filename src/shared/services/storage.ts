import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@planpaz:token';
const USER_ID_KEY = '@planpaz:user_id';
const USER_KEY = '@planpaz:user';
const LAST_FCM_TOKEN_KEY = '@planpaz:last_fcm_token';

let memoryUserId: string | null = null;
let memoryUser: StoredUser | null = null;
let pendingAuthorIdPromise: Promise<string> | null = null;
const memoryStore = new Map<string, string>();

async function safeSetItem(key: string, value: string): Promise<void> {
  memoryStore.set(key, value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(`[STORAGE] Native AsyncStorage warning for ${key}:`, e);
  }
}

async function safeGetItem(key: string): Promise<string | null> {
  if (memoryStore.has(key)) {
    return memoryStore.get(key) ?? null;
  }
  try {
    const val = await AsyncStorage.getItem(key);
    if (val !== null && val !== undefined) {
      memoryStore.set(key, val);
      return val;
    }
  } catch (e) {
    console.warn(`[STORAGE] Native AsyncStorage warning for ${key}:`, e);
  }
  return memoryStore.get(key) ?? null;
}

async function safeRemoveItem(key: string): Promise<void> {
  memoryStore.delete(key);
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(`[STORAGE] Native AsyncStorage warning for ${key}:`, e);
  }
}

export async function saveToken(token: string): Promise<void> {
  await safeSetItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return safeGetItem(TOKEN_KEY);
}

export async function removeToken(): Promise<void> {
  memoryUserId = null;
  memoryUser = null;
  pendingAuthorIdPromise = null;
  await Promise.all([
    safeRemoveItem(TOKEN_KEY),
    safeRemoveItem(USER_ID_KEY),
    safeRemoveItem(USER_KEY),
  ]);
}

export async function saveUserId(userId: string): Promise<void> {
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

// User persistence helpers (informações de exibição do usuário)
export interface StoredUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string | null;
  bio?: string | null;
  cityName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  avatarUrl?: string | null;
}

export async function saveUser(user: StoredUser): Promise<void> {
  memoryUser = user;
  await safeSetItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<StoredUser | null> {
  if (memoryUser) {
    return memoryUser;
  }
  const json = await safeGetItem(USER_KEY);
  if (!json) {
    return null;
  }
  try {
    const parsed = JSON.parse(json) as StoredUser;
    memoryUser = parsed;
    return parsed;
  } catch {
    await removeUser();
    return null;
  }
}

export async function removeUser(): Promise<void> {
  memoryUser = null;
  await safeRemoveItem(USER_KEY);
}

export async function clearSession(): Promise<void> {
  await removeToken();
}

export async function getLastSyncedFcmToken(): Promise<string | null> {
  return safeGetItem(LAST_FCM_TOKEN_KEY);
}

export async function saveLastSyncedFcmToken(token: string): Promise<void> {
  await safeSetItem(LAST_FCM_TOKEN_KEY, token);
}

// Sugestão de estágio ignorada (por planta do jardim → id do estágio sugerido)
const IGNORED_STAGE_SUGGESTION_KEY = '@planpaz:ignored_stage_suggestion:';

export async function saveIgnoredStageSuggestion(gardenPlantId: string, stageId: string): Promise<void> {
  await safeSetItem(IGNORED_STAGE_SUGGESTION_KEY + gardenPlantId, stageId);
}

export async function getIgnoredStageSuggestion(gardenPlantId: string): Promise<string | null> {
  return safeGetItem(IGNORED_STAGE_SUGGESTION_KEY + gardenPlantId);
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
  if (memoryUserId && isUUID(memoryUserId)) {
    return memoryUserId;
  }

  if (pendingAuthorIdPromise) {
    return pendingAuthorIdPromise;
  }

  pendingAuthorIdPromise = (async () => {
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

            const potentialId =
              payload.id ||
              payload.userId ||
              payload.user_id ||
              payload.authorId ||
              payload.author_id;

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

      // 3. Busca o ID real do usuário logado via endpoint autenticado /user/settings
      const { getUserSettings, getMinhasConfiguracoes } = require('../api/user');
      const fetchSettings = getUserSettings || getMinhasConfiguracoes;
      const settings = await fetchSettings();
      if (settings?.id && isUUID(settings.id)) {
        await saveUserId(settings.id);
        return settings.id;
      }
    } catch (error) {
      console.log('[STORAGE] Erro ao obter authorId do usuário logado:', error);
    } finally {
      pendingAuthorIdPromise = null;
    }

    throw new Error('Não foi possível identificar o usuário logado. Por favor, faça login novamente.');
  })();

  return pendingAuthorIdPromise;
}
