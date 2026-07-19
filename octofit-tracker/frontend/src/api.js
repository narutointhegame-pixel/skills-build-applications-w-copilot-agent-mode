const getRuntimeEnv = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env;
  }

  return typeof process !== 'undefined' && process.env ? process.env : {};
};

const getApiBaseUrl = () => {
  const env = getRuntimeEnv();
  const codespaceName = env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://127.0.0.1:8000/api';
};

export const buildApiUrl = (resource) => {
  const normalizedResource = resource.replace(/^\/+/, '').replace(/\/+$/, '');
  return `${getApiBaseUrl()}/${normalizedResource}/`;
};

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
};
