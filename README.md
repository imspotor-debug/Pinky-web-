# POCOYO7X · Gestión de licencias

Panel administrativo de keys con una API REST de validación para APKs Android. Las licencias y las instalaciones activadas se guardan en MySQL; la APK nunca lleva una clave secreta de administración.

## Funciones

- Generación de keys con prefijo `ACUSADO` o `POCOYO7X`, duración de 1, 3, 7 o 30 días y límite de instalaciones.
- Pausar, reactivar y revocar licencias desde el panel.
- La key completa se revela una sola vez al crearla; la base de datos guarda su hash SHA-256.
- API `POST /api/v1/keys/validate` que comprueba el estado, caducidad y límite de instalaciones.

Los `XXXX` de los selectores son una muestra de formato. El sufijo real se genera con 16 caracteres aleatorios, en cuatro grupos, para que resulte mucho más difícil adivinar una licencia. El contador corresponde a instalaciones identificadas por un `deviceId` estable, no a personas verificadas. Una instalación ya registrada puede volver a validar sin consumir otro cupo.

## Desarrollo y despliegue

Requisitos: Node.js, pnpm y una instancia MySQL. Instala dependencias con `pnpm install`, configura `DATABASE_URL`, aplica migraciones con `pnpm db:migrate` y ejecuta `pnpm dev`. Comprobaciones: `pnpm check`, `pnpm test` y `pnpm build`. El `Dockerfile` incluido compila y sirve la aplicación en el puerto `PORT` (3000 por defecto).

El proyecto WebDev proporciona `DATABASE_URL` y las variables de OAuth de Manus al entorno de desarrollo. `POCOYO_ADMIN_EMAIL` es una variable protegida que autoriza la cuenta de administración; su valor no está en los archivos ni en GitHub. Para alojar la aplicación fuera de Manus, el proveedor elegido debe ejecutar el contenedor y proporcionar una base MySQL; además, habrá que configurar allí las variables de autenticación que utiliza el starter, o reemplazar el proveedor de inicio de sesión si se quiere eliminar esa dependencia también. El endpoint de validación de APK no requiere login OAuth; el panel sí.

GitHub conserva y versiona el código, pero no ejecuta por sí solo el panel ni la API. Este proyecto todavía no tiene un dominio de producción publicado.

## API para la APK

URL relativa: `POST /api/v1/keys/validate`
Cabecera: `Content-Type: application/json`

```json
{
  "key": "POCOYO7X-ABCD-EFGH-JKLM-NPQR",
  "deviceId": "uuid-persistente-de-la-instalacion"
}
```

Respuesta válida:

```json
{
  "valid": true,
  "reason": "active",
  "expiresAt": "2026-12-13T12:00:00.000Z",
  "usedUsers": 1,
  "maxUsers": 3
}
```

Los motivos de rechazo incluyen `invalid_key`, `paused`, `expired` y `user_limit_reached`. La APK debe generar un UUID aleatorio de instalación, guardarlo en sus preferencias y reenviarlo en cada validación. No debe usar IMEI ni incluir credenciales administrativas. Borrar los datos o reinstalar la app puede crear otra instalación y consumir otro cupo.

## Datos y seguridad

El endpoint de validación es público por diseño; las operaciones administrativas requieren una sesión autorizada y el rol `admin`. La API nunca devuelve la key completa después de crearla. La eliminación revoca inmediatamente la licencia y la oculta del inventario. HTTPS debe estar habilitado en el dominio que sirva la API.
