'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import menu from '@/assets/icons/menu.svg';
import { fetchWithAuth } from '@/lib/auth';

export default function ReviewDropdown({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
      });
      if (response && response.ok) {
        window.location.reload();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const options = [
    { value: () => router.push(`/reviews/${id}`), label: '수정하기' },
    { value: () => handleDelete(), label: '삭제하기' },
  ];

  return (
    <div className='ml-[24px]'>
      <Dropdown
        options={options}
        onSelect={(option) => {
          option.value?.();
        }}
      >
        <Image width={38} height={38} src={menu} alt='메뉴 아이콘' />
      </Dropdown>
    </div>
  );
}
