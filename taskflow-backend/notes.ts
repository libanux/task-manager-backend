
// "scripts": {
//     "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
//     "build": "tsc",
//     "start": "node dist/server.js"
//   },

  // explain above:

  /*npm run dev:
  What it's for: This is your primary command when you are writing and
   testing code on your local machine.

You are actively coding: You've just opened the project in your editor
 and you want to start the server to test your changes.

You want instant feedback: The --respawn flag means the server will
 automatically restart whenever you save a change to a file. You don't have to stop and 
 restart the command manually.

Speed over strictness: The --transpile-only flag makes compilation
 very fast by skipping full type checking. (You should rely on your 
 IDE or a separate terminal running tsc --noEmit for type checking).*/



 /*npm run build - The Build for Production Command

When you use it: When you are ready to deploy your code to a server or 
test the final production version.

What it's for: This command compiles your TypeScript code into plain, 
optimized JavaScript that the Node.js runtime can execute directly.

Before deployment: This is a crucial step before deploying your app to a 
server (like AWS, Heroku, DigitalOcean, etc.).

Creating the dist folder: It runs the full TypeScript compiler (tsc) 
according to your tsconfig.json settings, which typically outputs the 
compiled .js files into a dist (or build) folder.

Performs full type checking: Unlike dev, this command will fail if there
 are any TypeScript type errors, ensuring your production code is 
 type-safe.*/



 /*npm run start - The Production Run Command
When you use it: On your production server, after you have run npm run 
build.

What it's for: This command is used to launch the application in a live 
production environment. It runs the compiled JavaScript from the dist 
folder.

It's fast: It uses node to run the pre-compiled JavaScript, which is much
 faster than compiling TypeScript on the fly.

It's simple and reliable: The server environment doesn't need ts-node-dev 
or any development dependencies. It just runs the pure JavaScript.

No file watching: It does not watch for file changes or auto-restart. 
For managing restarts in production, you would use a process manager like 
PM2.

so npm run start runs the compiled JavaScript from the dist folder,
 specifically dist/server.js in your case! ✅*/



 /*Note:When you run the project locally using different commands,
  TypeScript compilation happens differently:

npm run dev - Compiles "On the Fly"

npm run dev
# Which runs: ts-node-dev --respawn --transpile-only src/server.ts
What happens:

✅ Compiles in memory - No physical .js files are created

✅ Runs directly from .ts files using ts-node-dev

✅ Automatic restart when you change any file

✅ Fast compilation (skips type checking with --transpile-only)

❌ No dist folder is created

npm run build - Compiles to Physical Files

npm run build
# Which runs: tsc
What happens:

✅ Creates physical .js files in dist/ folder

✅ Full type checking (will fail if there are TypeScript errors)

✅ Prepares for production

❌ No server running - just compilation

npm run start - Runs Pre-compiled Files
npm run start
# Which runs: node dist/server.js
What happens:

✅ Runs from pre-compiled .js files in dist/ folder

✅ No TypeScript compilation needed (already done)

✅ Production-ready execution

❌ No file watching or auto-restart*/


 