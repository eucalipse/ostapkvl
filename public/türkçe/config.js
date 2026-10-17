// Конфіг інстансу (бренд, рідна мова інтерфейсу, тексти). Мовно-специфічна логіка — у lang/<code>.js, контент — у data/.
IDIOMA.config({
  brand: 'Türkçe',                       // тимчасово в контексті ostapkvl.com (17.10.2026); «Idioma» — назва продукту на потім
  sub: 'Ostap · конспект турецької',
  title: 'Türkçe — Ostap Kovalisko',     // <title> у стилі сайту
  site: { label: 'ostapkvl.com', url: 'https://ostapkvl.com' },  // лінк назад на сайт над брендом; прибрати, коли переїдемо
  target: 'tr',          // мова, яку вчать (має збігатися з lang/<code>.js)
  native: 'uk',          // рідна мова пояснень
  search: 'Пошук фрази…',
  home: { title: 'Türkçe konspekt', text: 'Вибери категорію в сайдбарі. Кожна категорія — одна сторінка, теми йдуть секціями. Кольорові плитки з рамкою ведуть на правило, внизу кожного запису — зв’язки.' },
  footer: { cats: 'категорії', topics: 'тем', entries: 'записів' },
  // Supabase (публічний ключ, безпечний для фронту; доступ до рядків обмежує RLS)
  supabase: { url: 'https://bnpnzdxxmpuwzzbfyidf.supabase.co', anonKey: 'sb_publishable_SpoMdgjF1rq7ZCMuhBi-nw_Tnl_DR1b' },
});
