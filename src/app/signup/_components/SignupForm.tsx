'use client';

import * as yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { saveTokens } from '@/lib/auth';

import Button from '@/components/Button';

// 입력값 검증 스키마 정의
const schema = yup.object().shape({
  email: yup.string().required('이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
  nickname: yup.string().required('닉네임은 필수 입력입니다.').max(20, '닉네임은 최대 20자까지 가능합니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력입니다.')
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .matches(/^[A-Za-z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'),
  passwordConfirmation: yup
    .string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignupForm() {
  const router = useRouter();
  const isLoggedIn = false; // 로그인 상태 확인 (실제로는 인증 상태 체크)

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleSignup = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData.details?.email?.message) {
          setError('email', { type: 'server', message: errorData.details.email.message });
        }

        if (errorData.details?.nickname?.message) {
          setError('nickname', { type: 'server', message: errorData.details.nickname.message });
        }

        return;
      }

      const responseData = await response.json();
      saveTokens(responseData.accessToken, responseData.refreshToken);

      // 회원가입 성공 후 홈 화면으로 이동
      router.push('/');
    } catch (error) {
      console.error('회원가입 에러:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className='pb-10'>
      <div className='flex flex-col pb-[28px] mobile:pb-4'>
        <label htmlFor='email' className='pb-[10px] font-medium text-gray-800 mobile:text-[14px]'>
          이메일
        </label>
        <input
          {...register('email')}
          type='text'
          placeholder='wine@email.com'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col pb-[28px] mobile:pb-4'>
        <label htmlFor='nickname' className='pb-[10px] font-medium text-gray-800 mobile:text-[14px]'>
          닉네임
        </label>
        <input
          {...register('nickname')}
          type='text'
          placeholder='wine'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.nickname?.message}</p>
      </div>
      <div className='flex flex-col pb-[28px] mobile:pb-4'>
        <label htmlFor='password' className='pb-[10px] font-medium text-gray-800 mobile:text-[14px]'>
          비밀번호
        </label>
        <input
          {...register('password')}
          type='password'
          placeholder='영문, 숫자, 특수문자(!@#$%^&*) 제한'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.password?.message}</p>
      </div>
      <div className='flex flex-col pb-[32px] mobile:pb-10'>
        <label htmlFor='passwordConfirmation' className='pb-[10px] font-medium text-gray-800 mobile:text-[14px]'>
          비밀번호 확인
        </label>
        <input
          {...register('passwordConfirmation')}
          type='password'
          placeholder='비밀번호 확인'
          className='h-[48px] w-[400px] rounded-2xl border border-gray-300 pl-5 focus:outline-purple-100 mobile:h-[42px] mobile:w-[303px] mobile:text-[14px]'
        />
        <p className='h-[10px] pl-5 pt-1 text-sm text-purple-100'>{errors.passwordConfirmation?.message}</p>
      </div>
      <Button type='submit' text='가입하기' className='h-[50px] w-full rounded-2xl border mobile:text-[14px]' />
    </form>
  );
}
