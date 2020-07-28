const {Servers} = require("../config/config");
const  matchURL = {
    /**
     * @name isOurResourceServer
     * @description check this request is for any of our ResourceServer
     * @param urlPath contain the incoming URL 
     */
    isOurResourceServer: (urlPath) => {
        try {
            let resourceServer = urlPath.split(/\/(.+)/)[1].split(/\/(.+)/);
            const index = Servers.indexOf(resourceServer[0]);
            const available = index >= 0? true: false;
            return {status: available, server: Servers[index] ,remainingPath: resourceServer[1]};
        } catch (error) {
            throw error;
        }
    }};

module.exports = matchURL;