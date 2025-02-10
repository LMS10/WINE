'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchWithAuth } from '@/lib/auth';
import Modal from '@/components/modal/Modal';
import Dropdown from '../Dropdown';
import Button from '../Button';
import camera from '@/assets/icons/photo.svg';

interface FormValues {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

type ImageValues = { image: FileList };

export default function PostWineModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const options = [
    { value: () => setValue('type', 'RED'), label: 'Red' },
    { value: () => setValue('type', 'WHITE'), label: 'White' },
    { value: () => setValue('type', 'SPARKLING'), label: 'Sparkling' },
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePostWine: SubmitHandler<FormValues> = async (data) => {
    const { name, region, image, price, type } = data;

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, region, image, price: Number(price), type }),
      });

      if (!response?.ok || response === null) {
        throw new Error('와인 등록에 실패했습니다');
      }

      const body = await response.json();
      router.push(`/wines/${body.id}`);
    } catch (error) {
      console.error('와인 등록 에러:', error);
      console.log(data);
    }
  };

  async function postImageApi(data: ImageValues) {
    const { image } = data;
    const formData = new FormData();
    formData.append('image', image[0]);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, { method: 'POST', body: formData });

      if (!response?.ok || response === null) {
        throw new Error('Failed to upload image');
      }

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
    <div>
      <Button onClick={openModal} text='와인 등록하기' className='flex h-[50px] w-[284px] items-center justify-center rounded-2xl text-center text-lg' />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='min-w-[375px] rounded-2xl mobile:mb-0 mobile:rounded-b-none'>
        <div className='flex h-[871px] w-[460px] flex-col gap-10 p-6 mobile:h-[762px] mobile:w-[375px] mobile:gap-8'>
          <h1 className='text-2xl font-bold text-gray-800 mobile:text-xl'>와인 등록</h1>
          <form onSubmit={handleSubmit(handlePostWine)}>
            <div className='flex flex-col gap-8 mobile:gap-6'>
              <div className='flex h-[90px] w-[412px] flex-col justify-between mobile:h-[80px] mobile:w-[327px]'>
                <label htmlFor='wineName' className='text-lg font-medium text-gray-800 mobile:text-md'>
                  와인 이름
                </label>
                <input
                  type='text'
                  id='wineName'
                  placeholder='와인 이름 입력'
                  className='mobile: h-[48px] w-[412px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-md mobile:h-[42px] mobile:w-[327px]'
                  {...register('name')}
                />
              </div>
              <div className='flex h-[90px] w-[412px] flex-col justify-between mobile:h-[80px] mobile:w-[327px]'>
                <label htmlFor='price' className='text-lg font-medium text-gray-800 mobile:text-md'>
                  가격
                </label>
                <input
                  type='number'
                  id='price'
                  placeholder='가격 입력'
                  className='mobile: h-[48px] w-[412px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-md mobile:h-[42px] mobile:w-[327px]'
                  {...register('price')}
                />
              </div>
              <div className='flex h-[90px] w-[412px] flex-col justify-between mobile:h-[80px] mobile:w-[327px]'>
                <label htmlFor='origin' className='text-lg font-medium text-gray-800 mobile:text-md'>
                  원산지
                </label>
                <input
                  type='text'
                  id='origin'
                  placeholder='원산지 입력'
                  className='mobile: h-[48px] w-[412px] rounded-2xl border border-gray-300 bg-white px-5 py-[14px] text-md mobile:h-[42px] mobile:w-[327px]'
                  {...register('region')}
                />
              </div>
              <div className='flex h-[90px] w-[412px] flex-col justify-between mobile:h-[80px] mobile:w-[327px]'>
                <label htmlFor='type' className='text-lg font-medium text-gray-800 mobile:text-md'>
                  타입
                </label>
                <Dropdown
                  options={options}
                  onSelect={(option) => {
                    option.value?.();
                  }}
                  placeholder='Red'
                  changeButton
                />
                <input type='hidden' {...register('type')} />
              </div>
              <div className='items -my-[3px] flex h-[182px] w-[140px] flex-col justify-between mobile:h-[158px] mobile:w-[120px]'>
                <label htmlFor='image' className='text-lg font-medium text-gray-800 mobile:text-md'>
                  와인 사진
                </label>
                <button
                  type='button'
                  className='relative flex h-[140px] w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-gray-300 mobile:h-[120px] mobile:w-[120px]'
                >
                  {preview ? (
                    <Image src={preview} alt='preview' fill className='h-[140px] w-[140px] object-contain mobile:h-[120px] mobile:w-[120px]' />
                  ) : (
                    <Image src={camera} alt='camera' width={27} height={24} />
                  )}
                  <input id='image' type='file' className='absolute left-0 scale-[5] cursor-pointer opacity-0' onChange={handleFileChange} />
                </button>
              </div>
            </div>
            <div className='mt-10 flex h-[54px] w-[412px] justify-between mobile:w-[327px]'>
              <Button text='취소' onClick={closeModal} variant='lightPurple' className='flex h-[54px] w-[108px] items-center justify-center px-0 py-0 mobile:w-[96px]' />
              <Button text='와인 등록하기' type='submit' variant='primary' className='h-[54px] w-[294px] rounded-xl text-lg mobile:w-[223px]' />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
