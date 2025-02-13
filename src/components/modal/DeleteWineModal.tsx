import Button from '../Button';

interface DeleteWinePorps {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteWineForm({ onClose, onDelete }: DeleteWinePorps) {
  return (
    <div>
      <div className='flex h-[182px] w-[353px] flex-col justify-between px-4 pb-6 pt-8 mobile:mx-auto mobile:h-[172px]'>
        <div className='mx-auto text-xl font-bold text-gray-800 mobile:text-2lg'>정말 삭제하시겠습니까?</div>
        <div className='flex justify-between'>
          <button type='button' onClick={onClose} className='h-[54px] w-[156px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg font-bold text-gray-500 mobile:h-[50px]'>
            취소
          </button>
          <Button className='h-[54px] w-[156px] rounded-xl mobile:h-[50px]' text='삭제하기' onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
