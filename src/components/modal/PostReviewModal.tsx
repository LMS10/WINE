'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchWithAuth } from '@/lib/auth';
import Modal from '@/components/modal/Modal';
import Button from '@/components/Button';
import close from '@/assets/icons/close.svg';
import wineIcon from '@/assets/icons/wine.svg';
import InteractiveRating from '../InteractiveRating';
import ControlBar from '../ControlBar';
import { AddReviewData } from '@/types/review-data';
import { toast } from 'react-toastify';

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

interface wineDataValues {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
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

const INICIALVALUES = {
  id: 0,
  name: '',
  region: '',
  image: '',
  price: 0,
  type: '',
};

export default function PostReviewModal({ addReview }: { addReview: (newReview: AddReviewData) => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wineData, setWineData] = useState<wineDataValues>(INICIALVALUES);
  const [selectedAroma, setSelectedAroma] = useState<string[]>([]);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      lightBold: 0,
      smoothTannic: 0,
      drySweet: 0,
      softAcidic: 0,
    },
  });

  const aromaValue = watch('aroma', []);
  const ratingValue = watch('rating', 0);
  const textValue = watch('content', '');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAroma([]);
    setResetTrigger((prev) => !prev);
    reset({
      rating: 0,
      lightBold: 0,
      smoothTannic: 0,
      drySweet: 0,
      softAcidic: 0,
      aroma: [],
      content: '',
      wineId: wineData.id,
    });
    setIsOpen(false);
  };

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

  const handlePostReviewWine: SubmitHandler<FormValues> = async (data) => {
    const { rating, lightBold, smoothTannic, drySweet, softAcidic, aroma, content, wineId } = data;

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, lightBold, smoothTannic, drySweet, softAcidic, aroma, content, wineId }),
      });

      if (!response?.ok || response === null) {
        alert('리뷰 등록에 실패했습니다.');
        throw new Error('리뷰 등록에 실패했습니다');
      }

      const body = await response.json();
      if (body) {
        const newReview: AddReviewData = {
          reviewId: body.id,
          rating,
          lightBold,
          smoothTannic,
          drySweet,
          softAcidic,
          aroma,
          content,
          user: {
            id: body.user.id,
            nickname: body.user.nickname,
            image: body.user.image,
          },
          wineId,
          wineName: wineData.name,
        };
        addReview(newReview);
        setResetTrigger((prev) => !prev);
        reset({
          rating: 0,
          lightBold: 0,
          smoothTannic: 0,
          drySweet: 0,
          softAcidic: 0,
          aroma: [],
          content: '',
          wineId: wineData.id,
        });
        setSelectedAroma([]);
        setIsOpen(false);
        toast.success('리뷰 등록에 성공했습니다.');
      }
    } catch (error) {
      alert('로그인이 만료되었습니다. 로그인 후, 다시 시도해 주세요.');
      console.error('리뷰 등록 에러:', error);
      router.push('/signin');
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, { method: 'GET' });

        if (!response?.ok || response === null) {
          throw new Error('와인 데이터 요청에 실패했습니다');
        }

        const data = await response.json();
        setWineData(data);
      } catch (error) {
        console.error('와인 데이터 요청 에러:', error);
      }
    };
    const numericId: number = parseInt(id, 10);
    setValue('wineId', numericId);
    fetchReviews();
  }, [id, setValue]);

  useEffect(() => {
    setValue('aroma', selectedAroma);
  }, [selectedAroma, setValue]);

  return (
    <div>
      <Button text='리뷰 남기기' onClick={openModal} variant='primary' className='rounded-xl px-[20px] py-[8px] text-lg font-bold mobile:px-[18px] mobile:text-md' />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={`overflow-x-hidden rounded-2xl mobile:mb-0 mobile:h-[930px] mobile:rounded-b-none ${
          isOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <div className='flex w-full flex-col gap-12 p-6 pc:w-[528px] tablet:w-[528px] mobile:h-[762px] mobile:w-full mobile:gap-10 mobile:py-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-gray-800 mobile:text-xl'>리뷰 등록</h1>
            <button type='button' onClick={closeModal}>
              <Image src={close} width={34} height={34} className='mobile:h-[24px] mobile:w-[24px]' alt='창 닫기'></Image>
            </button>
          </div>
          <form onSubmit={handleSubmit(handlePostReviewWine)}>
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col gap-6'>
                <div className='flex gap-4'>
                  <Image src={wineIcon} alt='와인 이미지' className='h-[68px] w-[68px] rounded-lg bg-gray-100 p-[7px] mobile:h-[67px] mobile:w-[67px]' />
                  <div className='flex flex-col gap-2'>
                    <p className='text-2lg font-semibold text-gray-800 mobile:text-lg'>{wineData.name}</p>
                    <InteractiveRating resetTrigger={resetTrigger} initialValue={0} size='large' onChange={(rate) => setValue('rating', rate)} />
                  </div>
                </div>
                <textarea
                  placeholder='후기를 작성해 주세요'
                  className='h-[120px] resize-none rounded-2xl border border-gray-100 px-5 py-[14px] align-text-top placeholder:text-lg placeholder:font-normal placeholder:text-gray-500 focus:outline-purple-100 pc:h-[120px] pc:w-[480px] mobile:h-[100px] mobile:w-auto mobile:rounded-xl placeholder:mobile:text-md'
                  {...register('content')}
                />
              </div>
              <div className='flex h-[212px] flex-col gap-6 mobile:h-[194px]'>
                <h4 className='text-xl font-bold text-gray-800 mobile:text-2lg'>와인의 맛은 어땠나요?</h4>
                <div>
                  <ControlBar label='바디감' minLabel={'가벼워요'} maxLabel={'진해요'} value={0} onChange={handleLightBoldChange} name='바디감' isDraggable={true} size='small' reset={resetTrigger} />
                  <ControlBar label='타닌' minLabel={'부드러워요'} maxLabel={'떫어요'} value={0} onChange={handleSmoothTannicChange} name='타닌' isDraggable={true} size='small' reset={resetTrigger} />
                  <ControlBar label='당도' minLabel={'드라이해요'} maxLabel={'달아요'} value={0} onChange={handleDrySweetChange} name='당도' isDraggable={true} size='small' reset={resetTrigger} />
                  <ControlBar label='산미' minLabel={'안셔요'} maxLabel={'많이셔요'} value={0} onChange={handleSoftAcidicChange} name='산미' isDraggable={true} size='small' reset={resetTrigger} />
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
              text='리뷰 남기기'
              type='submit'
              variant='primary'
              disabled={aromaValue.length === 0 || ratingValue === 0 || !textValue.trim()}
              className='mt-12 h-[54px] w-auto whitespace-nowrap rounded-xl text-center text-lg disabled:bg-gray-400 pc:w-[480px] pc:px-[203.5px] pc:py-[14px] tablet:w-[480px] mobile:mb-8 mobile:w-full mobile:min-w-[300px]'
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}
