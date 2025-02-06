'use client';

import Image from 'next/image';

import { useForm, SubmitHandler } from 'react-hook-form';

import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    if (email !== 'test@example.com' || password !== 'password123') {
      setError('email', { message: '이메일 혹은 비밀번호를 확인해주세요.' });
      return;
    }
    console.log('로그인');
  };

  const handleGoogleLogin = () => {
    console.log('google 로그인버튼');
  };

  const handleKakaoLogin = () => {
    console.log('kakao 로그인버튼');
  };

  return (
    <form action='' onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='flex flex-col pb-[12px] mobile:pb-4'>
        <label htmlFor='email' className='pb-[10px] font-normal leading-[26px] text-gray-800'>
          이메일
        </label>
        <input
          type='text'
          placeholder='이메일 입력'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 mobile:h-[42px] mobile:w-[303px]'
          {...register('email', { required: '이메일은 필수 입력입니다.', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: '이메일 형식으로 작성해 주세요.' } })}
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col pb-[12px]'>
        <label htmlFor='password' className='pb-[10px] font-normal leading-[26px] text-gray-800'>
          비밀번호
        </label>
        <input
          type='password'
          placeholder='비밀번호 입력'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 mobile:h-[42px] mobile:w-[303px]'
          {...register('password', { required: '비밀번호는 필수 입력입니다.' })}
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.password?.message}</p>
      </div>

      <div className='flex w-full flex-col gap-[15px] pb-8 pt-14 mobile:pb-6 mobile:pt-10'>
        <button type='submit' className='h-[50px] rounded-2xl border bg-purple-100 text-white'>
          로그인
        </button>
        <button type='submit' onSubmit={handleGoogleLogin} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={googleIcon} alt='구글아이콘'></Image>
          <p>Google로 시작하기</p>
        </button>
        <button type='submit' onSubmit={handleKakaoLogin} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={kakaoIcon} alt='카카오아이콘'></Image>
          <p>카카오로 시작하기</p>
        </button>
      </div>
    </form>
  );
}
