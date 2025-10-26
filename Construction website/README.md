# Construction website — Single Page (Demo)

Този проект съдържа прост single-page сайт за фирма, предлагаща строителни и ремонтни услуги.

Файлове:
- `index.html` — главната страница (BG съдържание)
- `css/styles.css` — стилове и responsive поведение
 - `images/` — примерни SVG изображения за галерията
 - `brochures/offer.pdf` — временна PDF брошура (placeholder)

Как да тествате локално:
- Отворете `index.html` в браузър (двойно клик) — сайтът е статичен.
- За локален сървър (по-добре за CORS/модули):

- Стартиран backend (Node.js):

  1. Отворете PowerShell и навигирайте до папката на проекта `Construction website\server`:

    ```powershell
    cd "c:\Projects\AI Assisted Coding Intro\Construction website\server"
    npm install
    npm start
    ```

  2. Сървърът ще стартира на http://localhost:3000 и ще сервира статичния сайт и endpoint `/api/contact`.

  3. Формата намираща се на страницата изпраща POST заявки към `/api/contact`; записите се съхраняват в `server/submissions.json`.

  Забележка: уверете се, че имате инсталиран Node.js (v14+).

 - За локален сървър (по-добре за CORS/модули):

  PowerShell:

  ```powershell
  # ако имате Python 3
  python -m http.server 5500
  # после отворете http://localhost:5500/ в браузър и навигирайте до папката Construction website
  ```

Бележки:
- Контакт формата е демо (без backend). Ако желаете, мога да добавя прост Node/Express endpoint или форма, която изпраща имейл чрез API.
- В секциите има примерни текстове — лесно можете да ги замените с реално съдържание или да добавите снимки в папката `images/`.
 - Добавена е секция "Галерия" с lightbox преглед и бутон за сваляне на PDF брошура (`brochures/offer.pdf`).

Ако искате, мога да:
- Добавя галерия или портфолио с примерни проекти.
- Свържа форма с имейл/Google Sheets/endpoint.
- Подобрявам SEO, структурирани данни и OpenGraph мета.
