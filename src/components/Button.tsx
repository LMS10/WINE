'use client';

import Link from 'next/link';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
  text: string;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'oauth' | 'lightPurple';
}

export default function Button({ type = 'button', onClick, href, text, disabled = false, className = '', variant = 'primary' }: ButtonProps) {
  const variantStyles =
    variant === 'primary'
      ? 'bg-purple-100 font-bold text-white transition-all duration-300 hover:bg-purple-200'
      : variant === 'oauth'
        ? 'rounded-2xl border border-gray-300 bg-white px-[120px] py-[14px] font-medium text-gray-800'
        : 'rounded-xl bg-purple-10 px-[36px] py-[16px] text-lg font-bold text-purple-100';

  const finalClassName = `${variantStyles} ${className}`;

  return href ? (
    <Link href={href} className={finalClassName}>
      {text}
    </Link>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={finalClassName}>
      {text}
    </button>
  );
}
