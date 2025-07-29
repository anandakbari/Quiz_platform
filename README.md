# Interactive Quiz Application

A modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. Test your knowledge across various subjects with both multiple-choice and numerical answer questions.
hellomynameis anand
## Deployment Link : [Quiz Platform](https://quiz-platform-eight.vercel.app/)
dfasfds
## Video Walkthrough
https://www.loom.com/share/caf072c489654414a365d605184c30a9?sid=bd1f3904-2be9-4c34-8505-82a805f5272d

## Image Gallery
![image](https://github.com/user-attachments/assets/0ecf0570-57f7-4da3-a2e0-e7a14680f58f)
![image](https://github.com/user-attachments/assets/af1d552e-99ac-4185-b6da-7ed1a325935d)
![image](https://github.com/user-attachments/assets/1ce83313-9dcd-4ce6-b051-a601aabf6bca)
![image](https://github.com/user-attachments/assets/0514bd9b-39d1-4e0e-830d-a52ed66200d0)
![image](https://github.com/user-attachments/assets/038a91de-6e95-4e87-9641-55fdb8742c77)

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
