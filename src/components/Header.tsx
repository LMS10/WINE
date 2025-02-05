'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import ProfileImg from './ProfileImg';
import logoWhite from '@/assets/icons/logo_white.svg';
import profileDefault from '@/assets/icons/profile_default.svg';

function LoggedOutHeader() {
  return (
    <div className='mt-[24px] flex w-full justify-center'>
      <div className='box-border h-[70px] w-[1140px] rounded-xl bg-black tablet:w-[740px] mobile:h-[50px] mobile:w-[343px]'>
        <header className='flex items-center justify-between px-[60px] py-[22.5px] mobile:px-[20px] mobile:py-[17.5px]'>
          <Link href={'/'}>
            <Image className='cursor-pointer' src={logoWhite} width={52} height={15} alt='화이트 로고' />
          </Link>
          <div className='flex cursor-pointer gap-[40px] text-base text-white mobile:gap-[20px] mobile:text-md mobile:leading-none'>
            <Link href={'/login'}>로그인</Link>
            <Link href={'/signup'}>회원가입</Link>
          </div>
        </header>
      </div>
    </div>
  );
}

function LoggedInHeader() {
  const { profileImage } = useAuth();

  return (
    <div className='mt-[24px] flex w-full justify-center'>
      <div className='box-border h-[70px] w-[1140px] rounded-xl bg-black tablet:w-[740px] mobile:h-[50px] mobile:w-[343px]'>
        <header className='flex items-center justify-between px-[60px] py-[12.5px] mobile:px-[20px] mobile:py-[12.5px]'>
          <Link href={'/'}>
            <Image src={logoWhite} width={52} height={15} alt='화이트 로고' />
          </Link>
          <ProfileImg size='small' src={profileImage || profileDefault} isLine onClick={() => {}} />
        </header>
      </div>
    </div>
  );
}

export default function Header() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;
}
