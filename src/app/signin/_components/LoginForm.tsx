'use client';

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';
import { useAuth } from '@/contexts/authContext';
import Button from '@/components/Button';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  let loginType: 'email' | 'google' | 'kakao' = 'email';

  // 로그인 API 호출 함수
  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const responseData = await response.json();
      login(responseData.accessToken, responseData.refreshToken);

      // 로그인 성공 후 리다이렉션
      router.push('/wines'); // /wines 주소로 리다이렉션
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('email', { message: '이메일 혹은 비밀번호를 확인해주세요.' });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (loginType === 'email') {
      handleLogin(data);
    } else if (loginType === 'google') {
      console.log('Google OAuth 로그인 실행');
      // TODO: Google OAuth API 요청 추가
    } else if (loginType === 'kakao') {
      console.log('Kakao OAuth 로그인 실행');
      // TODO: Kakao OAuth API 요청 추가
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col pb-[28px] mobile:pb-4'>
        <label htmlFor='email' className='pb-[10px] font-medium leading-[26px] text-gray-800 mobile:text-[14px]'>
          이메일
        </label>
        <input
          type='text'
          placeholder='이메일 입력'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
          {...register('email', { required: '이메일은 필수 입력입니다.', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: '이메일 형식으로 작성해 주세요.' } })}
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col pb-[12px]'>
        <label htmlFor='password' className='pb-[10px] font-medium leading-[26px] text-gray-800 mobile:text-[14px]'>
          비밀번호
        </label>
        <input
          type='password'
          placeholder='비밀번호 입력'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
          {...register('password', { required: '비밀번호는 필수 입력입니다.' })}
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.password?.message}</p>
      </div>

      <div className='flex w-full flex-col gap-[15px] pb-8 pt-14 mobile:pb-6 mobile:pt-10'>
        <Button type='submit' onClick={() => (loginType = 'email')} text='로그인' className='h-[50px] rounded-2xl border mobile:text-[14px]'></Button>
        <button type='submit' onClick={() => (loginType = 'google')} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={googleIcon} alt='구글아이콘' />
          <p className='font-medium mobile:text-[14px]'>Google로 시작하기</p>
        </button>
        <button type='submit' onClick={() => (loginType = 'kakao')} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={kakaoIcon} alt='카카오아이콘' />
          <p className='font-medium mobile:text-[14px]'>카카오로 시작하기</p>
        </button>
      </div>
    </form>
  );
}
