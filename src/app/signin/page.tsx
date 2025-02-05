import Link from 'next/link';
import Image from 'next/image';

import logoBlack from '@/assets/icons/logo_black.svg';
import LoginForm from './_components/LoginForm';

export default function Login() {
  return (
    <section className='flex h-screen items-center justify-center bg-gray-100 tablet:pl-[124px] tablet:pr-[124px] mobile:pl-4 mobile:pr-4'>
      <div className='rounded-[16px] border border-gray-300 bg-white pb-[80px] pl-12 pr-12 pt-[80px] tablet:pb-16 tablet:pt-16 mobile:pb-14 mobile:pl-5 mobile:pr-5 mobile:pt-14'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logoBlack} alt='와인 로고' className='pb-[64px] mobile:pb-14' priority></Image>
          <LoginForm></LoginForm>
          <div className='flex gap-[14px]'>
            <p className='font-normal text-gray-500'>계정이 없으신가요?</p>
            <Link href='/signup' className='font-medium text-purple-100 underline'>
              회원가입하기
            </Link>
          </div>
          <div className='flex gap-[14px]'>
            <p className='font-normal text-gray-500'>암호를 잊으셨나요?</p>
            <Link href='' className='font-medium text-purple-100 underline'>
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
