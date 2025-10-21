import type { PaginationParams } from '@/types/pagination.type';
import type { UserType } from '@/types/user.type';

import { apiClient } from '../api';

export function getUsers(queryParams: PaginationParams) {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  return apiClient.request(`/users?${searchParams.toString()}`, {
    method: 'GET',
  });
}

export function createUser(userData: Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiClient.request('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export function updateUser(
  id: number,
  userData: Partial<Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>>
) {
  return apiClient.request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export function deleteUser(id: number) {
  return apiClient.request(`/users/${id}`, {
    method: 'DELETE',
  });
}

export function getUserById(id: number) {
  return apiClient.request(`/users/${id}`, {
    method: 'GET',
  });
}
