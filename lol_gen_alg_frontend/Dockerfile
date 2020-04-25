FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
