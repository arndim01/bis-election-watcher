export { errorHandler };

const errorHandler = {
    onError(err, req, res){
        if( typeof (err) === 'string'){
            return res.status(400).json({ error: err });
        }

        if( err.name === 'UnauthorizedError'){
            return res.status(401).json({ error: 'Unauthroized access'});
        }

        return res.status(500).json({ error : err.message});
    }
}
