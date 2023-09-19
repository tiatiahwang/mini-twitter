'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  className?: string;
  modalAnimation?: Variants;
  modalClassName?: string;
  closePanelOnClick?: boolean;
};

const variants: Variants[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        duration: 0.5,
        bounce: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15 },
    },
  },
];

export const [backdrop, modal] = variants;

const Modal = ({
  isOpen,
  children,
  closeModal,
  className,
  modalAnimation,
  modalClassName,
  closePanelOnClick,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          className='relative z-50'
          open={isOpen}
          onClose={closeModal}
          static
        >
          <motion.div
            className='fixed inset-0 bg-black/40'
            aria-hidden='true'
            {...backdrop}
          >
            <div
              className={`fixed inset-0 overflow-y-auto p-4 ${
                className ??
                'flex items-center justify-center'
              }`}
            >
              <Dialog.Panel
                className={modalClassName}
                as={motion.div}
                onClick={
                  closePanelOnClick ? closeModal : undefined
                }
                {...(modalAnimation ?? modal)}
              >
                {children}
              </Dialog.Panel>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
