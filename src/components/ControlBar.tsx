'use client';
import { useEffect, useRef, useState } from 'react';

type ControlBarProps = {
  label?: string;
  minLabel?: string;
  maxLabel?: string;
  value: number;
  onChange: (newValue: number) => void;
  isDraggable: boolean;
  minValue?: number;
  maxValue?: number;
};

export default function ControlBar({ label, minLabel, maxLabel, value, onChange, isDraggable }: ControlBarProps) {
  const [dragging, setDragging] = useState(false);
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
    setDragging(true);
    initialX.current = e.clientX;
    initialValue.current = dragValue;
  };

  useEffect(() => {
    if (!dragging || !controlBarRef.current) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX.current;
      const controlBarWidth = controlBarRef.current!.offsetWidth;

      let newValue = initialValue.current + (deltaX / controlBarWidth) * 10;
      newValue = Math.min(Math.max(Math.round(newValue), 1), 10);
      setDragValue(newValue);
      onChange(newValue);
    };

    const handleMouseUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragValue, onChange]);

  // const formattedValue = typeof dragValue === 'number' && !isNaN(dragValue) ? dragValue.toFixed(1) : '0';

  return (
    <div className='mb-[19px] w-full'>
      <div className='mb-2 flex items-center justify-between'>
        {label && <label className='mr-[16px] h-[28px] w-[56px] flex-none rounded-[6px] bg-gray-100 text-center text-md font-semibold leading-[28px] text-gray-500'>{label}</label>}
        {minLabel && <span className='mr-[16px] w-[70px] flex-none whitespace-nowrap text-lg font-medium text-gray-800'>{minLabel}</span>}
        <div className='relative h-[6px] w-full cursor-pointer rounded-full border-[1px] border-solid border-gray-300 bg-gray-100' ref={controlBarRef} onMouseDown={handleMouseDown}>
          <div
            className='absolute left-0 top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform cursor-pointer rounded-full bg-purple-100'
            style={{ left: `${(dragValue / 10) * 100}%` }}
            onMouseDown={handleMouseDown}
          />
        </div>
        {maxLabel && <span className='ml-[16px] w-[70px] flex-none whitespace-nowrap text-right text-lg font-medium text-gray-800'>{maxLabel}</span>}
      </div>
    </div>
  );
}
