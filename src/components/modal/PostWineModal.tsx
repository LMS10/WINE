'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { fetchWithAuth } from '@/lib/auth';
import Modal from '@/components/modal/Modal';
import Dropdown from '../Dropdown';
import Button from '../Button';
import { toast } from 'react-toastify';
import camera from '@/assets/icons/photo.svg';
import FormInput from './ModalFormInput';

interface FormValues {
  name: string;
  region: string;
  image: string;
  price: number | null;
  type: string;
}

type ImageValues = { image: FileList };

export default function PostWineModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownReset, setDropdownReset] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const { handleSubmit, setValue, watch, reset, control } = useForm<FormValues>({
    defaultValues: { name: '', region: '', price: null, type: '' },
  });
  const name = watch('name');
  const region = watch('region');
  const image = watch('image');
  const price = watch('price');
  const type = watch('type');

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
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, price: Number(data.price) }),
      });

      if (!response?.ok) {
        throw new Error('와인 등록에 실패했습니다');
      }

      const body = await response.json();
      toast.success('와인이 등록되었습니다.');
      router.push(`/wines/${body.id}`);
    } catch (error) {
      console.error('와인 등록 실패:', error);
      toast.error('와인 등록에 실패했습니다.');
      closeModal();
    }
  };

  async function postImageApi(data: ImageValues) {
    const { image } = data;
    const formData = new FormData();
    formData.append('image', image[0]);

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response?.ok) {
        throw new Error('이미지 업로드에 실패했습니다');
      }

      const uploadResult = await response.json();
      return uploadResult.url;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageUrl = await postImageApi({ image: files });
    if (imageUrl) {
      setValue('image', imageUrl);
      setPreview(imageUrl);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      setDropdownReset((prev) => !prev);
      setPreview(null);
    }
  }, [isOpen, reset]);

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
        <div className='custom-scrollbar max-h-[90vh] overflow-y-auto'>
          <div className='flex flex-col gap-6 p-6 mobile:gap-4'>
            <p className='text-2xl font-bold text-gray-800 mobile:text-xl'>와인 등록</p>
            <form onSubmit={handleSubmit(handlePostWine)}>
              <div className='flex flex-col gap-6 mobile:gap-4'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => <FormInput {...field} label='와인 이름' placeholder='와인 이름 입력' type='text' inputId='wineName' value={field.value || ''} />}
                />

                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      label='가격'
                      placeholder='가격 입력 (200만원 이하)'
                      type='text'
                      inputId='price'
                      value={field.value?.toLocaleString() || ''}
                      onChange={(e) => {
                        const rawValue = e.target.value.replaceAll(',', '');

                        if (rawValue === '') {
                          field.onChange(null);
                          return;
                        }

                        if (!/^\d*$/.test(rawValue)) return;

                        const numericValue = Number(rawValue);

                        if (numericValue > 2000000) {
                          alert('가격은 200만원 이하로 입력해 주세요.');
                          return;
                        }

                        field.onChange(numericValue);
                      }}
                    />
                  )}
                />

                <Controller
                  name='region'
                  control={control}
                  render={({ field }) => <FormInput {...field} label='원산지' placeholder='원산지 입력' type='text' inputId='origin' value={field.value || ''} />}
                />

                <div className='flex flex-col gap-3 mobile:gap-[12px]'>
                  <label htmlFor='type' className='text-lg font-bold text-gray-800 mobile:text-md'>
                    타입
                  </label>
                  <Dropdown options={options} onSelect={(option) => option.value?.()} placeholder='Red' changeButton reset={dropdownReset} />
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
                      <Image src={preview} alt='preview' fill sizes='10vw' className='object-contain' />
                    ) : (
                      <Image src={camera} alt='camera' width={32} height={32} className='h-[32px] w-[32px]' />
                    )}
                    <input id='image' type='file' className='absolute left-0 scale-[5] cursor-pointer opacity-0' onChange={handleFileChange} />
                  </button>
                </div>
              </div>

              <div className='mt-10 flex gap-[10px] mobile:gap-2'>
                <Button text='취소' variant='lightPurple' onClick={closeModal} />
                <Button
                  text='와인 등록하기'
                  type='submit'
                  variant='primary'
                  disabled={!name || !region || !image || !price || !type}
                  className='w-[294px] rounded-xl py-[16px] text-lg disabled:bg-gray-400 mobile:flex-1'
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
