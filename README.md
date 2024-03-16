## Project Setup and Usage Instructions

This test project is a simulation of a billiard table, implemented using
TypeScript, Canvas and React. It allows users to interact with the balls on the
table and even change their colors. Here are the instructions to set up and use
this project:

### Project Setup

1. Ensure that you have Node.js and npm installed on your system. You can verify
   this by running `node -v` and `npm -v` in your terminal. If you don't have
   Node.js and npm installed, you can download them
   from [here](https://nodejs.org/en/download/).

2. Clone the repository to your local machine using the
   command `git clone <repository-url>`.

3. Navigate to the project directory using the command `cd <project-directory>`.

4. Install the project dependencies by running `npm install`.

5. Start the project by running `npm start`. This will start the development
   server and the application will be accessible at `http://localhost:3000` (or
   the port specified in your terminal).

### User Interaction

The application provides an interactive billiard table with several balls.
Here's how you can interact with it:

- **Moving the Balls**: To simulate a hit on a ball, press and hold the left
  mouse button. The ball will move in the direction of the cursor. The longer
  you hold the mouse button, the more force is applied to the ball, causing it
  to move faster.

- **Changing Ball Color**: To change the color of a ball, simply click on the
  desired ball. This will open a color picker modal where you can select the new
  color for the ball. After selecting the color, click on the 'Apply' button to
  apply the new color to the ball.

Please note that the color change will not affect the ball's movement or
interaction with other balls on the table. It is purely a visual change.

Enjoy interacting with the billiard table!
