'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/modal/Modal';
import PatchReviewModal from '@/components/modal/PatchReviewModal';
import DeleteModal from '@/components/modal/DeleteModal';
import { MyReview } from '@/types/review-data';
import { fetchDeleteReview } from '@/lib/fetchMyReivew';
import { EditReviewData } from '@/app/(with-header)/myprofile/_components/MyReviewListContainer';
import kebab from '@/assets/icons/menu.svg';

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
      const body = await fetchDeleteReview(id);
      if (body) {
        if (deleteMyReview) {
          deleteMyReview(id);
          toast.success('리뷰 삭제에 성공했습니다.');
          setDataCount((pre) => pre - 1);
        }
        closeDeleteModal();
      }
    } catch (e) {
      if (e) {
        toast.error('리뷰 삭제에 실패했습니다.');
        closeDeleteModal();
      }
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
        className={`min-w-[375px] rounded-2xl transition-transform mobile:fixed mobile:bottom-0 mobile:left-0 mobile:mb-0 mobile:w-full mobile:rounded-b-none ${
          isEditModalOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <div className='custom-scrollbar max-h-[90vh] overflow-y-auto'>
          <PatchReviewModal name={reviewInitialData.wine.name} id={id} onClose={closeEditModal} reviewInitialData={reviewInitialData} editMyReview={editMyReview} />
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:max-w-[353px]'>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
