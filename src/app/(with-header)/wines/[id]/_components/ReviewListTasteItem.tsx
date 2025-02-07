'use client';
import ControlBar from '@/components/ControlBar';
// import { ReviewTaste } from '@/types/review-taste';

type ReviewListTasteItemProps = {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  isDraggable: boolean;
};

export default function ReviewListTasteItem({ lightBold, smoothTannic, drySweet, softAcidic, isDraggable }: ReviewListTasteItemProps) {
  console.log(isDraggable);
  return (
    <div>
      <ControlBar label='바디감' minLabel={'가벼워요'} maxLabel={'진해요'} value={lightBold} onChange={() => {}} isDraggable={false} />
      <ControlBar label='타닌' minLabel={'부드러워요'} maxLabel={'떫어요'} value={smoothTannic} onChange={() => {}} isDraggable={false} />
      <ControlBar label='당도' minLabel={'드라이해요'} maxLabel={'달아요'} value={drySweet} onChange={() => {}} isDraggable={false} />
      <ControlBar label='산미' minLabel={'안셔요'} maxLabel={'많이셔요'} value={softAcidic} onChange={() => {}} isDraggable={false} />
    </div>
  );
}
