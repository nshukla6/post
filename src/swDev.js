export const register = async() => {
    const path = `${process.env.PUBLIC_URL}/sw.js`;
    const swRegister = await navigator.serviceWorker.register(path);
    console.log(swRegister);
}