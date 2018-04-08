# React Redux Modular

Work in progress

Honestly, we always research and build a scaleable large web application project. A good point to start is modular structure.
This project is an opinionated architecture for structuring large React/Redux applications.

* Features support in this project
- React, Redux
- Modular structure
- React-router 4
- Localization with React-intl
- Webpack, babel
- Multiple app themes
- Unit testing with Jest (IN PROGRESS)

## Getting Started

### Prerequisites

* [Let's learn React and Redux with Javascript's new ES6 syntax, from Beginner to Intermediate to Advanced.](https://www.youtube.com/watch?v=d0oUGmSE6IY&list=PLJBrYU54JD2pTblB20OmV7GL6H5J-p2g8)
* [A introduction about Redux](https://github.com/chentsulin/redux-intro)
* [Real World Redux](https://speakerdeck.com/chrisui/real-world-redux)
* [The power of higher-order reducers](http://slides.com/omnidan/hor)
* [Reactive Architecture with Redux and Angular](http://slides.com/evanschultz-1/reactive-angular)
* [Redux Internals](http://slides.com/vladimirnovick/reduxinternals)
* [A tour on the React ecosystem](http://slides.com/cguedes/a-tour-on-react-ecosystem)

### Installing

* Development

- Start Webpack dev server

```
npm start
```
- Format code styles

```
npm run lint (lint js)
npm run sass-lint (lint scss)

or one cmd for both
npm run analyze
```

* Production build

```
npm run build
```
 Then, built packages is located at [workspace]/dist.

 * Customize web app theme

- Default theme
 ```
npm start
 ```
 - Theme test
 ```
 npm start:dev
 ```
 You can modify the theme file in src/theme/{theme_name}/theme.scss
 Modify the npm script in packages.json

## Contributing

Fork it!
Create your feature branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request

## Authors

* **Secret Boy** - *Initial work* - [SecretBoy](https://github.com/secretboy9x)
