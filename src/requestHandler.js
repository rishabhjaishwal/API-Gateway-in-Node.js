const SERVERS = require("./config/config");
const {isOurResourceServer} = require("./helpers/matchURL");
const { CustomError } = require("./helpers/error");
const axios = require('axios').default;
const {mapping} = require("./config/config");

const handlerService = {
    /**
     * @name requestHandler
     * @description used as gateway for the Resource Server
     */
    requestHandler: async (req,res,next) => {
        try {
            let path = req._parsedUrl.path;
            // Checking is th resource server belongs to the our server
            const isavailable = isOurResourceServer(path);
            if(!isavailable.status) {
                throw new CustomError(401, "UnAuthorized User Request");
            } else {

                // creating header for AuthPayload    
                var headers = {};
                if(req.headers['x-access-token']) {
                    headers = { 
                        headers: {'x-access-token': req.headers['x-access-token'] }
                    }
                }

                // Requesting for Authorization and for resource acces payload
                let authRequest = await axios({
                    method: 'get',
                    url: `${mapping['authServer']}/api/validateUser`,
                    responseType: 'json',
                    responseEncoding: 'utf8',
                    headers
                }).catch(err => { throw new CustomError(404,err.message) });

                // creating request payload for resource server
                let body = {...req.body};
                if(typeof authRequest.data === `object`) {
                    body['authData'] = {...authRequest.data};
                }

                // After Authorization, Forwording resource to Resource Server
                let resourceRequest = await axios({
                    method: req.method,
                    url: `${mapping[isavailable.server]}/${isavailable.remainingPath}`,
                    data: body,
                }).catch(err => {throw new CustomError(404,err.message)});

                
                res.json({
                    success: true,
                    data: resourceRequest.data,
                })
            }
        } catch (error) {
            next(error);
        }
    }
}


module.exports = handlerService;