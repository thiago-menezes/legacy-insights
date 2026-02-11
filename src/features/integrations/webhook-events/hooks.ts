import { useState } from 'react';
import { useWebhookEventsQuery } from '@/libs/api/hooks/webhook-events';
import { WebhookEvent } from './types';

export const useWebhookEvents = (integrationId: string) => {
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // Fetch webhook events from API
  const { data, isLoading } = useWebhookEventsQuery(integrationId, {
    page,
    pageSize,
    ...(eventTypeFilter && { eventType: eventTypeFilter }),
  });

  const handleEventClick = (event: WebhookEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    data,
    isLoading,
    selectedEvent,
    isDetailModalOpen,
    eventTypeFilter,
    page,
    setEventTypeFilter,
    handleEventClick,
    handleCloseDetail,
    handlePageChange,
  };
};
