export function runtimeString(time){
    return `${Math.floor(time / 60)}h ${time % 60}m`
}