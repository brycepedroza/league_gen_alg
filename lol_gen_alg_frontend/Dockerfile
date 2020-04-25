FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
