# Our Story

A cinematic romantic single-page site built with Next.js, Tailwind CSS and Framer Motion.

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Add the engagement date

Open `app/page.js` and change:

```js
const ENGAGEMENT_DATE = "DD/MM/YYYY";
```

Example:

```js
const ENGAGEMENT_DATE = "15/09/2026";
```

The same date is displayed later in the story.

## 3. Add your photos

Put your images inside:

`public/photos/`

Use these names:

- photo1.jpg
- photo2.jpg
- photo3.jpg
- ...
- photo18.jpg

The first 4 are used by the story, 5-10 by the reasons cards, and 11-18 by the gallery.

You can use `.png` or `.webp`, but if you do, update the extensions in `app/page.js`.

## 4. Add your song

Put your audio file here:

`public/our-song.mp3`

If you want another filename, change:

```js
const SONG = "/our-song.mp3";
```

## 5. Deploy to Vercel

Push the folder to GitHub and import the repository into Vercel.

No database or backend is required.
