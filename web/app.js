(function () {
  const data = window.NOVEL_DATA || { volumes: [] };
  const numberFormatter = new Intl.NumberFormat("cs-CZ");
  const state = {
    volumeIndex: 0,
    mode: "full",
    query: "",
    routeIndex: 0
  };

  const timeline = [
    {
      date: "30. 8. 1896",
      title: "Krčmaň u Olomouce",
      body: "Jan Žižka se narodil v hanácké obci Krčmaň. Pozdější prameny ho vedou jako důstojníka, legionáře a také sběratele exlibris."
    },
    {
      date: "13. 4. 1915",
      title: "54. pěší pluk",
      body: "Po vypuknutí první světové války byl odveden jako jednoroční dobrovolník k olomouckému 54. pěšímu pluku rakousko-uherské armády."
    },
    {
      date: "1915 / 1916",
      title: "Stanislav",
      body: "Zdroje se rozcházejí v datu zajetí u Stanislavi. ČsOL/VÚA uvádí 7. 8. 1916, VHÚ 3. 10. 1915. Obě linie se shodují na přechodu z císařské armády k legiím."
    },
    {
      date: "1917",
      title: "Československé legie v Rusku",
      body: "Vstoupil do československého vojska v Rusku. Databáze ČsOL ho vede u 7. střeleckého pluku, později u úderného praporu."
    },
    {
      date: "1918-1920",
      title: "Úderný prapor a anabáze",
      body: "Žižkova stopa se potkává s románovým světem Třetí úderné: ešelony, těplušky, boje na magistrále, Ural a cesta k návratu."
    },
    {
      date: "23. 7. 1920",
      title: "Návrat do vlasti",
      body: "Podle ČsOL/VÚA skončil v legiích 23. 7. 1920 a vrátil se domů jako podporučík. V československé armádě zůstal jako důstojník z povolání."
    },
    {
      date: "1921-1936",
      title: "Prvním republice ve službě",
      body: "Sloužil u hraničářských, horských a pěších útvarů. Prošel Domažlicemi, Dolním Kubínem, Valašským Meziříčím a dalšími posádkami."
    },
    {
      date: "1. 7. 1936",
      title: "Major pěchoty",
      body: "V roce 1936 byl povýšen na majora pěchoty. Tato hodnost se stala součástí jeho pozdější paměti i pietního označení."
    },
    {
      date: "1938",
      title: "Strážní prapor XXII",
      body: "V kritickém roce 1938 velel Strážnímu praporu XXII v oblasti Kamenického Šenova a Lužických hor, spojenému s obranou pohraničního opevnění."
    },
    {
      date: "1939-1945",
      title: "Okupace a civilní život",
      body: "Po likvidaci československé branné moci odešel do civilu. V pramenech vystupuje i jako kulturní člověk, sběratel a redaktor exlibrisových zpráv."
    },
    {
      date: "9. 5. 1945",
      title: "Dejvice",
      body: "V Pražském povstání se přidal k bojům a padl v samotném závěru války na barikádě v Dejvicích, u Velflíkovy ulice a Flemingova náměstí."
    }
  ];

  const routePoints = [
    {
      date: "1896",
      place: "Krčmaň",
      title: "Začátek na Hané",
      x: 13,
      y: 43,
      body: "Rodná obec ukotvuje biografii v konkrétním moravském místě. Web odtud vede trasu přes válku, legie, republiku a Prahu."
    },
    {
      date: "1915/1916",
      place: "Stanislav",
      title: "Zajetí na východní frontě",
      x: 25,
      y: 52,
      body: "Stanislav, dnešní Ivano-Frankivsk, je pramenným uzlem. Odtud se Žižkův život přesouvá z rakousko-uherské služby do legionářské dráhy."
    },
    {
      date: "1917-1918",
      place: "Berezaň / Borispol",
      title: "Zrod Třetí úderné",
      x: 34,
      y: 58,
      body: "První díl románu zachycuje ukrajinský prostor, výcvik a formování údernické identity. V těchto kapitolách je Žižka výrazně přítomen."
    },
    {
      date: "březen 1918",
      place: "Bachmač",
      title: "Na východ",
      x: 42,
      y: 49,
      body: "Ústup z Ukrajiny a pohyb ešelonů otevírají cestu k magistrále. Románový rytmus určují vlaky, zprávy, nejistota a čekání."
    },
    {
      date: "květen-červen 1918",
      place: "Petropavlovsk",
      title: "Vlastním pořádkem",
      x: 54,
      y: 41,
      body: "Po rozhodnutí postupovat dál vlastní silou se příběh mění v bojovou kroniku. Noční útoky a práce malých skupin patří k nejdramatičtějším scénám."
    },
    {
      date: "léto 1918",
      place: "Jekatěrinburg",
      title: "Ural a ruská demokracie",
      x: 66,
      y: 46,
      body: "Čtvrtý díl románu se rozrůstá o Ural, broněviky, obchvaty, politiku a napětí mezi odjezdem domů a dalším bojem v Rusku."
    },
    {
      date: "1919",
      place: "Magistrála",
      title: "Ochrana trati",
      x: 78,
      y: 52,
      body: "Ochrana Transsibiřské magistrály je vojensky i psychologicky jiný typ služby. Vojáci už nečekají slávu bitvy, ale dlouhé vyčerpání."
    },
    {
      date: "1920",
      place: "Vladivostok",
      title: "Cesta domů",
      x: 90,
      y: 61,
      body: "Závěr románu vede přes oceán a návrat do Evropy. Dlouhá cesta domů uzavírá anabázi a vrací legionáře do nové republiky."
    },
    {
      date: "1945",
      place: "Praha 6",
      title: "Poslední barikáda",
      x: 16,
      y: 31,
      body: "Biografická trasa se uzavírá v Dejvicích. Žižka padl 9. května 1945, kdy se pro mnoho lidí osvobození potkalo s poslední palbou."
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
    }
  ];

  const characters = [
    {
      tag: "biografie",
      title: "Jan Žižka",
      body: "Major pěchoty, ruský legionář, úderník, sběratel exlibris a padlý bojovník Pražského povstání."
    },
    {
      tag: "román",
      title: "Míla",
      body: "Jedna z výrazných čtenářských postav Třetí úderné. Jeho pohled často drží tempo scén mezi humorem, únavou a prudkým bojem."
    },
    {
      tag: "jednotka",
      title: "Třetí úderná rota",
      body: "Kolektivní hrdina románu: bratři v ešelonech, nočních útocích, debatách, improvizaci a dlouhém návratu domů."
    },
    {
      tag: "velení",
      title: "Sergej Vojcechovský",
      body: "Velitel spojený s čeljabinskou skupinou a operacemi na Urale. V románové mapě drží vojenský rámec rozsáhlých přesunů."
    },
    {
      tag: "politika",
      title: "Štefánik a Gajda",
      body: "Dvě jména, která v pozdějších dílech přinášejí zprávy z domova, politické napětí a otázku, zda ještě bojovat, nebo už jet domů."
    },
    {
      tag: "pojem",
      title: "Exlibris",
      body: "Nečekaná kulturní vrstva Žižkovy osobnosti. V katalogových záznamech vystupuje jako sběratel a autor soupisů."
    }
  ];

  const archiveGroups = [
    {
      title: "Životopis a pátrání",
      body: "Místní syntézy k Janu Žižkovi, jeho vojenské službě, pramenným rozporům a paměti.",
      links: [
        ["../Major Jan Žižka (1896–1945).docx", "Biografie DOCX", "file-text", false, true],
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
      body: "Komplexní složka obsahuje také zvukové verze. Portrét je použitý jako hlavní vizuální motiv webu.",
      links: [
        ["../Komplexní/I. díl.mp3", "I. MP3", "volume-2", false, true],
        ["../Komplexní/II. díl.mp3", "II. MP3", "volume-2", false, false],
        ["../Komplexní/III. díl.mp3", "III. MP3", "volume-2", false, false],
        ["../Komplexní/IV. díl.mp3", "IV. MP3", "volume-2", false, false],
        ["../Komplexní/V. díl.mp3", "V. MP3", "volume-2", false, false],
        ["../Video_Generation_Request_Fulfilled.mp4", "Video", "film", false, false]
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
    detail.innerHTML = `
      <span class="route-meta">${escapeHtml(point.date)} · ${escapeHtml(point.place)}</span>
      <h3>${escapeHtml(point.title)}</h3>
      <p>${escapeHtml(point.body)}</p>
    `;
  }

  function currentVolume() {
    return data.volumes[state.volumeIndex] || data.volumes[0];
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
    panel.innerHTML = `
      <div class="source-row">
        ${sourcePill(volume.sourcePdf, "PDF", "file", false)}
        ${sourcePill(volume.sourceDoc, "DOCX", "file-type", false)}
      </div>
      <audio controls preload="none" src="${escapeHtml(volume.audio)}"></audio>
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

    const intro = `
      <header class="reader-volume-header">
        <h3 class="reader-volume-title">${escapeHtml(volume.title)}</h3>
        <p class="reader-volume-subtitle">${escapeHtml(volume.summary)} ${escapeHtml(volume.subtitle)}.</p>
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

  function renderCharacters() {
    const grid = qs("#characterGrid");
    if (!grid) return;
    grid.innerHTML = characters.map((item) => `
      <article class="character-card">
        <span class="tag">${escapeHtml(item.tag)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `).join("");
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

  function init() {
    renderTimeline();
    renderRoute();
    renderRouteDetail();
    renderReader();
    renderCharacters();
    renderArchive();
    bindReaderControls();
    renderIcons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
