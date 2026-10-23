// Конфіг інстансу (бренд, рідна мова інтерфейсу, тексти). Мовно-специфічна логіка — у lang/<code>.js, контент — у data/.
// Два інстанси з одного коду: на ostapkvl.com/turkce конспект живе в контексті сайту, на окремому домені (Vercel) це продукт Idioma.
const ON_SITE = /(^|\.)ostapkvl\.com$/.test(location.hostname) || location.pathname.startsWith('/turkce');
IDIOMA.config({
  brand: ON_SITE ? 'Türkçe' : 'Idioma',
  sub: ON_SITE ? 'Ostap · конспект турецької' : 'Türkçe · Ostap’s notebook',
  title: ON_SITE ? 'Türkçe — Ostap Kovalisko' : 'Idioma · Türkçe',
  site: ON_SITE ? { label: 'ostapkvl.com', url: 'https://ostapkvl.com' } : null,  // лінк назад на сайт над брендом (лише в контексті сайту)
  teacherTitle: 'Ostap · Homework',
  teacherHeading: 'Homework',
  teacherIntro: 'Ostap’s homework answers. Each exercise is marked with its lesson date. Click 🔈 to hear a line.',  // сторінка /teacher (page.html?cat=lessons&view=teacher)
  target: 'tr',          // мова, яку вчать (має збігатися з lang/<code>.js)
  native: 'uk',          // рідна мова пояснень
  search: 'Пошук фрази…',
  home: { title: 'Türkçe konspekt', text: 'Вибери категорію в сайдбарі. Кожна категорія — одна сторінка, теми йдуть секціями. Кольорові плитки з рамкою ведуть на правило, внизу кожного запису — зв’язки.' },
  footer: { cats: 'категорії', topics: 'тем', entries: 'записів' },
  // Supabase (публічний ключ, безпечний для фронту; доступ до рядків обмежує RLS)
  supabase: { url: 'https://bnpnzdxxmpuwzzbfyidf.supabase.co', anonKey: 'sb_publishable_SpoMdgjF1rq7ZCMuhBi-nw_Tnl_DR1b' },
});
