import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile';

const Game: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null); // Kullanıcı adı state
  const [totalCoins, setTotalCoins] = useState<number>(0); // Total coins state

  useEffect(() => {
    const userId = 1; // Örnek kullanıcı ID'si

    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
        const userData = response.data;

        // Eğer geçerli bir kullanıcı ID'si varsa ve kullanıcı verisi varsa state'e ata
        if (userData && userData.id) {
          setUsername(userData.username || null); // Kullanıcı adı varsa ata, yoksa null bırak
          setTotalCoins(userData.coin || 0); // Toplam paraları state'e ata
        } else {
          // Eğer kullanıcı verisi yoksa veya ID geçerli değilse, hiçbir şey yapma
          setUsername(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // API hatası durumunda hiçbir şey yapma
        setUsername(null);
      }
    };

    fetchUserData();
  }, []);

  // Kullanıcı adı alınmamışsa, bileşeni render etmeme
  if (username === null) {
    return null; // Bileşen hiç render edilmeyecek
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      <Boss onClick={() => {}} onDeath={(coinAmount: number) => setTotalCoins((prevCoins) => prevCoins + coinAmount)} />
      <Profile username={username} totalCoins={totalCoins} />
    </div>
  );
};

export default Game;
