import RecommendedWineContainer from './_components/RecommendWineContainer';
import WineListContainer from './_components/WineListContainer';

export default function Wines() {
  return (
    <div className='mx-auto mb-[80px] max-w-[1140px] tablet:max-w-[1050px] mobile:min-w-[343px] mobile:max-w-[752px]'>
      <div className='mx-auto mt-[20px] w-[1140px] tablet:mx-6 tablet:w-auto tablet:min-w-[700px] tablet:max-w-[1000px] mobile:mx-5 mobile:mt-[15px] mobile:min-w-[343px] mobile:max-w-[700px]'>
        <RecommendedWineContainer />
        <WineListContainer />
      </div>
    </div>
  );
}
