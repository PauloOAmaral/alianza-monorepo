import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
    layout('layouts/main.tsx', [
        index('routes/home.tsx'),
        route('leads', 'routes/leads.tsx', [
            route('new', 'routes/leads-new.tsx'),
            route(':id/edit', 'routes/leads-edit.tsx')
        ]),
        route('sellers', 'routes/sellers.tsx', [
            route('new', 'routes/sellers-new.tsx'),
        ]),
        route('logout', 'routes/logout.tsx')
    ]),
    route('login', 'routes/login.tsx'),
    route('forgot-password', 'routes/forgot-password.tsx')
] satisfies RouteConfig
