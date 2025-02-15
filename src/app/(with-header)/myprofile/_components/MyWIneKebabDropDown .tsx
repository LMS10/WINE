'use client';

import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/menu.svg';
import Modal from '@/components/modal/Modal';
import PatchWineForm from '@/components/modal/PatchWineForm';
import DeleteWineForm from '@/components/modal/DeleteWineModal';
import { fetchDeleteWine } from '@/lib/fetchWines';

export interface WineDataProps {
  name: string;
  price: number;
  region: string;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  image: string;
}

export default function MyWIneKebabDropDown({
  id,
  wineInitialData,
  editMyWine,
  deleteMyWine,
  setDataCount,
}: {
  id: number;
  wineInitialData: WineDataProps;
  editMyWine: (id: number, editWineData: WineDataProps) => void;
  deleteMyWine: (id: number) => void;
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
      const data = await fetchDeleteWine(id);
      if (data) {
        deleteMyWine(id);
        setDataCount((value) => value - 1);
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
        className={`min-w-[375px] rounded-2xl transition-transform mobile:fixed mobile:bottom-0 mobile:left-0 mobile:mb-0 mobile:w-full mobile:rounded-b-none ${
          isEditModalOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        }`}
      >
        <PatchWineForm onClose={closeEditModal} id={`${id}`} wineInitialData={wineInitialData} editMyWine={editMyWine} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} className='rounded-2xl mobile:mx-auto mobile:h-[172px] mobile:max-w-[353px]'>
        <DeleteWineForm onClose={closeDeleteModal} onDelete={handleDeleteWine} />
      </Modal>
    </div>
  );
}
