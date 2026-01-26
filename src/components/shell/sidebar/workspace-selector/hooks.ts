import { useState, useEffect, useMemo, useCallback } from 'react';
import { useWorkspaces } from '@/features/workspaces/hooks';
import { DEFAULT_ORG_ICON } from './constants';
import type { WorkspaceSelectorState, WorkspaceSelectorActions } from './types';

interface UseWorkspaceSelectorReturn
  extends WorkspaceSelectorState, WorkspaceSelectorActions {}

export const useWorkspaceSelector = (): UseWorkspaceSelectorReturn => {
  const { workspaces, isLoading } = useWorkspaces();
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null,
  );
  const [expandedOrgs, setExpandedOrgs] = useState<string[]>([]);

  // Initialize from localStorage or first available workspace
  useEffect(() => {
    if (!isLoading && workspaces.length > 0) {
      const savedOrgId = localStorage.getItem('selectedOrgId');
      const savedWsId = localStorage.getItem('selectedWorkspaceId');

      if (savedOrgId && workspaces.find((w) => w.documentId === savedOrgId)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedOrgId(savedOrgId);
        if (savedWsId) {
          setSelectedWorkspaceId(savedWsId);
        }
      } else {
        const firstOrg = workspaces[0];
        setSelectedOrgId(firstOrg.documentId);
        if (firstOrg.integrations && firstOrg.integrations.length > 0) {
          setSelectedWorkspaceId(String(firstOrg.integrations[0].id));
        }
      }
    }
  }, [isLoading, workspaces]);

  const selectedOrg = useMemo(
    () => workspaces.find((o) => o.documentId === selectedOrgId),
    [workspaces, selectedOrgId],
  );

  const selectedWorkspace = useMemo(
    () =>
      selectedOrg?.integrations?.find(
        (w) => String(w.id) === selectedWorkspaceId,
      ) || selectedOrg?.integrations?.[0],
    [selectedOrg, selectedWorkspaceId],
  );

  const toggleOrg = useCallback((orgId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedOrgs((prev) =>
      prev.includes(orgId)
        ? prev.filter((id) => id !== orgId)
        : [...prev, orgId],
    );
  }, []);

  const handleSelectWorkspace = useCallback((orgId: string, wsId: string) => {
    setSelectedOrgId(orgId);
    setSelectedWorkspaceId(wsId);
    localStorage.setItem('selectedOrgId', orgId);
    localStorage.setItem('selectedWorkspaceId', wsId);
  }, []);

  return {
    selectedOrgId: selectedOrgId || '',
    selectedWorkspaceId: selectedWorkspaceId || '',
    expandedOrgs,
    selectedOrg: selectedOrg
      ? {
          id: selectedOrg.documentId,
          name: selectedOrg.name,
          logoIcon: DEFAULT_ORG_ICON, // Or map from logo if icons are used
          logo: selectedOrg.logo,
          workspaces: (selectedOrg.integrations || []).map((i) => ({
            id: String(i.id),
            name: i.name,
          })),
        }
      : undefined,
    selectedWorkspace: selectedWorkspace
      ? {
          id: String(selectedWorkspace.id),
          name: selectedWorkspace.name,
        }
      : undefined,
    toggleOrg,
    handleSelectWorkspace,
  };
};
