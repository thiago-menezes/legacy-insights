import { Button, Modal, Text, View } from 'reshaped';
import { WorkspaceMemberItem } from './types';

interface RemoveModalProps {
  active: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  member: WorkspaceMemberItem | null;
  isPending: boolean;
  scope: 'workspace' | 'project';
}

export const RemoveModal = ({
  active,
  onClose,
  onConfirm,
  member,
  isPending,
  scope,
}: RemoveModalProps) => {
  const scopeLabel = scope === 'workspace' ? 'workspace' : 'projeto';

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title>Remover Membro</Modal.Title>
      <View gap={3} paddingTop={4} paddingBottom={4}>
        <Text>
          Tem certeza que deseja remover <strong>{member?.username}</strong>{' '}
          deste {scopeLabel}?
        </Text>
        <Text color="neutral">
          Esta ação não pode ser desfeita. O usuário perderá acesso a todos os
          recursos do {scopeLabel}.
        </Text>
      </View>

      <View gap={3} direction="row" justify="end">
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="critical" onClick={onConfirm} loading={isPending}>
          Remover
        </Button>
      </View>
    </Modal>
  );
};
