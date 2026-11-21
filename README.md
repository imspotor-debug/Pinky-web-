<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PINKY MODZ | Canales Oficiales</title>
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