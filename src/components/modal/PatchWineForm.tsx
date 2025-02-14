'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchWithAuth } from '@/lib/auth';
import Dropdown from '../Dropdown';
import Button from '../Button';
import camera from '@/assets/icons/photo.svg';
import { WineDataProps } from '@/app/(with-header)/myprofile/_components/MyWIneKebabDropDown ';

interface FormValues {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

type ImageValues = { image: FileList };

interface postWinePorps {
  onClose: () => void;
  id: string;
  wineInitialData: WineDataProps;
  editMyWine: (id: number, editWineData: WineDataProps) => void;
}

export default function PatchWineForm({ onClose, id, wineInitialData, editMyWine }: postWinePorps) {
  const [preview, setPreview] = useState<string | null>(wineInitialData.image);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const options = [
    { value: () => setValue('type', 'RED'), label: 'Red' },
    { value: () => setValue('type', 'WHITE'), label: 'White' },
    { value: () => setValue('type', 'SPARKLING'), label: 'Sparkling' },
  ];

  const handlePatchWine: SubmitHandler<FormValues> = async (data) => {
    const { name, region, image, price, type } = data;

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, region, image, price: Number(price), type }),
      });

      if (!response?.ok || response === null) return alert('와인 수정에 실패했습니다');

      const body = await response.json();
      editMyWine(body.id, { ...data, type: data.type as 'RED' | 'WHITE' | 'SPARKLING' });
      router.push(`/wines/${body.id}`);
    } catch (error) {
      console.error('와인 수정 에러:', error);
      console.log(data);
    }
  };

  async function postImageApi(data: ImageValues) {
    const { image } = data;
    const formData = new FormData();
    formData.append('image', image[0]);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, { method: 'POST', body: formData });

      if (!response?.ok || response === null) return alert('이미지 업로드에 실패했습니다');

      const uploadResult = await response.json();
      return uploadResult.url;
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files;
    if (!image) return;
    const imageUrl = await postImageApi({ image });
    setValue('image', `${imageUrl}`);
    setPreview(imageUrl);
  };

  return (
    <div className='flex flex-col gap-6 p-6 mobile:gap-4'>
      <p className='text-2xl font-bold text-gray-800 mobile:text-xl'>내가 등록한 와인</p>
      <form onSubmit={handleSubmit(handlePatchWine)}>
        <div className='flex flex-col gap-6 mobile:gap-4'>
          <div className='flex flex-col gap-3 mobile:gap-[12px]'>
            <label htmlFor='wineName' className='text-lg font-bold text-gray-800 mobile:text-md'>
              와인 이름
            </label>
            <input
              type='text'
              id='wineName'
              placeholder='와인 이름 입력'
              defaultValue={wineInitialData.name}
              className='h-[48px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-lg focus:outline-purple-100 mobile:h-[42px] mobile:rounded-xl'
              {...register('name')}
            />
          </div>

          <div className='flex flex-col gap-3 mobile:gap-[12px]'>
            <label htmlFor='price' className='text-lg font-bold text-gray-800 mobile:text-md'>
              가격
            </label>
            <input
              type='number'
              id='price'
              placeholder='가격 입력 (200만원 이하)'
              defaultValue={wineInitialData.price}
              className='h-[48px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-lg focus:outline-purple-100 mobile:h-[42px] mobile:rounded-xl'
              {...register('price')}
            />
          </div>

          <div className='flex flex-col gap-3 mobile:gap-[12px]'>
            <label htmlFor='origin' className='text-lg font-bold text-gray-800 mobile:text-md'>
              원산지
            </label>
            <input
              type='text'
              id='origin'
              placeholder='원산지 입력'
              defaultValue={wineInitialData.region}
              className='h-[48px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-lg focus:outline-purple-100 mobile:h-[42px] mobile:rounded-xl'
              {...register('region')}
            />
          </div>

          <div className='flex flex-col gap-3 mobile:gap-[12px]'>
            <label htmlFor='type' className='text-lg font-bold text-gray-800 mobile:text-md'>
              타입
            </label>
            <Dropdown
              options={options}
              onSelect={(option) => {
                option.value?.();
              }}
              placeholder='Red'
              changeButton
              defaultValue={{ label: wineInitialData.type, value: () => {} }}
            />
          </div>

          <div className='-my-[5px] flex flex-col gap-3 mobile:gap-[12px]'>
            <label htmlFor='image' className='text-lg font-bold text-gray-800 mobile:text-md'>
              와인 사진
            </label>
            <button
              type='button'
              className='relative flex h-[140px] w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-gray-300 mobile:h-[120px] mobile:w-[120px]'
            >
              {preview ? (
                <Image src={preview} alt='preview' fill sizes='10vw' className='h-[140px] w-[140px] object-contain mobile:h-[120px] mobile:w-[120px]' />
              ) : (
                <Image src={camera} alt='camera' width={32} height={32} className='h-[32px] w-[32px]' />
              )}
              <input id='image' type='file' className='absolute left-0 scale-[5] cursor-pointer opacity-0' onChange={handleFileChange} />
            </button>
          </div>
        </div>

        <div className='mt-10 flex gap-[10px] mobile:gap-2'>
          <Button text='취소' variant='lightPurple' onClick={onClose} />
          <Button text='수정하기' type='submit' variant='primary' className='w-[294px] rounded-xl py-[16px] text-lg mobile:flex-1' />
        </div>
      </form>
    </div>
  );
}
