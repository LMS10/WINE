'use client';

import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/menu.svg';
import Modal from '@/components/modal/Modal';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import { fetchWithAuth } from '@/lib/auth';
import PatchReviewForm from '@/components/modal/PatchReviewForm';
import { MyReview } from '@/types/review-data';
import { EditReviewData } from './MyReviewListContainer';

export default function MyReviewKebabDropDown({
  reviewInitialData,
  id,
  editMyReview,
  deleteMyReview,
}: {
  reviewInitialData: MyReview;
  id: number;
  editMyReview: (id: number, editReviewData: EditReviewData, updatedAt: string) => void;
  deleteMyReview: (id: number) => void;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response?.ok || response === null) {
        throw new Error('리뷰 삭제에 실패했습니다');
      }

      const body = await response.json();
      if (body) {
        if (deleteMyReview) {
          deleteMyReview(id);
        }
        closeDeleteModal();
      }
    } catch (error) {
      console.error('리뷰 삭제 에러:', error);
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
