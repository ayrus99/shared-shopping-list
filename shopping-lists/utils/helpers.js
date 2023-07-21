export function activeClass(path) {
    const currentPath = Deno.env.get('PATH') || '/';
    return currentPath === path ? 'active' : '';
}
