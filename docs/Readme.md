## Metricality
Realtime metrics recording app - [Live Demo](https://metricality-f7392.firebaseapp.com/)
Metricality is a serverless app consists of two main components: Mobile and Web both using react
Built out of frustation of outdated data states when the app goes offline!!

### Mobile
Made with react-native

![mobile-view](http://i.imgur.com/WD4vidq.jpg)

### Web
Made with react

![web-view](http://i.imgur.com/ee96pvG.png)

## How to install?
1. Signup for firebase and create a database
2. fork the repo and clone it locally
3. update firebase database credentials `web/index.html` & `mobile/App.js`
4. push to git
5. install firebase-tools with `npm i -g firebase-tools` and `firebase login`
6. finally deploy your app online with `firebase deploy --project YOUR_PROJECT_NAME`
7. for deploying on phone, you have to install expo and push to their cloud and open it up locally. OR you can skip this step and keep a tab open in your mobile browser
