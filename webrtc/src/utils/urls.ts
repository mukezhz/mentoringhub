const env = process.env.NODE_ENV || "production"
let urls: { [key: string]: string }
if (env === "production") {
    urls = {
        us: "wss://chautari-server.hamropatro.com",
        np: "wss://chautari-server-np.hamropatro.com",
    }
} else {
    urls = {
        us: "wss://chautari-server.alpha.hamrostack.com",
        np: "wss://chautari-server-np.hamropatro.com",
    }
}
export { urls }