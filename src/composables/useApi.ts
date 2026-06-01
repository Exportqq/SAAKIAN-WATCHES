// composables/useApi.ts
export const useApi = () => {
  const request = async <T>(
    url: string,
    options: {
      method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
      body?: any;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> => {
    const token = import.meta.client ? localStorage.getItem('token') : null;

    try {
      return await $fetch<T>(url, {
        baseURL: 'https://watches-api-c9i5.onrender.com',
        method: options.method ?? 'GET',
        body: options.body,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });
    } catch (error: any) {
      throw error;
    }
  };

  return { request };
};