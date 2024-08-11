import { useState } from 'react';

const useGrecon = () => {
  // Başlangıç değeri 5 milyar Grecon
  const [totalGrecons, setTotalGrecons] = useState<number>(5_000_000_000); 
  const [bossGrecon, setBossGrecon] = useState<number>(0); 
  const [userGrecon, setUserGrecon] = useState<number>(0); 

  // Bosslardan Grecon eklemek için fonksiyon
  const addBossGrecon = (amount: number) => {
    setBossGrecon((prev) => prev + amount); 
    setTotalGrecons((prev) => prev + amount); 
  };

  // Kullanıcının Grecon kazandığını güncellemek için fonksiyon
  const addUserGrecon = (amount: number) => {
    setUserGrecon((prev) => prev + amount); 
    setTotalGrecons((prev) => prev + amount); 
  };

  // Greconları sıfırlamak için fonksiyon (opsiyonel)
  const resetGrecons = () => {
    setTotalGrecons(5_000_000_000); 
    setBossGrecon(0);
    setUserGrecon(0);
  };

  return {
    totalGrecons,
    bossGrecon,
    userGrecon,
    addBossGrecon,
    addUserGrecon,
    resetGrecons,
  };
};

export default useGrecon;
