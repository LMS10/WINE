'use client';
import { useRouter } from 'next/navigation';
import { removeTokens } from '@/lib/auth';
import Dropdown from './Dropdown';
import ProfileImg from './ProfileImg';

export default function ProfileImgDropdown({ profileImage, profileDefault }: { profileImage?: string; profileDefault: string }) {
  const router = useRouter();

  const options = [
    { label: '마이페이지', value: () => router.push('/myprofile') },
    {
      label: '로그아웃',
      value: () => {
        removeTokens();
        router.push('/signin');
      },
    },
  ];

  return (
    <div className='relative top-1 z-50 cursor-pointer'>
      <Dropdown
        options={options}
        onSelect={(option) => {
          option.value?.();
        }}
      >
        <ProfileImg size='small' src={profileImage || profileDefault} isLine onClick={() => {}} />
      </Dropdown>
    </div>
  );
}
