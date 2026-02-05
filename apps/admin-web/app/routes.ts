import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
    layout('layouts/main.tsx', [
        index('routes/home.tsx'),
        route('leads', 'routes/leads.tsx'),
        route('logout', 'routes/logout.tsx')
    ]),
    route('login', 'routes/login.tsx'),
    route('forgot-password', 'routes/forgot-password.tsx')
] satisfies RouteConfig
