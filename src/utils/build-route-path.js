export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pastWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    
    const pathRegex = new RegExp(`^${pastWithParams}`)

    return pathRegex
}