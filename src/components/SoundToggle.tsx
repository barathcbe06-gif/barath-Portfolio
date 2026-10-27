import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggle = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="sound-toggle-btn group"
      title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
      aria-label="Toggle Sound"
    >
      {isMuted ? (
        <VolumeX size={15} className="text-gray-400 group-hover:text-red-400" />
      ) : (
        <Volume2 size={15} className="text-cyan-400 animate-pulse" />
      )}
      <span className="tracking-widest">
        {isMuted ? 'SOUND OFF' : 'SOUND ON'}
      </span>
      {!isMuted && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      )}
    </button>
  );
};
