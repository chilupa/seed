import type { UserProfile } from '../../types/user';

import { apiClient } from './client';

interface PlaceholderUser {
  id: number;
  name: string;
  email: string;
  company?: { name?: string };
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const { data } = await apiClient.get<PlaceholderUser>('/users/1');
  return {
    id: String(data.id),
    name: data.name,
    email: data.email,
    role: data.company?.name ?? 'Member',
  };
}

export async function fetchUsers(): Promise<UserProfile[]> {
  const { data } = await apiClient.get<PlaceholderUser[]>('/users');
  return data.slice(0, 8).map((user) => ({
    id: String(user.id),
    name: user.name,
    email: user.email,
    role: user.company?.name ?? 'Member',
  }));
}
