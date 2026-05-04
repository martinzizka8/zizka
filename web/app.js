(function () {
  const data = window.NOVEL_DATA || { volumes: [] };
  const numberFormatter = new Intl.NumberFormat("cs-CZ");
  const state = {
    volumeIndex: 0,
    mode: "full",
    query: "",
    routeIndex: 0,
    glossaryQuery: "",
    glossaryCategory: "all"
  };

  const timeline = [
    {
      date: "30. 8. 1896",
      title: "Krčmaň u Olomouce",
      body: "Jan Žižka se narodil v hanácké Krčmani. Jeho život vede přes všechna velká zlomení první poloviny 20. století: monarchii, legie, první republiku, Mnichov i květen 1945."
    },
    {
      date: "před 1915",
      title: "Brněnské gymnázium",
      body: "Než přišel odvod, studoval gymnázium v Brně. Válka školu přerušila, ale neuzavřela: maturitu dokončil po návratu z Ruska 23. 9. 1920."
    },
    {
      date: "13. 4. 1915",
      title: "54. pěší pluk",
      body: "Do války vstoupil jako jednoroční dobrovolník u olomouckého 54. pěšího pluku, zvaného Hanácký. Už tady se rýsuje muž, kterého armáda nepovede jen jako číslo v seznamu."
    },
    {
      date: "1915 / 1916",
      title: "Stanislav",
      body: "U Stanislavi padl jako desátník do ruského zajetí. Prameny se rozcházejí v datu, ne ve významu: právě tady se jeho cesta odklání od monarchie k legiím."
    },
    {
      date: "1917",
      title: "7. střelecký pluk Tatranský",
      body: "Rok 1917 ho přivádí do československého vojska v Rusku. Záznamy uvádějí 3. 1. nebo 1. 8.; jisté je zařazení k 7. střeleckému pluku Tatranskému."
    },
    {
      date: "26. 9. 1917",
      title: "I. úderný prapor",
      body: "Přichází k I. údernému praporu. To není běžná služba, ale dobrovolná cesta do prvních linií: průzkum, prudký útok, boj zblízka a rozhodování ve vteřinách."
    },
    {
      date: "1918",
      title: "Magistrála a mobilní válka",
      body: "V Rusku se nebojuje o zákop, ale o pohyb: nádraží, mosty, sklady, obrněné vlaky a ešelony. Tady se Žižkova doložená služba nejvíc přibližuje světu Třetí úderné."
    },
    {
      date: "10. 3. 1919",
      title: "Praporčík",
      body: "Po důstojnické škole je povýšen na praporčíka. V legionářském prostředí to znamená víc než novou hodnost: potvrzení důvěry, kterou si člověk musel odsloužit."
    },
    {
      date: "23. 7. / 23. 9. 1920",
      title: "Návrat a maturita",
      body: "Domů se vrací jako podporučík. Do dvou měsíců doplňuje maturitu v Brně a volí si dráhu, která už nebude provizoriem války: službu v československé armádě."
    },
    {
      date: "listopad 1920",
      title: "Hraničářský prapor 6",
      body: "U Hraničářského praporu 6 v Domažlicích vede četu. Mladý stát posílá zkušené legionáře tam, kde se politika mění v hlídky, rozkazy a každodenní ostrahu hranic."
    },
    {
      date: "1. 11. 1921",
      title: "Kapitán a technická rota",
      body: "Stává se kapitánem a velitelem technické roty. K pěchotní odvaze přibývá druhá kvalita: schopnost stavět, organizovat a držet jednotku v chodu."
    },
    {
      date: "1925-1926",
      title: "Horský prapor a letecký kurz",
      body: "Dolní Kubín, horská služba a potom Cheb: kurz pěchotních pozorovatelů z letounů. Žižka se neučí jen válku minulou, ale i tu, která se teprve rodí."
    },
    {
      date: "1933-1936",
      title: "Horské a pěší útvary",
      body: "Ve třicátých letech slouží u horských a pěších útvarů, mimo jiné ve Valašském Meziříčí. Dne 1. 7. 1936 dosahuje hodnosti majora pěchoty."
    },
    {
      date: "1938",
      title: "Strážní prapor XXII",
      body: "V Lužických horách velí Strážnímu praporu XXII. Úsek od Dolského mlýna ke kótě Bouřný stojí na lehkém opevnění a na mužích, kteří čekají rozkaz k obraně."
    },
    {
      date: "září 1938",
      title: "SOS, Freikorps a Mnichov",
      body: "Pohraničí hoří přepady Freikorpsu a tlakem na hlídky SOS. Žižkův prapor drží zadní linii. Po Mnichovu však nepřichází boj, ale rozkaz vyklidit pozice."
    },
    {
      date: "březen 1939",
      title: "Praha a ztracená uniforma",
      body: "Krátce před okupací míří do Prahy k Ministerstvu národní obrany. Po rozpuštění armády zůstává ve městě s manželkou Olgou jako důstojník bez armády."
    },
    {
      date: "1939-1945",
      title: "Odboj s opatrnou poznámkou",
      body: "Jméno Jan Žižka svádí k záměnám. Některé stopy patří odbojovým skupinám pojmenovaným po husitském vojevůdci. U majora z roku 1896 je jisté hlavně to, že čekal na okamžik, kdy může znovu bojovat."
    },
    {
      date: "5.-9. 5. 1945",
      title: "Pražské povstání",
      body: "V Dejvicích a Bubenči barikády zastavují ústup německých jednotek k Ruzyni. Žižkova hodnost a zkušenost naznačují, že na místě nebyl jen bojovníkem, ale i člověkem, který uměl vést."
    },
    {
      date: "9. 5. 1945",
      title: "Velflíkova a Flemingovo",
      body: "Na barikádě u Velflíkovy ulice a Flemingova náměstí ho zasáhla střela do krku. Zemřel ve chvíli, kdy Praha už vítala osvobození, ale některé ulice ještě bojovaly."
    }
  ];

  const routePoints = [
    {
      date: "1896",
      place: "Krčmaň",
      title: "Začátek na Hané",
      x: 13,
      y: 43,
      body: "Tady začíná mapa, která se brzy roztáhne přes půl světa. Z moravské obce vede Žižkova cesta do války, legií, první republiky a nakonec do Prahy.",
      image: "assets/photos/pochod-legionaru-s-vlajkou-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce pochodu legionářů s československou vlajkou",
      imageCaption: "Z Hané až k legionářskému pochodu.",
      imageFocus: "center 24%"
    },
    {
      date: "1915/1916",
      place: "Stanislav",
      title: "Zajetí na východní frontě",
      x: 25,
      y: 52,
      body: "Stanislav je místo zlomu. Z rakousko-uherského desátníka se po zajetí stává muž, před kterým se otevírá cesta k československému vojsku v Rusku.",
      image: "assets/photos/zajatecky-tabor-v-snehu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce zimního tábora s ostnatým drátem",
      imageCaption: "Zajetí jako začátek nové volby.",
      imageFocus: "center 24%"
    },
    {
      date: "1917-1918",
      place: "Berezaň / Borispol",
      title: "Zrod Třetí úderné",
      x: 34,
      y: 58,
      body: "Ukrajinské kapitoly dávají rotě tvář: výcvik, první vztahy, první tvrdost. Právě tady román staví Žižku blízko středu dění.",
      image: "assets/photos/legionar-straz-na-rusi-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře na stráži u stanice",
      imageCaption: "Výcvik, stráž a vznik údernické identity.",
      imageFocus: "center 22%"
    },
    {
      date: "březen 1918",
      place: "Bachmač",
      title: "Na východ",
      x: 42,
      y: 49,
      body: "Ešelony se dávají do pohybu a krajina za dveřmi vagonu se mění rychleji než rozkazy. Cesta na východ přináší nejistotu, zprávy a první tlak magistrály.",
      image: "assets/photos/legionar-u-esalonu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře u ešalonu Čs. legie na Rusi",
      imageCaption: "Vlak jako domov, sklad i úniková cesta.",
      imageFocus: "center 24%"
    },
    {
      date: "květen-červen 1918",
      place: "Petropavlovsk",
      title: "Vlastním pořádkem",
      x: 54,
      y: 41,
      body: "Když se čekání mění v rozhodnutí, tempo zrychlí. Rota postupuje vlastní silou a román přepíná do nočních útoků, malých skupin a ostrých střetů.",
      image: "assets/photos/nocni-utok-treti-uderne-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce nočního útoku Třetí úderné",
      imageCaption: "Rozhodnutí, které udělá z cesty boj.",
      imageFocus: "center 42%"
    },
    {
      date: "léto 1918",
      place: "Jekatěrinburg",
      title: "Ural a ruská demokracie",
      x: 66,
      y: 46,
      body: "Na Urale už nejde jen o trasu. Do příběhu vstupují obrněné vlaky, obchvaty, politika a otázka, zda legie ještě bojují za cestu domů, nebo za cizí Rusko.",
      image: "assets/photos/legionar-v-troskach-nadrazi-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře v troskách nádraží",
      imageCaption: "Železniční uzly jako politika v pohybu.",
      imageFocus: "center 25%"
    },
    {
      date: "1919",
      place: "Magistrála",
      title: "Ochrana trati",
      x: 78,
      y: 52,
      body: "Magistrála vyžaduje jinou odvahu než útok. Dny se táhnou, úseky se střídají a hrdinství má podobu hlídky, zimy, únavy a udrženého pořádku.",
      image: "assets/photos/esalon-zasobovani-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce zásobování u legionářského ešalonu",
      imageCaption: "Udržet trať znamená udržet návrat.",
      imageFocus: "center 24%"
    },
    {
      date: "1920",
      place: "Vladivostok",
      title: "Cesta domů",
      x: 90,
      y: 61,
      body: "Vladivostok není konec, jen brána. Za ním jsou lodě, oceány, Kanada, Evropa a návrat do státu, který vznikl během jejich nepřítomnosti.",
      image: "assets/photos/navrat-legionare-domu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce návratu legionáře k rodině u vlaku",
      imageCaption: "Domov po cestě kolem světa.",
      imageFocus: "center 24%"
    },
    {
      date: "1945",
      place: "Praha 6",
      title: "Poslední barikáda",
      x: 16,
      y: 31,
      body: "Poslední bod neleží na Sibiři, ale v Dejvicích. Barikády tu blokují ústup na Ruzyni a západ. Žižka padá 9. 5. 1945 u Velflíkovy ulice a Flemingova náměstí.",
      image: "assets/photos/uder-pres-prekazku-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce úderníka překonávajícího překážku",
      imageCaption: "Úderník se na konci vrací jako obránce barikády.",
      imageFocus: "center 38%"
    }
  ];

  const noteRules = [
    {
      key: "těpluška",
      pattern: /těplušk/i,
      note: "Těpluška je vytápěný nákladní vagon pro mužstvo. V románu funguje jako domov na kolejích: ložnice, kuchyň, klubovna i okno do cizí země."
    },
    {
      key: "ešelon",
      pattern: /ešelon/i,
      note: "Ešelon je vojenský vlakový transport. U legií je to mnohem víc: pohyblivý tábor, sklad, kancelář i jednotka, která se umí bránit."
    },
    {
      key: "broněvik",
      pattern: /broněvik|panceřák/i,
      note: "Broněvik je obrněný vlak. Na magistrále rozhoduje stejně tvrdě jako pěchota, protože kdo ovládá trať, ovládá pohyb, palbu i zásoby."
    },
    {
      key: "vlastním pořádkem",
      pattern: /vlastním pořádkem/i,
      note: "Vlastním pořádkem znamená: nečekat, až cestu někdo dovolí. Legie se rozhodly probít dál vlastní silou, protože přeprava po Rusku se změnila v boj o přežití."
    },
    {
      key: "Štefánik",
      pattern: /Štefánik/i,
      note: "Štefánik připomíná, že legionářský příběh není jen fronta. Každý ešalon zároveň veze politickou naději na budoucí Československo."
    },
    {
      key: "Kolčak",
      pattern: /Kolčak/i,
      note: "Kolčak je mocenský uzel ruské občanské války. Pro legionáře je důležitý hlavně tím, jak komplikuje jejich hlavní cíl: dostat se domů."
    },
    {
      key: "Žižka",
      pattern: /Žižk/i,
      note: "Když se v románu objeví Žižka, čtěte dvě vrstvy najednou: konkrétního legionáře a jméno, které v české vojenské paměti zní silněji než běžné příjmení."
    },
    {
      key: "úderný prapor",
      pattern: /údern(ý|ého|ém|í).*prapor|úderní/i,
      note: "Úderný prapor je jednotka pro nejtěžší okamžiky: průzkum, rychlý útok a boj zblízka. Žižka byl k I. údernému praporu zařazen 26. 9. 1917."
    },
    {
      key: "přísaha",
      pattern: /přísah|slib/i,
      note: "Legionářská přísaha není jen obřad. Pro bývalého zajatce znamená přestoupit na druhou stranu dějin a nést za to skutečné riziko."
    },
    {
      key: "sos",
      pattern: /\bSOS\b|Stráž obrany státu/i,
      note: "SOS spojovala četníky, policisty, finanční stráž a armádní posily. V roce 1938 stála v první nárazové vrstvě, často ještě před pravidelnou armádou."
    },
    {
      key: "freikorps",
      pattern: /Freikorps|henleinov/i,
      note: "Sudetendeutsches Freikorps byl ozbrojený sudetoněmecký útvar podporovaný nacistickým Německem. V září 1938 měnil pohraničí v sérii přepadů, sabotáží a strachu."
    },
    {
      key: "barikáda",
      pattern: /barikád/i,
      note: "Barikáda je jednoduchý nápad s obrovským účinkem: zastavit techniku tím, co město samo nabídne. Žižkův poslední boj patří k Velflíkově ulici a Flemingovu náměstí."
    }
  ];

  const volumeVisuals = {
    "na-ukrajine": {
      src: "assets/photos/legionar-straz-na-rusi.jpg",
      alt: "Obrazová rekonstrukce legionáře na stráži u stanice Čs. legie na Rusi",
      caption: "Ukrajina: místo, kde se z dobrovolníků stává rota.",
      focus: "center 22%"
    },
    "na-vychod": {
      src: "assets/photos/legionar-bajkal-tunel.jpg",
      alt: "Obrazová rekonstrukce legionáře u zimní železniční trati a tunelu",
      caption: "Cesta na východ: vlak jako domov i riziko.",
      focus: "center 24%"
    },
    "vlastnim-poradkem": {
      src: "assets/photos/nocni-utok-treti-uderne.jpg",
      alt: "Obrazová rekonstrukce nočního útoku Třetí úderné",
      caption: "Vlastním pořádkem: okamžik, kdy čekání končí.",
      focus: "center 42%"
    },
    "za-ruskou-demokracii": {
      src: "assets/photos/legionar-v-troskach-nadrazi.jpg",
      alt: "Obrazová rekonstrukce legionáře v troskách železničního uzlu",
      caption: "Ural: nádraží, broněviky a politika pod palbou.",
      focus: "center 24%"
    },
    "cesta-domu": {
      src: "assets/photos/navrat-legionare-domu.jpg",
      alt: "Obrazová rekonstrukce návratu legionáře k rodině u vlaku",
      caption: "Domů se nejede zpátky, ale kolem světa.",
      focus: "center 22%"
    }
  };

  const volumeMedia = {
    "na-ukrajine": {
      audio: "assets/media/podcast-na-ukrajine.m4a",
      video: "assets/media/video-na-ukrajine.mp4",
      label: "Epizoda I"
    },
    "na-vychod": {
      audio: "assets/media/podcast-na-vychod.m4a",
      video: "assets/media/video-na-vychod.mp4",
      label: "Epizoda II"
    },
    "vlastnim-poradkem": {
      audio: "assets/media/podcast-vlastnim-poradkem.m4a",
      video: "assets/media/video-vlastnim-poradkem.mp4",
      label: "Epizoda III"
    },
    "za-ruskou-demokracii": {
      audio: "assets/media/podcast-za-ruskou-demokracii.m4a",
      video: "assets/media/video-za-ruskou-demokracii.mp4",
      label: "Epizoda IV"
    },
    "cesta-domu": {
      audio: "assets/media/podcast-ochrana-magistraly-cesta-domu.m4a",
      video: "assets/media/video-ochrana-magistraly-cesta-domu.mp4",
      label: "Epizoda V"
    }
  };

  const glossaryCategories = [
    ["all", "Vše"],
    ["vojensko", "Vojensko"],
    ["zeleznice", "Železnice"],
    ["mista", "Místa"],
    ["osoby", "Osoby"],
    ["historie", "Historie"],
    ["roman", "Román"]
  ];

  const glossaryTerms = [
    {
      term: "Anabáze",
      category: "historie",
      body: "Dlouhá legionářská cesta přes Rusko a Sibiř k Vladivostoku a odtud lodí a vlakem domů. Na webu spojuje mapu, román i Žižkovu skutečnou službu.",
      related: ["Sibiř", "Vladivostok", "Magistrála"]
    },
    {
      term: "Bachmač",
      category: "mista",
      body: "Důležitý ukrajinský železniční uzel a bojiště z března 1918. Pro legie znamenal krytí ústupu na východ a přechod od výcviku k tvrdé frontové zkušenosti.",
      related: ["Ukrajina", "Ešalon"]
    },
    {
      term: "Bolševici",
      category: "historie",
      body: "Označení pro revoluční mocenský tábor po říjnu 1917. V Třetí úderné jsou často protivníkem v bojích o trať, města, sklady a strategické body.",
      related: ["Ruská občanská válka", "Kolčak"]
    },
    {
      term: "Broněvik",
      category: "zeleznice",
      body: "Obrněný vlak s pancéřovanými vozy, kulomety nebo děly. V bojích na magistrále rozhodoval o palebné síle, průzkumu i psychologickém dojmu.",
      related: ["Magistrála", "Ešalon"]
    },
    {
      term: "Československé legie v Rusku",
      category: "historie",
      body: "Dobrovolnické české a slovenské jednotky vznikající z krajanů a zajatců. Jejich služba v Rusku se stala jedním ze základních příběhů vzniku Československa.",
      related: ["Dobrovolec", "Zborov", "Anabáze"]
    },
    {
      term: "ČsOL/VÚA",
      category: "historie",
      body: "Databázová a archivní stopa, která u Žižky drží základní vojenské údaje. Na webu slouží jako jeden z hlavních kontrolních pramenů vedle VHÚ a dalších zdrojů.",
      related: ["Pramen", "VHÚ"]
    },
    {
      term: "Dobrovolec",
      category: "vojensko",
      body: "V legionářském kontextu muž, který vstoupil do československého vojska. Neznamená to pohodlnou službu, ale vědomé vystoupení z role zajatce do role vojáka budoucí republiky.",
      related: ["Legionář", "Přísaha"]
    },
    {
      term: "Ešalon",
      category: "zeleznice",
      body: "Vojenský vlakový transport. U legií byl zároveň dopravou, skladem, ubikací, kanceláří, kuchyní, dílnou i symbolem pohyblivého domova.",
      related: ["Těpluška", "Magistrála"]
    },
    {
      term: "Exlibris",
      category: "historie",
      body: "Knižní značka vlastníka knihy. U Jana Žižky je to nečekaná kulturní vrstva: prameny ho vedou také jako sběratele a redaktora exlibrisových zpráv.",
      related: ["Jan Žižka", "Archiv"]
    },
    {
      term: "Gajda",
      category: "osoby",
      body: "Radola Gajda, legionářský velitel výrazně spojený se sibiřskou etapou. V románovém i historickém kontextu představuje energické velení i pozdější kontroverzní stopu.",
      related: ["Štefánik", "Vojcechovský"]
    },
    {
      term: "Halič",
      category: "mista",
      body: "Východní frontový prostor rakousko-uherské armády. U Žižky se k němu váže zajetí u Stanislavi, tedy okamžik, kdy se jeho vojenská dráha lámala k legiím.",
      related: ["Stanislav", "Zajetí"]
    },
    {
      term: "Jan Žižka",
      category: "osoby",
      body: "Major pěchoty, ruský legionář, úderník a později obránce pražské barikády. Web sleduje skutečného důstojníka narozeného roku 1896, ne husitského vojevůdce ani partyzánskou brigádu stejného jména.",
      related: ["I. úderný prapor", "Dejvice"]
    },
    {
      term: "Jekatěrinburg",
      category: "mista",
      body: "Uralské město důležité pro sibiřskou etapu legií. V mapě a románu označuje prostor, kde se cesta domů mění v zápas o železniční uzly a politický směr.",
      related: ["Ural", "Broněvik"]
    },
    {
      term: "Kolčak",
      category: "osoby",
      body: "Admirál Alexandr Kolčak, vůdčí postava protibolševického tábora na Sibiři. Pro legionáře představoval složitou politickou otázku, protože jejich cílem byl hlavně návrat domů.",
      related: ["Ruská občanská válka", "Štefánik"]
    },
    {
      term: "Legionář",
      category: "vojensko",
      body: "Voják československých legií. V ruské větvi často býval předtím zajatcem rakousko-uherské armády a později se stal nositelem československé státní myšlenky.",
      related: ["Dobrovolec", "Přísaha"]
    },
    {
      term: "Magistrála",
      category: "zeleznice",
      body: "Zkrácené označení pro Transsibiřskou magistrálu. V Třetí úderné je to páteř celého světa: kdo drží trať, drží zásoby, pohyb i šanci na návrat.",
      related: ["Transsibiřská magistrála", "Ešalon"]
    },
    {
      term: "Míla",
      category: "roman",
      body: "Výrazná románová postava Třetí úderné. Jeho pohled často drží lidské měřítko scén: únavu, humor, strach, kamarádství a náhlé přepnutí do boje.",
      related: ["Třetí úderná", "Úderník"]
    },
    {
      term: "Nižněudinsk",
      category: "mista",
      body: "Sibiřský bod spojený s ochranou magistrály a závěrečnou etapou před odjezdem na východ. V mapě stojí blízko přechodu od strážní služby k cestě domů.",
      related: ["Magistrála", "Vladivostok"]
    },
    {
      term: "Petropavlovsk",
      category: "mista",
      body: "Město na západosibiřské trase, v románu spojené s rozhodnutím postupovat dál vlastní silou. Patří k uzlům, kde se vlaková cesta mění v bojovou kroniku.",
      related: ["Vlastním pořádkem", "Ešalon"]
    },
    {
      term: "Pramen",
      category: "historie",
      body: "Doklad, ze kterého se staví biografická a historická vrstva webu. U Žižky je důležité držet pohromadě jisté údaje i rozpory, například v datu zajetí a vstupu do legií.",
      related: ["ČsOL/VÚA", "VHÚ"]
    },
    {
      term: "Přísaha",
      category: "vojensko",
      body: "Formální i morální vstup do služby. V legionářském vyprávění nese význam osobního závazku, který přesahoval běžnou vojenskou poslušnost.",
      related: ["Dobrovolec", "Legionář"]
    },
    {
      term: "Ruská občanská válka",
      category: "historie",
      body: "Mocenský konflikt po roce 1917, v němž se legie ocitly mezi bolševiky, bílými silami, spojenci a vlastní snahou dostat se domů.",
      related: ["Bolševici", "Kolčak"]
    },
    {
      term: "Samara",
      category: "mista",
      body: "Město na Volze a jeden z bodů postupů roku 1918. V mapě pomáhá číst přechod z ukrajinské roviny do širšího ruského prostoru.",
      related: ["Volha", "Ural"]
    },
    {
      term: "Sibiř",
      category: "mista",
      body: "Obrovský prostor, který v románu znamená vzdálenost, zimu, čekání a dlouhou službu na trati. Sibiř mění hrdinskou anabázi v zkoušku vytrvalosti.",
      related: ["Magistrála", "Nižněudinsk"]
    },
    {
      term: "Stanislav",
      category: "mista",
      body: "Dnešní Ivano-Frankivsk. U Jana Žižky je to místo zajetí uváděné prameny s rozdílným datem, ale shodným významem: přechod od císařské armády k legiím.",
      related: ["Halič", "Zajetí"]
    },
    {
      term: "Štefánik",
      category: "osoby",
      body: "Milan Rastislav Štefánik propojuje vojenský příběh legií s diplomacií a vznikem Československa. V sibiřské části nese zprávu, že fronta a politika patří k sobě.",
      related: ["Gajda", "Československé legie v Rusku"]
    },
    {
      term: "Těpluška",
      category: "zeleznice",
      body: "Vytápěný nákladní vagon upravený pro mužstvo. V románu je to pokoj, noclehárna, klubovna, nemocniční kout i pozorovací rám celého světa za dveřmi.",
      related: ["Ešalon", "Magistrála"]
    },
    {
      term: "Transsibiřská magistrála",
      category: "zeleznice",
      body: "Železniční osa od evropského Ruska přes Sibiř k Dálnému východu. Kdo držel trať, držel pohyb, zásoby a možnost návratu.",
      related: ["Magistrála", "Vladivostok"]
    },
    {
      term: "Třetí úderná",
      category: "roman",
      body: "Románová kronika legionářské roty v pěti svazcích. Web z ní dělá čtenářský prostor: text, mapa, poznámky, slovník, audio i video na jednom místě.",
      related: ["Míla", "Úderná rota"]
    },
    {
      term: "Úderná rota",
      category: "vojensko",
      body: "Jednotka určená k prudkým útokům, průzkumu a rizikovým akcím. V románu je zároveň bojovým kolektivem a nositelem skupinové identity.",
      related: ["Úderník", "Třetí úderná"]
    },
    {
      term: "Úderník",
      category: "vojensko",
      body: "Voják úderné jednotky. Slovo v sobě drží rychlost, tvrdost, dobrovolný risk i románovou představu muže, který jde první.",
      related: ["Úderná rota", "Jan Žižka"]
    },
    {
      term: "Ural",
      category: "mista",
      body: "Hranice Evropy a Asie a výrazný prostor bojů roku 1918. V románu je to kraj průmyslových měst, železničních uzlů a složitých obchvatů.",
      related: ["Jekatěrinburg", "Zlatoust"]
    },
    {
      term: "VHÚ",
      category: "historie",
      body: "Vojenský historický ústav. Jeho texty doplňují Žižkovu biografii a zároveň ukazují, kde se prameny liší od databázových záznamů.",
      related: ["Pramen", "ČsOL/VÚA"]
    },
    {
      term: "Vladivostok",
      category: "mista",
      body: "Dálnovýchodní přístav a brána k návratu. Pro legie znamenal konec sibiřské železniční cesty a začátek plavby přes oceány.",
      related: ["Anabáze", "Cesta domů"]
    },
    {
      term: "Vlastním pořádkem",
      category: "roman",
      body: "Formule rozhodnutí postupovat dál vlastní silou, když se z přepravy stala otázka boje. Je to jeden z klíčových motivů třetího dílu.",
      related: ["Petropavlovsk", "Úderná rota"]
    },
    {
      term: "Vojcechovský",
      category: "osoby",
      body: "Sergej Vojcechovský, legionářský velitel spojený s operacemi na Urale a v širší sibiřské etapě. Ve webu pomáhá ukotvit vojenský rámec románu.",
      related: ["Gajda", "Ural"]
    },
    {
      term: "Zajatecký tábor",
      category: "historie",
      body: "Místo, kde mnoho budoucích legionářů čekalo po zajetí. Tábor není konec příběhu, ale často předsíň rozhodnutí vstoupit do československého vojska.",
      related: ["Zajetí", "Dobrovolec"]
    },
    {
      term: "Zajetí",
      category: "vojensko",
      body: "Okamžik vyřazení z rakousko-uherské služby, který mohl otevřít cestu k legiím. U Žižky je doložen pramenně, ale s rozdílným datováním.",
      related: ["Stanislav", "Pramen"]
    },
    {
      term: "Zlatoust",
      category: "mista",
      body: "Uralské město a jeden z výrazných bodů bojů a přesunů. V románové mapě patří k místům, kde se trať, průmysl a válka silně překrývají.",
      related: ["Ural", "Jekatěrinburg"]
    },
    {
      term: "54. pěší pluk",
      category: "vojensko",
      body: "Rakousko-uherský pěší pluk s olomouckým doplňovacím obvodem, neformálně Hanácký. Žižka k němu nastoupil 13. 4. 1915 jako jednoroční dobrovolník.",
      related: ["Jednoroční dobrovolník", "Halič"]
    },
    {
      term: "7. střelecký pluk Tatranský",
      category: "vojensko",
      body: "Jeden z pluků československého vojska v Rusku. Žižka je u něj v pramenech veden před přechodem k elitnímu I. údernému praporu.",
      related: ["Československé legie v Rusku", "I. úderný prapor"]
    },
    {
      term: "Barikáda",
      category: "vojensko",
      body: "Nouzová pouliční překážka z dlažby, vozů, klád, kovu a všeho těžkého po ruce. V květnu 1945 měla brzdit německou techniku a uzavírat únikové trasy přes Prahu.",
      related: ["Pražské povstání", "Velflíkova ulice"]
    },
    {
      term: "Bartoš",
      category: "historie",
      body: "Krycí označení hlavního vojenského velitelství Pražského povstání, spojeného s generálem Karlem Kutlvašrem. Koordinovalo ozbrojený odpor v posledních dnech války.",
      related: ["Pražské povstání", "Barikáda"]
    },
    {
      term: "CEVH",
      category: "historie",
      body: "Centrální evidence válečných hrobů Ministerstva obrany. Žižkova dejvická pamětní deska je v ní vedena pod číslem CZE-0006-21198.",
      related: ["Flemingovo náměstí", "Vojenské pietní místo"]
    },
    {
      term: "Černý čtvrtek",
      category: "historie",
      body: "Označení krizových událostí 22. 9. 1938 v severním pohraničí, kdy se bezpečnostní situace prudce lámala útoky henleinovců a Freikorpsu na předsunuté složky státu.",
      related: ["SOS", "Sudetendeutsches Freikorps"]
    },
    {
      term: "Důstojnická škola",
      category: "vojensko",
      body: "Legionářská cesta k důstojnické hodnosti založená na výcviku, schopnostech a důvěře jednotky. Žižka po ní 10. 3. 1919 dosáhl hodnosti praporčíka.",
      related: ["Praporčík", "I. úderný prapor"]
    },
    {
      term: "Flemingovo náměstí",
      category: "mista",
      body: "Dejvické náměstí v prostoru posledního Žižkova boje. U adresy Flemingovo nám. 1417/5 je pamětní deska s evidencí CZE-0006-21198.",
      related: ["Velflíkova ulice", "CEVH"]
    },
    {
      term: "Hraničářský prapor",
      category: "vojensko",
      body: "Útvar určený pro službu na státní hranici. Žižka po návratu z legií převzal četu u Hraničářského praporu 6 v Domažlicích.",
      related: ["Domažlice", "První republika"]
    },
    {
      term: "Horský prapor",
      category: "vojensko",
      body: "Pěší útvar cvičený pro náročný terén a horské operace. Žižka v polovině dvacátých let sloužil u Horského praporu 3 v Dolním Kubíně.",
      related: ["Dolní Kubín", "Horský pěší pluk"]
    },
    {
      term: "I. úderný prapor",
      category: "vojensko",
      body: "Elitní úderný útvar ruských legií. Žižka byl k praporu zařazen 26. 9. 1917 a v jeho rámci prošel boji i důstojnickým postupem.",
      related: ["Úderník", "Důstojnická škola"]
    },
    {
      term: "Jednoroční dobrovolník",
      category: "vojensko",
      body: "Rakousko-uherský institut pro vzdělanější brance, kteří mohli po zkrácené službě a výcviku postupovat k poddůstojnickým či důstojnickým hodnostem. U Žižky vysvětluje rychlý postup na desátníka.",
      related: ["54. pěší pluk", "Desátník"]
    },
    {
      term: "Kamenický Šenov",
      category: "mista",
      body: "Jedno z míst v úseku Strážního praporu XXII v roce 1938. V dokumentu vystupuje jako prostor zálohy a štábního krytí v Lužických horách.",
      related: ["Strážní prapor XXII", "Lužické hory"]
    },
    {
      term: "Kurz pěchotních pozorovatelů",
      category: "vojensko",
      body: "Specializovaný kurz, který učil pěší velitele využívat letoun pro průzkum, orientaci v terénu a koordinaci palby. Žižka ho absolvoval v Chebu na jaře 1926.",
      related: ["Cheb", "Moderní doktrína"]
    },
    {
      term: "Lužické hory",
      category: "mista",
      body: "Pohraniční horský prostor, kde Žižka roku 1938 velel Strážnímu praporu XXII. Úsek sahal od Dolského mlýna ke kótě Bouřný.",
      related: ["Kamenický Šenov", "Strážní prapor XXII"]
    },
    {
      term: "Mnichovská dohoda",
      category: "historie",
      body: "Dohoda z 30. 9. 1938, která donutila Československo odstoupit pohraničí. Pro Žižkův prapor znamenala vyklizení připravených opevnění bez boje.",
      related: ["Strážní prapor XXII", "Černý čtvrtek"]
    },
    {
      term: "Obrana národa",
      category: "historie",
      body: "Vojenská odbojová organizace bývalých důstojníků po 15. 3. 1939. U majora Jana Žižky je potřeba být přesný: mnoho zmínek míří ke skupinám pojmenovaným po husitském Žižkovi, ne přímo k jeho osobě.",
      related: ["Protektorát", "Jan Žižka"]
    },
    {
      term: "Olga Žižková",
      category: "osoby",
      body: "Žižkova manželka zmiňovaná v protektorátní části nové analýzy. Po rozpuštění armády s ní žil v Praze jako bývalý důstojník mimo službu.",
      related: ["Praha", "Protektorát"]
    },
    {
      term: "Olšanské hřbitovy",
      category: "mista",
      body: "Pražské hřbitovy, u nichž se objevují vyhledávací indexy. Nová analýza ale zdůrazňuje, že přesné fyzické umístění Žižkových ostatků není v použitých pramenech jednoznačně doloženo.",
      related: ["CEVH", "Flemingovo náměstí"]
    },
    {
      term: "Praporčík",
      category: "vojensko",
      body: "První důstojnická hodnost v Žižkově legionářské dráze, dosažená 10. 3. 1919. V jeho případě navazuje na službu u I. úderného praporu a důstojnickou školu.",
      related: ["Důstojnická škola", "I. úderný prapor"]
    },
    {
      term: "Pražské povstání",
      category: "historie",
      body: "Ozbrojené vystoupení proti nacistické moci v květnu 1945. Žižka bojoval v Dejvicích, kde barikády bránily ústupovým trasám německých jednotek na západ.",
      related: ["Barikáda", "Bartoš"]
    },
    {
      term: "První republika",
      category: "historie",
      body: "Období budování československé armády mezi lety 1918 a 1938. Žižka zde prošel hraničářskými, horskými a pěšími útvary a dosáhl hodnosti majora pěchoty.",
      related: ["Hraničářský prapor", "Kurz pěchotních pozorovatelů"]
    },
    {
      term: "Protektorát",
      category: "historie",
      body: "Okupační režim po 15. 3. 1939, kdy byla československá armáda rozpuštěna. Pro Žižku to znamenalo ztrátu uniformy, život v Praze a čekání na možnost odporu.",
      related: ["Obrana národa", "Pražské povstání"]
    },
    {
      term: "SOS",
      category: "vojensko",
      body: "Stráž obrany státu, smíšená bezpečnostní složka četníků, policistů, finanční stráže a armádních posil. V září 1938 tvořila první nárazník před prapory pravidelné armády.",
      related: ["Černý čtvrtek", "Sudetendeutsches Freikorps"]
    },
    {
      term: "Strážní prapor XXII",
      category: "vojensko",
      body: "Prapor, kterému Žižka velel v roce 1938 v Lužických horách. Držel úsek lehkého opevnění od Dolského mlýna přes Kamenický Šenov ke kótě Bouřný.",
      related: ["Lužické hory", "Mnichovská dohoda"]
    },
    {
      term: "Sudetendeutsches Freikorps",
      category: "historie",
      body: "Ozbrojená sudetoněmecká formace podporovaná nacistickým Německem. V září 1938 vedla přepady a sabotážní akce proti československým pohraničním složkám.",
      related: ["SOS", "Černý čtvrtek"]
    },
    {
      term: "Velflíkova ulice",
      category: "mista",
      body: "Dejvická ulice spojená s poslední Žižkovou barikádou. Podle zpracovaných pramenů zde 9. 5. 1945 utrpěl smrtelné střelné zranění krku.",
      related: ["Flemingovo náměstí", "Barikáda"]
    },
    {
      term: "Vojenské pietní místo",
      category: "historie",
      body: "Pamětní deska, pomník, hrob nebo jiný veřejný doklad válečné oběti. U Jana Žižky je klíčová deska na Flemingově náměstí v Praze 6.",
      related: ["CEVH", "Flemingovo náměstí"]
    }
  ];

  const archiveGroups = [
    {
      title: "Životopis a pátrání",
      body: "Základní složka pro čtení Žižkova života: vojenská dráha, sporná data, rok 1938, Dejvice a paměť místa.",
      links: [
        ["assets/docs/jan-zizka-vojenska-draha-a-smrt.docx", "Vojenská dráha DOCX", "file-text", false, true],
        ["../Major Jan Žižka (1896–1945).docx", "Biografie DOCX", "file-text", false, false],
        ["../Pátrání po majoru Janu Žižkovi.docx", "Pátrání DOCX", "file-search", false, false]
      ]
    },
    {
      title: "PDF facsimile románu",
      body: "Původní skeny drží kontakt se stránkou knihy. Hodí se pro kontrolu přepisu i pro čtení dobového rozvržení.",
      links: [
        ["../Třetí úderná I - Na Ukrajině.pdf", "I. PDF", "file", false, true],
        ["../Třetí úderná II - Na východ.pdf", "II. PDF", "file", false, false],
        ["../Třetí úderná III - Vlastním pořádkem.pdf", "III. PDF", "file", false, false],
        ["../Třetí úderná IV - Za ruskou demokracii.pdf", "IV. PDF", "file", false, false],
        ["../Třetí úderná V-VI - Ochrana magistrály, Cesta domů.pdf", "V.-VI. PDF", "file", false, false]
      ]
    },
    {
      title: "Upravené přepisy",
      body: "Čistá textová vrstva pro čtečku. Samotný román zůstává oddělený od doprovodných poznámek a webových úprav.",
      links: data.volumes.map((volume, index) => [
        volume.sourceDoc,
        `${index + 1}. DOCX`,
        "file-type",
        false,
        index === 0
      ])
    },
    {
      title: "Audio a obraz",
      body: "Poslech, video, mapa a obrazové scény pro chvíle, kdy se chcete do románu dostat i jinak než přes odstavce.",
      links: [
        ["assets/mapa-pohybu-treti-uderne-roty.jpg", "Mapa", "map", false, true],
        ["#obraz", "Galerie", "images", false, false],
        ["assets/media/podcast-na-ukrajine.m4a", "I. audio", "volume-2", false, false],
        ["assets/media/podcast-na-vychod.m4a", "II. audio", "volume-2", false, false],
        ["assets/media/podcast-vlastnim-poradkem.m4a", "III. audio", "volume-2", false, false],
        ["assets/media/podcast-za-ruskou-demokracii.m4a", "IV. audio", "volume-2", false, false],
        ["assets/media/podcast-ochrana-magistraly-cesta-domu.m4a", "V. audio", "volume-2", false, false],
        ["assets/media/video-na-ukrajine.mp4", "I. video", "film", false, false],
        ["assets/media/video-na-vychod.mp4", "II. video", "film", false, false],
        ["assets/media/video-vlastnim-poradkem.mp4", "III. video", "film", false, false],
        ["assets/media/video-za-ruskou-demokracii.mp4", "IV. video", "film", false, false],
        ["assets/media/video-ochrana-magistraly-cesta-domu.mp4", "V. video", "film", false, false]
      ]
    },
    {
      title: "Dohledané prameny",
      body: "Odkazy ven z webu: identita, služba, pietní místo, exlibris a širší kontext ruských legií.",
      links: [
        ["https://www.csol.cz/legionar/130525/", "ČsOL/VÚA", "external-link", true, true],
        ["https://www.vhu.cz/jan-zizka-jan-zizka-padl-v-boji-9-kvetna/", "VHÚ", "external-link", true, false],
        ["https://www.vets.cz/vpm/jan-zizka-530/", "VPM", "external-link", true, false],
        ["https://library.upol.cz/arl-upol/cs/detail-upol_us_auth-0025322-zizka-Jan-18961945/?qt=mg", "UPOL", "external-link", true, false],
        ["https://vhu.cz/ovladnuti-transsibirske-magistraly-ceskoslovenskymi-legionari-v-roce-1918/", "Magistrála", "external-link", true, false]
      ]
    }
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(text) {
    const safe = escapeHtml(text);
    const query = state.query.trim();
    if (!query) return safe;
    const pattern = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return safe.replace(pattern, "<mark>$1</mark>");
  }

  function formatNumber(value) {
    return numberFormatter.format(value);
  }

  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function renderTimeline() {
    const timelineEl = qs("#timeline");
    if (!timelineEl) return;
    timelineEl.innerHTML = timeline.map((item) => `
      <article class="timeline-item">
        <div class="timeline-date">${escapeHtml(item.date)}</div>
        <div class="timeline-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </div>
      </article>
    `).join("");
  }

  function renderRoute() {
    const map = qs("#routeMap");
    if (!map) return;
    const pointString = routePoints.map((point) => `${point.x},${point.y}`).join(" ");
    map.innerHTML = `
      <svg class="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="${pointString}" fill="none" stroke="rgba(234,216,165,0.22)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
        <polyline points="${pointString}" fill="none" stroke="#ead8a5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
      </svg>
      ${routePoints.map((point, index) => `
        <button class="route-pin ${index === state.routeIndex ? "active" : ""}" style="left:${point.x}%; top:${point.y}%;" data-route-index="${index}" title="${escapeHtml(point.place)}">${index + 1}</button>
        <span class="route-label" style="left:${point.x}%; top:${point.y}%;">${escapeHtml(point.place)}</span>
      `).join("")}
    `;
    qsa(".route-pin", map).forEach((button) => {
      button.addEventListener("click", () => {
        state.routeIndex = Number(button.dataset.routeIndex);
        renderRoute();
        renderRouteDetail();
      });
    });
  }

  function renderRouteDetail() {
    const detail = qs("#routeDetail");
    if (!detail) return;
    const point = routePoints[state.routeIndex];
    const photo = point.image ? `
      <figure class="route-photo">
        <img src="${escapeHtml(point.image)}" alt="${escapeHtml(point.imageAlt)}" style="--focus:${escapeHtml(point.imageFocus || "center 30%")}">
        <figcaption>${escapeHtml(point.imageCaption)}</figcaption>
      </figure>
    ` : "";
    detail.innerHTML = `
      <span class="route-meta">${escapeHtml(point.date)} · ${escapeHtml(point.place)}</span>
      <h3>${escapeHtml(point.title)}</h3>
      <p>${escapeHtml(point.body)}</p>
      ${photo}
    `;
  }

  function currentVolume() {
    return data.volumes[state.volumeIndex] || data.volumes[0];
  }

  function mediaForVolume(volume) {
    return volumeMedia[volume.id] || {
      audio: volume.audio,
      video: "",
      label: "Epizoda"
    };
  }

  function renderVolumeList() {
    const list = qs("#volumeList");
    if (!list) return;
    list.innerHTML = data.volumes.map((volume, index) => `
      <button class="volume-button ${index === state.volumeIndex ? "active" : ""}" data-volume-index="${index}">
        <strong>${escapeHtml(volume.title)}</strong>
        <span>${formatNumber(volume.stats.characters)} znaků · ${volume.stats.zizkaMentions}× Žižka</span>
      </button>
    `).join("");

    qsa(".volume-button", list).forEach((button) => {
      button.addEventListener("click", () => {
        state.volumeIndex = Number(button.dataset.volumeIndex);
        state.query = "";
        const input = qs("#readerSearch");
        if (input) input.value = "";
        renderReader();
      });
    });
  }

  function renderHeadingList() {
    const list = qs("#headingList");
    const volume = currentVolume();
    if (!list || !volume) return;
    const headings = volume.headings.slice(0, 90);
    list.innerHTML = headings.map((heading) => `
      <button class="heading-button" data-heading-index="${heading.index}">
        ${escapeHtml(heading.text)}
      </button>
    `).join("");
    qsa(".heading-button", list).forEach((button) => {
      button.addEventListener("click", () => {
        const target = qs(`#readerContent [data-block-index="${button.dataset.headingIndex}"]`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function renderReaderSources() {
    const panel = qs("#readerSourcePanel");
    const volume = currentVolume();
    if (!panel || !volume) return;
    const media = mediaForVolume(volume);
    const visual = volumeVisuals[volume.id] || volumeVisuals["na-ukrajine"];
    panel.innerHTML = `
      <h3>Média dílu</h3>
      <p class="reader-source-caption">${escapeHtml(media.label)} · poslech, video a Žižkův kontext k tomuto dílu</p>
      <div class="source-row">
        ${sourcePill(volume.sourcePdf, "PDF", "file", false)}
        ${sourcePill(volume.sourceDoc, "DOCX", "file-type", false)}
        ${sourcePill("assets/docs/jan-zizka-vojenska-draha-a-smrt.docx", "Žižka", "file-text", false)}
        ${sourcePill(media.audio, "Audio", "volume-2", false)}
        ${media.video ? sourcePill(media.video, "Video", "film", false) : ""}
      </div>
      <audio controls preload="none" src="${escapeHtml(media.audio)}"></audio>
      ${media.video ? `
        <video class="episode-video" controls preload="metadata" playsinline poster="${escapeHtml(visual.src)}">
          <source src="${escapeHtml(media.video)}" type="video/mp4">
        </video>
      ` : ""}
    `;
  }

  function sourcePill(href, label, icon, external) {
    const target = external ? ' target="_blank" rel="noreferrer"' : "";
    return `<a class="source-pill" href="${escapeHtml(href)}"${target}><i data-lucide="${icon}"></i><span>${escapeHtml(label)}</span></a>`;
  }

  function blockMatchesQuery(block) {
    const query = state.query.trim().toLocaleLowerCase("cs-CZ");
    if (!query) return true;
    return block.text.toLocaleLowerCase("cs-CZ").includes(query);
  }

  function indexesForMode(volume) {
    if (state.mode === "zizka") {
      const indexes = new Set();
      volume.zizkaMentionIndexes.forEach((index) => {
        indexes.add(Math.max(0, index - 1));
        indexes.add(index);
        indexes.add(Math.min(volume.blocks.length - 1, index + 1));
      });
      return [...indexes].sort((a, b) => a - b);
    }
    return volume.blocks.map((_, index) => index);
  }

  function noteFor(text, usedNotes) {
    for (const rule of noteRules) {
      if (!usedNotes.has(rule.key) && rule.pattern.test(text)) {
        usedNotes.add(rule.key);
        return rule.note;
      }
    }
    return "";
  }

  function renderReader() {
    const volume = currentVolume();
    const content = qs("#readerContent");
    const stats = qs("#readerStats");
    const status = qs("#readerStatus");
    if (!volume || !content || !stats || !status) return;

    renderVolumeList();
    renderHeadingList();
    renderReaderSources();

    const modeIndexes = indexesForMode(volume);
    const visibleIndexes = modeIndexes.filter((index) => blockMatchesQuery(volume.blocks[index]));
    const usedNotes = new Set();

    stats.textContent = `${volume.stats.paragraphs} odstavců · ${formatNumber(volume.stats.characters)} znaků · ${volume.stats.zizkaMentions} výskytů jména Žižka`;
    status.textContent = `Zobrazeno ${formatNumber(visibleIndexes.length)} z ${formatNumber(modeIndexes.length)} bloků`;

    const visual = volumeVisuals[volume.id] || volumeVisuals["na-ukrajine"];
    const intro = `
      <header class="reader-volume-header">
        <div>
          <h3 class="reader-volume-title">${escapeHtml(volume.title)}</h3>
          <p class="reader-volume-subtitle">${escapeHtml(volume.summary)} ${escapeHtml(volume.subtitle)}.</p>
        </div>
        <figure class="reader-volume-visual">
          <img src="${escapeHtml(visual.src)}" alt="${escapeHtml(visual.alt)}" style="--focus:${escapeHtml(visual.focus || "center 28%")}">
          <figcaption>${escapeHtml(visual.caption)}</figcaption>
        </figure>
      </header>
    `;

    if (!visibleIndexes.length) {
      content.innerHTML = `${intro}<div class="reader-empty">Pro zadaný výraz tu není žádný viditelný odstavec.</div>`;
      renderIcons();
      return;
    }

    const html = visibleIndexes.map((index) => {
      const block = volume.blocks[index];
      const note = state.mode === "notes" ? noteFor(block.text, usedNotes) : "";
      return `
        <p class="reader-block" data-kind="${escapeHtml(block.kind)}" data-block-index="${index}">
          ${highlight(block.text)}
        </p>
        ${note ? `<aside class="reader-note">${escapeHtml(note)}</aside>` : ""}
      `;
    }).join("");

    content.innerHTML = intro + html;
    renderIcons();
  }

  function categoryLabel(category) {
    const item = glossaryCategories.find(([id]) => id === category);
    return item ? item[1] : category;
  }

  function glossaryMatchesTerm(item) {
    const categoryMatch = state.glossaryCategory === "all" || item.category === state.glossaryCategory;
    const query = state.glossaryQuery.trim().toLocaleLowerCase("cs-CZ");
    if (!categoryMatch) return false;
    if (!query) return true;
    const haystack = [item.term, item.body, item.category, ...item.related].join(" ").toLocaleLowerCase("cs-CZ");
    return haystack.includes(query);
  }

  function renderGlossary() {
    const filters = qs("#glossaryFilters");
    const grid = qs("#glossaryGrid");
    const count = qs("#glossaryCount");
    if (!filters || !grid) return;

    filters.innerHTML = glossaryCategories.map(([id, label]) => `
      <button class="filter-chip ${state.glossaryCategory === id ? "active" : ""}" data-glossary-category="${escapeHtml(id)}">
        ${escapeHtml(label)}
      </button>
    `).join("");

    const visibleTerms = glossaryTerms.filter(glossaryMatchesTerm);
    if (count) {
      count.textContent = `${formatNumber(visibleTerms.length)} z ${formatNumber(glossaryTerms.length)} pojmů`;
    }

    grid.innerHTML = visibleTerms.map((item) => `
      <article class="glossary-card">
        <div>
          <span class="glossary-tag">${escapeHtml(categoryLabel(item.category))}</span>
          <h3>${highlightGlossary(item.term)}</h3>
          <p>${highlightGlossary(item.body)}</p>
        </div>
        <div class="glossary-related">
          ${item.related.map((related) => `<span>${highlightGlossary(related)}</span>`).join("")}
        </div>
      </article>
    `).join("") || `<div class="reader-empty">Pro zadaný filtr tu není žádný pojem.</div>`;

    qsa(".filter-chip", filters).forEach((button) => {
      button.addEventListener("click", () => {
        state.glossaryCategory = button.dataset.glossaryCategory;
        renderGlossary();
      });
    });
  }

  function highlightGlossary(text) {
    const safe = escapeHtml(text);
    const query = state.glossaryQuery.trim();
    if (!query) return safe;
    const pattern = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return safe.replace(pattern, "<mark>$1</mark>");
  }

  function renderArchive() {
    const grid = qs("#archiveGrid");
    if (!grid) return;
    grid.innerHTML = archiveGroups.map((group) => `
      <article class="archive-card">
        <div>
          <h3>${escapeHtml(group.title)}</h3>
          <p>${escapeHtml(group.body)}</p>
        </div>
        <div class="archive-links">
          ${group.links.map(([href, label, icon, external, primary]) => `
            <a class="archive-link ${primary ? "primary" : ""}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
              <i data-lucide="${icon}"></i><span>${escapeHtml(label)}</span>
            </a>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function bindReaderControls() {
    qsa(".segment").forEach((button) => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.mode;
        qsa(".segment").forEach((segment) => segment.classList.toggle("active", segment === button));
        renderReader();
      });
    });

    const search = qs("#readerSearch");
    if (search) {
      search.addEventListener("input", () => {
        state.query = search.value;
        renderReader();
      });
    }
  }

  function bindGlossaryControls() {
    const search = qs("#glossarySearch");
    if (search) {
      search.addEventListener("input", () => {
        state.glossaryQuery = search.value;
        renderGlossary();
      });
    }
  }

  function init() {
    renderTimeline();
    renderRoute();
    renderRouteDetail();
    renderReader();
    renderGlossary();
    renderArchive();
    bindReaderControls();
    bindGlossaryControls();
    renderIcons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
