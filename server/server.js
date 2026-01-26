import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
let db;

async function initializeDatabase() {
    db = await open({
        filename: path.join(__dirname, 'quiz.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL,
            totalQuestions INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Routes

// Submit quiz result
app.post('/api/results', async (req, res) => {
    try {
        const { name, score, totalQuestions } = req.body;

        if (!name || score === undefined || !totalQuestions) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.run(
            'INSERT INTO results (name, score, totalQuestions) VALUES (?, ?, ?)',
            [name, score, totalQuestions]
        );

        res.json({ 
            id: result.lastID, 
            name, 
            score, 
            totalQuestions,
            message: 'Score submitted successfully!'
        });
    } catch (error) {
        console.error('Error submitting result:', error);
        res.status(500).json({ error: 'Failed to submit result' });
    }
});

// Get leaderboard (top 10)
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await db.all(
            `SELECT id, name, score, totalQuestions, createdAt 
             FROM results 
             ORDER BY score DESC, createdAt ASC
             LIMIT 10`
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get all results (for debugging/admin)
app.get('/api/results', async (req, res) => {
    try {
        const results = await db.all(
            'SELECT id, name, score, totalQuestions, createdAt FROM results ORDER BY createdAt DESC'
        );
        res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
