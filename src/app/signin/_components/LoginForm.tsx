'use client';

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';
import { useAuth } from '@/contexts/AuthProvider';
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

      router.push('/wines');
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('email', { message: '이메일 혹은 비밀번호를 확인해주세요.' });
    }
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인');
  };

  return (
    <form>
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
        <Button type='button' onClick={handleSubmit(handleLogin)} text='로그인' className='h-[50px] rounded-2xl border mobile:text-[14px]'></Button>
        <button type='button' onClick={handleGoogleLogin} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={googleIcon} alt='구글아이콘' />
          <p className='font-medium mobile:text-[14px]'>Google로 시작하기</p>
        </button>
        <button type='button' onClick={handleKakaoLogin} className='flex h-[50px] items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white'>
          <Image src={kakaoIcon} alt='카카오아이콘' />
          <p className='font-medium mobile:text-[14px]'>카카오로 시작하기</p>
        </button>
      </div>
    </form>
  );
}
