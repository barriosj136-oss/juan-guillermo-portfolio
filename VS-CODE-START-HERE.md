# Revisar el portafolio en Visual Studio Code

## Abrir el proyecto

1. En el Explorador de archivos, abre la carpeta `outputs/portfolio`.
2. Haz doble clic en `Juan-Guillermo-Portfolio.code-workspace`. Si Windows pregunta con qué aplicación abrirlo, selecciona Visual Studio Code.
3. En el panel **Explorer**, expande las carpetas para revisar el proyecto.

## Usar Codex y Claude Code en esta carpeta

El workspace recomienda las extensiones oficiales de **Codex (OpenAI)** y **Claude Code (Anthropic)**. Al abrirlo, VS Code puede mostrar un aviso para instalar las extensiones recomendadas; también puedes abrir **Extensions** (`Ctrl+Shift+X`) y buscar “Codex” de OpenAI y “Claude Code” de Anthropic. Comprueba el editor de cada extensión antes de instalar.

Para abrir Codex y escribirle: pulsa `Ctrl+Shift+P`, ejecuta **Codex: Open Codex Sidebar** y selecciona la caja de mensaje del panel. Claude Code aparece como **Claude Code: Open in Side Bar** en la misma paleta de comandos. La primera vez, cada extensión puede pedir inicio de sesión en su servicio.

Después, inicia sesión en cada extensión con su propia cuenta. Ambas leerán la carpeta `outputs/portfolio` abierta en este workspace, incluidas sus instrucciones `AGENTS.md` y `.agents/skills/`. No pegues claves, contraseñas ni tokens en el chat o en archivos del proyecto.

La extensión puede descargarse gratis, pero el uso de Claude Code depende de tu cuenta o plan de Anthropic; iniciar sesión o usarlo mediante API puede requerir un plan o facturación. No actives facturación ni compres un plan para configurarlo. Codex usa el acceso de tu cuenta de ChatGPT.

Para evitar que un agente sobrescriba cambios del otro, trabaja con uno a la vez y guarda/revisa los cambios en **Source Control** (`Ctrl+Shift+G`) antes de cambiar de agente. Si solo quieres preguntar, indica explícitamente que no modifique archivos.

## Carpetas principales

- `app/`: páginas y componentes del sitio Next.js, incluida la página principal, la hoja de vida y los casos de proyecto.
- `projects/operations-data-review-suite/`: fuente editable de la demo operativa HTML, CSS y JavaScript.
- `projects/novatech/`: fuentes, datos ficticios, consultas SQL y validaciones del caso NovaTech.
- `public/`: archivos servidos directamente por Next.js. La copia de `public/operations-data-review-suite/` se sincroniza desde `projects/operations-data-review-suite/`; edita la fuente, no la copia.
- `.agents/skills/`: instrucciones reutilizables para tareas web, SEO y marketing.
- `.vscode/`: preferencias del editor de este proyecto.

`node_modules/`, `.next/`, `.vercel/` y `.env.local` se ocultan del Explorador y de la búsqueda para reducir ruido y evitar abrir por accidente archivos locales de configuración. No compartas ni publiques `.env.local`.

## Previsualizar localmente

Abre **Terminal → New Terminal** en Visual Studio Code. Confirma que la terminal esté en la carpeta `outputs/portfolio` y ejecuta:

```powershell
pnpm dev
```

El script `predev` ejecuta primero `pnpm sync:demo`, que copia los archivos de la demo y de NovaTech desde `projects/` hacia `public/`. Después abre <http://localhost:3000>. Para detener el servidor, vuelve a la terminal y presiona **Ctrl+C**.

La carpeta `sales` no se encontró en las ubicaciones revisadas. Los documentos fuente Word que estaban en Descargas no se agregaron al workspace porque esa carpeta puede contener otros archivos personales y materiales internos. Si existe una carpeta de ventas en otra ubicación, agrega únicamente esa carpeta desde **File → Add Folder to Workspace** después de verificar su ruta.

También puedes abrir **Terminal → Run Task…** (o `Ctrl+Shift+P` → **Tasks: Run Task**) y elegir **Start portfolio preview**. Para comprobar la compilación local, elige **Build portfolio**. Detén cualquier tarea de servidor con `Ctrl+C` en su terminal.

## Revisar mensajes de prueba del formulario

En modo de desarrollo, el formulario de contacto puede guardar mensajes de prueba en `.local-data/contact-submissions.jsonl`, una ruta ignorada por Git. No envía correos. Ese archivo solo se crea cuando se envía un formulario válido durante la vista local. La ruta está bloqueada en producción; por eso, antes de habilitar contacto público habría que configurar y proteger un servicio de backend. No coloques contraseñas ni tokens en archivos del proyecto.
