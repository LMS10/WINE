export default async function KakaoApi() {
  try {
    const requestBody = {
      appKey: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      appSecret: '',
      provider: 'KAKAO',
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/oauthApps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`인증 실패 : ${response.statusText}`);
    }

    const data = await response.json();
    console.log('카카오 앱 등록 성공 :', data);
    return data;
  } catch (error) {
    console.error('카카오 앱 등록 오류 :', error);
    throw error;
  }
}
