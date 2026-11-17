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
  body::before{
    content:"";
    position:fixed; inset:0;
    background: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.92)), url('imagen.jpg');
    background-size:cover;
    background-position: center 30% !important;
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
    content:""; position:absolute;