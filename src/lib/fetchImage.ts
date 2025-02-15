import { fetchWithAuth } from './auth';

export async function fetchImage(formData: FormData): Promise<string> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response?.ok || response === null) {
      throw new Error('이미지를 업로드하는 데 실패했습니다.');
    }
    const data = await response.json();
    return data.url as string;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
