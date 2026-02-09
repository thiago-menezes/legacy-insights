import { useState } from 'react';
import { Button, FormControl, Modal, Select, Text, View } from 'reshaped';
import { MemberRole, WorkspaceMemberItem } from './types';

interface EditRoleModalProps {
  active: boolean;
  onClose: () => void;
  onSubmit: (role: MemberRole) => Promise<void>;
  member: WorkspaceMemberItem | null;
  isPending: boolean;
  currentUserRole?: string;
}

interface EditRoleFormProps {
  initialRole: MemberRole;
  memberUsername: string;
  onSubmit: (role: MemberRole) => Promise<void>;
  onClose: () => void;
  isPending: boolean;
  currentUserRole?: string;
}

const EditRoleForm = ({
  initialRole,
  memberUsername,
  onSubmit,
  onClose,
  isPending,
  currentUserRole,
}: EditRoleFormProps) => {
  const [role, setRole] = useState<MemberRole>(initialRole);

  const handleSubmit = async () => {
    await onSubmit(role);
  };

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
    <View>
      <View gap={3} paddingTop={4} paddingBottom={4}>
        <Text>
          Alterar função de <strong>{memberUsername}</strong>
        </Text>

        <FormControl>
          <FormControl.Label>Nova Função</FormControl.Label>
          <Select
            name="role"
            value={role}
            onChange={({ value }) => setRole(value as MemberRole)}
            options={availableRoles}
          />
        </FormControl>
      </View>

      <View gap={3} direction="row" justify="end">
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="primary" onClick={handleSubmit} loading={isPending}>
          Salvar
        </Button>
      </View>
    </View>
  );
};

export const EditRoleModal = ({
  active,
  onClose,
  onSubmit,
  member,
  isPending,
  currentUserRole,
}: EditRoleModalProps) => {
  const roleStr = member?.role as string;
  const initialRole: MemberRole =
    roleStr !== 'owner' && roleStr !== 'member'
      ? (roleStr as MemberRole)
      : 'editor';

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title>Alterar Função</Modal.Title>
      {member && member?.email && (
        <EditRoleForm
          key={member.id}
          initialRole={initialRole}
          memberUsername={member?.email}
          onSubmit={onSubmit}
          onClose={onClose}
          isPending={isPending}
          currentUserRole={currentUserRole}
        />
      )}
    </Modal>
  );
};
