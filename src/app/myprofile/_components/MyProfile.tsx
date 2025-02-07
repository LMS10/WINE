'use client';

import ProfileImg from '@/components/ProfileImg';
import img from '@/assets/images/banner_desktop.png';
import Button from '@/components/Button';

export default function MyProfile() {
  return (
    <div className='flex h-[530px] w-[280px] flex-col items-center justify-between rounded-[16px] border border-gray-300 px-[20px] py-[39px] shadow-drop tablet:h-[247px] tablet:w-full tablet:px-[40px] tablet:py-[23px] mobile:h-[241px] mobile:p-[20px]'>
      <div className='flex w-full flex-col items-center justify-center gap-[32px] tablet:flex-row tablet:justify-start'>
        <ProfileImg src={img} size='large' />
        <div className='flex flex-col gap-[16px] tablet:gap-[8px] mobile:gap-[4px]'>
          <h1 className='flex justify-center text-2xl font-bold text-gray-800 tablet:justify-start mobile:text-xl'>완다</h1>
          <p className='flex justify-center text-lg font-normal text-gray-500 tablet:justify-start mobile:text-md'>wanda@email.com</p>
        </div>
      </div>
      <div className='flex w-full flex-col justify-center gap-[8px] tablet:flex-row tablet:gap-[24px] mobile:flex-col mobile:gap-[6px]'>
        <div className='flex flex-col gap-[10px] tablet:flex-grow mobile:gap-[8px]'>
          <label className='text-lg font-medium text-gray-800 mobile:text-md'>닉네임</label>
          <input disabled className='flex h-[48px] w-full rounded-2xl border border-gray-300 pl-5 text-lg font-normal focus:outline-purple-100 mobile:h-[42px] mobile:text-md' placeholder='완다' />
        </div>
        <div className='flex flex-row-reverse tablet:items-end'>
          <Button
            text='변경하기'
            onClick={() => alert('변경하기')}
            className='rounded-[12px] px-[20px] py-[8px] text-lg tablet:px-[30px] tablet:py-[11px] mobile:px-[20px] mobile:py-[9px] mobile:text-md'
          />
        </div>
      </div>
    </div>
  );
}
