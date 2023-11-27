<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
    @vite('resources/css/app.css')
    {{-- @routes --}}
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body class="font-sans antialiased bg-slate-100">
    @inertia
</body>

</html>
