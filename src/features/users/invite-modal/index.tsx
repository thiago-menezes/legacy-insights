import { Button, FormControl, Modal, Select, TextField, View } from 'reshaped';
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
}

export const InviteModal = ({
  active,
  onClose,
  onSubmit,
  isPending,
  scope,
  workspaceId,
  currentMembers = [],
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
    setPassword,
    handleClose,
    handleSubmit,
    isSearchComplete,
    selectedProjects,
    password,
    shouldCreateUser,
    isAlreadyMember,
  } = useInviteModal({
    scope,
    workspaceId,
    onSubmit,
    onClose,
    currentMembers,
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
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'member', label: 'Membro' },
              { value: 'viewer', label: 'Visualizador' },
            ]}
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
          <View paddingTop={2}>
            <FormControl>
              <FormControl.Label>Senha *</FormControl.Label>
              <TextField
                name="password"
                value={password}
                onChange={({ value }) => setPassword(value)}
                placeholder="Senha para o novo usuário"
                inputAttributes={{ type: 'password', required: true }}
              />
              <FormControl.Helper>
                Digite a senha que será passada ao novo usuário
              </FormControl.Helper>
            </FormControl>
          </View>
        )}
      </View>

      <View gap={3} direction="row" justify="end">
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          loading={isPending}
          disabled={
            !isSearchComplete ||
            isAlreadyMember ||
            (scope === 'workspace' && selectedProjects.length === 0) ||
            (shouldCreateUser && !password.trim())
          }
        >
          {shouldCreateUser ? 'Criar e Convidar' : 'Enviar Convite'}
        </Button>
      </View>
    </Modal>
  );
};
