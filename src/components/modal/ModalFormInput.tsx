'use client';

interface ModalFormInputTypes {
  value?: string | number | string[];
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  inputId: string;
}

export default function ModalFormInput({ value, label, onChange, placeholder, type, inputId }: ModalFormInputTypes) {
  return (
    <div className='flex flex-col gap-3 mobile:gap-[12px]'>
      <label htmlFor={inputId} className='text-lg font-bold text-gray-800 mobile:text-md'>
        {label}
      </label>
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className='h-[48px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-lg focus:outline-purple-100 mobile:h-[42px] mobile:rounded-xl'
      />
    </div>
  );
}
