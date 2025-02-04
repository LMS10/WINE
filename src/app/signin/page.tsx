import Link from 'next/link';
import Image from 'next/image';

import logoBlack from '@/assets/icons/logo_black.svg';
import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';

export default function Login() {
  return (
    <section className='flex h-screen items-center justify-center bg-gray-100 tablet:pl-[124px] tablet:pr-[124px] mobile:pl-4 mobile:pr-4'>
      <div className='rounded-[16px] border border-gray-300 bg-white pb-[80px] pl-12 pr-12 pt-[80px] tablet:pb-16 tablet:pt-16 mobile:pb-14 mobile:pl-5 mobile:pr-5 mobile:pt-14'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logoBlack} alt='와인 로고' className='pb-[64px] mobile:pb-14'></Image>
          <form action='' className='pb-14 mobile:pb-10'>
            <div className='flex flex-col gap-[10px] pb-[25px] mobile:pb-4'>
              <label htmlFor='' className='font-normal leading-[26px] text-gray-800'>
                이메일
              </label>
              <input type='text' placeholder='이메일 입력' className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 mobile:h-[42px] mobile:w-[303px]' />
            </div>
            <div className='flex flex-col gap-[10px] pb-[10px]'>
              <label htmlFor='' className='font-normal leading-[26px] text-gray-800'>
                비밀번호
              </label>
              <input type='text' placeholder='비밀번호 입력' className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 mobile:h-[42px] mobile:w-[303px]' />
            </div>
            <Link href='' className='text-[14px] leading-[24px] text-purple-100'>
              비밀번호를 잊으셨나요?
            </Link>
          </form>
          <div className='flex w-full flex-col gap-[15px] pb-8 mobile:pb-6'>
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
            <Link href='/signup' className='font-medium text-purple-100 underline'>
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
