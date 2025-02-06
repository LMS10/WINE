'use client';

import Image from 'next/image';
import kebab from '@/assets/icons/menu.svg';
import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/navigation';

export default function KebabDropDown({ id }: { id: number }) {
  const router = useRouter();

  const options = [
    { value: () => router.push(`/wines/${id}`), label: '수정하기' },
    { value: () => router.push('/'), label: '삭제하기' },
  ];

  return (
    <div className='absolute right-0 w-fit'>
      <Dropdown
        options={options}
        onSelect={(option) => {
          option.value?.();
        }}
      >
        <Image className='cursor-pointer' src={kebab} alt='케밥 아이콘' />
      </Dropdown>
    </div>
  );
}
