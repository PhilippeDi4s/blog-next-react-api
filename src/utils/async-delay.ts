export async function simulateDelay(milliseconds: number = 0){
    if(milliseconds <= 0) return

    console.log(`simulating a ${milliseconds/1000}s delay`)

    await new Promise((resolve) => setTimeout(resolve, milliseconds))
}