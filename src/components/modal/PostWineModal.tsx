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

    if (!name || !region || !image || !price || !type) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }

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
      <Button
        onClick={openModal}
        text='와인 등록하기'
        className='rounded-2xl px-[98.5px] py-3 text-lg tablet:px-[66.5px] tablet:py-[11px] mobile:mx-auto mobile:w-full mobile:min-w-[343px] mobile:rounded-xl mobile:py-3'
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={`min-w-[375px] rounded-2xl transition-transform mobile:fixed mobile:bottom-0 mobile:left-0 mobile:mb-0 mobile:w-full mobile:rounded-b-none ${
          isOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <div className='flex flex-col gap-6 p-6 mobile:gap-4'>
          <p className='text-2xl font-bold text-gray-800 mobile:text-xl'>와인 등록</p>
          <form onSubmit={handleSubmit(handlePostWine)}>
            <div className='flex flex-col gap-6 mobile:gap-4'>
              <div className='flex flex-col gap-3 mobile:gap-[12px]'>
                <label htmlFor='wineName' className='text-lg font-bold text-gray-800 mobile:text-md'>
                  와인 이름
                </label>
                <input
                  type='text'
                  id='wineName'
                  placeholder='와인 이름 입력'
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
              <Button text='취소' variant='lightPurple' onClick={closeModal} />
              <Button text='와인 등록하기' type='submit' variant='primary' className='w-[294px] rounded-xl py-[16px] text-lg mobile:flex-1' />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
