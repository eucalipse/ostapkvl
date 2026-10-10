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
    {
      id: 'verbs-slides',
      en: 'From the Tanışma slides',
      title: 'Зі слайдів Tanışma',
      source: { label: 'Слайди Türkçe Tanışma, 10.10.2026', image: 'source/slides/tanisma-01-title.jpg' },
      slides: [
        {
          id: 'etmek',
          tr: 'etmek',
          say: 'етме́к',
          uk: 'робити (допоміжне: іменник + etmek = дієслово)',
          en: 'to do, to make (auxiliary in compound verbs)',
          parts: [
            { m: 'et-', t: 'root', d: 'робити; перед голосною t → d (ed-er, ed-iyor)' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'аорист', items: ['ed-er-im', 'ed-er-sin', 'ed-er', 'ed-er-iz', 'ed-er-siniz', 'ed-er-ler'] },
            { label: 'теперішній', items: ['ed-iyor-um', 'ed-iyor-sun', 'ed-iyor', 'ed-iyor-uz', 'ed-iyor-sunuz', 'ed-iyor-lar'] },
            { label: 'минулий', items: ['et-ti-m', 'et-ti-n', 'et-ti', 'et-ti-k', 'et-ti-niz', 'et-ti-ler'] },
          ],
          examples: [
            { tr: 'Teşekkür ederim.', uk: 'Дякую (досл. «роблю подяку»).', en: 'Thank you.' },
            { tr: 'Rica ederim.', uk: 'Прошу / нема за що (досл. «роблю прохання»).', en: 'You are welcome.' },
            { tr: 'Kahvaltı ettik.', uk: 'Ми поснідали (kahvaltı = сніданок).', en: 'We had breakfast.' },
          ],
          notes: [
            { en: 'Rarely used alone. It turns nouns into verbs: <b>teşekkür etmek</b> (to thank), <b>yardım etmek</b> (to help), <b>kahvaltı etmek</b> (to have breakfast), <b>telefon etmek</b> (to phone).', uk: 'Саме по собі майже не вживається. Робить з іменників дієслова: <b>teşekkür etmek</b> (дякувати), <b>yardım etmek</b> (допомагати), <b>kahvaltı etmek</b> (снідати), <b>telefon etmek</b> (телефонувати).' },
            { en: 'The root t softens to d before a vowel: et + er → <b>eder</b>, et + iyor → <b>ediyor</b>; before a consonant it stays: et-ti, et-mek. Same with gitmek (to go): gid-er, git-ti.', uk: 'Кінцеве t кореня перед голосною м’якшає до d: et + er → <b>eder</b>, et + iyor → <b>ediyor</b>; перед приголосною лишається: et-ti, et-mek. Так само gitmek (іти): gid-er, git-ti.' },
            { en: 'On the slides only inside <a href="#greetings/thanks-1">teşekkür ederim</a> (slides 12, 14, 16, 19, 20).', uk: 'На слайдах лише всередині <a href="#greetings/thanks-1">teşekkür ederim</a> (слайди 12, 14, 16, 19, 20).' },
          ],
        },
        {
          id: 'tanismak',
          tr: 'tanışmak',
          say: 'танишма́к',
          uk: 'знайомитися (одне з одним)',
          en: 'to meet, to get acquainted',
          parts: [
            { m: 'tanı-', t: 'root', d: 'знати (когось), упізнавати (tanımak)' },
            { m: '-ş-', t: 'suffix', d: 'взаємність: «один одного» → tanış- = знайомитися' },
            { m: '-mak', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'минулий', items: ['tanış-tı-m', 'tanış-tı-n', 'tanış-tı', 'tanış-tı-k', 'tanış-tı-nız', 'tanış-tı-lar'] },
            { label: 'теперішній', items: ['tanış-ıyor-um', 'tanış-ıyor-sun', 'tanış-ıyor', 'tanış-ıyor-uz', 'tanış-ıyor-sunuz', 'tanış-ıyor-lar'] },
            { label: 'давайте', items: ['tanış-alım! (познайомимося!)'] },
          ],
          examples: [
            { tr: 'Tanıştığımıza memnun oldum.', uk: 'Радий, що ми познайомилися (формально).', en: 'Pleased to have met you.' },
            { tr: 'Gülşah ile tanıştım.', uk: 'Я познайомився з Ґюльшах (ile = з).', en: 'I met Gülşah.' },
            { tr: 'Tanışalım!', uk: 'Давайте знайомитися!', en: 'Let’s get acquainted!' },
          ],
          notes: [
            { en: '<b>Tanışma</b> (the title of the slides) is the noun “getting acquainted, introductions”: tanış + -ma.', uk: '<b>Tanışma</b> (назва слайдів) це іменник «знайомство»: tanış + -ma.' },
            { en: 'Past tense is <b>-tı</b>, not -dı, because the root ends in voiceless <b>ş</b>.', uk: 'Минулий час <b>-tı</b>, а не -dı, бо корінь закінчується на глуху <b>ş</b>.' },
          ],
        },
        {
          id: 'ogrenmek',
          tr: 'öğrenmek',
          say: 'öйренме́к',
          uk: 'вчити (щось), вивчати',
          en: 'to learn',
          parts: [
            { m: 'öğren-', t: 'root', d: 'вчити, вивчати (щось); ğ не читається, подовжує ö' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'теперішній', items: ['öğren-iyor-um', 'öğren-iyor-sun', 'öğren-iyor', 'öğren-iyor-uz', 'öğren-iyor-sunuz', 'öğren-iyor-lar'] },
            { label: 'минулий', items: ['öğren-di-m', 'öğren-di-n', 'öğren-di', 'öğren-di-k', 'öğren-di-niz', 'öğren-di-ler'] },
            { label: 'давайте', items: ['öğren-elim! (вивчімо! / давайте вчити!)'] },
          ],
          examples: [
            { tr: 'Türkçe öğrenelim!', uk: 'Вчімо турецьку! (слайд 1)', en: 'Let’s learn Turkish!' },
            { tr: 'Türkçe öğreniyorum.', uk: 'Я вчу турецьку.', en: 'I am learning Turkish.' },
          ],
          notes: [
            { en: '“To learn” (yourself) is <b>öğrenmek</b>; “to teach” (someone) is <b>öğretmek</b>; <b>öğretmen</b> = teacher, <b>öğrenci</b> = student. Same root öğr-.', uk: '«Вчити» (самому) це <b>öğrenmek</b>; «навчати» (когось) це <b>öğretmek</b>; <b>öğretmen</b> = вчитель, <b>öğrenci</b> = учень. Той самий корінь öğr-.' },
          ],
        },
        {
          id: 'bilmek',
          tr: 'bilmek',
          say: 'більме́к',
          uk: 'знати; вміти',
          en: 'to know; to be able',
          parts: [
            { m: 'bil-', t: 'root', d: 'знати' },
            { m: '-mek', t: 'suffix', d: 'інфінітив' },
          ],
          forms: [
            { label: 'теперішній', items: ['bil-iyor-um', 'bil-iyor-sun', 'bil-iyor', 'bil-iyor-uz', 'bil-iyor-sunuz', 'bil-iyor-lar'] },
            { label: 'аорист', items: ['bil-ir-im', 'bil-ir-sin', 'bil-ir', 'bil-ir-iz', 'bil-ir-siniz', 'bil-ir-ler'] },
            { label: 'минулий', items: ['bil-di-m', 'bil-di-n', 'bil-di', 'bil-di-k', 'bil-di-niz', 'bil-di-ler'] },
          ],
          examples: [
            { tr: 'Sen Ukraynalısın, biliyorum!', uk: 'Ти українець, я знаю! (з програми курсу)', en: 'You are Ukrainian, I know!' },
            { tr: 'Bilmiyorum.', uk: 'Не знаю.', en: 'I don’t know.' },
          ],
          notes: [
            { en: 'From the A1 syllabus (its closing example), not from the slides. “I know” is usually <b>biliyorum</b> (-yor), not the aorist. Negative: bil-<b>mi</b>-yor-um = I don’t know.', uk: 'З програми A1 (її фінальний приклад), не зі слайдів. «Я знаю» зазвичай <b>biliyorum</b> (-yor), а не аорист. Заперечення: bil-<b>mi</b>-yor-um = не знаю.' },
            { en: 'Also the base of “can”: gel-e<b>bil</b>-ir-im = I can come (syllabus topic 33).', uk: 'Також основа для «можу»: gel-e<b>bil</b>-ir-im = я можу прийти (тема 33 програми).' },
          ],
        },
      ],
    },
  ],
});
