import { Spinner } from 'basic-loading';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='mobile:hidden'>
        <Spinner
          option={{
            size: 35,
            bgColor: '#F2F4F8',
            barColor: '#CFDBEA',
            thickness: 4,
          }}
        />
      </div>
      <div className='pc:hidden tablet:hidden mobile:block'>
        <Spinner
          option={{
            size: 25,
            bgColor: '#F2F4F8',
            barColor: '#CFDBEA',
            thickness: 3,
          }}
        />
      </div>
    </div>
  );
}
