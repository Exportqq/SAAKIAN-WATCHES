import { ref } from "vue";
import { useApi } from "./useApi";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  accessToken?: string;
}

export const token = ref<string | null>(null);
export const resetEmail = ref<string | null>(null);

if (import.meta.client) {
  token.value = localStorage.getItem("token");
  resetEmail.value = localStorage.getItem("reset_email");
}

export const useAuth = () => {
  const { request } = useApi();

  const register = (data: {
    nickname: string;
    email: string;
    password: string;
    gender: "male" | "female";
  }) =>
    request("/api/auth/register", {
      method: "POST",
      body: data,
    });

  const login = async (data: LoginPayload) => {
    const response = (await request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: data,
    })) as LoginResponse;

    const jwt = response.token ?? response.accessToken;

    if (!jwt) throw new Error("Сервер не вернул токен!");

    token.value = jwt;

    if (import.meta.client) {
      localStorage.setItem("token", jwt);
    }

    return jwt;
  };

  const logout = async () => {
    try {
      if (token.value) {
        await request("/auth/logout", { method: "POST" });
      }
    } catch (error: any) {
      if (error?.status !== 401) {
        console.error("Ошибка при логауте:", error);
      }
    } finally {
      token.value = null;
      if (import.meta.client) localStorage.removeItem("token");
    }
  };

  const sendResetCode = async (email: string) => {
    resetEmail.value = email;

    if (import.meta.client) {
      localStorage.setItem("reset_email", email);
    }

    return request<{ message: string }>("/auth/password/forgot", {
      method: "POST",
      body: { email },
    });
  };

  const verifyResetCode = async (code: string) => {
    if (!resetEmail.value) throw new Error("Email не найден");

    return request("/auth/password/verify", {
      method: "POST",
      body: {
        email: resetEmail.value,
        code,
      },
    });
  };

  const setNewPassword = async (code: string, newPassword: string) => {
    if (!resetEmail.value) throw new Error("Email не найден");

    return request("/auth/password/reset", {
      method: "POST",
      body: {
        email: resetEmail.value,
        code,
        newPassword,
      },
    });
  };

  const startEmailChange = async () => {
    return request<{ message: string }>("/users/me/email/change/start", {
      method: "POST",
    });
  };

  const isAuthenticated = () => !!token.value;

  return {
    register,
    login,
    logout,
    isAuthenticated,
    sendResetCode,
    verifyResetCode,
    setNewPassword,
    startEmailChange,
    token,
    resetEmail,
  };
};
