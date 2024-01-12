import { Server } from "http";
// import configKeys from "../../config";

const serverConfig = (server : Server) => {
    const startServer = () => {
        server.listen(4000, () => {
            console.log(`Server started at PORT 4000`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig;