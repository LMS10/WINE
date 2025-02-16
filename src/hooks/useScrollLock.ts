import { useEffect } from 'react';

export function useScrollLock(isOpen: boolean) {
  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  const applyFixedPadding = (padding: string) => {
    const fixedElements = document.querySelectorAll('[data-fixed="true"]');
    fixedElements.forEach((el) => {
      (el as HTMLElement).style.paddingRight = padding;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      applyFixedPadding(`${scrollbarWidth}px`);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      applyFixedPadding('');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      applyFixedPadding('');
    };
  }, [isOpen]);
}
