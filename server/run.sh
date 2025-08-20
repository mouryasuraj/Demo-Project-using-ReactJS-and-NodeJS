docker stop backend;
docker rm backend;
docker rmi backend;
docker build -t backend .;
docker run -d --name backend -p 5001:5001 backend;
docker logs -f backend;