import { useState, useEffect } from 'react';
import ControlBar from './ControlBar';

type ControlBarsProps = {
  averages: {
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
  };
  isDraggable: boolean;
};

export default function ControlBars({ averages, isDraggable }: ControlBarsProps) {
  const [lightBold, setLightBold] = useState<number>(() => {
    const savedValue = localStorage.getItem('lightBold');
    return savedValue ? Number(savedValue) : averages.lightBold;
  });

  const [smoothTannic, setSmoothTannic] = useState<number>(() => {
    const savedValue = localStorage.getItem('smoothTannic');
    return savedValue ? Number(savedValue) : averages.smoothTannic;
  });

  const [drySweet, setDrySweet] = useState<number>(() => {
    const savedValue = localStorage.getItem('drySweet');
    return savedValue ? Number(savedValue) : averages.drySweet;
  });

  const [softAcidic, setSoftAcidic] = useState<number>(() => {
    const savedValue = localStorage.getItem('softAcidic');
    return savedValue ? Number(savedValue) : averages.softAcidic;
  });

  useEffect(() => {
    localStorage.setItem('lightBold', lightBold.toString());
    localStorage.setItem('smoothTannic', smoothTannic.toString());
    localStorage.setItem('drySweet', drySweet.toString());
    localStorage.setItem('softAcidic', softAcidic.toString());
  }, [lightBold, smoothTannic, drySweet, softAcidic]);

  return (
    <div>
      <ControlBar label='바디감' value={averages.lightBold} onChange={setLightBold} isDraggable={isDraggable} />
      <ControlBar label='타닌' value={averages.smoothTannic} onChange={setSmoothTannic} isDraggable={isDraggable} />
      <ControlBar label='당도' value={averages.drySweet} onChange={setDrySweet} isDraggable={isDraggable} />
      <ControlBar label='산미' value={averages.softAcidic} onChange={setSoftAcidic} isDraggable={isDraggable} />
    </div>
  );
}
