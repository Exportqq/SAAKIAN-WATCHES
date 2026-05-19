export const useApi = () => {
  const config = useRuntimeConfig();

  const request = async <T>(
    url: string,
    options: {
      method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
      body?: any;
      headers?: HeadersInit;
    } = {},
  ): Promise<T> => {
    return $fetch<T>(url, {
      baseURL: 'https://watches-api-c9i5.onrender.com/',
      method: options.method ?? 'GET',
      body: options.body,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  };

  return { request };
};
