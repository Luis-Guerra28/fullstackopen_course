# DIAGRAMA DE SECUENCIA DE SPA

```mermaid
sequenceDiagram
    participant Navegador
    participant Servidor
    participant Base de datos
    

    Navegador->>+Servidor: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    Servidor-->>-Navegador: Código HTML
    Navegador->>+Servidor: HTTP GET exampleapp/main.css
    Servidor-->>-Navegador: Código CSS
    Navegador->>+Servidor: HTTP GET exampleapp/spa.js
    Servidor-->>-Navegador: Código JavaScript
    Navegador->>+Servidor: HTTP GET exampleapp/data.json
    Servidor->>+Base de datos: Obtener data.json
    Base de datos-->>-Servidor: data.json
    
    Servidor-->>-Navegador: [{content: "", date: "2024-03-16T04:34:13.883Z"}, ...]