import MyProfileContainer from './_components/MyProfileContainer';
import MyWineListContainer from './_components/MyWineListContainer';

export default function Page() {
  return (
    <div className='pt-[37px] tablet:px-[20px] tablet:pt-[17px] mobile:px-[16px] mobile:pt-[20px]'>
      <div className='flex justify-center gap-[60px] tablet:flex-col tablet:gap-[40px] mobile:gap-[30px]'>
        <MyProfileContainer />
        <div className='mobile: flex flex-col gap-[22px] pc:w-[800px]'>
          <div className='flex gap-[32px]'>
            <span>내가 쓴 후기</span>
            <span>내가 등록한 와인</span>
          </div>
          <MyWineListContainer />
        </div>
      </div>
    </div>
  );
}
