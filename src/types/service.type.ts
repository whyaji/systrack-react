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

export enum SERVICE_TYPE {
  SERVER = 1,
  VPS = 2,
  SHARED_HOSTING = 3,
}

export enum SERVICE_STATUS {
  INACTIVE = 0,
  ACTIVE = 1,
}

export const SERVICE_TYPE_LABELS: ServiceTypeLabels = {
  [SERVICE_TYPE.SERVER]: 'Server',
  [SERVICE_TYPE.VPS]: 'VPS',
  [SERVICE_TYPE.SHARED_HOSTING]: 'Shared Hosting',
};

export const SERVICE_STATUS_LABELS: ServiceTypeLabels = {
  [SERVICE_STATUS.INACTIVE]: 'Inactive',
  [SERVICE_STATUS.ACTIVE]: 'Active',
};

export const SERVICE_TYPE_OPTIONS = [
  { value: SERVICE_TYPE.SERVER, label: 'Server' },
  { value: SERVICE_TYPE.VPS, label: 'VPS' },
  { value: SERVICE_TYPE.SHARED_HOSTING, label: 'Shared Hosting' },
];

export const SERVICE_STATUS_OPTIONS = [
  { value: SERVICE_STATUS.ACTIVE, label: 'Active' },
  { value: SERVICE_STATUS.INACTIVE, label: 'Inactive' },
];
