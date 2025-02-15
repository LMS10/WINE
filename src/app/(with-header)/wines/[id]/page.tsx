import ReviewContainer from './_components/ReviewContainer';
import WineContainer from './_components/WineContainer';
import { WineDetailProvider } from '@/contexts/WineDetailProvider';

export default function Page() {
  return (
    <>
      <WineDetailProvider>
        <WineContainer />
      </WineDetailProvider>
      <ReviewContainer />
    </>
  );
}
