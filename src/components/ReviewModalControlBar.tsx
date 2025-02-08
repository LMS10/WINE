'use client';
import ControlBar from '@/components/ControlBar';

type ReviewModalControlBarProps = {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  isDraggable: boolean;
  onChange: (name: string, value: number) => void;
};

export default function ReviewModalControlBar({ lightBold, smoothTannic, drySweet, softAcidic }: ReviewModalControlBarProps) {
  return (
    <div>
      <ControlBar label='바디감' minLabel={'가벼워요'} maxLabel={'진해요'} value={lightBold} onChange={() => {}} name='바디감' isDraggable={true} size='small' />
      <ControlBar label='타닌' minLabel={'부드러워요'} maxLabel={'떫어요'} value={smoothTannic} onChange={() => {}} name='타닌' isDraggable={true} size='small' />
      <ControlBar label='당도' minLabel={'드라이해요'} maxLabel={'달아요'} value={drySweet} onChange={() => {}} name='당도' isDraggable={true} size='small' />
      <ControlBar label='산미' minLabel={'안셔요'} maxLabel={'많이셔요'} value={softAcidic} onChange={() => {}} name='산미' isDraggable={true} size='small' />
    </div>
  );
}
