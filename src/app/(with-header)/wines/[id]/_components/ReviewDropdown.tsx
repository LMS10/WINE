'use client';

import { useState } from 'react';
import Image from 'next/image';
import { fetchWithAuth } from '@/lib/auth';
import { MyReview, EditReviewData } from '@/types/review-data';
import { toast } from 'react-toastify';
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/modal/Modal';
import PatchReviewForm from '@/components/modal/PatchReviewForm';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import menu from '@/assets/icons/menu.svg';

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
        throw new Error('리뷰 삭제에 실패했습니다.');
      }

      const body = await response.json();
      if (body) {
        if (deleteMyReview) {
          deleteMyReview(id);
        }
        closeDeleteModal();
      }
    } catch (error) {
      closeDeleteModal();
      console.log(status);
      toast.error('리뷰 삭제에 실패했습니다.');
      console.error('리뷰 삭제 에러', error);
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
        className={`min-w-[375px] rounded-2xl transition-transform mobile:fixed mobile:bottom-0 mobile:left-0 mobile:mb-0 mobile:w-full mobile:rounded-b-none ${
          isEditModalOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <div className='custom-scrollbar max-h-[90vh] overflow-y-auto'>
          <PatchReviewForm name={wineName} id={id} onClose={closeEditModal} reviewInitialData={reviewInitialData} editMyReview={editMyReview} />
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:w-[353px]'>
        <DeleteWineForm onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
