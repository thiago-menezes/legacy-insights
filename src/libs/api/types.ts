export type AccessTokenSession = { accessToken?: string };

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export interface ApiError {
  error: {
    message: string;
    status?: number;
    name?: string;
    details?: Record<string, unknown>;
  };
}
