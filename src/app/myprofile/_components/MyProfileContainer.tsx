'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import photoIcon from '@/assets/icons/photo.svg';
import ProfileImg from '@/components/ProfileImg';
import Button from '@/components/Button';
import { fetchWithAuth } from '@/lib/auth';
import profileDefault from '@/assets/icons/profile_default.svg';

interface MyProfileData {
  id: number;
  image: string;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

interface MuProfileProps {
  profileData: MyProfileData;
  upLoadImgFile: (formData: FormData) => Promise<string | undefined>;
  upLoadUserData: (image: string, nickname: string) => Promise<string | undefined>;
}

export function MyProfile({ profileData, upLoadImgFile, upLoadUserData }: MuProfileProps) {
  const [isDisableProfile, setIsDisableProfile] = useState(true);
  const [nickNameValue, setNickNameValue] = useState(profileData.nickname);
  const [preNickName, setPreNickName] = useState(profileData.nickname);
  const [profileImg, setProfileImg] = useState(profileData.image);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const fileInputRef = useRef(null);
  const nickNameRef = useRef(nickNameValue);
  const profileImgRef = useRef(profileImg);

  const handleNickNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickNameValue(e.target.value);
    nickNameRef.current = e.target.value;
  };

  const onClickEditButton = () => {
    setIsDisableProfile(false);
  };

  const onClickUploadButton = async () => {
    if (!fileInput && nickNameValue === preNickName) {
      setIsDisableProfile(true);
      return;
    } else if (fileInput) {
      const formData = new FormData();
      formData.append('image', fileInput);

      const imgResult = await upLoadImgFile(formData);
      if (!imgResult) return;
      setProfileImg(imgResult);
      profileImgRef.current = imgResult;
    }
    const UserResult = await upLoadUserData(profileImgRef.current, nickNameRef.current);
    if (!UserResult) return;
    setPreNickName(nickNameRef.current);
    URL.revokeObjectURL(profileImg);
    setFileInput(null);
    setIsDisableProfile(true);
  };

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const value = e.target.files[0];
    setFileInput(value);
    const nextImg = URL.createObjectURL(value);
    setProfileImg(nextImg);
  };

  return (
    <div className='flex h-[530px] w-[280px] flex-col items-center justify-between rounded-[16px] border border-gray-300 px-[20px] py-[39px] shadow-drop tablet:h-[247px] tablet:w-full tablet:px-[40px] tablet:py-[23px] mobile:h-[241px] mobile:p-[20px]'>
      <div className='flex w-full flex-col items-center justify-center gap-[32px] tablet:flex-row tablet:justify-start mobile:gap-[16px]'>
        {isDisableProfile ? (
          <ProfileImg src={profileImg || profileDefault} size='large' />
        ) : (
          <label htmlFor='profileImg' className='relative h-[164px] w-[164px] cursor-pointer rounded-full tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'>
            <ProfileImg src={profileImg || profileDefault} size='large' />
            <div className='absolute left-1/2 top-1/2 flex h-[164px] w-[164px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-100 opacity-30 tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'></div>
            <Image className='absolute left-1/2 top-1/2 z-10 h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2' src={photoIcon} alt='사진 로고' />
            <input id='profileImg' type='file' hidden accept='image/png, image/jpeg' ref={fileInputRef} onChange={handleChangeFileInput} />
          </label>
        )}
        <div className='flex flex-col gap-[16px] tablet:gap-[8px] mobile:gap-[4px]'>
          <h1 className='flex justify-center text-2xl font-bold text-gray-800 tablet:justify-start mobile:text-xl'>{preNickName}</h1>
        </div>
      </div>
      <div className='flex w-full flex-col justify-center gap-[8px] tablet:flex-row tablet:gap-[24px] mobile:flex-col mobile:gap-[6px]'>
        <div className='flex flex-col gap-[10px] tablet:flex-grow mobile:gap-[8px]'>
          <label htmlFor='nickname' className='text-lg font-medium text-gray-800 mobile:text-md'>
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            disabled={isDisableProfile}
            className={`flex h-[48px] w-full rounded-2xl border border-gray-300 pl-5 text-lg font-normal focus:outline-purple-100 mobile:h-[42px] mobile:text-md ${isDisableProfile ? `text-gray-500` : `text-gray-800`}`}
            onChange={handleNickNameInput}
            value={nickNameValue}
          />
        </div>
        <div className='flex flex-row-reverse tablet:items-end'>
          {isDisableProfile ? (
            <Button
              text='변경하기'
              onClick={onClickEditButton}
              className='rounded-[12px] px-[20px] py-[8px] text-lg tablet:px-[30px] tablet:py-[11px] mobile:px-[20px] mobile:py-[9px] mobile:text-md'
            />
          ) : (
            <Button
              text='적용하기'
              onClick={onClickUploadButton}
              className='rounded-[12px] px-[20px] py-[8px] text-lg tablet:px-[30px] tablet:py-[11px] mobile:px-[20px] mobile:py-[9px] mobile:text-md'
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyProfileContainer() {
  const [profileData, setProfileData] = useState<MyProfileData>();

  const getUserData = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);

      if (!response?.ok || response === null) {
        return;
      }

      const data: MyProfileData = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
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
      console.error('이미지 에러 발생:', error);
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

      if (!response?.ok || response === null) {
        return;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('프로필 에러 발생', error);
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!profileData) return <div>로딩중...</div>;

  return <MyProfile profileData={profileData} upLoadImgFile={upLoadImgFile} upLoadUserData={upLoadUserData} />;
}
