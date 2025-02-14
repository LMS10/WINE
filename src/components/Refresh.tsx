import Image from 'next/image';
import emptyData from '@/assets/icons/empty_review.svg';
import Button from '@/components/Button';

interface RefreshProps {
  handleLoad: () => void;
  boxStyle?: string;
  iconSize?: string;
  iconTextGap?: string;
  buttonStyle?: string;
}

export default function Refresh({ handleLoad, buttonStyle = 'px-[30px] py-[10px]', iconSize = 'h-[136px] w-[136px]', iconTextGap = 'gap-[10px]', boxStyle = 'gap-[10px]' }: RefreshProps) {
  const onClickRefreshBtn = () => {
    handleLoad();
  };

  return (
    <div className={`flex flex-col items-center justify-center ${boxStyle}`}>
      <div className={`flex flex-col items-center justify-center ${iconTextGap}`}>
        <Image className={` ${iconSize}`} alt='데이터 없음' src={emptyData} priority />
        <div className='flex flex-col items-center justify-center'>
          <p className='text-center text-lg text-gray-500 mobile:text-md'>서버에서 데이터를 불러오는 데</p>
          <p className='text-center text-lg text-gray-500 mobile:text-md'>실패했습니다.</p>
        </div>
      </div>
      <Button onClick={onClickRefreshBtn} text='새로고침' className={`rounded-[100px] ${buttonStyle}`} />
    </div>
  );
}
