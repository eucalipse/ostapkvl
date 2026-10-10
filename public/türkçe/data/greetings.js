// Категорія: Привітання та знайомство
// Джерело: зошит 10.10.2026 (source/notes/2026-10-10-notebook.md)
IDIOMA.register({
  id: 'greetings',
  en: 'Greetings & introductions',
  title: 'Привітання та знайомство',
  icon: '👋',
  topics: [
    {
      id: 'hello',
      en: 'Greetings',
      title: 'Привітання',
      source: { label: 'Зошит, 10.10.2026, стор. 1', image: 'source/images/IMG_1800.jpg' },
      slides: [
        {
          tr: 'Merhaba!',
          say: 'мерхаба́',
          uk: 'Привіт! / Здрастуйте!',
          en: 'Hello!',
          parts: [
            { m: 'merhaba', t: 'word', d: 'привіт; слово арабського походження' },
          ],
          notes: [
            { en: 'Universal greeting: fine with friends and strangers, at any time of day.', uk: 'Універсальне привітання: підходить і друзям, і незнайомим, у будь-який час дня.' },
            { en: 'The letter h sounds like a soft, breathy “h”.', uk: 'Літера h читається як українське «х», але м’якше, з видихом.' },
          ],
        },
        {
          tr: 'Selamün aleyküm',
          say: 'селя́мюн алейкю́м',
          uk: 'Мир вам (традиційне привітання)',
          en: 'Peace be upon you',
          parts: [
            { m: 'selam', t: 'word', d: 'мир; привіт' },
            { m: 'aleyküm', t: 'word', d: 'вам (арабська форма)' },
          ],
          notes: [
            { en: 'Reply: <b>Aleyküm selam</b>.', uk: 'Відповідь: <b>Aleyküm selam</b> (алейкю́м селя́м).' },
            { en: 'More traditional and religious, mostly between men and older people.', uk: 'Більш традиційне й релігійне, частіше між чоловіками та старшими людьми.' },
            { en: 'Short neutral form: <b>Selam!</b> — Hi!', uk: 'Коротка нейтральна форма: <b>Selam!</b> — Привіт!' },
          ],
        },
        {
          tr: 'Hoş geldin!',
          say: 'хош гельді́н',
          uk: 'Ласкаво просимо! (досл. «приємно, що ти прийшов»)',
          en: 'Welcome!',
          parts: [
            { m: 'hoş', t: 'word', d: 'приємний, гарний' },
            { m: 'gel-', t: 'root', d: 'приходити (від gelmek)' },
            { m: '-di', t: 'suffix', d: 'минулий час' },
            { m: '-n', t: 'suffix', d: 'особа: ти' },
          ],
          verbs: ['gelmek'],
          notes: [
            { en: 'To several people or politely: <b>Hoş geldiniz</b> (-niz = you, plural).', uk: 'До кількох людей або ввічливо: <b>Hoş geldiniz</b> (-niz = ви).' },
            { en: 'The reply is always the same: <b>Hoş bulduk</b>.', uk: 'Відповідь завжди одна: <b>Hoş bulduk</b>.' },
          ],
          dialogue: [
            { who: 'Господар', tr: 'Hoş geldin!', uk: 'Ласкаво просимо!', en: 'Welcome!' },
            { who: 'Гість', tr: 'Hoş bulduk!', uk: 'Дякую! (відповідь)', en: '(reply to welcome)' },
          ],
        },
        {
          tr: 'Hoş bulduk!',
          say: 'хош булду́к',
          uk: 'Відповідь на «Hoş geldin» (досл. «ми знайшли це приємним»)',
          en: 'Reply to "welcome"',
          parts: [
            { m: 'hoş', t: 'word', d: 'приємний, гарний' },
            { m: 'bul-', t: 'root', d: 'знаходити (від bulmak)' },
            { m: '-du', t: 'suffix', d: 'минулий час (після u → -du)' },
            { m: '-k', t: 'suffix', d: 'особа: ми' },
          ],
          verbs: ['bulmak'],
          notes: [
            { en: 'In the notebook: “Hoş buldum/k”. <b>-m</b> = I, <b>-k</b> = we. Both are used; <b>bulduk</b> is more common, even if you are alone.', uk: 'У зошиті: «Hoş buldum/k». <b>-m</b> = я, <b>-k</b> = ми. Обидва варіанти вживають, <b>bulduk</b> частіше, навіть якщо ти один.' },
            { en: 'No separate meaning: it is just the fixed reply to the welcome.', uk: 'Окремого перекладу не має: це просто фіксована відповідь на привітання.' },
          ],
        },
      ],
    },
    {
      id: 'introduce',
      en: 'Introductions',
      title: 'Знайомство',
      source: { label: 'Зошит, 10.10.2026, стор. 1–2', image: 'source/images/IMG_1800.jpg' },
      slides: [
        {
          tr: 'Merhaba! Ben Ostap.',
          say: 'мерхаба́, бен оста́п',
          uk: 'Привіт! Я Остап.',
          en: 'Hello! I am Ostap.',
          parts: [
            { m: 'ben', t: 'word', d: 'я' },
            { m: 'Ostap', t: 'word', d: 'ім’я' },
          ],
          notes: [
            { en: 'There is no verb “to be” here: ben + name already means “I am …”.', uk: 'Дієслова «бути» тут немає: ben + ім’я вже означає «я є …».' },
            { en: 'Full form with the personal ending: <b>Ben Ostap’ım</b> (after proper names the suffix is written with an apostrophe).', uk: 'Повна форма з особовим закінченням: <b>Ben Ostap’ım</b> (після власних назв суфікс пишуть через апостроф).' },
          ],
        },
        {
          tr: 'Benim adım Ostap.',
          say: 'бени́м ади́м оста́п',
          uk: 'Мене звати Остап (досл. «моє ім’я Остап»)',
          en: 'My name is Ostap.',
          parts: [
            { m: 'ben', t: 'root', d: 'я' },
            { m: '-im', t: 'suffix', d: 'присвійний: «мій» → benim' },
            { m: 'ad', t: 'root', d: 'ім’я' },
            { m: '-ım', t: 'suffix', d: 'суфікс належності «мій» → adım' },
            { m: 'Ostap', t: 'word', d: 'ім’я' },
          ],
          words: [
            { tr: 'ad', uk: 'ім’я' },
            { tr: 'benim', uk: 'мій, моє' },
          ],
          notes: [
            { en: 'Double marking: both <b>benim</b> and <b>-ım</b> say “my”. So benim can be dropped: <b>Adım Ostap</b>.', uk: 'Подвійне маркування: і <b>benim</b>, і <b>-ım</b> кажуть «мій». Тому benim можна пропустити: <b>Adım Ostap</b>.' },
            { en: 'Vowel harmony: <b>ad</b> has the vowel <b>a</b>, so the suffix is <b>-ım</b>, not -im. <b>ben</b> has <b>e</b>, so <b>-im</b>.', uk: 'Гармонія голосних: у <b>ad</b> голосна <b>a</b>, тому суфікс <b>-ım</b>, а не -im. У <b>ben</b> голосна <b>e</b>, тому <b>-im</b>.' },
          ],
        },
        {
          tr: 'Benim ismim Ostap.',
          say: 'бени́м ісмі́м оста́п',
          uk: 'Мене звати Остап (те саме, інше слово «ім’я»)',
          en: 'My name is Ostap.',
          parts: [
            { m: 'benim', t: 'word', d: 'мій (ben + -im)' },
            { m: 'isim', t: 'root', d: 'ім’я (арабського походження, синонім ad)' },
            { m: '-im', t: 'suffix', d: '«мій» → ism-im (голосна i перед суфіксом випадає)' },
          ],
          words: [{ tr: 'isim', uk: 'ім’я' }],
          notes: [
            { en: '<b>isim + -im = ismim</b>, not “isimim”: in some words the last vowel drops when a vowel-initial suffix is added. Same: <b>burun</b> (nose) → burnum, <b>şehir</b> (city) → şehrim.', uk: '<b>isim + -im = ismim</b>, а не «isimim»: у деяких словах остання голосна випадає, коли додається суфікс із голосною. Так само: <b>burun</b> (ніс) → burnum, <b>şehir</b> (місто) → şehrim.' },
            { en: '<b>ad</b> and <b>isim</b> mean the same. In speech ad is more common, in documents isim.', uk: '<b>ad</b> та <b>isim</b> означають одне й те саме. У розмові частіше ad, в документах isim.' },
          ],
        },
        {
          tr: 'Senin adın ne?',
          say: 'сени́н ади́н не',
          uk: 'Як тебе звати? (досл. «твоє ім’я що?»)',
          en: 'What is your name?',
          parts: [
            { m: 'sen', t: 'root', d: 'ти' },
            { m: '-in', t: 'suffix', d: 'присвійний: «твій» → senin' },
            { m: 'ad', t: 'root', d: 'ім’я' },
            { m: '-ın', t: 'suffix', d: 'суфікс належності «твій» → adın' },
            { m: 'ne', t: 'word', d: 'що' },
          ],
          words: [
            { tr: 'senin', uk: 'твій, твоє' },
            { tr: 'ne', uk: 'що' },
          ],
          notes: [
            { en: 'Short: <b>Adın ne?</b>', uk: 'Коротко: <b>Adın ne?</b>' },
            { en: 'Politely or to several people: <b>Adınız ne?</b> / <b>İsminiz ne?</b> (-ınız = your, plural).', uk: 'Ввічливо або до кількох: <b>Adınız ne?</b> / <b>İsminiz ne?</b> (-ınız = ваш).' },
            { en: 'The question word <b>ne</b> goes at the end, word order does not change. About ne and its derivatives: <a href="#grammar/ne">question words</a>.', uk: 'Питальне слово <b>ne</b> стоїть у кінці, порядок слів не змінюється. Про ne та його похідні: <a href="#grammar/ne">питальні слова</a>.' },
          ],
          dialogue: [
            { who: 'A', tr: 'Senin adın ne?', uk: 'Як тебе звати?', en: 'What is your name?' },
            { who: 'B', tr: 'Benim adım Ostap. Senin?', uk: 'Мене звати Остап. А тебе?', en: 'My name is Ostap. And yours?' },
            { who: 'A', tr: 'Benim adım Ayşe.', uk: 'Мене звати Айше.', en: 'My name is Ayşe.' },
          ],
        },
        {
          tr: 'Memnun oldum.',
          say: 'мемну́н олду́м',
          uk: 'Приємно познайомитися (досл. «я став задоволеним»)',
          en: 'Nice to meet you.',
          parts: [
            { m: 'memnun', t: 'word', d: 'задоволений, радий' },
            { m: 'ol-', t: 'root', d: 'бути, ставати (від olmak)' },
            { m: '-du', t: 'suffix', d: 'минулий час' },
            { m: '-m', t: 'suffix', d: 'особа: я' },
          ],
          verbs: ['olmak'],
          notes: [
            { en: 'In the notebook “olmak — to be glad”: actually <b>olmak</b> = to be / to become, and “glad” is <b>memnun</b>.', uk: 'У зошиті «olmak — to be glad»: насправді <b>olmak</b> = бути / ставати, а «радий» це <b>memnun</b>.' },
            { en: 'Reply: <b>Ben de memnun oldum</b>.', uk: 'Відповідь: <b>Ben de memnun oldum</b>.' },
          ],
        },
        {
          tr: 'Ben de memnun oldum.',
          say: 'бен де мемну́н олду́м',
          uk: 'Мені теж приємно.',
          en: 'Nice to meet you too.',
          parts: [
            { m: 'ben', t: 'word', d: 'я' },
            { m: 'de', t: 'particle', d: 'теж, також (окреме слово!)' },
            { m: 'memnun', t: 'word', d: 'радий' },
            { m: 'oldum', t: 'word', d: 'я став (ol- + -du + -m)' },
          ],
          notes: [
            { en: '<b>de / da</b> “too” is always written SEPARATELY. There is also the suffix <b>-de/-da</b> “in, at” (evde = at home), which is attached. Do not confuse them.', uk: '<b>de / da</b> «теж» завжди пишеться ОКРЕМО. Є ще суфікс <b>-de/-da</b> «в, на» (evde = вдома), він пишеться разом. Не плутати.' },
            { en: 'Harmony: after <b>ben</b> (e) → <b>de</b>; after <b>o</b> (he/she) → <b>o da</b> = he too.', uk: 'Гармонія: після <b>ben</b> (e) → <b>de</b>; після <b>o</b> (він) → <b>o da</b> = він теж.' },
            { en: 'Short reply: just <b>Ben de</b>.', uk: 'Коротка відповідь: просто <b>Ben de</b>.' },
          ],
          dialogue: [
            { who: 'A', tr: 'Memnun oldum.', uk: 'Приємно познайомитися.', en: 'Nice to meet you.' },
            { who: 'B', tr: 'Ben de memnun oldum.', uk: 'Мені теж приємно.', en: 'Nice to meet you too.' },
          ],
        },
      ],
    },
    {
      id: 'howareyou',
      en: 'How are you?',
      title: 'Як справи?',
      source: { label: 'Зошит, 10.10.2026, стор. 1 (рамка)', image: 'source/images/IMG_1800.jpg' },
      slides: [
        {
          tr: 'Nasılsın?',
          say: 'на́силсин',
          uk: 'Як ти? / Як справи?',
          en: 'How are you?',
          parts: [
            { m: 'nasıl', t: 'root', d: 'як' },
            { m: '-sın', t: 'suffix', d: 'особове закінчення «ти (є)»' },
          ],
          words: [{ tr: 'nasıl', uk: 'як' }],
          notes: [
            { en: 'In the notebook: “Nasıl → How?, -sın → you”.', uk: 'У зошиті: «Nasıl → How?, -sın → you».' },
            { en: 'Politely or to several people: <b>Nasılsınız?</b> (-sınız = you, plural).', uk: 'Ввічливо або до кількох: <b>Nasılsınız?</b> (-sınız = ви).' },
            { en: 'Stress on the first syllable, like most question words.', uk: 'Наголос на першому складі, як у більшості питальних слів.' },
          ],
        },
        {
          tr: 'İyiyim.',
          say: 'ійі́йім',
          uk: 'Я добре. / У мене все добре.',
          en: 'I am fine.',
          parts: [
            { m: 'iyi', t: 'root', d: 'добрий; добре' },
            { m: '-y-', t: 'suffix', d: 'буферна приголосна між двома голосними' },
            { m: '-im', t: 'suffix', d: 'особове закінчення «я (є)»' },
          ],
          words: [{ tr: 'iyi', uk: 'добрий, добре' }],
          notes: [
            { en: 'In the notebook: “İyiyim — I am, iyi — fine”.', uk: 'У зошиті: «İyiyim — I am, iyi — fine».' },
            { en: 'Two vowels never meet in Turkish, so <b>y</b> is inserted between <b>iyi</b> and <b>-im</b>.', uk: 'Два голосних поспіль у турецькій не стоять, тому між <b>iyi</b> і <b>-im</b> ставиться <b>y</b>.' },
            { en: 'Full answer: <b>İyiyim, teşekkürler. Sen nasılsın?</b> (teşekkürler = thanks) — Fine, thanks. And you?', uk: 'Повна відповідь: <b>İyiyim, teşekkürler. Sen nasılsın?</b> (тешеккюрле́р = дякую) — Добре, дякую. А ти як?' },
          ],
          dialogue: [
            { who: 'A', tr: 'Nasılsın?', uk: 'Як справи?', en: 'How are you?' },
            { who: 'B', tr: 'İyiyim, teşekkürler. Sen nasılsın?', uk: 'Добре, дякую. А ти?', en: 'I’m fine, thanks. How are you?' },
            { who: 'A', tr: 'Ben de iyiyim.', uk: 'Я теж добре.', en: 'I’m fine too.' },
          ],
        },
      ],
    },
    {
      id: 'bye',
      en: 'Farewells',
      title: 'Прощання',
      source: { label: 'Зошит, 10.10.2026, стор. 2', image: 'source/images/IMG_1801.jpg' },
      slides: [
        {
          tr: 'Hoşça kal!',
          say: 'хо́шча кал',
          uk: 'Бувай! / Щасливо залишатися! (каже той, хто ЙДЕ)',
          en: 'Goodbye! (said by the one leaving)',
          parts: [
            { m: 'hoş', t: 'root', d: 'приємний' },
            { m: '-ça', t: 'suffix', d: '«по-…-ому», робить прислівник → hoşça = приємно, добре' },
            { m: 'kal', t: 'root', d: 'залишатися (kalmak); голий корінь = наказ «залишайся»' },
          ],
          verbs: ['kalmak'],
          notes: [
            { en: 'In the notebook: “Stay happy”. Literally “stay pleasantly”.', uk: 'У зошиті: «Stay happy». Дослівно «залишайся приємно».' },
            { en: 'Politely or to several people: <b>Hoşça kalın</b> (-ın = you, plural).', uk: 'Ввічливо або до кількох: <b>Hoşça kalın</b> (-ın = ви).' },
            { en: 'The imperative for “you” is just the bare root, no suffix: kal! gel! bul!', uk: 'Наказова форма до «ти» це просто корінь без суфіксів: kal! gel! bul!' },
          ],
        },
        {
          tr: 'Güle güle!',
          say: 'гюле́ гюле́',
          uk: 'Бувай! / Щасливої дороги! (каже той, хто ЗАЛИШАЄТЬСЯ)',
          en: 'Bye! (said by the one staying)',
          parts: [
            { m: 'gül-', t: 'root', d: 'сміятися, усміхатися (gülmek)' },
            { m: '-e', t: 'suffix', d: 'дієприслівник: «сміючись»' },
          ],
          verbs: ['gülmek'],
          notes: [
            { en: 'Literally “smiling-smiling”, i.e. “go with a smile”. Doubling intensifies.', uk: 'Дослівно «усміхаючись-усміхаючись», тобто «йди з усмішкою». Подвоєння підсилює.' },
            { en: 'ONLY the person who stays says this. The one who leaves says <b>Hoşça kal</b>.', uk: 'Цю фразу каже ТІЛЬКИ той, хто залишається. Той, хто йде, каже <b>Hoşça kal</b>.' },
          ],
          dialogue: [
            { who: 'Йде', tr: 'Hoşça kal!', uk: 'Бувай!', en: 'Goodbye! (said by the one leaving)' },
            { who: 'Залишається', tr: 'Güle güle!', uk: 'Бувай!', en: 'Bye! (said by the one staying)' },
          ],
        },
      ],
    },
    {
      id: 'daytime',
      en: 'Time of day',
      title: 'Час доби',
      source: { label: 'Чат з Esra, 10.10.2026', image: 'source/chats/2026-10-10-esra.txt' },
      slides: [
        {
          tr: 'Günaydın!',
          say: 'гюнайди́н',
          uk: 'Доброго ранку!',
          en: 'Good morning!',
          parts: [
            { m: 'gün', t: 'root', d: 'день' },
            { m: 'aydın', t: 'word', d: 'світлий, ясний' },
          ],
          words: [{ tr: 'gün', uk: 'день' }],
          notes: [
            { en: 'Literally “day bright”. One word, written together.', uk: 'Дослівно «день ясний». Одне слово, пишеться разом.' },
            { en: 'In the chat it was <b>Gunaydin</b> without diacritics, see <a href="#affection/chat-notes-2">chat notes</a>.', uk: 'У чаті було <b>Gunaydin</b> без діакритики, див. <a href="#affection/chat-notes-2">нотатки з чату</a>.' },
          ],
        },
        {
          tr: 'İyi geceler!',
          say: 'ійі́ геджеле́р',
          uk: 'Надобраніч! (досл. «добрих ночей»)',
          en: 'Good night!',
          parts: [
            { m: 'iyi', t: 'word', d: 'добрий' },
            { m: 'gece', t: 'root', d: 'ніч' },
            { m: '-ler', t: 'suffix', d: 'множина (після e → -ler)' },
          ],
          words: [{ tr: 'gece', uk: 'ніч' }],
          notes: [
            { en: 'Time-of-day wishes take the plural: <b>İyi günler</b> (have a good day, when leaving in daytime), <b>İyi akşamlar</b> (good evening), <b>İyi geceler</b> (good night).', uk: 'Побажання на час доби йдуть у множині: <b>İyi günler</b> (гарного дня, при прощанні вдень), <b>İyi akşamlar</b> (добрий вечір), <b>İyi geceler</b> (надобраніч).' },
            { en: 'The letter <b>c</b> sounds like “j”: gece = ge-je.', uk: 'Літера <b>c</b> читається «дж»: gece = гедже́.' },
          ],
        },
      ],
    },
  ],
});
