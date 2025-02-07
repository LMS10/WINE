'use client';
import ControlBar from '@/components/ControlBar';

type ReviewTasteItemProps = {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  isDraggable: boolean;
};

export default function ReviewTasteItem({ lightBold, smoothTannic, drySweet, softAcidic, isDraggable }: ReviewTasteItemProps) {
  console.log('ReviewTasteItem props:', { lightBold, smoothTannic, drySweet, softAcidic, isDraggable }); // props 확인
  return (
    <div>
      <ControlBar label='바디감' minLabel='가벼워요' maxLabel='진해요' value={lightBold} onChange={() => {}} isDraggable={isDraggable} />
      <ControlBar label='타닌' minLabel='부드러워요' maxLabel='떫어요' value={smoothTannic} onChange={() => {}} isDraggable={isDraggable} />
      <ControlBar label='당도' minLabel='드라이해요' maxLabel='달아요' value={drySweet} onChange={() => {}} isDraggable={isDraggable} />
      <ControlBar label='산미' minLabel='안셔요' maxLabel='많이셔요' value={softAcidic} onChange={() => {}} isDraggable={isDraggable} />
    </div>
  );
}
