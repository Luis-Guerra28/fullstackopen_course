# DIAGRAMA DE SECUENCIA DE NUEVA NOTA EN SPA

```mermaid
sequenceDiagram
    participant Navegador
    participant Servidor
    participant Base de datos
    

    Navegador->>+Servidor: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Servidor->>+Base de datos: {content: "Hola SPA", date: "2024-03-16T04:34:13.883Z"}
    Base de datos-->>-Servidor: "Nueva nota guardada correctamente"
    Servidor-->>-Navegador: "Nueva nota creada"
    
```