// Категорія: Дієслова. Один запис = одне дієслово, id = інфінітив.
// Фрази з інших категорій посилаються сюди через verbs: [{ inf: 'bulmak' }], зворотні лінки будуються автоматично.
IDIOMA.register({
  id: 'verbs',
  en: 'Verbs',
  title: 'Дієслова',
  icon: '🔧',
  topics: [
    {
      id: 'verbs-notes',
      en: 'From the notebook',
      title: 'З нотаток',
      source: { label: 'Зошит, 10.10.2026', image: 'source/images/IMG_1800.jpg' },
      slides: [
        {
          id: 'bulmak',
          tr: 'bulmak',
          say: 'булма́к',
          uk: 'знаходити',
          en: 'to find',
          parts: [
            { m: 'bul-', t: 'root', d: 'знаходити' },
            { m: '-mak', t: 'suffix', d: 'інфінітив (після a, ı, o, u)' },
          ],
          forms: [
            { label: 'минулий', items: ['bul-du-m', 'bul-du-n', 'bul-du', 'bul-du-k', 'bul-du-nuz', 'bul-du-lar'] },
            { label: 'теперішній', items: ['bul-uyor-um', 'bul-uyor-sun', 'bul-uyor', 'bul-uyor-uz', 'bul-uyor-sunuz', 'bul-uyor-lar'] },
          ],
          examples: [
            { tr: 'Hoş bulduk!', uk: 'відповідь на «ласкаво просимо» (досл. «ми знайшли приємним»)', en: '(reply to welcome)' },
            { tr: 'Anahtarı buldum.', uk: 'Я знайшов ключ.', en: 'I found the key.' },
          ],
          notes: [{ en: 'In the notebook: “bul-du — past, bul-uyor-um — present”.', uk: 'У зошиті: «bul-du — past, bul-uyor-um — present».' }],
        },
        {
          id: 'istemek',
          tr: 'istemek',
          say: 'істеме́к',
          uk: 'хотіти',
          en: 'to want',
          parts: [
            { m: 'iste-', t: 'root', d: 'хотіти (корінь на голосну)' },
            { m: '-mek', t: 'suffix', d: 'інфінітив (після e, i, ö, ü)' },
          ],
          forms: [
            { label: 'теперішній', items: ['isti-yor-um', 'isti-yor-sun', 'isti-yor', 'isti-yor-uz', 'isti-yor-sunuz', 'isti-yor-lar'] },
            { label: 'минулий', items: ['iste-di-m', 'iste-di-n', 'iste-di', 'iste-di-k', 'iste-di-niz', 'iste-di-ler'] },
          ],
          examples: [
            { tr: 'Çay istiyorum.', uk: 'Я хочу чай.', en: 'I want tea.' },
            { tr: 'Ne istiyorsun?', uk: 'Що ти хочеш?', en: 'What do you want?' },
          ],
          notes: [{ en: 'In the notebook “iste-iyor-um”. Together it is <b>istiyorum</b>: the final e of the root narrows to i before -yor.', uk: 'У зошиті «iste-iyor-um». Разом це <b>istiyorum</b>: кінцева e кореня перед -yor звужується до i.' }],
        },
        {
          id: 'olmak',
          tr: 'olmak',
          say: 'олма́к',
          uk: 'бути; ставати',
          en: 'to be; to become',
          parts: [
            { m: 'ol-', t: 'root', d: 'бути, ставати' },
            { m: '-mak', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['ol-du-m', 'ol-du-n', 'ol-du', 'ol-du-k', 'ol-du-nuz', 'ol-du-lar'] },
            { label: 'теперішній', items: ['ol-uyor-um', 'ol-uyor-sun', 'ol-uyor', 'ol-uyor-uz', 'ol-uyor-sunuz', 'ol-uyor-lar'] },
          ],
          examples: [
            { tr: 'Memnun oldum.', uk: 'Приємно познайомитися (досл. «я став радий»).', en: 'Nice to meet you.' },
            { tr: 'Ne oldu?', uk: 'Що сталося?', en: 'What happened?' },
          ],
          notes: [{ en: 'In the notebook “olmak — to be glad”. Actually “glad” is <b>memnun</b>, and olmak = to be / become.', uk: 'У зошиті «olmak — to be glad». Насправді «радий» це <b>memnun</b>, а olmak = бути/ставати.' }],
        },
      ],
    },
    {
      id: 'verbs-hidden',
      en: 'Hidden in phrases',
      title: 'Заховані у фразах',
      slides: [
        {
          id: 'gelmek',
          tr: 'gelmek',
          say: 'гельме́к',
          uk: 'приходити',
          en: 'to come',
          parts: [
            { m: 'gel-', t: 'root', d: 'приходити' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['gel-di-m', 'gel-di-n', 'gel-di', 'gel-di-k', 'gel-di-niz', 'gel-di-ler'] },
            { label: 'теперішній', items: ['gel-iyor-um', 'gel-iyor-sun', 'gel-iyor', 'gel-iyor-uz', 'gel-iyor-sunuz', 'gel-iyor-lar'] },
          ],
          examples: [
            { tr: 'Hoş geldin!', uk: 'Ласкаво просимо! (досл. «приємно, що ти прийшов»)', en: 'Welcome!' },
            { tr: 'Gel!', uk: 'Іди сюди! (наказ = голий корінь)', en: 'Come here!' },
          ],
        },
        {
          id: 'kalmak',
          tr: 'kalmak',
          say: 'калма́к',
          uk: 'залишатися',
          en: 'to stay',
          parts: [
            { m: 'kal-', t: 'root', d: 'залишатися' },
            { m: '-mak', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['kal-dı-m', 'kal-dı-n', 'kal-dı', 'kal-dı-k', 'kal-dı-nız', 'kal-dı-lar'] },
            { label: 'наказ', items: ['kal! (ти)', 'kalın! (ви)'] },
          ],
          examples: [
            { tr: 'Hoşça kal!', uk: 'Бувай! (досл. «залишайся приємно»)', en: 'Goodbye! (said by the one leaving)' },
            { tr: 'Evde kaldım.', uk: 'Я залишився вдома.', en: 'I stayed at home.' },
          ],
        },
        {
          id: 'gulmek',
          tr: 'gülmek',
          say: 'гюльме́к',
          uk: 'сміятися, усміхатися',
          en: 'to laugh, to smile',
          parts: [
            { m: 'gül-', t: 'root', d: 'сміятися' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['gül-dü-m', 'gül-dü-n', 'gül-dü', 'gül-dü-k', 'gül-dü-nüz', 'gül-dü-ler'] },
            { label: 'дієприслівник', items: ['gül-e (сміючись)'] },
          ],
          examples: [
            { tr: 'Güle güle!', uk: 'Бувай! (досл. «усміхаючись-усміхаючись»)', en: 'Bye! (said by the one staying)' },
            { tr: 'Çok güldük.', uk: 'Ми багато сміялися.', en: 'We laughed a lot.' },
          ],
        },
      ],
    },
    {
      id: 'verbs-chat',
      en: 'From chats',
      title: 'З чатів',
      source: { label: 'Чат з Esra, 10.10.2026', image: 'source/chats/2026-10-10-esra.txt' },
      slides: [
        {
          id: 'yemek',
          tr: 'yemek',
          say: 'єме́к',
          uk: 'їсти (також іменник: їжа, страва)',
          en: 'to eat; food',
          parts: [
            { m: 'ye-', t: 'root', d: 'їсти (корінь на голосну)' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'аорист', items: ['ye-r-im', 'ye-r-sin', 'ye-r', 'ye-r-iz', 'ye-r-siniz', 'ye-r-ler'] },
            { label: 'теперішній', items: ['yi-yor-um', 'yi-yor-sun', 'yi-yor', 'yi-yor-uz', 'yi-yor-sunuz', 'yi-yor-lar'] },
            { label: 'минулий', items: ['ye-di-m', 'ye-di-n', 'ye-di', 'ye-di-k', 'ye-di-niz', 'ye-di-ler'] },
          ],
          examples: [
            { tr: 'Yerim seni!', uk: 'Я тебе з’їм! (ніжність)', en: 'I could eat you up!' },
            { tr: 'Ne yiyorsun?', uk: 'Що ти їси?', en: 'What are you eating?' },
            { tr: 'Yemek yedik.', uk: 'Ми поїли (досл. «їжу з’їли»).', en: 'We ate (a meal).' },
          ],
          notes: [{ en: 'Vowel-final root, so the aorist is just <b>-r</b>: ye-r. Before -yor the final e → i: yi-yor.', uk: 'Корінь на голосну, тому аорист це просто <b>-r</b>: ye-r. Перед -yor кінцева e → i: yi-yor.' }],
        },
        {
          id: 'opmek',
          tr: 'öpmek',
          say: 'öпме́к',
          uk: 'цілувати',
          en: 'to kiss',
          parts: [
            { m: 'öp-', t: 'root', d: 'цілувати' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['öp-tü-m', 'öp-tü-n', 'öp-tü', 'öp-tü-k', 'öp-tü-nüz', 'öp-tü-ler'] },
            { label: 'теперішній', items: ['öp-üyor-um', 'öp-üyor-sun', 'öp-üyor', 'öp-üyor-uz', 'öp-üyor-sunuz', 'öp-üyor-lar'] },
            { label: 'аорист', items: ['öp-er-im', 'öp-er-sin', 'öp-er', 'öp-er-iz', 'öp-er-siniz', 'öp-er-ler'] },
          ],
          examples: [
            { tr: 'Öptüm seni.', uk: 'Цілую тебе.', en: 'Kisses (I kissed you).' },
            { tr: 'Öptüm!', uk: 'Цілую! (у кінці повідомлення)', en: 'Kisses!' },
          ],
          notes: [{ en: 'The root ends in voiceless <b>p</b>, so the past tense is <b>-tü</b>, not -dü. The vowel is ü because the root has ö.', uk: 'Корінь закінчується на глуху <b>p</b>, тому минулий час <b>-tü</b>, а не -dü. Голосна ü, бо в корені ö.' }],
        },
      ],
    },
  ],
});
