to test and build use this command : npm run test
to test endpoint and sharp method and check if file exist or not 
to run the project use this command : npm run start
example of working url : http://localhost:3000/56/44/image
first number is height second number for width and third one is string  for image file  that want to resize it

Scripts
Install: npm install
Build: npm run build
Lint: npm run lint
Prettify: npm run prettify
Run unit tests: npm run test
Start server: npm run start
Usage
The server will listen on port 3000:




Expected query arguments are:
height: should be postive
width: should be postive

filename: Available filenames are:
image
newimg
newimgg

Example 1
http://localhost:3000/100/100/image Will display image with 100 height and width


