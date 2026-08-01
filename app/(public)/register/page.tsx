'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import HomePage from '../page';

export default function RegisterPage() {
  const { openRegisterModal } = useAuthStore();

  useEffect(() => {
    // Open the global modal as soon as this page mounts (e.g. on a hard refresh)
    openRegisterModal();
  }, [openRegisterModal]);

  return <HomePage />;
}
