FROM node:15.13-alpine
WORKDIR /budget-traker
ENV  PATH="./node_module/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]