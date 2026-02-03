import {
  Button,
  FormControl,
  Modal,
  Select,
  Text,
  TextField,
  View,
} from 'reshaped';
import { ProjectSelector } from '../project-selector';
import { InviteFormData, MemberRole, WorkspaceMemberItem } from '../types';
import { useInviteModal } from './hooks';

export interface InviteModalProps {
  active: boolean;
  onClose: () => void;
  onSubmit: (data: InviteFormData) => Promise<void>;
  isPending: boolean;
  scope: 'workspace' | 'project';
  workspaceId?: string;
  currentMembers?: WorkspaceMemberItem[];
  currentUserRole?: string;
}

export const InviteModal = ({
  active,
  onClose,
  onSubmit,
  isPending,
  scope,
  workspaceId,
  currentMembers = [],
  currentUserRole,
}: InviteModalProps) => {
  const {
    scopeLabel,
    email,
    setEmail,
    isError,
    getHelperText,
    role,
    setRole,
    projects,
    setSelectedProjects,
    isLoadingProjects,
    handleClose,
    handleSubmit,
    isSearchComplete,
    selectedProjects,
    shouldCreateUser,
    isAlreadyMember,
  } = useInviteModal({
    scope,
    workspaceId,
    onSubmit,
    onClose,
    currentMembers,
  });

  const availableRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Visualizador' },
  ].filter((r) => {
    if (currentUserRole === 'editor') {
      return r.value !== 'admin';
    }
    return true;
  });

  return (
    <Modal active={active} onClose={handleClose}>
      <Modal.Title>Convidar para {scopeLabel}</Modal.Title>
      <View gap={3} paddingTop={4} paddingBottom={4}>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <TextField
            name="email"
            value={email}
            onChange={({ value }) => setEmail(value)}
            placeholder="exemplo@email.com"
            inputAttributes={{ type: 'email' }}
          />
          <FormControl.Helper>
            <span
              style={{
                color:
                  isError || isAlreadyMember
                    ? 'var(--rs-color-critical)'
                    : undefined,
              }}
            >
              {getHelperText()}
            </span>
          </FormControl.Helper>
        </FormControl>

        <FormControl>
          <FormControl.Label>Função</FormControl.Label>
          <Select
            name="role"
            value={role}
            onChange={({ value }) => setRole(value as MemberRole)}
            options={availableRoles}
          />
        </FormControl>

        {scope === 'workspace' && (
          <ProjectSelector
            projects={projects}
            selectedProjects={selectedProjects}
            onChange={setSelectedProjects}
            isLoading={isLoadingProjects}
          />
        )}

        {shouldCreateUser && (
          <View paddingTop={2} gap={2}>
            <Text variant="body-3" color="neutral-faded">
              Envie este link para a pessoa criar a conta e ter acesso ao
              portal:
            </Text>
            <View
              padding={3}
              backgroundColor="neutral-faded"
              borderRadius="medium"
            >
              <Text variant="body-3" weight="medium">
                {typeof window !== 'undefined'
                  ? `${window.location.origin}/login/criar-conta?email=${encodeURIComponent(email)}`
                  : ''}
              </Text>
            </View>
            <Button
              variant="outline"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/login/criar-conta?email=${encodeURIComponent(email)}`,
                  );
                }
              }}
            >
              Copiar Link
            </Button>
          </View>
        )}
      </View>

      <View gap={3} direction="row" justify="end">
        <Button onClick={handleClose}>Cancelar</Button>
        {!shouldCreateUser && (
          <Button
            color="primary"
            onClick={handleSubmit}
            loading={isPending}
            disabled={
              !isSearchComplete ||
              isAlreadyMember ||
              (scope === 'workspace' && selectedProjects.length === 0)
            }
          >
            Enviar Convite
          </Button>
        )}
      </View>
    </Modal>
  );
};
