import { useCallback, useMemo, useState } from 'react';
import { useSelectedWorkspace } from '@/features/workspaces/context';
import {
  useInviteProjectMember,
  useRemoveProjectMember,
  useUpdateProjectMemberRole,
} from './api/mutation';
import { useProjectMembers } from './api/query';
import { useUserRole } from '@/features/workspaces/use-user-role';
import { InviteFormData, MemberRole, WorkspaceMemberItem } from './types';

export const useUsersManagement = () => {
  const { selectedOrg, selectedProject } = useSelectedWorkspace();
  const { isAdmin, isOwner, isEditor, canInviteMembers } = useUserRole();

  const workspaceId = selectedOrg?.documentId;

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<WorkspaceMemberItem | null>(null);

  const { data: projectMembers, isLoading: isLoadingProjectMembers } =
    useProjectMembers(selectedProject?.documentId || undefined);

  const inviteProjectMemberMutation = useInviteProjectMember(
    selectedProject?.documentId || undefined,
  );
  const updateProjectMemberRoleMutation = useUpdateProjectMemberRole(
    selectedProject?.documentId || undefined,
  );
  const removeProjectMemberMutation = useRemoveProjectMember(
    selectedProject?.documentId || undefined,
  );

  const currentMembers = useMemo((): WorkspaceMemberItem[] => {
    return (projectMembers || []).map((member) => ({
      ...member,
      username: member.username || member.user?.username,
      email: member.email || member.user?.email,
      invitedAt: member.invitedAt ?? null,
      invitedBy: member.invitedBy ?? null,
    }));
  }, [projectMembers]);

  const isLoading = isLoadingProjectMembers;

  const isMutating = useMemo(() => {
    return (
      inviteProjectMemberMutation.isPending ||
      updateProjectMemberRoleMutation.isPending ||
      removeProjectMemberMutation.isPending
    );
  }, [
    inviteProjectMemberMutation.isPending,
    updateProjectMemberRoleMutation.isPending,
    removeProjectMemberMutation.isPending,
  ]);

  const handleOpenInviteModal = useCallback(() => {
    setIsInviteModalOpen(true);
  }, []);

  const handleCloseInviteModal = useCallback(() => {
    setIsInviteModalOpen(false);
  }, []);

  const handleOpenEditRoleModal = useCallback((member: WorkspaceMemberItem) => {
    setSelectedMember(member);
    setIsEditRoleModalOpen(true);
  }, []);

  const handleCloseEditRoleModal = useCallback(() => {
    setSelectedMember(null);
    setIsEditRoleModalOpen(false);
  }, []);

  const handleOpenRemoveModal = useCallback((member: WorkspaceMemberItem) => {
    setSelectedMember(member);
    setIsRemoveModalOpen(true);
  }, []);

  const handleCloseRemoveModal = useCallback(() => {
    setSelectedMember(null);
    setIsRemoveModalOpen(false);
  }, []);

  const handleInvite = useCallback(
    async (data: InviteFormData) => {
      if (selectedProject?.documentId) {
        await inviteProjectMemberMutation.mutateAsync(data);
      }
      handleCloseInviteModal();
    },
    [
      selectedProject?.documentId,
      inviteProjectMemberMutation,
      handleCloseInviteModal,
    ],
  );

  const handleUpdateRole = useCallback(
    async (role: MemberRole) => {
      if (!selectedMember?.documentId) return;

      if (selectedProject?.documentId) {
        await updateProjectMemberRoleMutation.mutateAsync({
          memberId: selectedMember.documentId,
          role,
        });
      }
      handleCloseEditRoleModal();
    },
    [
      selectedMember,
      selectedProject?.documentId,
      updateProjectMemberRoleMutation,
      handleCloseEditRoleModal,
    ],
  );

  const handleRemoveMember = useCallback(async () => {
    if (!selectedMember?.documentId) return;

    if (selectedProject?.documentId) {
      await removeProjectMemberMutation.mutateAsync(selectedMember.documentId);
    }
    handleCloseRemoveModal();
  }, [
    selectedMember,
    selectedProject?.documentId,
    removeProjectMemberMutation,
    handleCloseRemoveModal,
  ]);

  return {
    selectedProjectId: selectedProject?.documentId,
    workspaceId,
    selectedWorkspace: selectedOrg,

    currentMembers,
    isLoading,
    isMutating,

    isInviteModalOpen,
    isEditRoleModalOpen,
    isRemoveModalOpen,
    selectedMember,

    handleOpenInviteModal,
    handleCloseInviteModal,
    handleOpenEditRoleModal,
    handleCloseEditRoleModal,
    handleOpenRemoveModal,
    handleCloseRemoveModal,
    handleInvite,
    handleUpdateRole,
    handleRemoveMember,

    isAdmin,
    isOwner,
    isEditor,
    canInviteMembers,
  };
};
