# N8N Control Panel

Nowoczesny panel zarządzania projektami N8N z dynamicznym edytorem konfiguracji.

## 🚀 Funkcje

- ✨ Nowoczesny dark theme z animacjami
- 📦 Tworzenie i zarządzanie projektami
- 🎨 Edytor konfiguracji z różnymi typami pól (string, bool, int, float, enum, image)
- 🔄 Drag & drop do zmiany kolejności pól
- 📤 Export konfiguracji do JSON
- 🔗 Generowanie URL do API endpointów
- 💾 Automatyczny zapis zmian

## 📋 Wymagania

- Node.js (wersja 12 lub wyższa)
- npm lub yarn

## 🛠️ Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/yonoslaw/n8ncontrolpanel.git
cd n8ncontrolpanel
```

2. Zainstaluj zależności:
```bash
npm install
```

3. (Opcjonalnie) Skonfiguruj zmienne środowiskowe:
```bash
cp .env.example .env
```

Edytuj plik `.env` aby dostosować konfigurację:
```env
# Port na którym będzie działać serwer
PORT=3000

# Opcjonalnie: Własna ścieżka do katalogu z projektami
# PROJECTS_DIR=./projects
```

4. Uruchom serwer:
```bash
node server.js
```

5. Otwórz przeglądarkę i przejdź do:
```
http://localhost:3000
```

## 📖 Użycie

### Tworzenie projektu
1. Na stronie głównej kliknij w kartę "Stwórz nowy projekt"
2. Wpisz nazwę projektu i kliknij "Utwórz"

### Edycja projektu
1. Kliknij na kartę projektu aby go otworzyć
2. Dodawaj pola klikając odpowiedni typ w karcie "Dodaj nowe pole"
3. Edytuj wartości bezpośrednio w polach
4. Przeciągaj pola za ikonę ⋮⋮ aby zmienić kolejność
5. Zmiany są zapisywane automatycznie

### Export konfiguracji
1. Kliknij przycisk "Export JSON" aby skopiować konfigurację do schowka
2. Lub użyj przycisku "Kopiuj URL" aby skopiować adres API endpoint

### API Endpoints

- `GET /api/projects` - Lista wszystkich projektów
- `GET /api/projects/:name` - Pobierz konfigurację projektu
- `POST /api/projects` - Utwórz nowy projekt
- `POST /api/projects/:name` - Zapisz konfigurację projektu
- `DELETE /api/projects/:name` - Usuń projekt
- `GET /projects/:name` - Pobierz JSON konfiguracji (bez pól systemowych)

## 🎨 Typy pól

- **String** - Pole tekstowe z możliwością rozwinięcia do multiline editora
- **Boolean** - Przełącznik on/off
- **Int** - Liczba całkowita
- **Float** - Liczba zmiennoprzecinkowa ze sliderem i konfigurowalnymi min/max
- **Enum** - Lista rozwijana z konfigurowalnymi opcjami
- **Image** - Upload obrazu z podglądem

## 🔧 Konfiguracja

### Zmienne środowiskowe

| Zmienna | Domyślna wartość | Opis |
|---------|------------------|------|
| `PORT` | `3000` | Port na którym działa serwer |
| `PROJECTS_DIR` | `./projects` | Ścieżka do katalogu z projektami |

## 📁 Struktura projektu

```
n8ncontrolpanel/
├── public/              # Frontend aplikacji
│   ├── index.html      # Lista projektów
│   └── project.html    # Edytor projektu
├── projects/           # Zapisane projekty (JSON)
├── server.js           # Serwer Express
├── .env.example        # Przykładowa konfiguracja
├── .gitignore         # Pliki ignorowane przez git
└── package.json       # Zależności projektu
```

## 🤝 Contributing

Pull requesty są mile widziane! W przypadku większych zmian, proszę najpierw otwórz issue aby omówić co chcesz zmienić.

## 📄 Licencja

ISC

## 🎯 TODO

- [ ] Dodanie autoryzacji/uwierzytelniania
- [ ] Import konfiguracji z JSON
- [ ] Historia zmian (undo/redo)
- [ ] Duplikowanie projektów
- [ ] Wyszukiwanie/filtrowanie projektów
- [ ] Grupowanie pól w sekcje
- [ ] Walidacja pól
- [ ] Eksport do różnych formatów (YAML, XML)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
