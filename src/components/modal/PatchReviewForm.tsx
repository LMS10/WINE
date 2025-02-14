'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchWithAuth } from '@/lib/auth';
import Button from '@/components/Button';
import close from '@/assets/icons/close.svg';
import wineIcon from '@/assets/icons/wine.svg';
import InteractiveRating from '../InteractiveRating';
import ControlBar from '../ControlBar';
import { MyReview } from '@/types/review-data';
// import { EditReviewData } from '@/app/(with-header)/myprofile/_components/MyReviewListContainer';

export interface EditReviewData {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

interface FormValues {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

type aroma = {
  key: string;
  name: string;
};

const aromas: aroma[] = [
  { key: 'CHERRY', name: '체리' },
  { key: 'BERRY', name: '베리' },
  { key: 'OAK', name: '오크' },
  { key: 'VANILLA', name: '바닐라' },
  { key: 'PEPPER', name: '후추' },
  { key: 'BAKING', name: '제빵' },
  { key: 'GRASS', name: '풀' },
  { key: 'APPLE', name: '사과' },
  { key: 'PEACH', name: '복숭아' },
  { key: 'CITRUS', name: '시트러스' },
  { key: 'TROPICAL', name: '트로피컬' },
  { key: 'MINERAL', name: '미네랄' },
  { key: 'FLOWER', name: '꽃' },
  { key: 'TOBACCO', name: '담뱃잎' },
  { key: 'EARTH', name: '흙' },
  { key: 'CHOCOLATE', name: '초콜릿' },
  { key: 'SPICE', name: '스파이스' },
  { key: 'CARAMEL', name: '카라멜' },
  { key: 'LEATHER', name: '가죽' },
];

interface postReviewPorp {
  name: string;
  id: number;
  onClose: () => void;
  reviewInitialData?: MyReview;
  editMyReview?: (id: number, editReviewData: EditReviewData, updatedAt: string) => void;
}

export default function PatchReviewForm({ name, id, onClose, reviewInitialData, editMyReview }: postReviewPorp) {
  const [selectedAroma, setSelectedAroma] = useState<string[]>(reviewInitialData?.aroma || []);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      lightBold: reviewInitialData?.lightBold || 0,
      smoothTannic: reviewInitialData?.smoothTannic || 0,
      drySweet: reviewInitialData?.drySweet || 0,
      softAcidic: reviewInitialData?.softAcidic || 0,
    },
  });

  const aromaValue = watch('aroma', reviewInitialData?.aroma || []);
  const ratingValue = watch('rating', reviewInitialData?.rating || 0);
  const textValue = watch('content', reviewInitialData?.content || '');

  const handleAromaClick = (aroma: string) => {
    setSelectedAroma((prevSelectedAroma) => (prevSelectedAroma.includes(aroma) ? prevSelectedAroma.filter((a) => a !== aroma) : [...prevSelectedAroma, aroma]));
  };

  const handleLightBoldChange = (newValue: number) => {
    setValue('lightBold', newValue);
  };
  const handleSmoothTannicChange = (newValue: number) => {
    setValue('smoothTannic', newValue);
  };
  const handleDrySweetChange = (newValue: number) => {
    setValue('drySweet', newValue);
  };
  const handleSoftAcidicChange = (newValue: number) => {
    setValue('softAcidic', newValue);
  };

  const handlePatchReviewWine: SubmitHandler<FormValues> = async (data) => {
    const { rating, lightBold, smoothTannic, drySweet, softAcidic, aroma, content, wineId } = data;

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, lightBold, smoothTannic, drySweet, softAcidic, aroma, content, wineId }),
      });

      if (!response?.ok || response === null) return alert('리뷰 수정에 실패했습니다');

      const body = await response.json();
      if (body) {
        if (editMyReview) {
          const now: string = new Date().toISOString();
          editMyReview(id, data, now);
        }
        onClose();
      }
    } catch (error) {
      console.error('리뷰 수정 에러:', error);
      console.log(data);
    }
  };

  useEffect(() => {
    setValue('aroma', selectedAroma);
  }, [selectedAroma, setValue]);

  return (
    <div className='flex w-full flex-col gap-12 p-6 pc:w-[528px] tablet:w-[528px] mobile:h-[762px] mobile:w-full mobile:gap-10 mobile:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-800 mobile:text-xl'>수정하기</h1>
        <button type='button' onClick={onClose}>
          <Image src={close} width={34} height={34} className='mobile:h-[24px] mobile:w-[24px]' alt='창 닫기'></Image>
        </button>
      </div>
      <form onSubmit={handleSubmit(handlePatchReviewWine)}>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-4'>
              <Image src={wineIcon} alt='와인 이미지' className='h-[68px] w-[68px] rounded-lg bg-gray-100 p-[7px] mobile:h-[67px] mobile:w-[67px]' />
              <div className='flex flex-col gap-2'>
                <p className='text-2lg font-semibold text-gray-800 mobile:text-lg'>{name}</p>
                <InteractiveRating initialValue={reviewInitialData?.rating || 0} size='large' onChange={(rate) => setValue('rating', rate)} />
              </div>
            </div>
            <textarea
              placeholder='후기를 작성해 주세요'
              defaultValue={reviewInitialData?.content}
              className='h-[120px] resize-none rounded-2xl border border-gray-100 px-5 py-[14px] align-text-top placeholder:text-lg placeholder:font-normal placeholder:text-gray-500 focus:outline-purple-100 pc:h-[120px] pc:w-[480px] mobile:h-[100px] mobile:w-auto mobile:rounded-xl placeholder:mobile:text-md'
              {...register('content')}
            />
          </div>
          <div className='flex h-[212px] flex-col gap-6 mobile:h-[194px]'>
            <h4 className='text-xl font-bold text-gray-800 mobile:text-2lg'>와인의 맛은 어땠나요?</h4>
            <div>
              <ControlBar
                label='바디감'
                minLabel={'가벼워요'}
                maxLabel={'진해요'}
                value={reviewInitialData?.lightBold || 0}
                onChange={handleLightBoldChange}
                name='바디감'
                isDraggable={true}
                size='small'
              />
              <ControlBar
                label='타닌'
                minLabel={'부드러워요'}
                maxLabel={'떫어요'}
                value={reviewInitialData?.smoothTannic || 0}
                onChange={handleSmoothTannicChange}
                name='타닌'
                isDraggable={true}
                size='small'
              />
              <ControlBar
                label='당도'
                minLabel={'드라이해요'}
                maxLabel={'달아요'}
                value={reviewInitialData?.drySweet || 0}
                onChange={handleDrySweetChange}
                name='당도'
                isDraggable={true}
                size='small'
              />
              <ControlBar
                label='산미'
                minLabel={'안셔요'}
                maxLabel={'많이셔요'}
                value={reviewInitialData?.softAcidic || 0}
                onChange={handleSoftAcidicChange}
                name='산미'
                isDraggable={true}
                size='small'
              />
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <h4 className='text-xl font-bold text-gray-800 mobile:text-2lg'>기억에 남는 향이 있나요?</h4>
            <div className='flex flex-wrap gap-[10px]'>
              {aromas.map((aroma) => (
                <button
                  key={aroma.key}
                  type='button'
                  onClick={() => handleAromaClick(aroma.key)}
                  className={`rounded-full border border-gray-300 px-[18px] py-[10px] font-medium mobile:px-[10px] mobile:py-[6px] mobile:text-md ${selectedAroma.includes(aroma.key) ? 'border border-purple-100 bg-purple-100 text-white' : 'border border-gray-300 bg-white text-gray-800'}`}
                >
                  {aroma.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button
          text='수정하기'
          type='submit'
          variant='primary'
          disabled={aromaValue.length === 0 || ratingValue === 0 || !textValue.trim()}
          className='mt-12 h-[54px] w-auto whitespace-nowrap rounded-xl text-center text-lg disabled:bg-gray-400 pc:w-[480px] pc:px-[203.5px] pc:py-[14px] tablet:w-[480px] mobile:mb-8 mobile:w-full mobile:min-w-[300px]'
        />
      </form>
    </div>
  );
}
