# stage 1 building the code
FROM node:12.17.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# stage 2
FROM nginx:1.17.1-alpine AS prod-stage
#COPY ./nginx.conf /etc/nginx/nginx.conf
# WORKDIR /usr/src/app
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
