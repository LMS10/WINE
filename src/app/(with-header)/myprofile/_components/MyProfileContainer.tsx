'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/auth';
import { MyProfile, MyProfileData } from './MyProfile';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function MyProfileContainer() {
  const [profileData, setProfileData] = useState<MyProfileData>();
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);

      if (!response?.ok || response === null) {
        return;
      }

      const data: MyProfileData = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('유저 정보를 불러오는 중 문제가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upLoadImgFile = async (formData: FormData): Promise<string | undefined> => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response?.ok || response === null) {
        return;
      }

      const data = await response.json();
      return data.url as string;
    } catch (error) {
      console.error('이미지 업로드 중 문제가 발생했습니다:', error);
      return;
    }
  };

  const upLoadUserData = async (image: string, nickname: string): Promise<string | undefined> => {
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
        return;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('프로필 업로드 중 문제가 발생했습니다:', error);
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return <LoadingSpinner className='h-[530px] w-[280px] rounded-[16px] border border-gray-300 shadow-drop tablet:h-[247px] tablet:w-full mobile:h-[241px]' />;

  if (!profileData) return <div></div>;

  return <MyProfile profileData={profileData} upLoadImgFile={upLoadImgFile} upLoadUserData={upLoadUserData} />;
}
