import app from "./app";

const server = app.listen(app.get("port"), async () => {
    console.log(`App is running at http://localhost:${app.get("port")}`)
})

export default server;