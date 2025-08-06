# build react application
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve the applicaion on nginx
FROM nginx:alpine

RUN rm -rf /var/www/html/*

COPY --from=builder /app/dist /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]