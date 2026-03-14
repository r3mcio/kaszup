# Voice Actor Portfolio

A professional Voice Actor Portfolio boilerplate built with Next.js, Tailwind CSS, and `next-intl` for Internationalization (i18n).
Supports English (`en`) and Polish (`pl`).

## Folder Structure

- `src/app/[locale]/` - Contains the App Router pages. Pages here are localized.
- `src/components/` - Create reusable UI components here.
- `src/i18n/` - i18n routing and request configuration.
- `messages/` - Contains translation dictionaries for each language (`en.json`, `pl.json`).
- `public/assets/audio/` - Place voice demos and audio samples here.
- `public/assets/video/` - Place video samples here.

## Adding Bilingual Content (For Agents)

This project uses `next-intl`. Follow these rules when adding components and content:

1. **Do not hardcode text**: Always use the `useTranslations` hook from `next-intl`.
2. **Setup your namespace**: Provide a namespace to `useTranslations` to access nested keys in `messages/*.json`. Example: `const t = useTranslations('Hero');`
3. **Updating Translations**: Whenever adding a new feature, update both `messages/en.json` and `messages/pl.json` simultaneously to keep translations in sync.
4. **Links and Navigation**: Use the `Link`, `useRouter`, and `redirect` components exported from `src/i18n/routing.ts` to ensure users are routed to the proper locale, instead of using the default Next.js `next/link` or `next/navigation`.

### Example usage in a component

```tsx
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('cta')}</button>
    </section>
  );
}
```

## Running the project

```bash
npm run dev
```

Visit `http://localhost:3000/en` or `http://localhost:3000/pl` to see the localized versions.
