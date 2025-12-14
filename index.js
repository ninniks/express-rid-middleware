import rid from 'rid';

const expressRidMiddleware = ((options) =>  {
    return (req, res, next) => {
        const  r_id = rid();
        options = options || {};
        if(options["setResponseHeader"] === true){
            res.setHeader('x-request-id', r_id);
        }
        req.context = req.context || {};
        req.context.rid = r_id;
        next();
    }
})

export default expressRidMiddleware;