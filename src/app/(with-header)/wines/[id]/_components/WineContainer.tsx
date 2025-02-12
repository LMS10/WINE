'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import WineCard, { WineCardProps } from '@/components/WineCard';

export default function WineContainer() {
  const { id } = useParams();
  const [wine, setWine] = useState<WineCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
          method: 'GET',
        });

        if (!response) {
          alert('로그인 후, 이용해 주세요');
          router.push('/signin');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          if (response.status === 404) {
            alert('존재하지 않는 와인입니다. 다시 확인해 주세요.');
            router.push('/wines');
          }
        }

        const data: WineCardProps = await response.json();
        setWine(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`와인 데이터 로드 실패: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWineData();
    } else {
      setLoading(false);
    }
  }, [id, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>{wine ? <WineCard {...wine} size='large' /> : ''}</div>
    </div>
  );
}
