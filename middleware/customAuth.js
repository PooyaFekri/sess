

export default function customAuthMiddleware ({route, store, redirect}){
    const authenticationRoutes = Object.freeze([
        'login'
    ])
    const isAuthenticationRoute = authenticationRoutes.includes(route.name);
    if (!isAuthenticationRoute && !store.getters['auth/isAuthenticated'] ){
        return redirect('/login')
    }
}