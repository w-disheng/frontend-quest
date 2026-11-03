# Frontend Quest

A gamified study companion that turns JavaScript and React interview preparation into short, repeatable learning sessions.

The app helps learners move beyond recognizing an answer: recall the concept, solve a question, explain the reasoning, and revisit it later. Its Chinese-first interface pairs concise explanations with English interview answer outlines.

## Features

- **61 learning cards in six chapters:** 50 concept and code-reading questions, five implementation exercises, and six project discussion prompts.
- **Daily quests:** three JavaScript questions and three React questions per day.
- **Active recall:** flashcards, answer drafts, follow-up questions, and self-check rubrics.
- **Spaced repetition:** review intervals grow from one day to 3, 7, 14, and 30 days as recall improves.
- **Mistake recovery:** missed questions return once during the session and enter the review queue.
- **Game-style progression:** experience points, streaks, an exploration map, and achievement badges.
- **Local progress:** bookmarks, notes, session recovery, and JSON backup/import.
- **Responsive interface:** desktop and mobile layouts with keyboard focus styles and reduced-motion support.

## Quick start

No build step or package installation is required.

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open **http://127.0.0.1:4173/** in a modern browser. You can also open `dist/index.html` directly, although browser storage behavior for local files can vary.

## How a session works

1. Start a daily quest or choose a chapter.
2. Think through the question before selecting an answer.
3. Read the explanation, memory cue, and follow-up question.
4. Explain the idea in your own words and rate your recall.
5. Return to the review queue when the card is due.

Each card awards XP only on its first completion of the day. Repeating a card immediately does not increase its mastery level. Three successful, due reviews on separate days mark a concept as established.

Implementation exercises and project discussions use **self-assessment**. This app does not execute submitted code, record speech, or provide automated AI grading.

## Technology and structure

Built with HTML, CSS, and vanilla JavaScript. React is a learning topic; the application itself does not use the React framework.

| File | Purpose |
| --- | --- |
| `dist/index.html` | Application entry point |
| `dist/app.js` | Views, navigation, practice sessions, and user interactions |
| `dist/engine.js` | Review scheduling, XP, streaks, and backup validation |
| `dist/questions.js` | Learning content, explanations, and source references |
| `dist/styles.css` | Responsive visual design |
| `test-engine.cjs` | Content and learning-engine checks |

The interface uses an optional Google Fonts stylesheet and falls back to system fonts when unavailable.

## Validation

With Node.js installed:

```sh
node test-engine.cjs
```

The checks cover card integrity, spaced-review intervals, same-day XP/mastery protection, mistake recovery, daily selection, import validation, and streak calculation.

## Data and privacy

Progress stays in the current browser's `localStorage`. There is no account system, server database, or automatic cross-device synchronization. Different domains, ports, and browsers have separate progress. Export a JSON backup before switching devices or clearing browser data.

## Project notes

This personal learning project was developed with AI assistance. The study content was adapted from two interview preparation documents; the original PDFs and private learning records are not included. Version-sensitive React behavior and several simplified explanations were clarified with links to official documentation inside the app.

Project discussion cards are prompts for the learner's own real examples, not claims of professional work performed by the app's author. The project is a learning tool, not a hiring assessment or a guarantee of interview outcomes.
