'use client';

import ProfileImg from '@/components/ProfileImg';
import Button from '@/components/Button';
import { fetchWithAuth } from '@/lib/auth';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import photoIcon from '@/assets/icons/photo.svg';

interface MyProfileData {
  id: number;
  image: string;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export function MyProfile({
  profileData,
  upLoadImgFile,
  upLoadUserData,
}: {
  profileData: MyProfileData;
  upLoadImgFile: (formdata: FormData) => Promise<string | undefined>;
  upLoadUserData: (image: string, nickname: string) => Promise<string | undefined>;
}) {
  const [nickNameValue, setNickNameValue] = useState(profileData.nickname);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [previewImg, setPreviewImg] = useState(profileData.image);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const nickNameRef = useRef(nickNameValue);
  const previewImgRef = useRef(previewImg);

  const handleNickNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickNameValue(e.target.value);
    nickNameRef.current = e.target.value;
  };

  const onClickEditButton = () => {
    setIsButtonDisable(false);
  };

  const onClickUploadButton = async () => {
    if (!file) {
      setIsButtonDisable(true);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const imgResult = await upLoadImgFile(formData);
    if (!imgResult) return;
    setPreviewImg(imgResult);
    previewImgRef.current = imgResult;

    const UserResult = await upLoadUserData(previewImgRef.current, nickNameRef.current);
    if (!UserResult) return;
    URL.createObjectURL(file);
    setFile(null);
    setIsButtonDisable(true);
  };

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const value = e.target.files[0];
    setFile(value);
    const nextImg = URL.createObjectURL(value);
    setPreviewImg(nextImg);
  };

  useEffect(() => {}, []);

  return (
    <div className='flex h-[530px] w-[280px] flex-col items-center justify-between rounded-[16px] border border-gray-300 px-[20px] py-[39px] shadow-drop tablet:h-[247px] tablet:w-full tablet:px-[40px] tablet:py-[23px] mobile:h-[241px] mobile:p-[20px]'>
      <div className='flex w-full flex-col items-center justify-center gap-[32px] tablet:flex-row tablet:justify-start mobile:gap-[16px]'>
        {isButtonDisable ? (
          <ProfileImg src={previewImg} size='large' />
        ) : (
          <label htmlFor='profileImg' className='relative h-[164px] w-[164px] cursor-pointer rounded-full tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'>
            <ProfileImg src={previewImg} size='large' />
            <div className='absolute left-1/2 top-1/2 flex h-[164px] w-[164px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-100 opacity-30 tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'></div>
            <Image className='absolute left-1/2 top-1/2 z-10 h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2' src={photoIcon} alt='사진 로고' />
            <input id='profileImg' type='file' hidden accept='image/png, image/jpeg' ref={fileInputRef} onChange={handleChangeFileInput} />
          </label>
        )}
        <div className='flex flex-col gap-[16px] tablet:gap-[8px] mobile:gap-[4px]'>
          <h1 className='flex justify-center text-2xl font-bold text-gray-800 tablet:justify-start mobile:text-xl'>{nickNameValue}</h1>
          {/* <p className='flex justify-center text-lg font-normal text-gray-500 tablet:justify-start mobile:text-md'>wanda@email.com</p> */}
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
            disabled={isButtonDisable}
            className={`flex h-[48px] w-full rounded-2xl border border-gray-300 pl-5 text-lg font-normal focus:outline-purple-100 mobile:h-[42px] mobile:text-md ${isButtonDisable ? `text-gray-500` : `text-gray-800`}`}
            onChange={handleNickNameInput}
            value={nickNameValue}
          />
        </div>
        <div className='flex flex-row-reverse tablet:items-end'>
          {isButtonDisable ? (
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

      if (!response) throw new Error('API 요청 실패: 응답이 없습니다.');
      if (!response.ok) throw new Error('업로드 실패');

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

      if (!response) throw new Error('API 요청 실패: 응답이 없습니다.');
      if (!response.ok) throw new Error('프로필 적용 실패');

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

  if (!profileData) return;

  return <MyProfile profileData={profileData} upLoadImgFile={upLoadImgFile} upLoadUserData={upLoadUserData} />;
}
