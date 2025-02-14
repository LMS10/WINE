'use client';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import menu from '@/assets/icons/menu.svg';
import { fetchWithAuth } from '@/lib/auth';
import Modal from '@/components/modal/Modal';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import PatchReviewForm from '@/components/modal/PatchReviewForm';
import { useState } from 'react';
import { MyReview } from '@/types/review-data';
import { EditReviewData } from './ReviewContainer';

export default function ReviewDropdown({
  id,
  wineName,
  reviewInitialData,
  editMyReview,
  deleteMyReview,
}: {
  id: number;
  wineName: string;
  reviewInitialData: MyReview;
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
    <div className='ml-[24px]'>
      <Dropdown
        options={options}
        onSelect={(option) => {
          option.value?.();
        }}
      >
        <Image width={38} height={38} src={menu} className='mobile:h-[32px] mobile:w-[32px]' alt='메뉴 아이콘' />
      </Dropdown>
      <Modal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        className={`overflow-x-hidden rounded-2xl mobile:mb-0 mobile:h-[930px] mobile:rounded-b-none ${
          isEditModalOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <PatchReviewForm name={wineName} id={id} onClose={closeEditModal} reviewInitialData={reviewInitialData} editMyReview={editMyReview} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:w-[353px]'>
        <DeleteWineForm onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
