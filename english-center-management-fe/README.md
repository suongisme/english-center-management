# fc-management-frontend

## Build With Docker
```
docker build -t fc-management -f Dockerfile --target runner .
docker run -name web-prod -p 4200:80 -d fc-management
```
