import type { PaginationParams } from '@/types/pagination.type';
import type { ServiceType } from '@/types/service.type';

import { apiClient } from '../api';

export function getServices(queryParams: PaginationParams) {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  return apiClient.request(`/services?${searchParams.toString()}`, {
    method: 'GET',
  });
}

export function createService(serviceData: Omit<ServiceType, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiClient.request('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });
}

export function updateService(
  id: number,
  serviceData: Partial<Omit<ServiceType, 'id' | 'createdAt' | 'updatedAt'>>
) {
  return apiClient.request(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });
}

export function deleteService(id: number) {
  return apiClient.request(`/services/${id}`, {
    method: 'DELETE',
  });
}

export function getServiceById(id: number) {
  return apiClient.request(`/services/${id}`, {
    method: 'GET',
  });
}
