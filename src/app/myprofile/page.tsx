import WineCard from '@/components/WineCard';

export default function Page() {
  return (
    <div className='flex flex-col gap-[60px]'>
      <div>프로필 페이지</div>
      <WineCard />
      <WineCard />
      <WineCard />
    </div>
  );
}
