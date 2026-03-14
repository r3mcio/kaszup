'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('Error');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 bg-black text-zinc-100 font-sans">
      <h1 className="text-6xl font-bold mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold mb-6">{t('notFoundTitle')}</h2>
      <p className="text-zinc-400 mb-8 max-w-md mx-auto">
        {t('notFoundDesc')}
      </p>
      
      <Link 
        href="/"
        className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors duration-300"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
