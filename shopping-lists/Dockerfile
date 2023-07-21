FROM denoland/deno:1.15.1

EXPOSE 7777

WORKDIR /app

COPY deps.js .
COPY . .

CMD ["run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app.js"]
