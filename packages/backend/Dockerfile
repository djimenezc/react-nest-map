FROM node:12.14.0@sha256:cd2da90c3324458e1f022f2b7dcf5aa1bbe359421b97d6d3a630d4713503c889 AS builder

ENV NODE_ENV build

WORKDIR /home/node
COPY . /home/node

RUN npm ci \
    && lerna exec -- npm run build --scope=backend

# ---

FROM node:12.14.0@sha256:cd2da90c3324458e1f022f2b7dcf5aa1bbe359421b97d6d3a630d4713503c889

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/packages/backend/package.json /home/node/
COPY --chown=node:node --from=builder /home/node/package-lock.json /home/node/
COPY --chown=node:node --from=builder /home/node/packages/backend/dist/ /home/node/dist/

RUN npm ci

EXPOSE 3333

CMD ["npm", "start:prod"]
