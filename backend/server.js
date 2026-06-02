const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to files
const dataPath = path.join(__dirname, 'data', 'portfolio.json');
const messagesPath = path.join(__dirname, 'data', 'messages.json');

// Ensure directories and messages.json exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(messagesPath)) {
  fs.writeFileSync(messagesPath, JSON.stringify([], null, 2));
}

// Routes
// 1. GET Portfolio Data
app.get('/api/portfolio', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading portfolio data:', err);
      return res.status(500).json({ error: 'Failed to load portfolio data' });
    }
    try {
      const portfolio = JSON.parse(data);
      res.json(portfolio);
    } catch (parseErr) {
      console.error('Error parsing portfolio data:', parseErr);
      res.status(500).json({ error: 'Failed to parse portfolio configurations' });
    }
  });
});

// 2. POST Contact Message
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email address is required').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required').escape(),
    body('message').trim().notEmpty().withMessage('Message content is required').escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    // Save message locally
    fs.readFile(messagesPath, 'utf8', (err, data) => {
      let messages = [];
      if (!err && data) {
        try {
          messages = JSON.parse(data);
        } catch (e) {
          messages = [];
        }
      }
      
      messages.push(newMessage);
      
      fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error saving contact message:', writeErr);
        }
      });
    });

    // Optional Nodemailer notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"${name}" <${email}>`,
          to: 'khushibari2421@gmail.com',
          subject: `Portfolio Contact: ${subject}`,
          text: `You have received a new contact submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        });
        console.log('Notification email sent successfully');
      } catch (emailErr) {
        console.error('Error sending notification email:', emailErr);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully.'
    });
  }
);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
