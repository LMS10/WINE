'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

export default function Modal({ children, isOpen, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isOpen) {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  }

  if (!isOpen) {
    dialogRef.current?.close();
    document.body.style.overflow = '';
  }

  return createPortal(
    <dialog className={`${className}`} ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
