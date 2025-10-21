export type ServiceType = {
  id: number;
  name: string;
  description: string;
  type: number; // 1: server, 2: vps, 3: shared hosting
  status: number; // 0: inactive, 1: active
  resStatusApiUrl: string;
  resStatusApiKey: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceTypeLabels = {
  [key: number]: string;
};

export const SERVICE_TYPE_LABELS: ServiceTypeLabels = {
  1: 'Server',
  2: 'VPS',
  3: 'Shared Hosting',
};

export const SERVICE_STATUS_LABELS: ServiceTypeLabels = {
  0: 'Inactive',
  1: 'Active',
};
