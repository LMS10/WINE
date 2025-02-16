import { toast } from 'react-toastify';
import { MyProfileData } from '@/app/(with-header)/myprofile/_components/MyProfile';
import { fetchWithAuth } from './auth';

export async function fetchUser(): Promise<MyProfileData> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);

    if (!response?.ok || response === null) {
      throw new Error('유저 데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`유저 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}

export async function fetchUploadUser(image: string, nickname: string): Promise<string | undefined> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: image, nickname: nickname }),
    });

    if (response?.status === 400) {
      toast.error('동일한 닉네임이 있습니다.');
      return undefined;
    }

    if (!response?.ok || response === null) {
      throw new Error('데이터를 업데이트 하는 데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`유저 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
