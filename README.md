source code/
  backend/
    bookmarks/. - Source code Spring Boot serveru (maven)
                - použité dependencies:
                  - spring-boot-starter-data-jpa
                  - spring-boot-starter-web
                  - postgresql
                  - spring-boot-starter-test
                  - lombok
                  - springdoc-openapi-starter-webmvc-ui
  frontend/
    bookmarks/. - Source code ReactJS stránky (npm)
                - použité dependencies:
                  - axios
                  - bootstrap
                  - react
                  - react-bootstrap-icons
                  - react-dom
                  - react-quill
                  - react-scripts
                  - web-vitals
serverbuild.jar     - Zhotovený jar executable serveru
docker-compose.yml  - konfigurace PosgreSQL docker containeru

Server:           localhost:8080
Postgres port:    localhost:5432
OpenAPI endpoint: localhost:8080/swagger-ui/index.html
