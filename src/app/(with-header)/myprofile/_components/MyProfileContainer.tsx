'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MyProfile, MyProfileData } from '@/app/(with-header)/myprofile/_components/MyProfile';
import Refresh from '@/components/Refresh';
import { fetchUploadUser, fetchUser } from '@/lib/fetchUser';
import { fetchImage } from '@/lib/fetchImage';
import MyProfileSkeleton from './skeleton/MyProfileSkeleton';

export default function MyProfileContainer() {
  const [profileData, setProfileData] = useState<MyProfileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getUserData = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchUser();
      setProfileData(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const upLoadImgFile = async (formData: FormData): Promise<string | undefined> => {
    try {
      const data = await fetchImage(formData);
      return data;
    } catch (e) {
      if (e) {
        toast.error('이미지 업로드에 실패했습니다.');
      }
    }
  };

  const upLoadUserData = async (image: string, nickname: string): Promise<string | undefined> => {
    try {
      const result = await fetchUploadUser(image, nickname);
      if (!result) return;
      toast.success('프로필 수정에 성공했습니다.');
      return result;
    } catch (e) {
      if (e) {
        toast.error('프로필 수정에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return <MyProfileSkeleton />;

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
