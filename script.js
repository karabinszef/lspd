window.onload = function() {
    // 1. Inicjalizacja konsoli
    console.log("Initializing LSPD Secure Connection...");
    setTimeout(() => { console.log("Bypassing Firewalls..."); }, 200);
    setTimeout(() => { console.log("Database Linked. Access Granted."); }, 500);
    
    // 2. Obsługa Nawigacji i Dźwięków (Złączone w jedno, by uniknąć dublowania)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Dźwięk kliknięcia
            let audio = new Audio('https://www.soundjay.com/buttons/sounds/button-50.mp3');
            audio.volume = 0.1;
            audio.play();

            // Przełączanie klas active
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Przełączanie sekcji
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) targetSection.classList.add('active');
        });
    });

    // 3. Start Dispatchu
    addDispatchEntry(); // Pierwszy od razu
    setTimeout(addDispatchEntry, 1500); // Drugi szybko po nim
    nextInterval(); // Rozpoczęcie pętli
};

// --- SYSTEM DISPATCH ---
const locations = ["Davis", "Strawberry", "Mission Row", "Vinewood", "Sandy Shores", "Paleto Bay", "Vespucci Beach", "Rockford Hills", "Pillbox Hill"];
const codes = [
    { code: "Kod 6", desc: "Zatrzymanie Drogowe", color: "#007bff" },
    { code: "10-80", desc: "Rozpoczęcie pościgu", color: "#ff0000" },
    { code: "10-71", desc: "Strzały", color: "#ff4444" },
    { code: "10-64", desc: "Ucieczka z więzienia", color: "#ff0000" },
    { code: "10-72", desc: "Sprzedaż narkotyków", color: "#ffaa00" },
    { code: "10-70", desc: "Kradzież pojazdu", color: "#00ff00" }
];
const units = ["ADAM", "EDWARD", "MERRY", "EAGLE"];

function addDispatchEntry() {
    const feed = document.getElementById('dispatch-feed');
    if (!feed) return;

    const location = locations[Math.floor(Math.random() * locations.length)];
    const codeObj = codes[Math.floor(Math.random() * codes.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const entry = document.createElement('p');
    entry.style.marginBottom = "8px";
    
    const content = `[${time}] <span style="color: ${codeObj.color}; font-weight: bold;">${codeObj.code}</span> | UNIT: ${unit} | LOC: ${location}`;
    
    feed.prepend(entry);

    // PRZYSPIESZONY EFEKT PISANIA (10ms zamiast 20ms)
    let i = 0;
    const typeWriter = () => {
        if (i < content.length) {
            entry.innerHTML = content.substring(0, i + 1) + '<span class="cursor">_</span>';
            i++;
            setTimeout(typeWriter, 10); 
        } else {
            entry.innerHTML = content;
        }
    };
    
    typeWriter();

    if (feed.children.length > 7) {
        feed.removeChild(feed.lastChild);
    }
}

// Nowe zgłoszenie częściej (co 15-30 sekund)
const nextInterval = () => {
    const randomTime = Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);
    setTimeout(() => {
        addDispatchEntry();
        nextInterval();
    }, randomTime);
};

// --- SYSTEM DOSSIER (MODAL) ---
function openDossier(name, reward, crimes, loc) {
    const modal = document.getElementById('criminal-modal');
    const dataPanel = document.getElementById('modal-data');
    
    if (!modal || !dataPanel) return;

    dataPanel.style.opacity = "0";
    modal.style.display = 'flex';
    
    // Dźwięk otwarcia
    let audio = new Audio('https://www.soundjay.com/buttons/sounds/button-37.mp3');
    audio.volume = 0.2;
    audio.play();
    
    // PRZYSPIESZONE ŁADOWANIE DANYCH (400ms zamiast 800ms)
    setTimeout(() => {
        document.getElementById('modal-name').innerText = name.toUpperCase();
        document.getElementById('modal-reward').innerText = "BOUNTY: " + reward;
        document.getElementById('modal-crimes').innerText = crimes;
        document.getElementById('modal-loc').innerText = loc;
        dataPanel.style.opacity = "1";
        dataPanel.style.transition = "0.3s";
    }, 400); 
}

function closeCriminalDossier() {
    document.getElementById('criminal-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('criminal-modal');
    if (event.target == modal) {
        closeCriminalDossier();
    
    // Opcjonalnie: dźwięk skanowania
    let audio = new Audio('https://www.soundjay.com/buttons/sounds/button-37.mp3');
    audio.volume = 0.2;
    audio.play();
}

function closeCriminalDossier() {
    document.getElementById('criminal-modal').style.display = 'none';
}

// Zamknij po kliknięciu poza modalem
window.onclick = function(event) {
    const modal = document.getElementById('criminal-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




function openDossier(name, reward, crimes, loc) {
    const modal = document.getElementById('criminal-modal');
    const dataPanel = document.getElementById('modal-data');
    
    // Ukrywamy dane na start, żeby pokazać loading
    dataPanel.style.opacity = "0";
    modal.style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('modal-name').innerText = name.toUpperCase();
        document.getElementById('modal-reward').innerText = "BOUNTY: " + reward;
        document.getElementById('modal-crimes').innerText = crimes;
        document.getElementById('modal-loc').innerText = loc;
        dataPanel.style.opacity = "1";
        dataPanel.style.transition = "0.5s";
    }, 800); // Czekamy na pasek ładowania
}

function closeCriminalDossier() {
    document.getElementById('criminal-modal').style.display = 'none';
}
}
const criminalsDB = [
    // --- GANGI ULICZNE (Vagos, Families, Ballas) ---
    { name: "S. HERNANDEZ", bounty: "$120,000", id: "#LSPD-8821-X", crimes: "Napad z bronią, morderstwo, ucieczka", desc: "Tatuaże na szyi, blizna na policzku.", intel: "Gang Vagos. Widziany w Davis.", priority: "WYSOKIE" },
    { name: "D. JOHNSON", bounty: "$45,000", id: "#LSPD-1120-G", crimes: "Handel narkotykami, napaść", desc: "Zielona chusta, wysoki wzrost.", intel: "The Families. Często przebywa na Chamberlain Hills.", priority: "ŚREDNIE" },
    { name: "T. BARKLEY", bounty: "$60,000", id: "#LSPD-4401-P", crimes: "Strzelanina z auta, haracze", desc: "Fioletowa czapka, tatuaż 'Ballas' na przedramieniu.", intel: "Ballas. Widziany w okolicach Grove Street.", priority: "WYSOKIE" },
    { name: "R. OCHOA", bounty: "$95,000", id: "#LSPD-9902-V", crimes: "Porwanie, handel bronią", desc: "Brak koszulki, liczne tatuaże religijne.", intel: "Vagos. Ukrywa się w Rancho.", priority: "WYSOKIE" },
    { name: "K. WASHINGTON", bounty: "$30,000", id: "#LSPD-2210-F", crimes: "Wandalizm, kradzież kieszonkowa", desc: "Niebieskie buty, złoty łańcuch.", intel: "Drobny diler z Davis.", priority: "NISKIE" },

    // --- MAFIA I PRZESTĘPCZOŚĆ ZORGANIZOWANA ---
    { name: "G. BOTTICELLI", bounty: "$250,000", id: "#LSPD-7700-M", crimes: "Zabójstwo na zlecenie, pranie brudnych pieniędzy", desc: "Zawsze w garniturze, siwe włosy.", intel: "Rodzina Madrazo. Widziany w Vinewood Hills.", priority: "KRYTYCZNE" },
    { name: "L. BELLUCCI", bounty: "$200,000", id: "#LSPD-1002-Z", crimes: "Zabójstwo polityka, terroryzm", desc: "Elegancki ubiór, okulary przeciwsłoneczne.", intel: "Włoski syndykat. Może być uzbrojony w broń ciężką.", priority: "KRYTYCZNE" },
    { name: "Y. NAKAMURA", bounty: "$180,000", id: "#LSPD-3305-Y", crimes: "Szpiegostwo przemysłowe, handel ludźmi", desc: "Tatuaż smoka na plecach, krótka broda.", intel: "Yakuza. Operuje w rejonie Małego Seulu.", priority: "KRYTYCZNE" },
    { name: "V. IVANOV", bounty: "$150,000", id: "#LSPD-6601-R", crimes: "Przemyt kokainy, tortury", desc: "Blizna nad prawym okiem, rosyjski akcent.", intel: "Rosyjska mafia. Widziany w porcie.", priority: "WYSOKIE" },
    { name: "A. KOVACS", bounty: "$110,000", id: "#LSPD-8804-K", crimes: "Wymuszenia, nielegalny hazard", desc: "Skórzana kurtka, brak palca u lewej dłoni.", intel: "Wschodnioeuropejska siatka przestępcza.", priority: "WYSOKIE" },

    // --- KLUBY MOTOCYKLOWE (The Lost MC) ---
    { name: "B. 'HULK' MILLER", bounty: "$75,000", id: "#LSPD-5501-L", crimes: "Napaść z użyciem niebezpiecznego narzędzia", desc: "Długa broda, kamizelka The Lost MC.", intel: "The Lost MC. Widziany w Sandy Shores.", priority: "WYSOKIE" },
    { name: "J. 'ACE' REED", bounty: "$40,000", id: "#LSPD-5590-C", crimes: "Kradzieże motocykli, bójki barowe", desc: "Liczne kolczyki, irokez.", intel: "Klub motocyklowy. Często w barze Yellow Jack.", priority: "ŚREDNIE" },
    { name: "D. 'SNAKE' VANCE", bounty: "$55,000", id: "#LSPD-1102-S", crimes: "Produkcja metamfetaminy", desc: "Chudy, tatuaż węża na szyi.", intel: "Operuje z przyczepy w Blaine County.", priority: "WYSOKIE" },

    // --- POSZUKIWANI ZA NAPADY ---
    { name: "M. DVORAK", bounty: "$85,000", id: "#LSPD-4412-A", crimes: "Napad na bank, kradzież opancerzonego wozu", desc: "Maska klauna (często), atletyczna budowa.", intel: "Profesjonalny włamywacz. Rockford Hills.", priority: "WYSOKIE" },
    { name: "F. SINATRA JR.", bounty: "$90,000", id: "#LSPD-2204-J", crimes: "Oszustwa bankowe, wielka kradzież aut", desc: "Blondyn, gładko ogolony.", intel: "Kradnie luksusowe auta w Vinewood.", priority: "ŚREDNIE" },
    { name: "K. 'GHOST' RYDER", bounty: "$130,000", id: "#LSPD-0099-G", crimes: "Snajper, zabójstwa funkcjonariuszy", desc: "Zawsze zamaskowany, czarny strój taktyczny.", intel: "Lokalizacja nieznana. Działa solo.", priority: "KRYTYCZNE" },

    // --- PRZESTĘPCY Z BLAINE COUNTY ---
    { name: "C. CLEETUS", bounty: "$20,000", id: "#LSPD-3301-C", crimes: "Nielegalne polowania, kradzież bydła", desc: "Czapka z daszkiem, brak kilku zębów.", intel: "Okolice Paleto Bay.", priority: "NISKIE" },
    { name: "W. WHITEHEAD", bounty: "$50,000", id: "#LSPD-7788-W", crimes: "Podpalenia, niszczenie mienia", desc: "Poparzona dłoń, zapach benzyny.", intel: "Piroman. Widziany w Sandy Shores.", priority: "ŚREDNIE" },
    { name: "M. 'MAMA' BAKER", bounty: "$65,000", id: "#LSPD-6655-M", crimes: "Prowadzenie nielegalnego kasyna", desc: "Starsza kobieta, dużo biżuterii.", intel: "Grapeseed. Chroniona przez rodzinę.", priority: "ŚREDNIE" },

    // --- I POZOSTAŁE 31 PROFILI (Zróżnicowane) ---
    { name: "A. ARNAULT", bounty: "$140,000", id: "#LSPD-1212-B", crimes: "Przemyt dzieł sztuki", desc: "Francuski akcent, nienaganny styl.", intel: "Prawdopodobnie przebywa w hotelu Richman.", priority: "ŚREDNIE" },
    { name: "J. WICKED", bounty: "$300,000", id: "#LSPD-0001-W", crimes: "Eliminacja całych oddziałów policji", desc: "Czarny garnitur, spokój w działaniu.", intel: "Nie podchodzić bez wsparcia SWAT.", priority: "KRYTYCZNE" },
    { name: "E. ESCORBAR", bounty: "$125,000", id: "#LSPD-4455-E", crimes: "Dystrybucja narkotyków na dużą skalę", desc: "Wąsy, hawajska koszula.", intel: "Widziany w rejonie lotniska.", priority: "WYSOKIE" },
    { name: "P. 'TINY' SMALLS", bounty: "$15,000", id: "#LSPD-1111-T", crimes: "Drobne kradzieże, ucieczka z izby zatrzymań", desc: "Bardzo niski wzrost, nadwaga.", intel: "Często w rejonie plaży Vespucci.", priority: "NISKIE" },
    { name: "S. ZAKHAEV", bounty: "$190,000", id: "#LSPD-7777-Z", crimes: "Przemyt materiałów wybuchowych", desc: "Mundur wojskowy bez oznaczeń.", intel: "Podejrzenie o terroryzm. Baza Fort Zancudo (okolice).", priority: "KRYTYCZNE" },
    { name: "M. MADRAZO JR.", bounty: "$500,000", id: "#LSPD-0000-M", crimes: "Zarządzanie kartelen, liczne morderstwa", desc: "Blizna na szyi, luksusowy zegarek.", intel: "Ranczo La Fuente Blanca.", priority: "KRYTYCZNE" },
    { name: "N. BELLIC", bounty: "$80,000", id: "#LSPD-1998-N", crimes: "Wojna gangów, kradzieże", desc: "Dres, wschodnioeuropejskie rysy twarzy.", intel: "Widziany w Strawberry.", priority: "WYSOKIE" },
    { name: "C. JOHNSON", bounty: "$70,000", id: "#LSPD-1992-C", crimes: "Napad na pociąg, ucieczka z więzienia", desc: "Biały podkoszulek, tatuaż 'Grove Street'.", intel: "Ostatnio widziany w Ganton.", priority: "WYSOKIE" },
    { name: "T. PHILIPS", bounty: "$999,000", id: "#LSPD-6666-T", crimes: "Masowe morderstwa, kanibalizm, produkcja narkotyków", desc: "Łysiejący, brudne ubrania, nieobliczalny.", intel: "Sandy Shores. Unikać za wszelką cenę.", priority: "KRYTYCZNE" },
    { name: "M. DE SANTA", bounty: "$450,000", id: "#LSPD-2013-M", crimes: "Napad na Union Depository", desc: "Wygląda jak bogaty biznesmen, tenisista.", intel: "Rockford Hills. Może być pod ochroną FIB.", priority: "KRYTYCZNE" },
    { name: "F. CLINTON", bounty: "$120,000", id: "#LSPD-2013-F", crimes: "Wielka kradzież aut, napady", desc: "Czapka z daszkiem, wysportowany.", intel: "Vinewood Hills. Ekspert od ucieczek samochodem.", priority: "WYSOKIE" },
    { name: "L. CREST", bounty: "$1,000,000", id: "#LSPD-9999-L", crimes: "Hakerstwo, planowanie napadów stulecia", desc: "Kule, nadwaga, okulary.", intel: "Mózg operacji. Lokalizacja nieznana.", priority: "KRYTYCZNE" },
    { name: "B. CRANSTON", bounty: "$115,000", id: "#LSPD-0050-B", crimes: "Produkcja chemiczna, handel", desc: "Kapelusz, okulary, kozia bródka.", intel: "Może poruszać się kamperem.", priority: "WYSOKIE" },
    { name: "J. PINKMAN", bounty: "$45,000", id: "#LSPD-0051-J", crimes: "Dystrybucja metamfetaminy", desc: "Bluza z kapturem, młody wygląd.", intel: "Prawdopodobnie wspólnik B. Cranstona.", priority: "ŚREDNIE" },
    { name: "S. GOODMAN", bounty: "$35,000", id: "#LSPD-0052-S", crimes: "Pomoc w ucieczce, pranie pieniędzy", desc: "Tani garnitur, kwiecisty język.", intel: "Prawnik przestępców.", priority: "ŚREDNIE" },
    { name: "H. SALAMANCA", bounty: "$160,000", id: "#LSPD-0053-H", crimes: "Brutalne morderstwa, handel", desc: "Srebrna laska, groźne spojrzenie.", intel: "Wysoki szczebel kartelu.", priority: "KRYTYCZNE" },
    { name: "T. SALAMANCA", bounty: "$140,000", id: "#LSPD-0054-T", crimes: "Napaści, handel", desc: "Złote zęby, agresywny.", intel: "Nieprzewidywalny pod wpływem narkotyków.", priority: "WYSOKIE" },
    { name: "G. FRING", bounty: "$600,000", id: "#LSPD-0055-G", crimes: "Szef imperium narkotykowego", desc: "Okulary, spokojny, właściciel restauracji.", intel: "Ukrywa się za legalnym biznesem.", priority: "KRYTYCZNE" },
    { name: "K. EHRMANTRAUT", bounty: "$220,000", id: "#LSPD-0056-K", crimes: "Zabójstwa, czyszczenie miejsc zbrodni", desc: "Starszy człowiek, bez emocji.", intel: "Były policjant. Bardzo groźny.", priority: "KRYTYCZNE" },
    { name: "D. MORGAN", bounty: "$135,000", id: "#LSPD-0060-D", crimes: "Seryjny morderca", desc: "Koszula w paski, brak emocji.", intel: "Działa głównie w nocy przy dokach.", priority: "WYSOKIE" },
    { name: "J. SOBRANO", bounty: "$185,000", id: "#LSPD-0070-J", crimes: "Haracze, hazard, morderstwa", desc: "Włoska uroda, nadwaga, sygnet.", intel: "Głowa rodziny z New Jersey (operuje w LS).", priority: "WYSOKIE" },
    { name: "C. MOLTISANTI", bounty: "$95,000", id: "#LSPD-0071-C", crimes: "Egzekucje, handel narkotykami", desc: "Cienka kurtka, nerwowy ruchy.", intel: "Widziany w luksusowych klubach.", priority: "WYSOKIE" },
    { name: "W. 'BUMPY' JOHNSON", bounty: "$145,000", id: "#LSPD-0080-W", crimes: "Kontrola dzielnicy, przemyt", desc: "Kapelusz fedora, elegancja.", intel: "Rządzi w rejonie Chamberlain Hills.", priority: "WYSOKIE" },
    { name: "F. LUCAS", bounty: "$175,000", id: "#LSPD-0081-F", crimes: "Import czystej heroiny", desc: "Futro z szynszyli, pewność siebie.", intel: "Ma dojścia w wojsku.", priority: "WYSOKIE" },
    { name: "L. SIGEL", bounty: "$210,000", id: "#LSPD-0090-L", crimes: "Hazard, morderstwa", desc: "Przystojny, porywczy.", intel: "Buduje kasyna w Las Venturas (ukrywa się w LS).", priority: "WYSOKIE" },
    { name: "A. CAPONE", bounty: "$500,000", id: "#LSPD-0091-A", crimes: "Unikanie podatków, morderstwa, przemyt", desc: "Blizna na lewym policzku, garnitur.", intel: "Szef szefów.", priority: "KRYTYCZNE" },
    { name: "C. MANSON", bounty: "$110,000", id: "#LSPD-0100-C", crimes: "Podżeganie do morderstwa, sekta", desc: "Długie włosy, szalone oczy.", intel: "Ukrywa się na pustyni.", priority: "WYSOKIE" },
    { name: "B. BONNIE", bounty: "$85,000", id: "#LSPD-0200-B", crimes: "Napady na banki, morderstwa policjantów", desc: "Młoda kobieta, beret, karabin.", intel: "Działa z C. Barrowem.", priority: "WYSOKIE" },
    { name: "C. BARROW", bounty: "$85,000", id: "#LSPD-0201-C", crimes: "Napady na banki, morderstwa policjantów", desc: "Młody mężczyzna, garnitur, BAR.", intel: "Działa z B. Bonnie.", priority: "WYSOKIE" },
    { name: "J. DILLINGER", bounty: "$200,000", id: "#LSPD-0202-J", crimes: "Ucieczki z więzień, napady", desc: "Szyderczy uśmiech, pistolet maszynowy.", intel: "Wróg publiczny numer 1.", priority: "KRYTYCZNE" },
    { name: "Z. COMINI", bounty: "$10,000", id: "#LSPD-1234-Z", crimes: "Kradzież roweru, zakłócanie ciszy", desc: "Młody, ubrany w dres.", intel: "Drobny złodziejaszek z plaży.", priority: "NISKIE" }
];

function generateBountyCards() {
    const grid = document.getElementById('bounty-grid');
    if (!grid) return;

    // Czyścimy grid
    grid.innerHTML = '';

    // Mieszamy bazę danych i bierzemy 3 pierwsze osoby
    const selected = [...criminalsDB].sort(() => 0.5 - Math.random()).slice(0, 3);

    selected.forEach(criminal => {
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div class="scanner-group">
                        <div class="scanner s1"></div><div class="scanner s2"></div>
                        <div class="scanner s3"></div><div class="scanner s4"></div>
                        <div class="scanner s5"></div>
                    </div>
                    <div class="bounty-val">${criminal.bounty}</div>
                    <div class="bounty-tag">POSZUKIWANY: ŻYWY</div>
                    <div class="grid-overlay"></div>
                </div>
                <div class="flip-card-back">
                    <h4 class="back-name">${criminal.name}</h4>
                    <div class="report-content">
                        <p><strong>ID:</strong> ${criminal.id}</p>
                        <p><strong>PRZESTĘPSTWA:</strong> ${criminal.crimes}</p>
                        <p><strong>OPIS:</strong> ${criminal.desc}</p>
                        <p><strong>INFO:</strong> ${criminal.intel}</p>
                    </div>
                    <div class="back-footer">PRIORYTET: ${criminal.priority}</div>
                </div>
                
            </div>
        `;
        grid.appendChild(card);
    });
}




function fakeDiscordLogin() {
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('staff-dashboard');
    const btn = loginScreen.querySelector('button');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTORYZACJA...';
    btn.style.opacity = '0.7';

    // Efekt WOW - symulacja łączenia
    setTimeout(() => {
        loginScreen.style.transition = '0.5s';
        loginScreen.style.transform = 'scale(0.9)';
        loginScreen.style.opacity = '0';

        setTimeout(() => {
            loginScreen.style.display = 'none';
            dashboard.style.display = 'block';
            dashboard.style.animation = 'glitchShow 0.5s ease-out';
            
            // Możesz tu wpisać swój nick na stałe do testów
            document.getElementById('user-name').innerText = "TWÓJ_NICK"; 
        }, 500);
    }, 1500);
}





// ==========================================
// CENTRALNY PUNKT STEROWANIA - TYLKO TA LINIA!
// ==========================================
const AKTUALNA_ILOSC_OSOB = 50; 
// ==========================================

const LIMIT = 50;

document.addEventListener("DOMContentLoaded", function() {
    // 1. Obliczenia
    const procent = (AKTUALNA_ILOSC_OSOB / LIMIT) * 100;
    const wolne = LIMIT - AKTUALNA_ILOSC_OSOB;
    const czyOtwarta = AKTUALNA_ILOSC_OSOB < 45; // Otwarta tylko gdy poniżej 45

    // 2. Aktualizacja STRONY GŁÓWNEJ (Banner)
    const homeStatus = document.getElementById('home-rekrutacja-status');
    const homeBar = document.getElementById('home-progress-bar');
    
    if (homeStatus) {
        homeStatus.innerText = czyOtwarta ? "REKRUTACJA: OTWARTA" : "REKRUTACJA: ZAMKNIĘTA";
        homeStatus.style.color = czyOtwarta ? "#10b981" : "#ef4444";
    }
    if (homeBar) homeBar.style.width = procent + "%";

    // 3. Aktualizacja ZAKŁADKI REKRUTACJA (Panel)
    const recCounter = document.getElementById('current-officers');
    const recBar = document.getElementById('status-bar');
    const recBadge = document.getElementById('recruitment-status-badge');
    const recMsg = document.getElementById('recruitment-msg');
    const recVac = document.getElementById('vacancy-text');

    if (recCounter) {
        recCounter.innerText = AKTUALNA_ILOSC_OSOB;
        recBar.style.width = procent + "%";
        recVac.innerText = "WOLNE MIEJSCA: " + wolne;

        if (czyOtwarta) {
            recBadge.innerText = "REKRUTACJA OTWARTA";
            recBadge.className = "status-badge-new open";
            recMsg.innerText = "POSZUKUJEMY FUNKCJONARIUSZY. DOSTĘPNE MIEJSCA: " + wolne;
        } else {
            recBadge.innerText = "REKRUTACJA ZAMKNIĘTA";
            recBadge.className = "status-badge-new closed";
            recMsg.innerText = AKTUALNA_ILOSC_OSOB >= 50 ? 
                " DEPARTAMENT POSIADA PEŁNĄ OBSADĘ. PODANIA SĄ AUTOMATYCZNIE ODRZUCANE." : 
                "STAN ALARMOWY KADR. PRZYJMUJEMY TYLKO KANDYDATÓW Z WYSOKIM DOŚWIADCZENIEM.";
        }
    }
});




const BOT_API_URL = "http://144.76.97.203:25642/members"; 

async function refreshLSPD() {
    try {
        const response = await fetch(BOT_API_URL);
        const members = await response.json();
        
        // ID sekcji w Twoim HTML
        const ids = ['rank-hc','rank-commander','rank-captain-3','rank-captain-2','rank-captain-1','rank-lt-2','rank-lt-1','rank-sgt-2','rank-sgt-1','rank-ofc-3','rank-ofc-2','rank-ofc-1','rank-cadet'];
        ids.forEach(id => { if(document.getElementById(id)) document.getElementById(id).innerHTML = ''; });

        members.forEach(member => {
            const match = member.username.match(/\[(\d+)\]/);
            if (!match) return;
            
            const badgeNum = parseInt(match[1]);
            const status = member.status.toLowerCase();
            // Sprawdzamy czy użytkownik jest Online, Zaraz wracam lub Nie przeszkadzać
            const isOnDuty = (status === 'online' || status === 'dnd' || status === 'idle');
            
            const cardHTML = `
                <div class="card-auto ${isOnDuty ? 'on-duty-glow' : 'offline-card'}">
                    ${isOnDuty ? '<div class="duty-tag">NA SŁUŻBIE</div>' : '<div class="off-duty-tag">OFFLINE</div>'}
                    <div class="avatar-wrap" style="${!isOnDuty ? 'filter: grayscale(100%); opacity: 0.5;' : ''}">
                        <img src="${member.avatar}" onerror="this.src='https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'">
                    </div>
                    <div class="badge-display" style="${!isOnDuty ? 'background: #444;' : ''}">${badgeNum}</div>
                    <div class="officer-name" style="${!isOnDuty ? 'color: #777;' : ''}">${member.username.replace(/\[\d+\]/, '').trim()}</div>
                </div>
            `;

            // Sortowanie do odpowiednich rang
            if (badgeNum >= 1 && badgeNum <= 3) document.getElementById('rank-hc').innerHTML += cardHTML;
            else if (badgeNum >= 4 && badgeNum <= 6) document.getElementById('rank-commander').innerHTML += cardHTML;
            else if (badgeNum >= 10 && badgeNum <= 13) document.getElementById('rank-captain-3').innerHTML += cardHTML;
            else if (badgeNum >= 17 && badgeNum <= 20) document.getElementById('rank-captain-2').innerHTML += cardHTML;
            else if (badgeNum >= 23 && badgeNum <= 26) document.getElementById('rank-captain-1').innerHTML += cardHTML;
            else if (badgeNum >= 30 && badgeNum <= 34) document.getElementById('rank-lt-2').innerHTML += cardHTML;
            else if (badgeNum >= 40 && badgeNum <= 44) document.getElementById('rank-lt-1').innerHTML += cardHTML;
            else if (badgeNum >= 50 && badgeNum <= 55) document.getElementById('rank-sgt-2').innerHTML += cardHTML;
            else if (badgeNum >= 60 && badgeNum <= 65) document.getElementById('rank-sgt-1').innerHTML += cardHTML;
            else if (badgeNum >= 70 && badgeNum <= 79) document.getElementById('rank-ofc-3').innerHTML += cardHTML;
            else if (badgeNum >= 100 && badgeNum <= 114) document.getElementById('rank-ofc-2').innerHTML += cardHTML;
            else if (badgeNum >= 130 && badgeNum <= 149) document.getElementById('rank-ofc-1').innerHTML += cardHTML;
            else if (badgeNum >= 160 && badgeNum <= 179) document.getElementById('rank-cadet').innerHTML += cardHTML;
        });
    } catch (err) {
        console.error("Błąd połączenia z API bota:", err);
    }
}

refreshLSPD();
setInterval(refreshLSPD, 30000); // Odświeżanie co 30 sekund