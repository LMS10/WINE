'use client';

import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/menu.svg';
import Modal from '@/components/modal/Modal';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import PatchReviewForm from '@/components/modal/PatchReviewForm';
import { MyReview } from '@/types/review-data';
import { fetchDeleteReview } from '@/lib/fetchMyReivew';
import { EditReviewData } from '@/app/(with-header)/myprofile/_components/MyReviewListContainer';

export default function MyReviewKebabDropDown({
  reviewInitialData,
  id,
  editMyReview,
  deleteMyReview,
  setDataCount,
}: {
  reviewInitialData: MyReview;
  id: number;
  editMyReview: (id: number, editReviewData: EditReviewData, updatedAt: string) => void;
  deleteMyReview: (id: number) => void;
  setDataCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [error, setError] = useState('');

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const options = [
    { value: openEditModal, label: '수정하기' },
    { value: openDeleteModal, label: '삭제하기' },
  ];

  const handleDeleteWine = async () => {
    setError('');
    try {
      const body = await fetchDeleteReview(id);
      if (body) {
        if (deleteMyReview) {
          deleteMyReview(id);
          setDataCount((pre) => pre - 1);
        }
        closeDeleteModal();
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      alert(error);
    }
  };

  return (
    <div className='ignore-click absolute right-0 w-fit'>
      <Dropdown
        options={options}
        onSelect={(option) => {
          option.value?.();
        }}
      >
        <Image className='h-[24px] w-[24px] cursor-pointer' src={kebab} alt='케밥 아이콘' />
      </Dropdown>
      <Modal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        className={`overflow-x-hidden rounded-2xl mobile:mb-0 mobile:h-[930px] mobile:rounded-b-none ${
          isEditModalOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <PatchReviewForm name={reviewInitialData.wine.name} id={id} onClose={closeEditModal} reviewInitialData={reviewInitialData} editMyReview={editMyReview} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:max-w-[353px]'>
        <DeleteWineForm onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
