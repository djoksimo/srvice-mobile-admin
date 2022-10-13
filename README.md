# srvice-mobile-admin (archived)

Srvice Mobile App for Agents/Admins (service providers)

## Getting Started

1. Complete the **"React Native CLI Quickstart"** section of the [Official React Native Documentation](https://reactnative.dev/docs/environment-setup)
2. Run `yarn install` inside the srvice-mobile-admin repository
3. Run `react-native link`
4. Run `pod install` inside the `ios/` folder
5. Run `yarn start` in one terminal window
6. Run `yarn run ios` in another window.

If you run into any issues, try googling the error message and look for suggested fixes/solutions. Mobile development can be annoying.

---

*Some links may be broken*

## What is Srvice?

Srvice provides the perfect opportunity for service businesses to evolve with the digitalization of the business world.

How?
### For Businesses:

Srvice aims to help service businesses increase their awareness to customers through our platform. Primarily through our disruptive matching process which allows more service inquiries, resulting in increased potential for business transactions.

We allow businesses to increase teir growth with little to no capital.

Srvice aims to help digitalize other business operations in one central platform (scheduling, employee management, estimates, rates, quotes, payment, reviews, etc.)

## For Consumers:

Srvice aims to redesign the process of selecting, and booking services by making the process quick and easy.

With verified services providers so you know who you're doing business with, and a disruptive matching system, Srvice allows you to find, schedule, and pay for a new haircut, car repair appointment or any other service.

How we work 💪
- We stay active in the Srvice Slack Workspace and ask questions constantly!
- We check our Trello boards to view project management updates
- We assign ourselves to tickets and set goals based on how long we think each sprint/ticket might take
- We design our prototypes in Figma and export them in Zeplin
- We ask questions and post solutions to any issues in our internal Stack Overflow and we document stuff in Slite (the platform that you're on right now).
- Our GitHub repos are available here. You're welcome to look through our entire codebase but please don't share anything outside of Srvice without written permission 🤫
- Each repository should have a wiki that can be seen in GitHub or it can be found in srvice.slite.com
e.g https://github.com/djoksimo/srvice-api/wiki
....


## Setting up your environment 🏃‍♂️🏃‍♀️

### For API Development
1. Install a good IDE/Editor if you don't have one
  - Visual Studio Code OR Webstorm
2. Make sure you have Node.JS (v8.3 or newer) installed (`node -v`)

```bash
brew install node # (on MacOS)
```
3. Install Yarn
4. Clone this repo:
  - If you do NOT have a GitHub SSH key set up, run $ git clone https://github.com/srvice/srvice-api.git and set up GitHub with SSH later
  - If you DO have GitHub SSH keys set up on your computer, run $ git clone git@github.com:srvice/srvice-api.git
  
### For Mobile Development

1. Go to React Native Getting Started
2. Select React Native CLI Quickstart (ensure you're downloading the React Native CLI version 2.0.1)
3. Select preferred development OS and Target OS

4. Clone repo in local folder (Desktop, Home, Documents, etc.)
  - If you do NOT have a GitHub SSH key set up, run `git clone https://github.com/srvice/srvice-mobile-admin.git` and set up GitHub with SSH later
  - If you DO have GitHub SSH keys set up on your computer, run `git clone git@github.com:srvice/srvice-mobile-admin.git`

5. Enter the srvice admin repo
```bash
cd srvice-mobile-admin
yarn install
```

## For iOS development
```bash
sudo gem install cocoapods
cd ios
pod install
react-native run-ios for running on iPhone Simulator
```

#### For Android development
```bash
react-native run-android # for running on Android Emulator
```

An Android Virtual Device (AVD) or a properly connected physical Android Device has to be running prior to running  $ react-native run-android
Read http://facebook.github.io/react-native/docs/flexbox.html if you're unfamiliar with Flexbox

Advanced Debugger (optional): Install React Native Debugger

General Engineering Docs & Resources
Wikis (well-documented)
- https://github.com/srvice/srvice-mobile/wiki
- https://github.com/srvice/srvice-api/wiki

Postman Collection Docs: https://srvice.postman.co/collections/7373423-67161275-e3a3-41a3-ab66-be51a8d54719?version=latest&workspace=0f3eef4f-a9a3-43e4-88ca-004b702b8411

## Important Resources
- Mozilla has really good [JavaScript documentation](https://developer.mozilla.org/en-US/)
- Async/ Await https://javascript.info/async-await
- Async/Await https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb
- React Native Getting Started https://facebook.github.io/react-native/docs
- RxJS https://www.learnrxjs.io/concepts/rxjs-primer.html (short - recommended)
- RxJS https://www.youtube.com/watch?v=PhggNGsSQyg (long - detailed)
- http://reactivex.io/documentation/observable.html
- Useful RN Components  https://github.com/jondot/awesome-react-native#components
