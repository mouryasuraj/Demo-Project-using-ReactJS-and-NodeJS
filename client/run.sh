docker stop ui;
docker rm ui;
docker rmi ui;
docker build -t ui .;
docker run -d --name ui -p 5000:80 ui;