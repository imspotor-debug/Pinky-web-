<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PINKY MODZ | Canales Oficiales & Panel</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome 6 para iconos oficiales -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"> 
    <!-- Google Fonts: Inter & Orbitron -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        gamer: ['Orbitron', 'sans-serif'],
                    },
                    animation: {
                        'pulse-crimson': 'pulseCrimson 2.2s infinite ease-in-out',
                        'float': 'float 4.5s ease-in-out infinite',
                        'shimmer': 'shimmer 2.4s linear infinite',
                        'spin-slow': 'spin 8s linear infinite',
                    },
                    keyframes: {
                        pulseCrimson: {
                            '0%, 100%': { 
                                boxShadow: '0 0 18px rgba(220, 38, 38, 0.65), 0 0 38px rgba(153, 27, 27, 0.35)' 
                            },
                            '50%': { 
                                boxShadow: '0 0 30px rgba(239, 68, 68, 0.95), 0 0 60px rgba(220, 38, 38, 0.55)' 
                            },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-6px)' },
                        },
                        shimmer: {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' }
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#070304] text-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-red-600 selection:text-white">

    <!-- Canvas de Partículas Sutiles en Rojo Carmesí y Negro -->
    <canvas id="crimson-particles" class="fixed inset-0 pointer-events-none z-0"></canvas>

    <!-- Fondo ambiental con luces neón carmesí -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute -top-28 -left-24 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-red-700/25 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -right-28 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-rose-900/25 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-28 left-1/4 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-red-950/40 rounded-full blur-3xl"></div>
        <!-- Cuadrícula oscura sutil -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#dc26260d_1px,transparent_1px),linear-gradient(to_bottom,#dc26260d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>

    <!-- Contenedor Principal (Tarjeta Glassmorphism Oscuro) -->
    <main class="relative z-10 w-full max-w-md bg-[#0d0608]/80 backdrop-blur-xl border border-red-900/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(153,27,27,0.22)]">
        
        <!-- Encabezado: Avatar Circular y Estado -->
        <header class="flex flex-col items-center text-center mb-7">
            <div class="relative group animate-float">
                <!-- Halo / Glow rojo neón carmesí -->
                <div class="absolute -inset-1.5 bg-gradient-to-tr from-red-700 via-red-500 to-rose-900 rounded-full blur-md opacity-85 group-hover:opacity-100 transition duration-300"></div>
                
                <!-- Contenedor circular del avatar -->
                <div class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-red-500 bg-[#0d0204] flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.65)]">
                    <!-- Carga por defecto 'IMG-20261116-WA0448.jpg' con respaldo automático -->
                    <img 
                        id="site-logo"
                        src="IMG-20261116-WA0448.jpg" 
                        onerror="activarFallbackAvatar(this)"
                        alt="Avatar Oficial PINKY MODZ" 
                        class="w-full h-full object-cover object-center"
                    >
                    
                    <!-- Ilustración SVG de respaldo estilo silueta anime carmesí si la imagen local no está en la misma ruta -->
                    <div id="svg-avatar-fallback" class="hidden w-full h-full relative bg-gradient-to-b from-[#45070c] via-[#1f0306] to-black flex items-center justify-center">
                        <svg viewBox="0 0 200 200" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="crimsonGlow" cx="50%" cy="42%" r="55%">
                                    <stop offset="0%" stop-color="#991b1b" stop-opacity="0.9"/>
                                    <stop offset="65%" stop-color="#450a0a" stop-opacity="0.95"/>
                                    <stop offset="100%" stop-color="#090203" stop-opacity="1"/>
                                </radialGradient>
                                <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                                    <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect width="200" height="200" fill="url(#crimsonGlow)"/>
                            <!-- Silueta de hombros y abrigo oscuro -->
                            <path d="M22 200 C28 152, 55 138, 100 138 C145 138, 172 152, 178 200 Z" fill="#070405"/>
                            <!-- Rostro sombreado -->
                            <path d="M74 86 C74 114, 86 130, 100 132 C114 130, 126 114, 126 86 Z" fill="#1a1214"/>
                            <!-- Cabello anime desordenado -->
                            <path d="M52 96 L42 74 L58 76 L46 52 L68 62 L66 34 L86 50 L98 26 L112 48 L134 32 L132 60 L156 50 L144 74 L162 76 L148 98 L132 88 L124 106 L114 88 L102 110 L94 88 L82 108 L74 88 Z" fill="#050304"/>
                            <!-- Ojos rojos brillantes -->
                            <ellipse cx="87" cy="98" rx="5.5" ry="2.6" fill="#ef4444" filter="url(#eyeGlow)"/>
                            <circle cx="87" cy="98" r="1.4" fill="#fca5a5"/>
                            <ellipse cx="113" cy="98" rx="5.5" ry="2.6" fill="#ef4444" filter="url(#eyeGlow)"/>
                            <circle cx="113" cy="98" r="1.4" fill="#fca5a5"/>
                        </svg>
                    </div>

                    <!-- Botón discreto sobre el avatar para probar/cargar otra imagen al instante -->
                    <label for="avatar-upload" title="Cambiar o cargar imagen manualmente" class="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-xs font-medium text-red-200 z-10">
                        <i class="fa-solid fa-camera text-base text-red-500 mb-1"></i>
                        <span>Cambiar foto</span>
                    </label>
                    <input type="file" id="avatar-upload" accept="image/*" class="hidden" onchange="cargarImagenLocal(event)">
                </div>

                <!-- Badge de estado