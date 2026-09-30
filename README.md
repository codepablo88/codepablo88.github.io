# Portfolio — Pablo Escribano

Portfolio de Technical Art, proyectos 3D, prototipos y experiencias XR/VR.
Sitio estático en HTML, CSS y JavaScript, sin instalación de dependencias.

## Ver la web en el ordenador

Abre `index.html` en el navegador. Si tienes Python instalado, también puedes
ejecutar desde la carpeta del proyecto:

```powershell
python -m http.server 8000
```

Después abre `http://localhost:8000`. Pulsa `Ctrl+C` en la terminal para detenerlo.

## Publicar en GitHub Pages

Repositorio: https://github.com/codepablo88/codepablo88.github.io

Con los archivos subidos a `main`, abre **Settings → Pages** en el repositorio:

1. En **Source**, selecciona **Deploy from a branch**.
2. En **Branch**, selecciona **main** y **/(root)**.
3. Pulsa **Save** y espera a que termine la publicación.

La dirección pública, una vez activado Pages, será https://codepablo88.github.io/.
El archivo `.nojekyll` indica que el sitio debe servirse como archivos estáticos.

## Actualizar la web

1. Modifica los HTML, estilos o recursos de esta carpeta y revisa el resultado local.
2. En GitHub Desktop, revisa los cambios y guarda una versión con **Commit to main**.
3. Pulsa **Push origin** para subir esa versión.
4. Una vez configurado Pages, GitHub publicará los cambios automáticamente.
   Puedes consultar el resultado en la pestaña **Actions** del repositorio.

Los cambios locales no llegan a la web hasta que se suben a GitHub. La dirección
de la web permanece igual y el historial conserva las versiones guardadas.

## Organización

- `index.html`: inicio, cards de proyectos, prototipos, trabajos y contacto.
- `styles.css` y `project.css`: estilos compartidos.
- `cozy-game.html` y `procedural-support-tool.html`: diarios de prototipos.
- Resto de HTML: páginas de detalle de proyectos y trabajos.
- `assets/`: imágenes, vídeos, logotipos y CV descargable.

Mantén los nombres de archivo y las rutas exactamente iguales al enlazarlos,
incluidas las mayúsculas, los espacios y los guiones de los vídeos.
