# Football Quiz App

A fun and interactive football quiz application built with React and Vite. Test your knowledge of football with multiple-choice questions and see how many you can get right!

## Features

- **Interactive Quiz**: Answer multiple-choice questions about football
- **Score Tracking**: Keep track of your correct answers
- **Score Submission**: Submit your quiz results with your name
- **Leaderboard**: View the top 10 high scores from all players
- **Persistent Storage**: Results are stored in a SQLite database
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Instant Feedback**: Get immediate visual feedback for correct and incorrect answers
- **User-Friendly**: Clean and intuitive interface

## Demo

Play the quiz here: [Football Quiz App](https://elrodjosh96.github.io/Football-Quiz/)

## Technologies Used

- **Frontend**: React, Vite, CSS3
- **Backend**: Express.js (Node.js)
- **Database**: SQLite with sqlite3 driver
- **API Communication**: Fetch API, CORS middleware

## Installation

1. Clone the repository:
```bash
git clone https://github.com/elrodjosh96/Football-Quiz.git
cd Football-Quiz
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

4. Start the backend server (in a terminal):
```bash
cd server
npm start
```
The backend will run on `http://localhost:3001`

5. Start the frontend development server (in another terminal):
```bash
npm run dev
```

6. Open your browser and navigate to the URL shown by Vite (typically `http://localhost:5173`)

## Backend Architecture

### Server Setup

The backend is a Node.js/Express server that manages quiz results and provides leaderboard data.

**File Structure:**
```
server/
├── server.js          # Main Express server
├── quiz.db            # SQLite database (created on first run)
├── package.json
└── node_modules/
```

### API Endpoints

#### 1. Submit Quiz Result
- **Endpoint**: `POST /api/results`
- **Description**: Submits a player's quiz score to the database
- **Request Body**:
```json
{
  "name": "Player Name",
  "score": 8,
  "totalQuestions": 10
}
```
- **Response**:
```json
{
  "id": 1,
  "name": "Player Name",
  "score": 8,
  "totalQuestions": 10,
  "message": "Score submitted successfully!"
}
```

#### 2. Get Leaderboard
- **Endpoint**: `GET /api/leaderboard`
- **Description**: Retrieves the top 10 highest scores
- **Response**:
```json
[
  {
    "id": 1,
    "name": "Player Name",
    "score": 10,
    "totalQuestions": 10,
    "createdAt": "2026-01-26 10:30:45"
  },
  ...
]
```

#### 3. Get All Results
- **Endpoint**: `GET /api/results`
- **Description**: Retrieves all submitted quiz results (for debugging)
- **Response**: Array of all result objects

#### 4. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Checks if the server is running
- **Response**: `{ "status": "Server is running" }`

### Database Schema

The SQLite database contains a single `results` table:

```sql
CREATE TABLE results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  totalQuestions INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Frontend Integration

The Quiz component communicates with the backend through these key functions:

1. **submitScore()** - Sends user's score to `/api/results`
2. **fetchLeaderboard()** - Retrieves top 10 scores from `/api/leaderboard`

After completing the quiz, users can:
1. Enter their name
2. Click "Submit Score" to save their result
3. View the leaderboard with top 10 rankings
4. Take the quiz again or view scores

## Building for Production

To build the app for production:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Deployment

This app is deployed on GitHub Pages. To deploy your own version:

1. Update the `base` in `vite.config.js` with your repository name
2. Build the project: `npm run build`
3. Deploy using: `npx gh-pages -d dist`

## Responsive Breakpoints

The app is optimized for the following screen sizes:
- **992px and below**: Tablet view
- **768px and below**: Large mobile view
- **600px and below**: Medium mobile view
- **480px and below**: Small mobile view

## Project Structure

```
src/
├── Components/
│   └── Quiz/
│       ├── Quiz.jsx
│       └── Quiz.css
├── assets/
│   └── data.js
├── App.jsx
├── main.jsx
└── index.css
```

## Contributing

Feel free to fork this project and submit pull requests to improve the quiz!

## License

This project is open source and available under the MIT License.
