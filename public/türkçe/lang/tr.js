// Мовний плагін: ТУРЕЦЬКА. Усе, що залежить від мови, яку вчать: голос TTS, автоматична транскрипція
// (літери + наголос), регулярка «це текст цільової мови». Для іншої мови створити lang/<code>.js з тим самим API.
IDIOMA.lang({
  code: 'tr', name: 'Türkçe', tts: 'tr-TR',
  // літери цільової мови (для визначення клікабельного тексту)
  isTarget: (t) => /[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(t),
  letters: 'a-zçğıöşüâîû',
  lower: (s) => String(s).toLocaleLowerCase('tr-TR'),
  translit: (() => {
    const low = (s) => String(s).toLocaleLowerCase('tr-TR');
    const FRONT = 'eiöü';
    const IOT = { a: 'я', e: 'є', o: 'йо', u: 'ю', ı: 'йи', i: 'йі', ö: 'йо', ü: 'йю' };
    function translitWord(w) {
      const src = low(w); let out = ''; const vowels = 'aeıioöuü';
      for (let i = 0; i < src.length; i++) {
        const ch = src[i], next = src[i + 1] || '', prev = src[i - 1] || '';
        switch (ch) {
          case 'a': out += 'а'; break; case 'b': out += 'б'; break; case 'c': out += 'дж'; break; case 'ç': out += 'ч'; break;
          case 'd': out += 'д'; break; case 'e': out += 'е'; break; case 'f': out += 'ф'; break; case 'g': out += 'г'; break;
          case 'ğ': break; case 'h': out += 'х'; break; case 'ı': out += 'и'; break; case 'i': out += 'і'; break; case 'j': out += 'ж'; break;
          case 'k': out += 'к'; break;
          case 'l': out += (FRONT.includes(prev) && !vowels.includes(next)) ? 'ль' : 'л'; break;
          case 'm': out += 'м'; break; case 'n': out += 'н'; break; case 'o': out += 'о'; break;
          case 'ö': out += (i === 0 || vowels.includes(prev)) ? 'ö' : 'ьо'; break;
          case 'p': out += 'п'; break; case 'r': out += 'р'; break; case 's': out += 'с'; break; case 'ş': out += 'ш'; break;
          case 't': out += 'т'; break; case 'u': out += 'у'; break; case 'ü': out += 'ю'; break; case 'v': out += 'в'; break;
          case 'y': if (IOT[next]) { out += IOT[next]; i++; } else out += 'й'; break;
          case 'z': out += 'з'; break; case 'â': out += 'а'; break; case 'î': out += 'і'; break; case 'û': out += 'у'; break;
          default: out += ch;
        }
      }
      return out;
    }
    const UNSTRESSED = new Set(['mi', 'mı', 'mu', 'mü', 'miyim', 'mıyım', 'muyum', 'müyüm', 'misin', 'mısın', 'musun', 'müsün', 'misiniz', 'mısınız', 'musunuz', 'müsünüz',
      'de', 'da', 've', 'ile', 'ki', 'bir', 'ne', 'bu', 'şu', 'o', 'ben', 'sen', 'biz', 'siz', 'çok', 'ya', 'ama', 'için', 'mi?']);
    const SRC_V = 'aeıioöuüâîû';
    // номер наголошеного голосного в латинському слові (0 = перший), або -1 = за замовчуванням останній
    function stressVowelNo(s) {
      const nV = (upto) => [...s.slice(0, upto)].filter((c) => SRC_V.includes(c)).length; // скільки голосних ДО позиції
      let m;
      if (/^(nasıl|şimdi|sonra|yarın|belki|evet|hayır|ancak|yalnız|lütfen|peki|tamam|hoşça|nerede|nereye|neden|hangi|kimse)/.test(s)) return 0;
      if ((m = s.match(/(mı|mi|mu|mü)yor/))) return nV(m.index) - 1;                 // bil-MI-yor: перед заперечним
      if ((m = s.match(/(ı|i|u|ü)yor/))) return nV(m.index);                          // isti-yor: голосна перед yor
      if ((m = s.match(/(ma|me)(dı|di|du|dü|yacak|yecek|z|m|s|l)/)) && m.index > 0) return nV(m.index) - 1; // anla-MA-dım
      if ((m = s.match(/y(ım|im|um|üm|ız|iz)$/))) return nV(m.index) - 1;             // yaşında-yım, iyi-yim: особа не наголошена
      if ((m = s.match(/(alım|elim|ayım|eyim|yalım|yelim)$/))) return nV(m.index + (m[1].startsWith('y') ? 1 : 0)); // buluş-A-lım: бажальна форма
      if ((m = s.match(/(sın|sin|sun|sün|sınız|siniz|sunuz|sünüz)$/)) && nV(m.index) >= 1 && !/(dı|di|du|dü|tı|ti|tu|tü)/.test(s.slice(0, m.index))) return nV(m.index) - 1; // nasıl-sın
      return -1;
    }
    function stress(cyr, src) {
      const s = low(src).replace(/[^a-zçğıöşüâîû]/g, '');
      if (UNSTRESSED.has(s)) return cyr;
      const idx = []; for (let i = 0; i < cyr.length; i++) if ('аеиіоуюяєö'.includes(cyr[i])) idx.push(i);
      if (idx.length < 2) return cyr;
      let k = stressVowelNo(s);
      if (k < 0 || k >= idx.length) k = idx.length - 1;
      const target = idx[k];
      return cyr.slice(0, target + 1) + '\u0301' + cyr.slice(target + 1);
    }
    function translit(text) {
      return String(text).split(/(\s+)/).map((tok) => {
        if (/^\s+$/.test(tok)) return tok;
        const m = tok.match(/^([^a-zA-ZçğıöşüÇĞİÖŞÜâîû’']*)([a-zA-ZçğıöşüÇĞİÖŞÜâîû’']+)(.*)$/);
        if (!m) return tok;
        const core = m[2].replace(/[’']/g, '');
        return m[1] + stress(translitWord(core), core) + m[3];
      }).join('');
    }
    return translit;
  })(),
});
