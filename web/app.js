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
      body: "Jan Žižka se narodil v hanácké Krčmani. Nová vojenskohistorická analýza ho staví jako osud jedné generace: od císařské uniformy přes legie až k obraně republiky v roce 1938 a na barikádě roku 1945."
    },
    {
      date: "před 1915",
      title: "Brněnské gymnázium",
      body: "Před odvodem studoval gymnázium v Brně. Válka mu vzdělání přerušila, maturitu dokončil až po návratu z Ruska dne 23. 9. 1920."
    },
    {
      date: "13. 4. 1915",
      title: "54. pěší pluk",
      body: "Byl odveden jako jednoroční dobrovolník k olomouckému 54. pěšímu pluku, neformálně Hanáckému pluku. Tento status odpovídal vzdělanému branci s rychlejší cestou k poddůstojnické nebo důstojnické službě."
    },
    {
      date: "1915 / 1916",
      title: "Stanislav",
      body: "Do ruského zajetí padl jako desátník u Stanislavi, dnešního Ivano-Frankivsku. Prameny drží dvě data: 3. 10. 1915 a 7. 8. 1916. Rozdíl je nutné nechat otevřený, shodný je však zlom od monarchie k legiím."
    },
    {
      date: "1917",
      title: "7. střelecký pluk Tatranský",
      body: "Do československého vojska v Rusku vstoupil podle pramenů buď 3. 1., nebo 1. 8. 1917. Původně je veden u 7. československého střeleckého pluku Tatranského."
    },
    {
      date: "26. 9. 1917",
      title: "I. úderný prapor",
      body: "Byl zařazen k elitnímu I. údernému praporu. Úderníci byli dobrovolníci pro nejtěžší práci: průzkum, prudký útok, boj zblízka, granáty, nože a rychlé rozhodování v malých skupinách."
    },
    {
      date: "1918",
      title: "Magistrála a mobilní válka",
      body: "Během občanské války v Rusku se jeho služba odehrávala v pohyblivé válce o železniční uzly, mosty, sklady, obrněné vlaky a ešelony. Právě tady se biografie nejvíc potkává s románem Třetí úderná."
    },
    {
      date: "10. 3. 1919",
      title: "Praporčík",
      body: "Po bojových zkušenostech a důstojnické škole byl povýšen na praporčíka. V legiích to nebyl jen formální postup, ale potvrzení autority získané ve službě a v boji."
    },
    {
      date: "23. 7. / 23. 9. 1920",
      title: "Návrat a maturita",
      body: "V legiích skončil 23. 7. 1920 jako podporučík a po návratu rychle dokončil brněnskou maturitu. Poté se rozhodl zůstat v československé armádě jako důstojník z povolání."
    },
    {
      date: "listopad 1920",
      title: "Hraničářský prapor 6",
      body: "Převzal velení čety u hraničářského praporu 6 v Domažlicích. Mladá republika potřebovala legionáře právě na hranicích, kde se vojenská služba potkávala s bezpečnostní každodenností."
    },
    {
      date: "1. 11. 1921",
      title: "Kapitán a technická rota",
      body: "Dosáhl hodnosti kapitána a velel technické rotě. Do jeho profilu tak vedle pěchotní zkušenosti vstupují ženijní, spojovací a organizační schopnosti."
    },
    {
      date: "1925-1926",
      title: "Horský prapor a letecký kurz",
      body: "Sloužil u Horského praporu 3 v Dolním Kubíně. Na jaře 1926 absolvoval v Chebu moderní kurz pěchotních pozorovatelů z letounů a v červnu 1926 byl povýšen na štábního kapitána."
    },
    {
      date: "1933-1936",
      title: "Horské a pěší útvary",
      body: "Ve třicátých letech prošel Horským pěším plukem 1 a poté pěším plukem 40 ve Valašském Meziříčí. Dne 1. 7. 1936 byl povýšen na majora pěchoty."
    },
    {
      date: "1938",
      title: "Strážní prapor XXII",
      body: "V Lužických horách velel Strážnímu praporu XXII. Jeho úsek sahal od Dolského mlýna přes Kamenický Šenov až k zalesněné kótě Bouřný a opíral se o lehké opevnění."
    },
    {
      date: "září 1938",
      title: "SOS, Freikorps a Mnichov",
      body: "Po útocích Sudetendeutsches Freikorps a krizi Stráže obrany státu se Žižkův prapor stal pevnou hrází za předsunutými hlídkami. Po Mnichovu musel dohlédnout na disciplinované vyklizení pozic bez boje."
    },
    {
      date: "březen 1939",
      title: "Praha a ztracená uniforma",
      body: "Krátce před okupací byl převelen do Prahy k Ministerstvu národní obrany. Po rozpuštění armády žil s manželkou Olgou v Praze jako bývalý důstojník zaniklého státu."
    },
    {
      date: "1939-1945",
      title: "Odboj s opatrnou poznámkou",
      body: "Dokument upozorňuje na častou záměnu skutečného majora s odbojovými skupinami nesoucími jméno Jan Žižka. Jeho každodenní vazba na Obranu národa není výslovně doložená, jisté je čekání na příležitost k ozbrojenému vystoupení."
    },
    {
      date: "5.-9. 5. 1945",
      title: "Pražské povstání",
      body: "V Dejvicích a Bubenči blokovaly barikády ústupové trasy německých jednotek směrem k Ruzyni a na západ. U Žižky lze z jeho hodnosti a zkušenosti opatrně dovodit roli organizátora a instruktora v místním odporu."
    },
    {
      date: "9. 5. 1945",
      title: "Velflíkova a Flemingovo",
      body: "Na barikádě v prostoru Velflíkovy ulice a Flemingova náměstí byl zasažen střelou do krku a zemřel v poslední palbě povstání. Pietní deska je vedena v CEVH pod číslem CZE-0006-21198."
    }
  ];

  const routePoints = [
    {
      date: "1896",
      place: "Krčmaň",
      title: "Začátek na Hané",
      x: 13,
      y: 43,
      body: "Rodná obec ukotvuje biografii v konkrétním moravském místě. Web odtud vede trasu přes válku, legie, republiku a Prahu.",
      image: "assets/photos/pochod-legionaru-s-vlajkou-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce pochodu legionářů s československou vlajkou",
      imageCaption: "Legionářská služba jako pozdější biografický zlom.",
      imageFocus: "center 24%"
    },
    {
      date: "1915/1916",
      place: "Stanislav",
      title: "Zajetí na východní frontě",
      x: 25,
      y: 52,
      body: "Stanislav, dnešní Ivano-Frankivsk, je pramenným uzlem. Odtud se Žižkův život přesouvá z rakousko-uherské služby do legionářské dráhy.",
      image: "assets/photos/zajatecky-tabor-v-snehu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce zimního tábora s ostnatým drátem",
      imageCaption: "Zajetí, čekání a první kroky k československému vojsku.",
      imageFocus: "center 24%"
    },
    {
      date: "1917-1918",
      place: "Berezaň / Borispol",
      title: "Zrod Třetí úderné",
      x: 34,
      y: 58,
      body: "První díl románu zachycuje ukrajinský prostor, výcvik a formování údernické identity. V těchto kapitolách je Žižka výrazně přítomen.",
      image: "assets/photos/legionar-straz-na-rusi-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře na stráži u stanice",
      imageCaption: "Stráž, výcvik a každodennost vznikající úderné roty.",
      imageFocus: "center 22%"
    },
    {
      date: "březen 1918",
      place: "Bachmač",
      title: "Na východ",
      x: 42,
      y: 49,
      body: "Ústup z Ukrajiny a pohyb ešelonů otevírají cestu k magistrále. Románový rytmus určují vlaky, zprávy, nejistota a čekání.",
      image: "assets/photos/legionar-u-esalonu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře u ešalonu Čs. legie na Rusi",
      imageCaption: "Ešalon jako pohyblivé zázemí i bojový prostor.",
      imageFocus: "center 24%"
    },
    {
      date: "květen-červen 1918",
      place: "Petropavlovsk",
      title: "Vlastním pořádkem",
      x: 54,
      y: 41,
      body: "Po rozhodnutí postupovat dál vlastní silou se příběh mění v bojovou kroniku. Noční útoky a práce malých skupin patří k nejdramatičtějším scénám.",
      image: "assets/photos/nocni-utok-treti-uderne-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce nočního útoku Třetí úderné",
      imageCaption: "Noční útoky dávají třetímu dílu prudké tempo.",
      imageFocus: "center 42%"
    },
    {
      date: "léto 1918",
      place: "Jekatěrinburg",
      title: "Ural a ruská demokracie",
      x: 66,
      y: 46,
      body: "Čtvrtý díl románu se rozrůstá o Ural, broněviky, obchvaty, politiku a napětí mezi odjezdem domů a dalším bojem v Rusku.",
      image: "assets/photos/legionar-v-troskach-nadrazi-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce legionáře v troskách nádraží",
      imageCaption: "Ural a železniční uzly jako dramatické bojiště.",
      imageFocus: "center 25%"
    },
    {
      date: "1919",
      place: "Magistrála",
      title: "Ochrana trati",
      x: 78,
      y: 52,
      body: "Ochrana Transsibiřské magistrály je vojensky i psychologicky jiný typ služby. Vojáci už nečekají slávu bitvy, ale dlouhé vyčerpání.",
      image: "assets/photos/esalon-zasobovani-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce zásobování u legionářského ešalonu",
      imageCaption: "Dlouhá služba na magistrále stojí na vlacích, skladech a zásobování.",
      imageFocus: "center 24%"
    },
    {
      date: "1920",
      place: "Vladivostok",
      title: "Cesta domů",
      x: 90,
      y: 61,
      body: "Závěr románu vede přes oceán a návrat do Evropy. Dlouhá cesta domů uzavírá anabázi a vrací legionáře do nové republiky.",
      image: "assets/photos/navrat-legionare-domu-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce návratu legionáře k rodině u vlaku",
      imageCaption: "Návrat domů jako lidský závěr dlouhé anabáze.",
      imageFocus: "center 24%"
    },
    {
      date: "1945",
      place: "Praha 6",
      title: "Poslední barikáda",
      x: 16,
      y: 31,
      body: "Biografická trasa se uzavírá v Dejvicích, kde barikády blokovaly ústupové trasy německých jednotek k Ruzyni a na západ. Žižka padl 9. května 1945 na barikádě u Velflíkovy ulice a Flemingova náměstí; pamětní deska má evidenční číslo CZE-0006-21198.",
      image: "assets/photos/uder-pres-prekazku-thumb.jpg",
      imageAlt: "Obrazová rekonstrukce úderníka překonávajícího překážku",
      imageCaption: "Motiv úderníka se v životopise vrací i v posledním boji na barikádě.",
      imageFocus: "center 38%"
    }
  ];

  const noteRules = [
    {
      key: "těpluška",
      pattern: /těplušk/i,
      note: "Těpluška byl vytápěný nákladní vagon upravený k přepravě mužstva. V románu je zároveň domov, ubikace, klubovna i pozorovatelna světa za dveřmi ešalonu."
    },
    {
      key: "ešelon",
      pattern: /ešelon/i,
      note: "Ešelon označuje vojenský vlakový transport. U ruských legií se z něj stal pohyblivý tábor, sklad i bojová jednotka."
    },
    {
      key: "broněvik",
      pattern: /broněvik|panceřák/i,
      note: "Broněvik, obrněný vlak, byl pro boje na magistrále klíčový. Trať, lokomotivy a děla v románu často rozhodují stejně jako pěchota."
    },
    {
      key: "vlastním pořádkem",
      pattern: /vlastním pořádkem/i,
      note: "Formule vlastním pořádkem vyjadřuje rozhodnutí legií probít se dál vlastní silou, když se přeprava po Rusku změnila v otázku přežití."
    },
    {
      key: "Štefánik",
      pattern: /Štefánik/i,
      note: "Milan Rastislav Štefánik v sibiřské části příběhu symbolizuje spojení frontového života s politikou vznikajícího Československa."
    },
    {
      key: "Kolčak",
      pattern: /Kolčak/i,
      note: "Admirál Alexandr Kolčak vstupuje do příběhu jako mocenský faktor ruské občanské války. Pro legionáře znamenal komplikaci jejich návratu."
    },
    {
      key: "Žižka",
      pattern: /Žižk/i,
      note: "Žižkovy výskyty v románu je dobré číst dvojitě: jako stopu konkrétního legionáře a zároveň jako motiv jména zatíženého českou vojenskou pamětí."
    },
    {
      key: "úderný prapor",
      pattern: /údern(ý|ého|ém|í).*prapor|úderní/i,
      note: "Úderný prapor byl elitní dobrovolnický útvar určený pro rychlý útok, průzkum a boj zblízka. U Jana Žižky je doloženo zařazení k I. údernému praporu 26. 9. 1917."
    },
    {
      key: "přísaha",
      pattern: /přísah|slib/i,
      note: "Legionářská přísaha nebyla jen vojenský formalismus. Pro bývalé zajatce znamenala vědomý přechod do služby budoucí republice a riziko trestu smrti při opětovném zajetí monarchií."
    },
    {
      key: "sos",
      pattern: /\bSOS\b|Stráž obrany státu/i,
      note: "Stráž obrany státu spojovala četníky, policisty, finanční stráž a armádní posily. V roce 1938 tvořila předsunutou nárazníkovou vrstvu před armádními prapory v pohraničí."
    },
    {
      key: "freikorps",
      pattern: /Freikorps|henleinov/i,
      note: "Sudetendeutsches Freikorps byl ozbrojený sudetoněmecký útvar podporovaný nacistickým Německem. V září 1938 přepadával hlídky, úřady a pohraniční stanoviště."
    },
    {
      key: "barikáda",
      pattern: /barikád/i,
      note: "Pražské barikády měly zpomalit německou techniku a uzavřít ústupové trasy. Žižkův poslední boj je doložen u Velflíkovy ulice a Flemingova náměstí v Dejvicích."
    }
  ];

  const volumeVisuals = {
    "na-ukrajine": {
      src: "assets/photos/legionar-straz-na-rusi.jpg",
      alt: "Obrazová rekonstrukce legionáře na stráži u stanice Čs. legie na Rusi",
      caption: "Ukrajina, výcvik a první ešalonová zkušenost.",
      focus: "center 22%"
    },
    "na-vychod": {
      src: "assets/photos/legionar-bajkal-tunel.jpg",
      alt: "Obrazová rekonstrukce legionáře u zimní železniční trati a tunelu",
      caption: "Cesta na východ v těpluškách a vojenských vlacích.",
      focus: "center 24%"
    },
    "vlastnim-poradkem": {
      src: "assets/photos/nocni-utok-treti-uderne.jpg",
      alt: "Obrazová rekonstrukce nočního útoku Třetí úderné",
      caption: "Rozhodnutí postupovat vlastním pořádkem.",
      focus: "center 42%"
    },
    "za-ruskou-demokracii": {
      src: "assets/photos/legionar-v-troskach-nadrazi.jpg",
      alt: "Obrazová rekonstrukce legionáře v troskách železničního uzlu",
      caption: "Ural, broněviky a boje na magistrále.",
      focus: "center 24%"
    },
    "cesta-domu": {
      src: "assets/photos/navrat-legionare-domu.jpg",
      alt: "Obrazová rekonstrukce návratu legionáře k rodině u vlaku",
      caption: "Návrat přes Vladivostok, oceány a Kanadu.",
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
      body: "Dlouhá cesta československých legionářů přes Rusko a Sibiř k Vladivostoku a potom lodí a vlakem zpět do vlasti. Ve webu je to spojnice mezi mapou, románem a Žižkovou službou.",
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
      body: "Major pěchoty, ruský legionář, úderník, sběratel exlibris a účastník posledních bojů v Praze. Nejde o Jana Žižku z Trocnova ani o partyzánskou brigádu nesoucí jeho jméno; web sleduje skutečného důstojníka narozeného roku 1896.",
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
      body: "Zkrácené označení pro Transsibiřskou magistrálu. V Třetí úderné není jen trať, ale hlavní osa přežití, zásobování, bojů a návratu.",
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
      body: "Románová kronika legionářské roty v pěti svazcích. Na webu funguje jako textový archiv, mapa pojmů i čtenářský prostor s audio a video epizodami.",
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
      body: "Prapor, kterému Žižka velel v roce 1938 v Lužických horách. Bránil úsek lehkého opevnění od Dolského mlýna přes Kamenický Šenov směrem ke kótě Bouřný.",
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
      body: "Místní syntézy k Janu Žižkovi, jeho vojenské službě, pramenným rozporům, roku 1938, Pražskému povstání a paměti.",
      links: [
        ["assets/docs/jan-zizka-vojenska-draha-a-smrt.docx", "Vojenská dráha DOCX", "file-text", false, true],
        ["../Major Jan Žižka (1896–1945).docx", "Biografie DOCX", "file-text", false, false],
        ["../Pátrání po majoru Janu Žižkovi.docx", "Pátrání DOCX", "file-search", false, false]
      ]
    },
    {
      title: "PDF facsimile románu",
      body: "Původní skeny všech dílů Třetí úderné, vhodné pro kontrolu přepisu a práci se stránkou.",
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
      body: "Čistší textová vrstva, ze které je napojená interaktivní čtečka na této stránce.",
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
      body: "Nové podcastové stopy, pět video epizod, aktualizovaná mapa a obrazová rekonstrukce legionářských scén.",
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
      body: "Externí stránky k identitě, službě, pietnímu místu, exlibris a kontextu legií v Rusku.",
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
      <p class="reader-source-caption">${escapeHtml(media.label)} · podcast, video a Žižkova biografická vrstva k aktuálnímu dílu románu</p>
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
