import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
    layout('layouts/main.tsx', [
        index('routes/home.tsx'),
        route('leads', 'routes/leads.tsx'),
        route('leads/new', 'routes/leads.new.tsx'),
        route('leads/:id/edit', 'routes/leads.edit.tsx'),
        route('logout', 'routes/logout.tsx')
    ]),
    route('login', 'routes/login.tsx'),
    route('auth/google', 'routes/auth.google.tsx'),
    route('auth/google/callback', 'routes/auth.google.callback.tsx'),
    route('forgot-password', 'routes/forgot-password.tsx')
] satisfies RouteConfig
