const errorHandler = (err, req, res, next) => {
    console.log('ERROR LOG ', new Date().toLocaleString());
    console.log('Request:', req.method, req.originalUrl);
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    console.log('Error:', err.messageObject || err.message);
    console.log('--------------------------------------------------------------------------------------');
  
    const messageError = err.messageObject || err.message;
    // create format error response
    const error = {
      status: err.status || 400,
      error: messageError
    };
    const status = err.status || 400;
  
    return res.status(status).json(error);
  };
  export default errorHandler;