
const apikey = 'SaT1JjsUHiRxt3pxQXhP'

const authenticateKey = (req, res, next) => {

    let api_key = req.header("x-api-key"); //Add API key to headers
    if (!api_key) return res.status(403).send({ error: { code: 403, message: "You not allowed[nokey]." } });
    console.log(apikey);
    console.log(api_key);

    if (apikey === (api_key)) {
        console.log("Good API call");
        next()
    } else {
        //Reject request if API key doesn't match
        return res.status(403).send({ error: { code: 403, message: "You not allowed." } });
    }
}
module.exports = authenticateKey 