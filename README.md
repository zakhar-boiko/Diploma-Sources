
# 📘 Match Me

Веб платформа для автоматизації процесів рекрутингу та пошуку роботи

---

## 👤 Автор

- **ПІБ**: Бойко Захар Стефанович
- **Група**: ФЕіМ-23
- **Керівник**: Куньо Іван Михайлович, кандидат фізико-математичних наук, начальник науково-дослідної частини ЛНУ ім. Івана Франка, доцент кафедри оптоелектроніки та інформаційних технологій
- **Дата виконання**: 11.11.2025

---

## 📌 Загальна інформація

- **Тип проєкту**: Вебсайт
- **Мова програмування**: Typescript (Node.js + React.js)
- **Фреймворки / Бібліотеки**: Express, PostgreSQL, Sequalize, Chakra UI, Firebase, OpenAI

---

## 🧠 Опис функціоналу

- 🔐 Реєстрація та авторизація користувачів двох класів: Рекрутер та Кандидат
- 👤 Редагування профілю кандидата: вміння, мови, професійний опис, рівень досвіду, роль, завантаження резюме у хмару
- ⚙️ Автоматичне заповнення профілю кандидата даними із резюме
- 📝 Створення вакансії за визначеним шаблоном
- 🤖 Асистент у вигляді чат-боту зі створення вакансії та формулювання вимог
- 🧠 Автоматичне заповнення вакансії за визначеним шаблоном на основі чату із асистентом
- 🎯 Створення списку рекомендованих кандидатів для вакансії алгоритмом добору
- 💼 Створення списку рекомендованих вакансій для кандидата алгоритмом добору
- 📊 Автоматизоване оцінювання точності результатів роботи алгоритму добору
- 💻 Інтерфейс користувача для роботи користувача із реалізованим функціоналом

---

## 🧱 Опис основних класів / файлів

| Клас / Файл                                  | Призначення                                                                                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                                   | Точка входу frontend, файл ініціалізації та запуску Node.js сервера                                                                                                  |
| `config/config.json`                         | Файл конфігурації бази даних                                                                                                                                         |
| `config/database.ts`                         | Файл ініціалізації підключення до бази даних                                                                                                                         |
| `config/firebaseConfig.ts`                   | Файл ініціалізації клієнта Firebase                                                                                                                                  |
| `constants/index.ts`                         | Константи проекту                                                                                                                                                    |
| `middleware/errorHandler.ts`                 | Проміжне програмне забезпечення для обробки помилок сервера проекту                                                                                                  |
| `middleware/tokenVerifier.ts`                | Проміжне прогроане забезпечення для перевірки авторизаційного токена та витягнення даних з нього                                                                     |
| `routes/auth.ts`                             | REST API маршрути для авторизації                                                                                                                                    |
| `routes/gigRoutes.ts`                        | REST API маршрути для вакансій                                                                                                                                       |
| `routes/userRoutes.ts`                       | REST API маршрути для профілів користувачів                                                                                                                          |
| `routes/skillRoutes.ts`                      | REST API маршрути для вмінь                                                                                                                                          |
| `routes/languagesRoutes.ts`                  | REST API маршрути для мов                                                                                                                                            |
| `controllers/AuthController.ts`              | Контролер для авторизації та реєстрації користувачів, перевірки облікових даних і генерації JWT-токенів.                                                             |
| `controllers/GigController.ts`               | Контролер для створення, пошуку та отримання вакансій, взаємодії з асистентом створення вакансій і формування списків рекомендованих кандидатів.                     |
| `controllers/UserController.ts`              | Контролер для керування профілем користувача: отримання, оновлення, фільтрація кандидатів, завантаження файлів (аватар, резюме) та формування рекомендацій вакансій. |
| `controllers/LanguagesController.ts`         | Контролер для отримання списку доступних мов із бази даних.                                                                                                          |
| `controllers/SkillsController.ts`            | Контролер для отримання списку доступних мов із бази даних.                                                                                                          |
| `models/User.ts`                             | Схема користувача для Sequalize PostgreSQL                                                                                                                           |
| `models/Candidate.ts`                        | Схема кандидата для Sequalize PostgreSQL                                                                                                                             |
| `models/Recruiter.ts`                        | Схема рекрутера для Sequalize PostgreSQL                                                                                                                             |
| `models/Gig.ts`                              | Схема вакансії для Sequalize PostgreSQL                                                                                                                              |
| `models/Skill.ts`                            | Схема вміння для Sequalize PostgreSQL                                                                                                                                |
| `models/Language.ts`                         | Схема мови для Sequalize PostgreSQL                                                                                                                                  |
| `models/UserSuitability.ts`                  | Схема списку рекомендацій кандидата для Sequalize PostgreSQL                                                                                                         |
| `models/GigSuitability.ts`                   | Схема списку рекомендацій вакансії для Sequalize PostgreSQL                                                                                                          |
| `models/UserSuitableGig.ts`                  | Схема рекомендації вакансії для Sequalize PostgreSQL                                                                                                                 |
| `models/GigSuitableUser.ts`                  | Схема рекомендації кандидата для Sequalize PostgreSQL                                                                                                                |
| `models/UserSkill.ts`                        | Схема вміння кандидата для Sequalize PostgreSQL                                                                                                                      |
| `models/UserLanguage.ts`                     | Схема мови кандидата для Sequalize PostgreSQL                                                                                                                        |
| `models/GigSkill.ts`                         | Схема вміння вакансії для Sequalize PostgreSQL                                                                                                                       |
| `models/GigLanguage.ts`                      | Схема мови вакансії для Sequalize PostgreSQL                                                                                                                         |
| `models/index.js`                            | Файл ініціалізації обʼєкта бази даних та проведення міграції                                                                                                         |
| `repositories/UserRepository.js`             | Робота з сутностями користувачів в базі даних: створення, пошук, оновлення та фільтрація профілів.                                                                   |
| `repositories/GigRepository.js`              | Робота з сутностями вакансій в базі даних: створення, отримання, фільтрація та пагінація записів.                                                                    |
| `repositories/SkillsRepository.js`           | Робота з сутностями вмінь в базі даних: отримання навичок за ID, іменами або користувачем.                                                                           |
| `repositories/LanguageRepository.js`         | Робота з сутностями мов в базі даних: отримання мов за ID, іменами або користувачем.                                                                                 |
| `repositories/GigSuitablityRepository.js`    | Робота з сутностями списків рекомендованих кандидатів в базі даних: створення записів рекомендацій та отримання рекомендованих кандидатів за вакансією.              |
| `repositories/UserSuitabilityRepository.js`  | Робота з сутностями списків рекомендованих вакансій в базі даних: створення записів рекомендацій та отримання рекомендованих вакансій за кандидатом.                 |
| `repositories/SuitableGigsRepository.js`     | Робота з сутностями рекомендацій вакансій в базі даних: створення та видалення рекомендованих вакансій та їх рейтингу.                                               |
| `repositories/SuitableUsersRepository.js`    | Робота з сутностями рекомендацій кандидатів в базі даних: створення та видалення рекомендованих кандидатів та їх рейтингу.                                           |
| `repositories/ProfileSkillsRepository.js`    | Робота з сутностями вмінь кандидатів в базі даних: отримання, додавання та видалення вмінь кандидата.                                                                |
| `repositories/GigSkillsRepository.js`        | Робота з сутностями вмінь вакансій в базі даних: отримання, додавання та видалення вмінь вакансії.                                                                   |
| `repositories/ProfileLanguagesRepository.js` | Робота з сутностями мов кандидатів в базі даних: отримання, додавання та видалення мов кандидата.                                                                    |
| `repositories/GigLanguagesRepository.js`     | Робота з сутностями мов вакансій в базі даних: отримання, додавання та видалення мов вакансії.                                                                       |
| `services/AuthService.js`                    | Сервіс для перевірки паролів і декодування JWT-токенів.                                                                                                              |
| `services/FilesService.js`                   | Сервіс для завантаження файлів у Firebase Cloud Storage.                                                                                                             |
| `services/GigCreatorAssistantService.js`     | Сервіс асистента зі створення вакансій: генерує відповіді чат-асистента та автоматичо формує дані вакансії на основі повідомлень.                                    |
| `services/GroqService.js`                    | Сервіс для виконання запитів до великої мовної моделі з використанням постачальника Groq                                                                             |
| `services/MatchingService.js`                | Сервіс алгоритму добору для формування рекомендованих вакансій для кандидата та рекомендованих кандидатів для вакансії                                               |
| `services/MatchingEvaluationService.js`      | Сервіс для оцінки точності алгоритму добору, формування списку хибнонегативних та хибнопозитивих результатів для повторного добору                                   |
| `services/ResumeDataExtractorService.js`     | Сервіс для отримання, структурування, уніфікації даних з резюме для автоматичного заповнення профілю кандидата                                                       |
| `types/AuthTypes.js`                         | Типи тіл запитів для авторизації                                                                                                                                     |
| `types/GigAssistantTypes.js`                 | Типи тіл запитів для асистанта створення вакансій                                                                                                                    |
| `types/GigTypes.js`                          | Типи тіл запитів для роботи з вакансіями                                                                                                                             |
| `types/MatchingTypes.js`                     | Типи тіл запитів для роботи з алгоритмом добору                                                                                                                      |
| `types/RequestTypes.js`                      | Шаблони типів запиту до сервера                                                                                                                                      |
| `types/ResumeScannerTypes.js`                | Типи тіл запитів для сервісу автоматичного заповнення профілю кандидата                                                                                              |
| `types/UserTypes.js`                         | Типи тіл запитів для роботи з користувачами                                                                                                                          |
| `dtos/CandidateProfileDTO.js`                | Тип відповіді сервера для роботи з кандидатами                                                                                                                       |
| `dtos/GigDTO.js`                             | Типі відповіді сервера для роботи з вакансіями                                                                                                                       |
| `dtos/GigMatch.js`                           | Типі відповіді сервера для роботи з рекомендованими вакансіями                                                                                                       |
| `dtos/UserMatch.js`                          | Типі відповіді сервера для роботи з рекомендованими кандидатами                                                                                                      |

---

## ▶️ Як запустити проєкт "з нуля"

### 1. Встановлення інструментів

- Node.js v20.13.1 + npm v10.5.2
- PostgreSQL

### 2. Клонування репозиторію

```bash
git clone https://github.com/zakhar-boiko/Diploma-Sources.git
```

### 3. Встановлення залежностей

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Створення `.env` файлів

#### Для backend:

```
PORT=5001
SECRET_KEY=LEASURE
OPENAI_API_KEY=sk-proj-pHFq64MwgOkfwqK7dIPDT3BlbkFJYa8Fa4ogdHyABdA316fF
GROQ_API_KEY=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
```

#### Для frontend:

```
API_BASE_URL=http://localhost:5001
```

### 5. Запуск

```bash
# Backend
cd backend
npm start

# Frontend
cd ../frontend
npm start
```

---

## 🔌 API приклади

### 🔐 Авторизація

**POST /auth/sign-in**
Вхід у профіль
**Headers:**
Authorization: Basic base64(email:password)
**Response:**

```json
{
  "status": "ok",
  "token": "jwt_token_here"
}
```

**POST /auth/sign-up**
Реєстрація профілю
**Headers:**
Authorization: Basic base64(email:password)
**Request:**

```json
{
  {
    "firstName": "Zakhar",
    "lastName": "Boiko",
    "title": "Developer",
    "accountType": "CONSULTANT",
    "mobileNumber": "0732897",
    "avatarUrl": "",
    "description": "Software Developer"
  }
}
```

**Response:**

```json
{
  "status": "ok",
  "token": "jwt_token_here"
}
```

---

### 📋 Вакансії

**POST /gigs**
Створення позиції
**Headers:**
Authorization: Bearer jwt_token_here
**Request:**

```json
{
  {
  "title": "Frontend Developer Needed",
  "profileLevel": "MIDDLE",
  "skills": ["ec76e6e0-c29f-4d8a-99fb-8b0414f36e58"],
  "languages": ["13c97926-27af-4023-9bf3-14cc0dbbb29e"],
  "description": "We need a React developer to build dashboard components."
  }
}
```

**Response:**

```json
{
  "id": "a3fd5c35-2c4f-4d27-9b14-c65f0fbdf123",
  "creatorId": "b291bd78-80d8-4bd4-9c42-80e6a4e2e1a1",
  "title": "Frontend Developer Needed",
  "profileLevel": "MIDDLE",
  "skills": [
    {
      "id": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
      "name": "React"
    }
  ],
  "languages": [
    {
      "id": "13c97926-27af-4023-9bf3-14cc0dbbb29e",
      "name": "English"
    }
  ],
  "description": "We need a React developer to build dashboard components.",
  "publicationDate": "2025-02-14T12:00:00.000Z"
}
```

**GET /gigs/:id**
Отримання деталей вакансії
**Headers:**
Authorization: Bearer jwt_token_here
**Response:**

```json
{
  "id": "a3fd5c35-2c4f-4d27-9b14-c65f0fbdf123",
  "creatorId": "b291bd78-80d8-4bd4-9c42-80e6a4e2e1a1",
  "title": "Frontend Developer Needed",
  "profileLevel": "MIDDLE",
  "skills": [
    {
      "id": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
      "name": "React"
    }
  ],
  "languages": [
    {
      "id": "13c97926-27af-4023-9bf3-14cc0dbbb29e",
      "name": "English"
    }
  ],
  "description": "We need a React developer to build dashboard components.",
  "publicationDate": "2025-02-14T12:00:00.000Z"
}
```

**GET /gigs/:id**
Отримання рекомендованиз кандидатів до вакансії
**Headers:**
Authorization: Bearer jwt_token_here
**Response:**

```json
[
  {
    "id": "686f5e20-c02d-4080-a6d8-e1c377604289",
    "firstName": "Anna",
    "lastName": "Lawson",
    "title": "Software engineer",
    "suitabilityPercentage": "77",
    "profileLevel": "MIDDLE",
    "skills": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "name": "Frontend Developer",
        "createdAt": "2025-06-03T16:29:39.475Z",
        "updatedAt": "2025-06-03T16:29:39.475Z"
      }
    ],
    "languages": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440001",
        "name": "English",
        "createdAt": "2025-06-03T16:35:14.681Z",
        "updatedAt": "2025-06-03T16:35:14.681Z"
      }
    ],
    "avatarUrl": null
  },
  {
    "id": "dd7ceddd-8c6d-4f20-b786-d18160f2938b",
    "firstName": "Zakhar",
    "lastName": "Boiko",
    "title": "Fullstack developer",
    "suitabilityPercentage": "78",
    "profileLevel": "JUNIOR",
    "skills": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440000",
        "name": "React.js",
        "createdAt": "2025-06-03T16:54:13.400Z",
        "updatedAt": "2025-06-03T16:54:13.400Z"
      }
    ],
    "languages": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440000",
        "name": "Ukrainian",
        "createdAt": "2025-06-03T16:35:14.681Z",
        "updatedAt": "2025-06-03T16:35:14.681Z"
      }
    ],
    "avatarUrl": null
  },
  {
    "id": "229cf0c3-cb88-4de3-967b-5f8f95cabc13",
    "firstName": "Max",
    "lastName": "Hike",
    "title": "Fullstack developer",
    "suitabilityPercentage": "84",
    "profileLevel": "JUNIOR",
    "skills": [
      {
        "id": "770e8400-e29b-41d4-a716-446655440003",
        "name": "Full Stack Developer",
        "createdAt": "2025-06-03T16:33:43.283Z",
        "updatedAt": "2025-06-03T16:33:43.283Z"
      }
    ],
    "languages": [],
    "avatarUrl": null
  }
]
```

**GET /gigs**
Отримання пагінованих вакансій
**Headers:**
Authorization: Bearer jwt_token_here
**Response:**

```json
{
  "gigs": [
    {
      "id": "d0be18fe-d2ba-4c35-a7b7-751fd62c6e9b",
      "creatorId": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
      "title": "Sales Manager",
      "profileLevel": "MIDDLE",
      "description": "We need a sales manager.",
      "publicationDate": "2025-10-24T14:19:10.263Z",
      "createdAt": "2025-10-24T14:19:11.718Z",
      "updatedAt": "2025-10-24T14:19:11.718Z"
    },
    {
      "id": "fb1bc8fb-6c0d-4362-9e59-feec722e36dc",
      "creatorId": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
      "title": "Розробник програмного забезпечення",
      "profileLevel": "MIDDLE",
      "description": "Позиція: Розробник програмного забезпечення. Ми шукаємо талановитого розробника для проєктування, розробки та підтримки якісних програмних продуктів, використовуючи різні мови та технології. Обов'язки включають проєктування та розробку нових функцій, участь у визначенні технічних рішень, написання чистого коду, тестування, участь у рецензуванні коду, співпрацю з командою, підтримку існуючого ПЗ, вивчення нових технологій та участь у мітингах. Вимагається вища освіта в ІТ або суміжній галузі, досвід розробки від 1 року, знання однієї або кількох основних мов програмування, розуміння ООП, знання структур даних та Git, вміння працювати з базами даних та розуміння принципів розробки API. Бажані досвід роботи з фреймворками, знання Agile/Scrum та англійська мова. Пропонуємо конкурентну зарплату та можливості для зростання.",
      "publicationDate": "2025-10-24T14:06:16.256Z",
      "createdAt": "2025-10-24T14:06:16.881Z",
      "updatedAt": "2025-10-24T14:06:16.881Z"
    },
    {
      "id": "0021c133-7a6d-404d-b40b-ddc52514de29",
      "creatorId": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
      "title": "Social Media Manager",
      "profileLevel": "MIDDLE",
      "description": "We are looking for a highly motivated and experienced Social Media Manager to lead our social media marketing efforts. The successful candidate will be responsible for developing and implementing a comprehensive social media strategy that aligns with our business goals. This includes creating and curating engaging content, managing and growing our social media presence across multiple platforms, and analyzing the performance of our social media campaigns. The ideal candidate will have excellent communication and project management skills, as well as a strong understanding of digital marketing principles and social media best practices. If you're a creative and results-driven social media professional looking for a new challenge, we'd love to hear from you!",
      "publicationDate": "2025-10-24T13:54:52.519Z",
      "createdAt": "2025-10-24T13:54:53.516Z",
      "updatedAt": "2025-10-24T13:54:53.516Z"
    }
  ],
  "hasMore": true
}
```

**POST /gigs/assistant/chat**
Надсилання повідомлення в чат із асистентом для створення вакансії
**Headers:**
Authorization: Bearer jwt_token_here
**Request:**

```json
{
  "messages": [
    {
      "content": "Help me create a position for an Hr manager",
      "role": "USER"
    }
  ]
}
```

**Response:**

```json
{
  "role": "ASSISTANT",
  "content": "Let's create a great gig for an HR Manager. For the title, how about we use 'HR Manager' to start with? For the profile level, I would suggest 'SENIOR' as it's a managerial role. What do you think?"
}
```

**POST /gigs/assistant/summarize**
Автоматичне створення вакансії на основі чату з асистентом для створення вакансії

**Headers:**
Authorization: Bearer jwt_token_here
**Request:**

```json
{
{
  "messages": [
    {
      "content": "Help me create a position for an Hr manager",
      "role": "USER"
    },
    {
      "role": "ASSISTANT",
      "content": "Let's create a great gig for an HR Manager. For the title, how about we use 'HR Manager' to start with? For the profile level, I would suggest 'SENIOR' as it's a managerial role. What do you think?",
      "displayType": "TEXT"
    }
  ]
}
}
```

**Response:**

```json
{
  "title": "HR Manager",
  "profileLevel": "SENIOR",
  "skills": ["d0be18fe-d2ba-4c35-a7b7-751fd62c6e9b"],
  "languages": ["880e8400-e29b-41d4-a716-446655440001"],
  "description": "We are seeking an experienced HR Manager to lead our human resources department. The successful candidate will be responsible for overseeing recruitment, employee relations, benefits administration, and compliance. They will also develop and implement HR strategies to drive employee engagement and performance. The ideal candidate has a strong background in HR management, excellent communication skills, and the ability to work in a fast-paced environment."
}
```

### 📋 Профілі користувачів

**GET /profiles/me**
Отримання деталей власного профілю

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
{
  "id": "686f5e20-c02d-4080-a6d8-e1c377604289",
  "accountType": "CONSULTANT",
  "email": "annalawson@gmail.com",
  "title": "Software engineer",
  "firstName": "Anna",
  "lastName": "Lawson",
  "mobileNumber": null,
  "avatarUrl": null,
  "description": "Hello there! I'm Anna, and I'm thrilled to introduce myself as a budding Fullstack Developer with a keen interest in Node.js and React.js development. As a junior developer, I'm passionate about crafting elegant solutions and continuously expanding my knowledge in the dynamic world of web development.\n\nBackground:\nWith a solid foundation in computer science and a recent graduation from [University/Bootcamp], I've embarked on my journey into the exciting realm of software engineering. During my studies, I immersed myself in the intricacies of web development, honing my skills in JavaScript, HTML, CSS, and exploring the intricacies of fullstack development.\n\nSkills and Expertise:\nWhile I may be early in my career, I've already gained practical experience in building web applications using Node.js and React.js. I've worked on projects where I've had the opportunity to design and implement front-end and back-end features, collaborate with teams, and contribute to the development lifecycle.\n\nDesire to Learn:\nOne of the things that excites me most about being a developer is the endless opportunities for growth and learning. I'm always eager to dive into new technologies, frameworks, and methodologies, and I'm committed to staying up-to-date with the latest trends and best practices in web development. Whether it's mastering a new JavaScript library or delving into the intricacies of database design, I'm always eager to expand my skill set and take on new challenges.\n\nFuture Aspirations:\nLooking ahead, my goal is to continue building upon my foundation and becoming a well-rounded developer. I'm eager to further develop my expertise in Node.js and React.js, as well as explore other areas of interest within the software engineering field. Ultimately, I aspire to contribute to innovative projects, collaborate with talented teams, and make a meaningful impact through my work.\n",
  "skills": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Frontend Developer"
    }
  ],
  "languages": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440001",
      "name": "English"
    }
  ],
  "cvUrl": null,
  "experiences": [],
  "profileLevel": "MIDDLE"
}
```

**GET /profiles/me/matches**
Отримання рекомендованих вакансвй для профілю кандидата

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
{
  "suitableJobs": [
    {
      "title": "Fullstack developer",
      "suitabilityPercentage": 50,
      "id": "f4088e9d-6e0e-4444-b15a-fb488014c29b",
      "publishingDate": "2025-06-03T17:37:13.186Z"
    },
    {
      "title": "Frontend developer",
      "suitabilityPercentage": 33,
      "id": "3bce2d06-bd5f-41cf-93da-9f66a340f948",
      "publishingDate": "2025-06-03T17:41:41.813Z"
    },
    {
      "title": "Marketing manager",
      "suitabilityPercentage": 42,
      "id": "746821be-96cb-4b45-a327-041b6c17ea25",
      "publishingDate": "2025-06-03T17:55:18.527Z"
    }
  ]
}
```

**PATCH /profiles/me/personal-details**
Оновлення персональних даних користувача

**Headers:**
Authorization: Bearer jwt_token_here

**Request:**

```json
{
  "description": "Hello there! I'm Anna, and I'm thrilled to introduce myself as a budding Fullstack Developer with a keen interest in Node.js.\n"
}
```

**Response:**

```json
{
  {
  "id": "686f5e20-c02d-4080-a6d8-e1c377604289",
  "firstName": "Anna",
  "lastName": "Lawson",
  "email": "annalawson@gmail.com",
  "password": "$2b$10$Xf0.9AvEj63gw7r0y0.DyupzhiVThvdrw3qc3t.lZsNlzM2V5CP/q",
  "avatarUrl": null,
  "title": "Software engineer",
  "personalLinks": null,
  "description": "Hello there! I'm Anna, and I'm thrilled to introduce myself as a budding Fullstack Developer with a keen interest in Node.js.",
  "introduction": null,
  "accountType": "CONSULTANT",
  "mobileNumber": null,
  "createdAt": "2025-06-03T16:48:46.431Z",
  "updatedAt": "2025-06-03T17:59:16.579Z"
}
}
```

**PUT /profiles/me/skills**
Оновлення вмінь користувача

**Headers:**
Authorization: Bearer jwt_token_here

**Request:**

```json
["550e8400-e29b-41d4-a716-446655440003", "550e8400-e29b-41d4-a716-446655440004"]
```

**Response:**

```json
[
  {
    "skillId": "550e8400-e29b-41d4-a716-446655440003",
    "userId": "686f5e20-c02d-4080-a6d8-e1c377604289",
    "id": "1df197c9-90d0-4c31-9acb-06416e85fde5",
    "createdAt": "2025-10-15T16:47:36.143Z",
    "updatedAt": "2025-10-15T16:47:36.143Z"
  },
  {
    "skillId": "550e8400-e29b-41d4-a716-446655440004",
    "userId": "686f5e20-c02d-4080-a6d8-e1c377604289",
    "id": "861ad39a-f395-4d69-bb97-8c84b9473f57",
    "createdAt": "2025-10-15T16:47:36.143Z",
    "updatedAt": "2025-10-15T16:47:36.143Z"
  }
]
```

**PUT /profiles/me/languages**
Оновлення мов користувача

**Headers:**
Authorization: Bearer jwt_token_here

**Request:**

```json
["880e8400-e29b-41d4-a716-446655440001"]
```

**Response:**

```json
[
  {
    "languageId": "880e8400-e29b-41d4-a716-446655440001",
    "userId": "686f5e20-c02d-4080-a6d8-e1c377604289",
    "id": "a34f7837-63c9-4548-8e0f-a66bbf640841",
    "createdAt": "2025-10-15T16:51:19.876Z",
    "updatedAt": "2025-10-15T16:51:19.876Z"
  }
]
```

**POST /profiles/me/avatar**
Завантаження фото профілю

**Headers:**
Authorization: Bearer jwt_token_here

**Request:**

```Form Data:
folder: images
file: binary
```

**Response:**

```json
{
  "id": "686f5e20-c02d-4080-a6d8-e1c377604289",
  "firstName": "Anna",
  "lastName": "Lawson",
  "email": "annalawson@gmail.com",
  "password": "$2b$10$Xf0.9AvEj63gw7r0y0.DyupzhiVThvdrw3qc3t.lZsNlzM2V5CP/q",
  "avatarUrl": "https://storage.googleapis.com/diploma-storage-32e1a.appspot.com/images/image.png?GoogleAccessId=firebase-adminsdk-bfe9b%40diploma-storage-32e1a.iam.gserviceaccount.com&Expires=4102437600&Signature=g8U3P3jbe0HGbi7Ta8WJy9nIBHWcLin0ZK3CVKOF5R7cT%2BgzrFWsz339dfyFMd7Xktip5Ik3UopcnHru7%2Bhaew7YWnqDl3s3UYdCObydnHXdTjQOszVTY4u6elgbfE%2FsTy2xlHAuEQGJLOdoH6NrcJSe86lfhy12qocO7DWZPu9w0%2B5cc6Ok2HNKnvdX605WSOA%2FSm53IXhbH23yy%2FqZlCehjFqST2ZuPvJJ6vsGamM1HMWkC9rRI4Uzuu2U66El2UaucK0WxeFukNLzYg7s%2FGw4tPnD2hxfIldYNC%2B3LolM3hzUK%2BvRa9BkLWbqWtxItkvY8gxnfhlAKjVYL%2BZMpQ%3D%3D",
  "title": "Software engineer",
  "personalLinks": null,
  "description": "Hello there! I'm Anna, and I'm thrilled to introduce myself as a budding Fullstack Developer with a keen interest in Node.js and React.js development. As a junior developer, I'm passionate about crafting elegant solutions and continuously expanding my knowledge in the dynamic world of web development.\n\nBackground:\nWith a solid foundation in computer science and a recent graduation from [University/Bootcamp], I've embarked on my journey into the exciting realm of software engineering. During my studies, I immersed myself in the intricacies of web development, honing my skills in JavaScript, HTML, CSS, and exploring the intricacies of fullstack development.\n\nSkills and Expertise:\nWhile I may be early in my career, I've already gained practical experience in building web applications using Node.js and React.js. I've worked on projects where I've had the opportunity to design and implement front-end and back-end features, collaborate with teams, and contribute to the development lifecycle.\n\nDesire to Learn:\nOne of the things that excites me most about being a developer is the endless opportunities for growth and learning. I'm always eager to dive into new technologies, frameworks, and methodologies, and I'm committed to staying up-to-date with the latest trends and best practices in web development. Whether it's mastering a new JavaScript library or delving into the intricacies of database design, I'm always eager to expand my skill set and take on new challenges.\n\nFuture Aspirations:\nLooking ahead, my goal is to continue building upon my foundation and becoming a well-rounded developer. I'm eager to further develop my expertise in Node.js and React.js, as well as explore other areas of interest within the software engineering field. Ultimately, I aspire to contribute to innovative projects, collaborate with talented teams, and make a meaningful impact through my work.\n",
  "introduction": null,
  "accountType": "CONSULTANT",
  "mobileNumber": null,
  "createdAt": "2025-06-03T16:48:46.431Z",
  "updatedAt": "2025-10-15T16:52:37.789Z"
}
```

**POST /profiles/me/cv**
Завантаження резюме

**Headers:**
Authorization: Bearer jwt_token_here

**Request:**

```Form Data:
folder: files
file: binary
```

**Response:**

```json
{
  "overview": "The candidate, Boyko Zakhar Stefanovych, is a student who has developed a platform for automating recruitment processes using artificial intelligence. The platform aims to address challenges in the recruitment process, such as high resource costs, quality of candidate data, and evaluation of hiring quality. The candidate has proposed a hybrid algorithm for selecting candidates, which includes modules for scanning resumes, evaluating algorithms, and creating job vacancies. The platform was implemented using Node.js, React.js, OpenAI Vector Embeddings, LLaMA, and Groq.",
  "skills": [
    "Software Engineering",
    "Artificial Intelligence",
    "Node.js",
    "React.js",
    "Algorithm Development",
    "Data Analysis",
    "Automation",
    "Recruitment Process"
  ],
  "languages": ["Ukrainian", "English"]
}
```

**GET /profiles/me/gigs**
Отримання створених рекрутером вакансій

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
[
  {
    "id": "f467ec4e-3748-4825-8496-d4443ef62a27",
    "creatorId": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
    "title": "Backend developer",
    "profileLevel": "JUNIOR",
    "description": "Position: Backend Node.js Developer\n\nLocation: [Location]\n\nCompany: [Company Name]\n\nAbout Us:\nAt [Company Name], we're on a mission to revolutionize the [industry/niche] landscape with our innovative solutions. We're a dynamic team of problem-solvers, dedicated to pushing the boundaries of technology and delivering exceptional value to our customers.\n\nJob Description:\nWe are seeking a talented and experienced Backend Node.js Developer to join our team. In this role, you will be responsible for designing, developing, and maintaining high-performance backend systems that power our applications and services.\n\nResponsibilities:\n\nDesign and develop scalable, reliable, and efficient backend systems using Node.js\nCollaborate with cross-functional teams to define requirements, architecture, and technical solutions\nImplement RESTful APIs, database schemas, and data models\nWrite clean, modular, and well-documented code that adheres to best practices and coding standards\nOptimize performance, scalability, and reliability of backend systems\nConduct code reviews, testing, and debugging to ensure the quality and reliability of software\nStay updated on emerging technologies, tools, and trends in backend development\nRequirements:\n\nBachelor's degree in computer science, engineering, or a related field\n years of experience in backend development, with a focus on Node.js\nStrong proficiency in JavaScript, asynchronous programming, and event-driven architecture\nExperience with modern web development frameworks, such as Express.js\nSolid understanding of databases, SQL, and ORM libraries (e.g., Sequelize)\nFamiliarity with cloud platforms (e.g., AWS, Azure) and containerization technologies (e.g., Docker)\nExcellent problem-solving and analytical skills, with a strong attention to detail\nBenefits:\n\nCompetitive salary and benefits package\nFlexible work hours and remote work options\nOpportunity for career growth and advancement\nCollaborative and innovative work environment\n",
    "publicationDate": "2025-06-03T18:41:18.538Z",
    "createdAt": "2025-06-03T18:41:19.116Z",
    "updatedAt": "2025-06-03T18:41:19.116Z"
  },
  {
    "id": "f21bc385-381f-4f31-815d-e861a2ef7587",
    "creatorId": "ec76e6e0-c29f-4d8a-99fb-8b0414f36e58",
    "title": "Marketing manager",
    "profileLevel": "MIDDLE",
    "description": " Position: Marketing Manager. Job Description: Experienced Marketing Manager needed to develop and execute strategies driving brand awareness, leads, and customer acquisition through various channels. Responsibilities include creating and managing marketing campaigns (digital, content, potentially traditional), optimizing budgets, conducting market research, developing marketing materials, collaborating with teams, tracking campaign performance for optimization, managing vendors, and staying updated on trends. Requirements: Bachelor's in Marketing or related field, 3-5 years progressive marketing experience with successful campaigns, strong digital marketing knowledge and tool proficiency, excellent communication for content creation, solid analytical and project management skills, and a passion for marketing and brand building.",
    "publicationDate": "2025-05-25T12:09:18.949Z",
    "createdAt": "2025-05-25T12:09:21.421Z",
    "updatedAt": "2025-05-25T12:09:21.421Z"
  }
]
```

**GET /profiles/:id**
Отримання деталей профілю іншого користувача

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
{
  "id": "686f5e20-c02d-4080-a6d8-e1c377604289",
  "accountType": "CONSULTANT",
  "email": "annalawson@gmail.com",
  "title": "Software engineer",
  "firstName": "Anna",
  "lastName": "Lawson",
  "mobileNumber": null,
  "avatarUrl": "https://storage.googleapis.com/diploma-storage-32e1a.appspot.com/images/image.png?GoogleAccessId=firebase-adminsdk-bfe9b%40diploma-storage-32e1a.iam.gserviceaccount.com&Expires=4102437600&Signature=g8U3P3jbe0HGbi7Ta8WJy9nIBHWcLin0ZK3CVKOF5R7cT%2BgzrFWsz339dfyFMd7Xktip5Ik3UopcnHru7%2Bhaew7YWnqDl3s3UYdCObydnHXdTjQOszVTY4u6elgbfE%2FsTy2xlHAuEQGJLOdoH6NrcJSe86lfhy12qocO7DWZPu9w0%2B5cc6Ok2HNKnvdX605WSOA%2FSm53IXhbH23yy%2FqZlCehjFqST2ZuPvJJ6vsGamM1HMWkC9rRI4Uzuu2U66El2UaucK0WxeFukNLzYg7s%2FGw4tPnD2hxfIldYNC%2B3LolM3hzUK%2BvRa9BkLWbqWtxItkvY8gxnfhlAKjVYL%2BZMpQ%3D%3D",
  "description": "The candidate, Boyko Zakhar Stefanovych, is a student who has developed a platform for automating recruitment processes using artificial intelligence. The platform aims to address challenges in the recruitment process, such as high resource costs, quality of candidate data, and evaluation of hiring quality. The candidate has proposed a hybrid algorithm for selecting candidates, which includes modules for scanning resumes, evaluating algorithms, and creating job vacancies. The platform was implemented using Node.js, React.js, OpenAI Vector Embeddings, LLaMA, and Groq.",
  "skills": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Software Engineering"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Frontend Developer"
    }
  ],
  "languages": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "name": "Ukrainian"
    },
    {
      "id": "880e8400-e29b-41d4-a716-446655440001",
      "name": "English"
    }
  ],
  "cvUrl": "https://storage.googleapis.com/diploma-storage-32e1a.appspot.com/files/%C3%90%C2%9F%C3%91%C2%80%C3%90%C2%B0%C3%90%C2%BA%C3%91%C2%82%C3%90%C2%B8%C3%90%C2%BA%C3%90%C2%B0_%C3%90%C2%9F%C3%91%C2%80%C3%90%C2%B5%C3%90%C2%B7%C3%90%C2%B5%C3%90%C2%BD%C3%91%C2%82%C3%90%C2%B0%C3%91%C2%86%C3%91%C2%96%C3%91%C2%8F.pdf?GoogleAccessId=firebase-adminsdk-bfe9b%40diploma-storage-32e1a.iam.gserviceaccount.com&Expires=4102437600&Signature=IJG3WDhk5DyjA92ShwNudBaxYAVbKilnCk8Kpr47pkHDsge38rHPeKwhFM2wjxNFkQLb%2FQBpUQ6b0rphZnGnfkUSqP6W7FgG6Rmrk9EtCqOVbDOqA2PxtbSdI1Mm53xkimeS6IgoEHTTepLT4cQspBPh9H%2Fk923X%2FYhg6ZyzK6XWuRAb5KgmhkHddTPzqRk2npAbA0gkIlyo3UPPEwWuv1jGPpPEqQ7dkFH4qKYuyEB3h1ps7vHLGBNIPzMDsWbg91%2FvRJXItXRbCP0iFjMoU5AraRTka6v3BvuPHwgTNlxTLN%2FePDvIcWHGlGYZRgEV%2BnXUVrMTRNslE2e3ZjEyeg%3D%3D",
  "experiences": [],
  "profileLevel": "MIDDLE"
}
```

**GET /candidates**
Отримання пагінованих кандидатів

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
{
  "candidates": [
  {
    "id": "e934477b-a5db-444b-ae77-de0427ba36b2",
    "accountType": "CONSULTANT",
    "email": "test@gmail.com",
    "title": "QA",
    "firstName": "Test",
    "lastName": "Account",
    "mobileNumber": null,
    "avatarUrl": null,
    "description": "Results-driven Email Marketing Manager with 8 years of experience in creating targeted campaigns that drive conversions and customer retention. Skilled in personalization, automation, A/B testing, and CRM management. Proven track record of achieving high open and click-through rates, with expertise in digital strategy and marketing analytics.",
    "cvUrl": null,
    "profileLevel": null
  },
  {
    "id": "dd7ceddd-8c6d-4f20-b786-d18160f2938b",
    "accountType": "CONSULTANT",
    "email": "zaharbojko@gmail.com",
    "title": "Fullstack developer",
    "firstName": "Zakhar",
    "lastName": "Boiko",
    "mobileNumber": null,
    "avatarUrl": null,
    "description": "Hey there! I'm Zakhar, a Fullstack Developer specializing in JavaScript and Node.js. With a passion for crafting seamless user experiences, I excel in both frontend and backend development.\n\nBackground:\nMy journey into software engineering began with a fascination for web technologies. Over the years, I've honed my skills in JavaScript, mastering frontend frameworks like React.js and backend development with Node.js.\n\nSkills:\nOn the frontend, I create intuitive UIs with HTML, CSS, and React.js. On the backend, I leverage Node.js to build scalable server-side applications, handling database interactions and designing RESTful APIs.\n\nVersatility:\nI thrive in dynamic environments, wearing multiple hats to deliver innovative solutions. Whether it's frontend design or backend architecture, I'm always eager to tackle new challenges.\n\nContinuous Learning:\nI'm deeply committed to staying updated with industry trends and technologies, constantly seeking opportunities to enhance my skills through conferences, hackathons, and online courses.\n\nClosing:\nIn summary, I'm a driven Fullstack Developer with a passion for pushing the boundaries of web development. I'm excited about the opportunity to collaborate with your team and contribute to impactful projects. Thank you for considering me!",
    "cvUrl": "https://storage.googleapis.com/diploma-storage-32e1a.appspot.com/files/resume%20.pdf?GoogleAccessId=firebase-adminsdk-bfe9b%40diploma-storage-32e1a.iam.gserviceaccount.com&Expires=4102437600&Signature=UwG6kBVB1tJRbwzVe0wLU4rVU1nYE4l%2BZwS4KMXEvuTTQXfG5IJCHLf26QA%2BOQj10YAe8fvYtnq2KyleEx%2BSY24%2FruByR9pS%2FZMDdTrfUayQ%2BVSCbl6%2FLiyVCHnfbIJ4mRDXuBqXChEzQZWdXIStaw8HTyxRSDP8RIMEmAwe7349eKFkVvJSiESz9ZelgMFAYS1%2BQ2MLtzo4IjN4wY%2Bv7L%2FoiaT%2Fuci5Hn0RNYPaEp4ucClM19TnBG5%2Bx%2FmEIwBD4VWFPJoUsRkDAexZuqfsArshgBtijLOinHO%2FEVpPTu2vsJEgOHkTO7cFRc0gzdp57ptmtLxnTcuKvmQLP3l3Vg%3D%3D",
    "profileLevel": "JUNIOR"
  },
  {
    "id": "0e7b0a1b-7f47-48ce-a3b9-61ee5fbf2837",
    "accountType": "CONSULTANT",
    "email": "alexgranson@gmail.com",
    "title": "Frontend developer",
    "firstName": "Alex",
    "lastName": "Granson",
    "mobileNumber": null,
    "avatarUrl": null,
    "description": "Hi there! I'm a passionate Frontend Developer eager to share my journey and expertise with you. From the moment I wrote my first line of HTML, I knew I had found my calling in bringing digital experiences to life through code.\n\nAs a Frontend Developer, I thrive on the intersection of design and technology, where creativity meets functionality. I specialize in crafting intuitive user interfaces that not only look great but also provide seamless navigation and a delightful user experience.\n\nMy journey into frontend development began with a fascination for the way websites and applications come together. Over the years, I've honed my skills in HTML, CSS, and JavaScript, mastering the art of turning design mockups into pixel-perfect, responsive web pages.\n\nBut frontend development is more than just writing code – it's about understanding user behavior, empathizing with their needs, and creating experiences that resonate with them. That's why I collaborate closely with designers and stakeholders, translating their vision into elegant and intuitive interfaces that captivate and engage users.\n\nIn addition to core frontend technologies, I'm well-versed in modern frameworks and libraries like React, Angular, and Vue.js. These tools empower me to build dynamic and interactive web applications, from single-page apps to complex enterprise solutions, with efficiency and scalability in mind.\n\nMoreover, I'm passionate about accessibility and performance optimization. I ensure that the websites and applications I develop are inclusive and accessible to users of all abilities, while also prioritizing speed and performance to deliver a seamless browsing experience across devices and platforms.\n\nWhat truly sets me apart as a Frontend Developer is my commitment to continuous learning and growth. I stay abreast of the latest trends and best practices in frontend development, actively seeking out opportunities to expand my skill set and push the boundaries of what's possible.\n\n",
    "cvUrl": null,
    "profileLevel": "SENIOR"
  },
  {
    "id": "771118f6-c45b-4856-88ef-d3d5e07f4cee",
    "accountType": "CONSULTANT",
    "email": "test3@gmail.com",
    "title": "Marketing manager",
    "firstName": "Zakhar",
    "lastName": "Boiko",
    "mobileNumber": null,
    "avatarUrl": null,
    "description": "Results-driven Email Marketing Manager with 8 years of experience in creating targeted campaigns that drive conversions and customer retention. Skilled in personalization, automation, A/B testing, and CRM management. Proven track record of achieving high open and click-through rates",
    "cvUrl": null
    "profileLevel": null
  },
  {
    "id": "5ff58b46-0f3b-43a6-bc8b-2c919ba8303a",
    "accountType": "CONSULTANT",
    "email": "emmagosling@gmail.com",
    "title": "CRM Manager",
    "firstName": "Emma",
    "lastName": "Gosling",
    "mobileNumber": null,
    "avatarUrl": null,
    "description": "A detail-oriented and experienced CRM Manager with 3-5 years of expertise in overseeing customer relationship management systems and strategies. Proven ability to optimize customer interactions, improve retention, and drive business growth through effective CRM utilization. Skilled in managing and maintaining CRM platforms (e.g., Salesforce, HubSpot), developing and implementing CRM strategies and workflows, ensuring data accuracy and integrity, segmenting customer data for targeted marketing, creating insightful reports from CRM data, and collaborating effectively with sales and marketing teams. Possesses strong analytical and data management skills, excellent communication and interpersonal abilities for collaboration and user training, proficiency in CRM reporting and dashboard creation, a deep understanding of customer lifecycle management, and a proactive approach to problem-solving and process improvement. Holds a Bachelor's degree in Business, Marketing, or a related field.",
    "cvUrl": null,
    "profileLevel": "ENTRY_LEVEL"
  }
],
"hasMore": true}
```

### 📋 Вміння

**GET /skills**
Отримати всі наявні вміння

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Software Engineering",
    "createdAt": "2025-06-03T16:29:39.475Z",
    "updatedAt": "2025-06-03T16:29:39.475Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "System Administration",
    "createdAt": "2025-06-03T16:29:39.475Z",
    "updatedAt": "2025-06-03T16:29:39.475Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Network Security",
    "createdAt": "2025-06-03T16:29:39.475Z",
    "updatedAt": "2025-06-03T16:29:39.475Z"
  }
]
```

**GET /languages**
Отримати всі наявні мови

**Headers:**
Authorization: Bearer jwt_token_here

**Response:**

```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "name": "Ukrainian",
    "createdAt": "2025-06-03T16:35:14.681Z",
    "updatedAt": "2025-06-03T16:35:14.681Z"
  },
  {
    "id": "880e8400-e29b-41d4-a716-446655440001",
    "name": "English",
    "createdAt": "2025-06-03T16:35:14.681Z",
    "updatedAt": "2025-06-03T16:35:14.681Z"
  }
]
```

---

## 🖱️ Інструкція для користувача

1. **Сторінка входу на платформу** — вітання і кнопки:

   - `Увійти` — авторизація існуючого користувача
   - `Зареєструватись` — створення нового профілю

3. **Панель навігації користувача класу рекрутер** — містить сторінки, доступні рекрутеру:

   - Натиснення на "Home" відкриває головну сторінку
   - Натиснення на "Post Gig" відкриває сторінку створення вакансії
   - Натиснення на "Candidates" відкриває сторінку перегляду кандидатів
   - Натиснення на "Your Profile" відкриває меню із кнопками "View Profile", при натисненні на яку відкривається сторінка особистого профілю користувача, та "Sign Out", при натисненні на яку завершується сесія користувача та відкривається сторінка входу

4. **Головна сторінка авторизованого користувача класу рекрутер** — список створених вакансій:

   - Натиснення на вакансію розкриває її деталі, що містять дату публікації, список рекомендованих кандидатів
   - Натиснення на назву вакансії відкриває сторінку з її деталями
   - Кнопка "View Profile" відкриває сторінку профілю користувача
  
5. **Сторінка деталей вакансії** — інформація про вакансію, що містить її опис, вимоги до досвіду, вмінь та мов, та список рекомендованих кандидатів

   - Список рекомедованих кандидатів наведений у секції "Best matching candidates"
   - Рекомендація містить імʼя кандидата, його роль та відсоток відповідності вакансії
   - Натиснення на імʼя кандидата відкриває сторінку його профілю
  
6. **Сторінка профілю кандидата** — інформація про кандидата, що містить його опис, рівень досвіду, вміння та мови, та резюме

   - При натисненні на кнопку "Contact" відкривається клієнт електронної пошти із попередньо заповненим повідомленням та отримувачем
   - При натисненні на кнопку "Download СМ/Resume" в новій вкладці відкривається резюме кандидата

7. **Сторінка створення вакансії** — форма для створення вакансії та асистент для створення вакансії

   - Форма створення вакансії поділена на 3 кроки
   - Натиснення на кнопку "Next" відкриває наступний крок, натиснення на кнопку "Back" відкриває попередній крок. При некоректних даних на поточному кроці, кнопка "Next" є неактивною
   - Натиснення на кнопку "Finish" створює вакансію та відкриває сторінку з її деталями
   - Натиснення на кнопку з ярликом "Assistant" відкриває панель із чатом асистента
   - Натиснення на кнопку "⌲" надсилає повідомлення в чат
   - Натиснення на кнопку "Use suggested data" автоматично заповнює вакансію на основі повідомлень чату та закриває панель асистента. Дана кнопка прихована при відсутності повідомлень в чаті.
   
8. **Сторінка списку кандидатів** — перегляд списку кандидатів та їх фільтрація
   - Дані про кандидата містять його імʼя, роль, рівень досвіду, вміння та мови
   - Кнопка "View Profile" відкриває сторінку профілю кандидата
   - Кнопка "Filter Candidates" відкриває панель для фільтрації кандидатів
   - Параметри фільтрацїі містять вміння, мови та рівень досвіду.
   - При натисненні на кнопку "Apply filters" обрані фільтри застосовуються та оновлюється список кандидатів
   - Кнопка "Show More" довантажує нову порцію пагіновани кандидатів

9. **Панель навігації користувача класу кандидат** — містить сторінки, доступні кандидату:

   - Натиснення на "Home" відкриває головну сторінку
   - Натиснення на "Gigs" відкриває сторінку перегляду списку наявних вакансій
   - Натиснення на "Your Profile" відкриває меню із кнопками "View Profile", при натисненні на яку відкривається сторінка особистого профілю користувача, та "Sign Out", при натисненні на яку завершується сесія користувача та відкривається сторінка входу

10. **Головна сторінка авторизованого користувача класу кандидат** — список рекомендованих вакансій:

   - Дані про рекомендовану вакансію містять її назву, дату публікації, відсоток відповідності
   - Натиснення на кнопку "Discover more" вдікриває сторінку деталей вакансії
   - Натиснення на кнопку "Go to Jobs" відкриває сторінку зі списком вакансій

11. **Особистий профіль користувача** — дані користувача та їх додавання:

   - профіль містить інформаційні секції, що містять дані про особистий опис, вміння, мови, рівень досвіду та резюме користувача.
   - Натиснення на кнопку "Add" для кожної секції відкриває панель із додаванням інформації
   - Натиснення на кнопку "Save" оновлює дану секцію профілю користувача та закриває панель для додавання інформації
   - Натиснення на кнопку "Add" для секції "CV" відкриє панель для завантаження файлів. Після вибору файлу та натиснення на кнопку "Save File", профіль користувача оновлюється даними, отриманими із резюме
   - При натисненні на кнопку "Download СМ/Resume" в новій вкладці відкривається резюме користувача

12. **Сторінка списку вакансій** — перегляд списку вакансій:

   - Дані про вакансію містять її роль, опис, дату публікації та рівень досвіду
   - Кнопка "Details" відкриває сторінку дателай вакансії
   - Кнопка "Show More" довантажує нову порцію пагінованих вакансій


---

## 📷 Приклади / скриншоти

- Сторінка авторизації
- Сторінка реєстрації профілю
- Профіль кандидата
- Завантаження резюме
- Заповнення профілю даними із резюме
- Список рекомендованих вакансій для кандидата
- Деталі вакансії
- Список всіх вакансій
- Головна сторінка рекрутера
- Сторінка для створення вакансії
- Асистент для створення вакансії
- Заповнена асистентом вакансія
- Створена вакансія та рекомендовані кандидати
- Список створених рекрутером вакансій
- Список всіх кандидатів
- Фільтрація кандидатів за вміннями та мовами
- Профіль кандидата

---

## 🧪 Проблеми і рішення

| Проблема                              | Рішення                             |
| -------------------------             | ----------------------------------- |
| 500 Internal Server Error             | Перевірити сервер і зʼєднання з PostgreSQL     |
| 401 Unautorized                       | Переконатися, що Authorization: Bearer <token> передається правильно     |
| 400 Bad Request при запиті до Open AI | Перевірити баланс токенів та актуальність ключа      |
| 429 Too Many Requests                 | Додати черги або зменшити частоту зовнішніх запитів      |
| 404 Not Found                         | Перевірити правильність маршруту або існування запитуваних ресурсів      |
| CORS помилка                          | Увімкнути CORS middleware у backend |
| Відсутній або некоректний SECRET_KEY  | Додати змінну середовища та перезапустити сервер      |

---

## 🧾 Використані джерела / література

- Express.js Documentation — офіційний гайд по роботі з middleware, routing та помилками
- PostgreSQL Documentation — робота з транзакціями, підключенням та запитами
- JSON Web Tokens (JWT.io) — специфікація токенів, підпис, валідація
- OpenAI API Reference — правила використання моделей, ключі, ліміти та структури запитів
- Node.js Documentation — обробка помилок, модулі, робота з environment variables
- TypeScript Handbook — типізація DTO, інтерфейсів та структур API
- StackOverflow — типові рішення проблем з Node.js, Express, JWT та ORM
- MDN Web Docs — стандарти HTTP, статус-коди, заголовки, CORS
---

## Screenshots

````

```

```
````
