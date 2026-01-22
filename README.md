# Football Quiz App

A fun and interactive football quiz application built with React and Vite. Test your knowledge of football with multiple-choice questions and see how many you can get right!

## Features

- **Interactive Quiz**: Answer multiple-choice questions about football
- **Score Tracking**: Keep track of your correct answers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Instant Feedback**: Get immediate visual feedback for correct and incorrect answers
- **User-Friendly**: Clean and intuitive interface

## Demo

Play the quiz here: [Football Quiz App](https://elrodjosh96.github.io/Football-Quiz/)

## Technologies Used

- **React**: UI library for building interactive components
- **Vite**: Fast build tool and dev server
- **CSS3**: Styling and responsive design with media queries

## Installation

1. Clone the repository:
```bash
git clone https://github.com/elrodjosh96/Football-Quiz.git
cd Football-Quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

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
