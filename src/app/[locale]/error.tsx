'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 bg-black text-zinc-100 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-red-500">500</h1>
      <h2 className="text-2xl font-semibold mb-6">{t('errorTitle')}</h2>
      <p className="text-zinc-400 mb-8 max-w-md mx-auto">
        {t('errorDesc')}
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-full hover:bg-zinc-700 transition-colors duration-300"
        >
          {t('tryAgain')}
        </button>
        <Link 
          href="/"
          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors duration-300"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
