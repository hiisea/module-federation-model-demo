export const HomeUrl: string = '/article/list';
export const LoginUrl = (from?: string): string => `/stage/login?from=${encodeURIComponent(from || '')}`;
