import type { BlogImage } from '@/types';

export const availableImages: BlogImage[] = [
  { key: 'mesa-pintura', name: 'Pintura em Aquarela na Mesa', path: '/public/mesa-pintura.png' },
  { key: 'mapa', name: 'Mapa Mundi com Fios', path: '/public/mapa.png' },
  { key: 'garota', name: 'Garota Lendo Livro', path: '/public/garota.png' },
  { key: 'placeholder-1', name: 'Placeholder 1', path: 'https://placehold.co/800x600.png' },
];

export function getImagePath(key: string): string {
  const image = availableImages.find(img => img.key === key);
  return image ? image.path : 'https://placehold.co/800x600.png';
}
