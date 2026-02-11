'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserRole } from '@/features/workspaces/use-user-role';

interface RoleGuardProps extends PropsWithChildren {
  requireManagement?: boolean;
  redirectTo?: string;
}

export const RoleGuard = ({
  children,
  requireManagement = false,
  redirectTo = '/acesso-negado',
}: RoleGuardProps) => {
  const router = useRouter();
  const { canManage, isLoading } = useUserRole();

  useEffect(() => {
    if (!isLoading && requireManagement && !canManage) {
      router.replace(redirectTo);
    }
  }, [isLoading, requireManagement, canManage, router, redirectTo]);

  if (isLoading || (requireManagement && !canManage)) {
    return null;
  }

  return <>{children}</>;
};
