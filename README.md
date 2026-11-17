<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PINKY</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:'Poppins',sans-serif;
    min-height:100vh;
    background:#050000;
    color:#fff;
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    overflow-x:hidden;
    position:relative;
  }
  /* FONDO ANIMADO */
  body::before{
    content:"";
    position:fixed; inset:0;
    background: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.92)), url('imagen.jpg');
    background-size:cover; background-position:center;
    filter:blur(2px) brightness(0.7);
    z-index:-2;
  }
  .glow{
    position:fixed; width:500px; height:500px; border-radius:50%;
    background:radial-gradient(circle, rgba(255,0,0,.45), transparent 70%);
    filter:blur(80px); z-index:-1; animation:float 6s ease-in-out infinite;
  }
  .glow2{ left:-100px; top:-100px; }
  .glow3{ right:-100px; bottom:-100px; animation-delay:3s; }
  @keyframes float{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }

  .card{
    width:100%; max-width:430px;
    background:rgba(20,0,0,.82);
    backdrop-filter:blur(15px);
    border:1px solid rgba(255,26,26,.6);
    border-radius:28px;
    padding:36px 24px 26px;
    text-align:center;
    box-shadow:0 0 60px rgba(255,0,0,.45), inset 0 0 30px rgba(255,0,0,.08);
    position:relative;
    overflow:hidden;
  }
  .card::before{
    content:""; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, transparent, #ff1a1a, #ff6b6b, #ff1a1a, transparent);
    animation:shine 2.5s linear infinite;
  }
  @keyframes shine{ 0%{opacity:.4} 50%{opacity:1} 100%{opacity:.4} }

  .avatar-wrap{ position:relative; width:170px; height:170px; margin:0 auto 10px; }
  .avatar-wrap::before{
    content:""; position:absolute; inset:-8px; border-radius:50%;
    border:2px dashed #ff1a1a; animation:spin 12s linear infinite;
  }
  @keyframes spin{ to{transform:rotate(360deg)} }
  .avatar{
    width:170px; height:170px; object-fit:cover; border-radius:50%;
    border:4px solid #0a0000; outline:3px solid #ff1a1a;
    box-shadow:0 0 35px rgba(255,0,0,.8);
  }
  .online{
    position:absolute; bottom:14px; right:14px;
    background:#00ff88; width:22px; height:22px; border-radius:50%;
    border:3px solid #0a0000; box-shadow:0 0 12px #00ff88;
  }

  .title{
    font-family:'Orbitron',sans-serif;
    font-size:46px; font-weight:900; letter-spacing:6px;
    background:linear-gradient(180deg, #fff, #ff1a1a 55%, #7a0000);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    text-shadow:0 0 30px rgba(255,0,0,.3);
    margin-top:8px; line-height:1;
  }
  .subtitle{
    font-size:12px; letter-spacing:4px; color:#ff9a9a;
    text-transform:uppercase; margin:8px 0 6px;
  }
  .desc{ font-size:14px; color:#d8d8d8; margin-bottom:22px; line-height:1.5; }
  .desc b{ color:#ff5a5a; }

  .stats{
    display:flex; gap:10px; margin-bottom:22px;
  }
  .stat{
    flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    border-radius:14px; padding:10px 5px;
  }
  .stat strong{ display:block; font-size:18px; color:#fff; }
  .stat span{ font-size:11px; color:#ffb3b3; letter-spacing:1px; }

  .btn{
    display:flex; align-items:center; justify-content:space-between;
    width:100%; padding:16px 18px; margin-bottom:13px;
    border-radius:16px; text-decoration:none; color:#fff;
    font-weight:700; font-size:16px;
    border:1px solid rgba(255,255,255,.15);
    transition:.25s; position:relative; overflow:hidden;
  }
  .btn:active{ transform:scale(.97); }
  .btn:hover{ transform:translateY(-2px); box-shadow:0 10px 25px rgba(0,0,0,.5); }
  .btn .left{ display:flex; align-items:center; gap:12px; }
  .btn .icon{
    width:38px; height:38px; border-radius:11px;
    display:flex; align-items:center; justify-content:center;
    font-size:20px; background:rgba(0,0,0,.25);
  }
  .btn .arrow{ opacity:.7; font-size:18px; }
  .btn small{ display:block; font-weight:400; font-size:11px; opacity:.85; text-align:left; }

  .telegram{ background:linear-gradient(135deg,#229ED9,#0e7bbd); }
  .whatsapp{ background:linear-gradient(135deg,#25D366,#0fb95a); color:#04220f; }
  .discord{ background:linear-gradient(135deg,#5865F2,#3e4ad1); }

  .divider{ display:flex; align-items:center; gap:12px; margin:18px 0 14px; color:#888; font-size:11px; letter-spacing:2px; }
  .divider::before,.divider::after{ content:""; flex:1; height:1px; background:rgba(255,255,255,.15); }

  .share{
    width:100%; padding:13px; border-radius:14px; border:1px dashed #ff1a1a;
    background:transparent; color:#ff8a8a; font-weight:700; cursor:pointer; font-size:14px;
  }
  .footer{ margin-top:16px; font-size:11px; color:#777; }
  .footer b{ color:#ff5a5a; }
</style>
</head>
<body>
  <div class="glow glow2"></div>
  <div class="glow glow3"></div>

  <div class="card">
    <div class="avatar-wrap">
      <img src="imagen.jpg" class="avatar" alt="PINKY">
      <div class="online"></div>
    </div>

    <div class="title">PINKY</div>
    <div class="subtitle">✦ Comunidad Oficial ✦</div>
    <p class="desc">Bienvenido a mi mundo.<br><b>Únete</b> y no te pierdas nada.</p>

    <div class="stats">
      <div class="stat"><strong>3</strong><span>CANALES</span></div>
      <div class="stat"><strong>24/7</strong><span>ACTIVO</span></div>
      <div class="stat"><strong>🔥</strong><span>CONTENIDO</span></div>
    </div>

    <a class="btn telegram" href="https://t.me/linkjkrgds13exe" target="_blank">
      <span class="left"><span class="icon">✈️</span><span>Telegram<small>Canal principal</small></span></span>
      <span class="arrow">›</span>
    </a>

    <a class="btn whatsapp" href="https://whatsapp.com/channel/0029Vb7e1V2CMY0N0wdR9X1c" target="_blank">
      <span class="left"><span class="icon">💬</span><span>WhatsApp<small>Únete ahora</small></span></span>
      <span class="arrow">›</span>
    </a>

    <a class="btn discord" href="https://discord.gg/tSV9fRBdW" target="_blank">
      <span class="left"><span class="icon">🎮</span><span>Discord<small>Comunidad & Chat</small></span></span>
      <span class="arrow">›</span>
    </a>

    <div class="divider">COMPARTE</div>
    <button class="share" onclick="navigator.clipboard.writeText(window.location.href); this.innerText='✅ ¡Link Copiado!'; setTimeout(()=>this.innerText='🔗 Compartir mi página',2000)">🔗 Compartir mi página</button>

    <div class="footer">© 2026 <b>PINKY</b> • Todos los derechos reservados</div>
  </div>
</body>
</html>