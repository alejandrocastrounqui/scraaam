FROM node:6

WORKDIR scraaaam

COPY package.json .

RUN npm install

COPY  src                src
COPY  gulpfile.babel.js  gulpfile.babel.js
COPY  webpack.config.js  webpack.config.js
COPY .babelrc           .babelrc
COPY .bootstraprc       .bootstraprc

RUN npm run gulp clean-transpile
RUN npm run webpack

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
