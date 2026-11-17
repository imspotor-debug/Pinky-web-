<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mis Canales</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    background: #0a0000;
    color: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-image: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('tu-imagen.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .card {
    width: 100%;
    max-width: 420px;
    background: rgba(15, 0, 0, 0.88);
    border: 1px solid #ff1a1a;
    border-radius: 24px;
    padding: 30px 22px;
    text-align: center;
    box-shadow: 0 0 40px rgba(255, 0, 0, 0.35);
    backdrop-filter: blur(8px);
  }
  .avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #ff1a1a;
    box-shadow: 0 0 25px rgba(255,0,0,0.6);
    margin-bottom: 16px;
  }
  h1 { font-size: 26px; letter-spacing: 1px; margin-bottom: 6px; }
  p { color: #ffb3b3; font-size: 14px; margin-bottom: 24px; }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 15px;
    margin-bottom: 14px;
    border-radius: 14px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
    transition: transform 0.2s, filter 0.2s;
  }
  .btn:hover { transform: scale(1.03); filter: brightness(1.15); }
  .telegram { background: #229ED9; }
  .whatsapp { background: #25D366; color: #04220f; }
  .discord { background: #5865F2; }
  .footer { margin-top: 18px; font-size: 12px; color: #888; }
</style>
</head>
<body>

  <div class="card">
    <!-- Cambia el src por el nombre de tu imagen -->
    <img src="tu-imagen.jpg" alt="Mi imagen" class="avatar">
    
    <h1>MIS CANALES</h1>
    <p>Únete a la comunidad • Contenido diario</p>

    <a class="btn telegram" href="https://t.me/linkjkrgds13exe" target="_blank">
      ✈️ Telegram
    </a>

    <a class="btn whatsapp" href="https://whatsapp.com/channel/0029Vb7e1V2CMY0N0wdR9X1c" target="_blank">
      💬 WhatsApp Channel
    </a>

    <a class="btn discord" href="https://discord.gg/tSV9fRBdW" target="_blank">
      🎮 Discord
    </a>

    <div class="footer">© 2026 - Todos los derechos reservados</div>
  </div>

</body>
</html>