import RecommendedWine from './_components/RecommendedWine';
import WineListContainer from './_components/WineListContainer';

export default function Wines() {
  return (
    <div className='flex justify-center'>
      <div className='mx-auto mt-[20px] w-[1140px] max-w-[1200px] tablet:mx-6 tablet:max-w-[1000px] mobile:mx-5 mobile:mt-[15px] mobile:min-w-[343px] mobile:max-w-[700px]'>
        <RecommendedWine />
        <WineListContainer />
      </div>
    </div>
  );
}
