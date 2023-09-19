'use client';

import { useState } from 'react';

type UseModalProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useModal = (): UseModalProps => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

export default useModal;
