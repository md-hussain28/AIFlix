# AiFlix 🎥 - AI-Powered Movie Recommendation Platform

**AiFlix** is a movie recommendation website that provides users with curated lists of movies, detailed information on individual titles, and AI-based movie recommendations based on mood prompts. Built using modern web technologies like React.js, Tailwind CSS, Firebase, and TMDB API, it offers an engaging movie discovery experience.

## ✨ Features

- **Movie Lists**: 
  - Browse popular, top-rated, and currently playing movies from TMDB.
  - Click on any movie to get detailed information such as the plot, rating, release date, and more.
  
- **AI Movie Suggestions**: 
  - Powered by a custom AI engine, users can input a text prompt describing their mood or movie preferences (e.g., "feeling adventurous" or "looking for a light-hearted comedy"), and AiFlix will recommend movies that match the mood.

- **Similar Movies**: 
  - When viewing a specific movie, AiFlix will suggest similar movies to enhance the discovery experience.

- **User Authentication**: 
  - Firebase Authentication is integrated to allow users to sign up and log in securely.
  
- **Fast Loading**: 
  - Implements lazy loading of movie images (small-sized placeholders initially) for fast initial rendering while high-quality images load in the background.

## 🛠️ Technologies Used

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - Vite for fast development and build process

- **Authentication and Database**: 
  - Firebase for user authentication and backend services
  
- **Movie Data**: 
  - TMDB API for fetching detailed movie information and recommendations
  
- **AI Engine**: 
  - Gemini API for AI-powered movie suggestions based on user prompts

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/md-hussain28/AiFlix.git
   cd AiFlix
