import WineCardSkeleton from './WineCardSkeleton';

export default function WineListSkeleton({ count }: { count: number }) {
  return (
    <div className='flex h-[650px] max-h-screen animate-pulse flex-col gap-[62px] overflow-hidden tablet:h-[550px]'>
      {new Array(count).fill(0).map((_, idx) => (
        <WineCardSkeleton key={`wine-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
