import { useCallback } from 'react';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  colors?: string[];
}

export function useConfetti() {
  const fire = useCallback((options: ConfettiOptions = {}) => {
    const {
      particleCount = 50,
      spread = 70,
      colors = ['#FFC857', '#48A999', '#1B1F3B', '#F1E3C6'],
    } = options;

    // Create confetti container
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const duration = Math.random() * 2 + 2;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${left}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: confetti-fall ${duration}s linear ${delay}s forwards;
      `;

      container.appendChild(particle);
    }

    // Clean up after animation
    setTimeout(() => {
      container.remove();
    }, 4000);
  }, []);

  const celebrate = useCallback(() => {
    fire({ particleCount: 100, spread: 100 });
  }, [fire]);

  return { fire, celebrate };
}

