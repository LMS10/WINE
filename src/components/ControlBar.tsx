'use client';
import { useEffect, useRef, useState } from 'react';

type ControlBarProps = {
  label: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  isDraggable: boolean;
  size: 'small' | 'medium' | 'large';
  name: string;
  onChange: (value: number) => void;
};

export default function ControlBar({ label, minLabel, maxLabel, value, isDraggable, size = 'large', onChange, name }: ControlBarProps) {
  const controlBarStyle =
    size === 'large'
      ? 'max-w-[720px] h-[28px] tablet:max-w-[880px] tablet:h-[26px]  mobile:max-w-[600px] mobile:h-[30px]'
      : size === 'medium'
        ? 'max-w-[540px] h-[25px] tablet:max-w-[1000px] mobile:max-w-[700px] mobile:h-[24px]'
        : 'max-w-[480px] h-[26px] mobile:max-w-[327px] mobile:h-[24px]';

  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(value);
  const controlBarRef = useRef<HTMLDivElement | null>(null);
  const initialX = useRef(0);
  const initialValue = useRef(0);

  useEffect(() => {
    setDragValue(value);
  }, [value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable || !controlBarRef.current) return;

    e.stopPropagation();
    setIsDragging(true);
    initialX.current = e.clientX;
    initialValue.current = dragValue;
  };

  useEffect(() => {
    if (!isDragging || !controlBarRef.current) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX.current;
      const controlBarWidth = controlBarRef.current!.offsetWidth;

      let newValue = initialValue.current + (deltaX / controlBarWidth) * 10;
      newValue = Math.min(Math.max(Math.round(newValue), 1), 10);
      setDragValue(newValue);
      onChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragValue, onChange, name]);

  return (
    <div className={`mb-[18px] mobile:mb-[12px] ${controlBarStyle}`}>
      <div className='flex items-center justify-between'>
        <label className='mr-[16px] h-[28px] w-[56px] flex-none rounded-[6px] bg-gray-100 text-center text-md font-semibold leading-[28px] text-gray-500 mobile:px-[8px] mobile:py-[5px] mobile:text-xs'>
          {label}
        </label>
        <span className='mr-[16px] w-[70px] flex-none whitespace-nowrap text-lg font-medium text-gray-800 mobile:text-md'>{minLabel}</span>
        <div className='relative h-[6px] w-full cursor-pointer rounded-full border-[1px] border-solid border-gray-300 bg-gray-100' ref={controlBarRef} onMouseDown={handleMouseDown}>
          <div
            className='absolute left-0 top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform cursor-pointer rounded-full bg-purple-100 mobile:h-[12px] mobile:w-[12px]'
            style={{ left: `${(dragValue / 10) * 100}%` }}
            onMouseDown={handleMouseDown}
          />
        </div>
        <span className='ml-[16px] w-[70px] flex-none whitespace-nowrap text-right text-lg font-medium text-gray-800 mobile:text-md'>{maxLabel}</span>
      </div>
    </div>
  );
}
