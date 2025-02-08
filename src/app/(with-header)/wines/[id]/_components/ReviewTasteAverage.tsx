'use client';
import ControlBar from '@/components/ControlBar';

type ReviewTasteAverageProps = {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  count: number;
  isDraggable: boolean;
};

export default function ReviewTasteAverage({ count, lightBold, smoothTannic, drySweet, softAcidic, isDraggable }: ReviewTasteAverageProps) {
  return (
    <div>
      <div className='mb-[40px] flex w-[540px] items-center justify-between'>
        <div className='text-xl font-bold'>어떤 맛이 나나요?</div>
        <div className='text-md text-gray-500'>({count}명 참여)</div>
      </div>
      <ControlBar label='바디감' minLabel='가벼워요' maxLabel='진해요' value={lightBold} onChange={() => {}} isDraggable={isDraggable} name='바디감' size='medium' />
      <ControlBar label='타닌' minLabel='부드러워요' maxLabel='떫어요' value={smoothTannic} onChange={() => {}} isDraggable={isDraggable} name='타닌' size='medium' />
      <ControlBar label='당도' minLabel='드라이해요' maxLabel='달아요' value={drySweet} onChange={() => {}} isDraggable={isDraggable} name='당도' size='medium' />
      <ControlBar label='산미' minLabel='안셔요' maxLabel='많이셔요' value={softAcidic} onChange={() => {}} isDraggable={isDraggable} name='산미' size='medium' />
    </div>
  );
}
