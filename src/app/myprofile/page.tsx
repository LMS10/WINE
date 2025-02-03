import ProfileImg from '@/components/ProfileImg';
import profileDefault from '@/assets/images/banner_mobile.png';

export default function Page() {
  return (
    <div>
      <div>프로필 페이지</div>
      <ProfileImg src={profileDefault} width={200} height={200} />
    </div>
  );
}
