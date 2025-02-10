import ReviewContainer from './_components/ReviewContainer';
import WineContainer from './_components/WineContainer';

export default function Page() {
  return (
    <div className='mx-auto mb-[100px] max-w-[1140px] pt-[62px] tablet:max-w-[1050px] mobile:min-w-[343px] mobile:max-w-[752px] mobile:pt-[29px]'>
      <div className='mx-auto h-[260px] w-[1140px] tablet:mx-6 tablet:h-auto tablet:w-auto tablet:min-w-[700px] tablet:max-w-[1000px] mobile:mx-5 mobile:min-w-[343px] mobile:max-w-[700px]'>
        <WineContainer />
      </div>
      <div className='mt-[60px]'>
        <ReviewContainer />
      </div>
    </div>
  );
}
