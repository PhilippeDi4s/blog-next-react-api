export async function simulateDelay(milliseconds: number = 0){
    if(milliseconds <= 0) return
    await new Promise((resolve) => setTimeout(resolve, milliseconds))
}