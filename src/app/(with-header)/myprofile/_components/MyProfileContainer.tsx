'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/auth';
import { MyProfile, MyProfileData } from './MyProfile';
import LoadingSpinner from '@/components/LoadingSpinner';
import Refresh from '@/components/Refresh';

export default function MyProfileContainer() {
  const [profileData, setProfileData] = useState<MyProfileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getUserData = async () => {
    setError('');
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);

      if (!response?.ok || response === null) {
        setError('유저 데이터를 불러오는데 실패했습니다.');
        return;
      }

      const data: MyProfileData = await response.json();
      setProfileData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const upLoadImgFile = async (formData: FormData): Promise<string | undefined> => {
    setError('');
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response?.ok || response === null) {
        setError('이미지를 업로드하는데 실패했습니다.');
        return;
      }

      const data = await response.json();
      return data.url as string;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const upLoadUserData = async (image: string, nickname: string): Promise<string | undefined> => {
    setError('');
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image, nickname: nickname }),
      });

      if (response?.status === 400) {
        alert('동일한 닉네임이 있습니다.');
      }

      if (!response?.ok || response === null) {
        setError('데이터를 업데이트 하는데 실패했습니다.');
        return;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return <LoadingSpinner className='h-[530px] w-[280px] rounded-[16px] border border-gray-300 shadow-drop tablet:h-[247px] tablet:w-full mobile:h-[241px]' />;

  if (!profileData || error)
    return (
      <Refresh
        handleLoad={getUserData}
        boxStyle='h-[530px] w-[280px] rounded-[16px] border border-gray-300 shadow-drop tablet:h-[247px] tablet:w-full mobile:h-[241px] gap-[10px]'
        buttonStyle='px-[20px] py-[8px]'
        iconSize='w-[50px] h-[50px] mobile:w-[40px] mobile:h-[40px]'
        iconTextGap='gap-[10px]'
      />
    );

  return <MyProfile profileData={profileData} upLoadImgFile={upLoadImgFile} upLoadUserData={upLoadUserData} />;
}
