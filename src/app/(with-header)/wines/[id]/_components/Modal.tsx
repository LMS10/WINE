import Taste from '@/components/Taste';

export default function Modal() {
  return (
    <div className='modal'>
      <Taste lightBold={4} smoothTannic={2} drySweet={3} softAcidic={1} isDraggable={true} />
    </div>
  );
}
