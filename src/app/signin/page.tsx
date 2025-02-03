import Link from 'next/link';
import Image from 'next/image';

import logoBlack from '@/assets/icons/logo_black.svg';
import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';

export default function Login() {
  return (
    <section className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='flex h-[772px] w-[496px] max-w-[496px] flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white pb-[80px] pl-[40px] pr-[40px] pt-[80px]'>
        <Image src={logoBlack} alt='와인 로고' className='pb-[64px]'></Image>
        <form action='' className='pb-14'>
          <div className='flex flex-col gap-[10px] pb-[25px]'>
            <label htmlFor='' className='font-normal leading-[26px] text-gray-800'>
              이메일
            </label>
            <input type='text' placeholder='이메일 입력' className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5' />
          </div>
          <div className='flex flex-col gap-[10px] pb-[10px]'>
            <label htmlFor='' className='font-normal leading-[26px] text-gray-800'>
              비밀번호
            </label>
            <input type='text' placeholder='비밀번호 입력' className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5' />
          </div>
          <Link href='' className='text-[14px] leading-[24px] text-purple-100'>
            비밀번호를 잊으셨나요?
          </Link>
        </form>
        <div className='flex w-full flex-col gap-[15px] pb-8'>
          <button className='h-[50px] rounded-2xl border bg-purple-100 text-white'>로그인</button>
          <button className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
            <Image src={googleIcon} alt='구글아이콘'></Image>
            <p>Google로 시작하기</p>
          </button>
          <button className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
            <Image src={kakaoIcon} alt='카카오아이콘'></Image>
            <p>카카오로 시작하기</p>
          </button>
        </div>
        <div className='flex gap-[14px]'>
          <p className='font-normal text-gray-500'>계정이 없으신가요?</p>
          <Link href='/signup' className='font-medium text-purple-100'>
            회원가입하기
          </Link>
        </div>
      </div>
    </section>
  );
}
