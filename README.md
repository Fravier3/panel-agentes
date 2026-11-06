# Agent Lab
Oficina animada con Petro (programador) y Maduro (QA). Demo determinista con inicio, pausa y reinicio. El modo conectado consume eventos NDJSON de un backend HTTPS propio; no contiene claves ni conexión implícita a suscripciones de ChatGPT/Claude.

`npm ci` y `npm run build`. GitHub Actions publica exclusivamente `dist`. Configurar Pages con fuente GitHub Actions.

## Servicio
POST JSON `{ "task": "...", "agents": ["petro", "maduro"] }`. Respuesta `application/x-ndjson`, un objeto por línea: `{ "agent": "petro", "status": "working", "progress": 20, "message": "Implementando" }`. Estados `working`, `done`, `error`. Ambos agentes deben confirmar `done`; una desconexión no se interpreta como éxito. CORS debe permitir `https://fravier3.github.io`, POST y Content-Type. Claves y orquestación permanecen en servidor. No introducir tokens en la URL. Conexión temporal, no persistida. Límite del cliente: 120 segundos por solicitud.
