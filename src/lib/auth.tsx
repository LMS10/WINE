export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  if (!token) return null; // 로그인 안 되어 있음

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    // 토큰 만료 시, refreshToken으로 갱신 시도
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) return null; // 갱신 실패 시 로그아웃

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      removeTokens(); // 리프레시 토큰도 만료되었을 가능성 -> 로그아웃 처리
      return null;
    }

    const data = await response.json();
    saveTokens(data.accessToken, data.refreshToken); // 새 토큰 저장
    return data.accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    removeTokens();
    return null;
  }
};
