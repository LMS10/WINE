'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/hooks/useScrollLock';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (setOpen: boolean) => void;
  className?: string;
}

export default function Modal({ children, isOpen, setIsOpen, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useScrollLock(isOpen);

  const escKeyModalClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).nodeName === 'DIALOG') {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', escKeyModalClose);
    return () => window.removeEventListener('keydown', escKeyModalClose);
  }, [escKeyModalClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  if (typeof document === 'undefined') return null;

  if (isOpen) {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  }

  if (!isOpen) {
    dialogRef.current?.close();
    document.body.style.overflow = '';
  }

  return createPortal(
    <dialog className={`ignore-click mobile:max-w-[764px] ${className}`} ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
