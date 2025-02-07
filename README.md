# Gremlin Hunter Telegram Mini App 
# (This project is abandoned)

This is a **Telegram Mini App** built with **React, TypeScript, Tailwind CSS, and GSAP**. It features interactive components like **Game, Mining, Profile, Guild, and Dungeon**, providing an engaging experience for users. The app is designed to be highly responsive, visually appealing, and optimized for mobile devices within the Telegram WebApp environment.

## Demo

Here is a demo of the app in action:

![GIF Açıklaması](https://github.com/sixtyonestorm/grmfront/blob/master/0207.gif)

## Features

- **Game**: A dynamic game experience for users to enjoy.
- **Mining**: A system for resource gathering and upgrades.
- **Profile**: User profile with detailed stats and achievements.
- **Guild**: A feature to join and interact with guilds.
- **Dungeon**: A challenging dungeon system for users to explore.
- Highly responsive and optimized for Telegram WebApp.

*Note: This is the frontend part of the project. The backend is not included in this demo.*

- **User Authentication**: Retrieves and verifies user data via the Telegram WebApp SDK.
- **Animated Loading Screen**: Utilizes GSAP for smooth and engaging animations.
- **Dynamic Navigation**: Seamlessly switch between Game, Mining, Profile, Guild, and Dungeon sections.
- **State Management**: Uses React hooks and Context API for efficient state management.
- **Mobile-Friendly UI**: Tailwind CSS ensures a fully responsive experience optimized for all screen sizes.
- **Interactive Mining System**: Users can engage in mining activities with resource upgrades and passive income mechanics.
- **Guild System**: Users can form or join guilds to participate in cooperative gameplay.
- **Boss Hunting**: Engage in battles against powerful bosses to earn rewards.
- **Referral System**: Invite friends to earn bonuses and track referrals dynamically.

## Installation

To set up and run the project locally, follow these steps:

### Prerequisites

- Node.js (>=16.x)
- npm or yarn
- Telegram WebApp configured

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/gremlin-hunter.git
   cd gremlin-hunter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
4. Open the app in Telegram WebApp and start exploring!

## Project Structure

```
📂 gremlin-hunter
 ├── 📁 src
 │   ├── 📁 components   # Reusable UI components
 │   ├── 📁 pages        # Individual pages for the app
 │   ├── 📁 assets       # Images, icons, and other assets
 │   ├── App.tsx        # Main application component
 │   ├── main.tsx       # Application entry point
 ├── 📄 package.json    # Dependencies and scripts
 ├── 📄 tailwind.config.js # Tailwind CSS configuration
 ├── 📄 tsconfig.json   # TypeScript configuration
 ├── 📄 README.md       # Documentation
```

## API Integration

The app communicates with a backend server to send and retrieve user data. The backend is built with **Express.js and MongoDB**, ensuring efficient data handling. Below is an example of how user data is sent to the server:

```ts
const sendUserData = async (userData: UserData) => {
  try {
    const response = await fetch("https://XXX.herokuapp.com/api/user-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to send user data");
    console.log("User data sent successfully");
  } catch (error) {
    console.error("Error sending user data:", error);
  }
};
```

### Endpoints

The backend exposes several endpoints for various functionalities:

- `POST /api/user-data`: Save user details to the database.
- `GET /api/user/:id`: Fetch user data by ID.
- `PUT /api/user/:id`: Update user information.
- `POST /api/invite`: Track and register invited users.

## Deployment

The project is hosted on **Heroku**, but it can be deployed to other cloud platforms like Vercel, AWS, or DigitalOcean. To deploy your own version on Heroku:

```sh
npm run build
heroku create your-app-name
heroku git:remote -a your-app-name
git push heroku main
```

## Contribution Guidelines

We welcome contributions to the project! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit: `git commit -m "Add new feature"`.
4. Push to your branch: `git push origin feature-branch-name`.
5. Open a **Pull Request** for review.

## License

This project is licensed under the **MIT License**, allowing for open-source use and modification.

---

Made with ❤️ by **S.O.S.**

