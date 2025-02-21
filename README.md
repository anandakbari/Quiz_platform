# Interactive Quiz Application

A modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. Test your knowledge across various subjects with both multiple-choice and numerical answer questions.

![Quiz App Screenshot](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=2000)

## Features

- 🎲 Dynamic Question Randomization
- 🎯 Multiple Choice & Numerical Questions
- ⏱️ 30-second Timer per Question
- 🌓 Dark/Light Theme Support
- 📊 Score Tracking & Statistics
- 📱 Responsive Design
- 💾 Local Progress Storage
- 🎨 Beautiful UI Animations
- 📈 Performance History

## Technical Highlights

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand
- **Storage**: IndexedDB for persistent storage
- **Icons**: Lucide React
- **Build Tool**: Vite

## Question Randomization

The quiz implements a Fisher-Yates shuffle algorithm to ensure:
- Questions appear in a different order each time
- Fair distribution of question types
- No repetition within the same quiz session
- Balanced difficulty throughout the quiz

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local server URL

## Project Structure

```
src/
├── components/         # React components
├── lib/               # Utilities and store
│   ├── db.ts         # IndexedDB setup
│   ├── store.ts      # Zustand store
│   └── utils.ts      # Helper functions
└── App.tsx           # Main application component
```

## Key Features Explained

### Quiz Flow
- Questions are randomly ordered for each attempt
- 30-second timer for each question
- Automatic submission when time runs out
- Immediate feedback after answering
- Final score and statistics display

### Answer Types
- Multiple Choice: Select from 4 options
- Numerical Input: Enter exact numbers
- Automatic validation for both types

### Performance Tracking
- Score calculation
- Time tracking per question
- Historical attempt records
- Average completion time

### User Interface
- Smooth transitions and animations
- Responsive design for all screen sizes
- Dark/Light theme with beautiful gradients
- Interactive hover effects
- Progress indicators

### Question Management
- Dynamic shuffling of questions
- Mixed question types (multiple choice and numerical)
- Balanced distribution of difficulty levels
- No question repetition within sessions

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning or as a base for your own quiz application.