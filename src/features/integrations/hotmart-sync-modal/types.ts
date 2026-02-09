export interface HotmartSyncModalProps {
  integrationId: string;
  integrationName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface SyncFormData {
  startDate: string;
  endDate: string;
}
