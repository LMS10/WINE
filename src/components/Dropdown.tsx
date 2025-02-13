'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import downIcon from '@/assets/icons/dropdown.svg';

interface DropdownOption {
  value?: () => void;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  children?: ReactNode;
  changeButton?: boolean;
  buttonClassName?: string;
  ulClassName?: string;
  liClassName?: string;
  defaultValue?: DropdownOption | null;
}

function Dropdown({ options, onSelect, placeholder, changeButton = false, children, buttonClassName, ulClassName, liClassName, defaultValue = null }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownOption | null>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const labelActive = selected ? 'text-black' : 'text-gray-500';

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        type='button'
        onClick={toggleDropdown}
        className={changeButton ? `${buttonClassName} ${labelActive} h-12 w-full rounded-2xl border border-gray-300 px-5 text-lg font-medium mobile:h-[42px] mobile:text-md` : ``}
      >
        {!changeButton ? (
          <span>{children}</span>
        ) : (
          <div className='flex items-center justify-between'>
            <span>{selected ? selected.label : placeholder}</span>
            <Image src={downIcon} alt='downIcon' />
          </div>
        )}
      </button>
      {isOpen && (
        <ul
          className={
            changeButton
              ? `${ulClassName} absolute z-10 mt-1 flex h-[156px] w-full flex-col rounded-2xl border border-gray-300 bg-white font-medium mobile:h-[138px]`
              : `${ulClassName} absolute -ml-[100px] mt-1 flex h-[104px] w-[126px] flex-col rounded-2xl border border-gray-300 bg-white text-lg font-medium mobile:-ml-20 mobile:h-[92px] mobile:w-[101px]`
          }
        >
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => handleSelect(option)}
              className={
                changeButton
                  ? `${liClassName}mx-[6px] my-[3px] flex flex-1 items-center rounded-lg pl-[14px] font-medium text-black hover:cursor-pointer hover:bg-purple-10 hover:text-purple-100 mobile:text-md`
                  : `${liClassName}mobile: mx-[6px] my-[3px] flex flex-1 items-center justify-center rounded-xl font-medium text-black hover:bg-purple-10 hover:text-purple-100 mobile:text-md`
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
