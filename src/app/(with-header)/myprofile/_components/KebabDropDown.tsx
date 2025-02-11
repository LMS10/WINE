'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/menu.svg';

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
        <Image className='h-[24px] w-[24px] cursor-pointer' src={kebab} alt='케밥 아이콘' />
      </Dropdown>
    </div>
  );
}
