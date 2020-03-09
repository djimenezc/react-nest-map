<h1 align="center">Map app using ReactJS + NestJS 💼</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000" />
  <a href="LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Monorepo with a React frontend and NestJS backend

## Usage 


## To do:

### Frontend
- [ ] [storybook](https://github.com/storybookjs/storybook)
- [ ] [styled-components](https://github.com/styled-components/styled-components)
- [ ] [ESLint](https://github.com/eslint/eslint)
- [ ] [Husky](https://github.com/typicode/husky)
- [ ] [restful-react](https://github.com/contiamo/restful-react)
- [ ] [wouter](https://github.com/molefrog/wouter)
- [ ] UI Framework (Probably [Tailwindcss](https://github.com/tailwindcss/tailwindcss)?)
- [ ] [React Helmet](https://github.com/nfl/react-helmet)


### Backend
- [ ] MySQL basic setup to the backend
- [ ] Configuration validation
- [ ] Authentication and authorization with [Passport](https://github.com/jaredhanson/passport)
- [ ] Healtcheck
- [ ] ...

## Install

```sh
npm ci
lerna clean --yes
lerna bootstrap
```

## Start frontend

```sh
lerna exec --scope frontend -- npm run start
```

## Start backend

```sh
lerna exec --scope backend -- npm run start
```

## Author

👤 **David Jimenez Calvo**

* Github: [@djimenezc](https://github.com/djimenezc)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [David Jimenez Calvo](https://github.com/djimenezc).<br />
This project is [MIT](https://github.com/djimenezc/react-nest-map/blob/master/LICENSE) licensed.

