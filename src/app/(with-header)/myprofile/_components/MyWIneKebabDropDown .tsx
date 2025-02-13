'use client';

import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/menu.svg';
import Modal from '@/components/modal/Modal';
import PatchWineForm from '@/components/modal/PatchWineForm';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import { fetchWithAuth } from '@/lib/auth';

export default function MyWIneKebabDropDown({ id }: { id: number }) {
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
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
        method: 'DELETE',
      });

      if (!response?.ok || response === null) return alert('와인 삭제에 실패했습니다');

      const body = await response.json();
      if (body) {
        closeDeleteModal();
      }
    } catch (error) {
      console.error('와인 삭제 에러:', error);
    }
  };

  return (
    <div className='absolute right-0 w-fit'>
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
        <PatchWineForm onClose={closeEditModal} id={`${id}`} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:w-[353px]'>
        <DeleteWineForm onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
