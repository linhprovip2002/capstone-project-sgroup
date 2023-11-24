
export default function errorHandler(err, req, res, next) {
  
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
    status: err.status || 400, // Set a default status code if not provided
    error: messageError
  };
  const status = err.status || 400; // Set a default status code if not provided

  if (res && res.status) {
    return res.status(status).json(error)
  } else {
    // If res is not available or doesn't have the status method, log an error
    console.error('Error: Unable to send response. Response object may be missing or modified.');
  }
}

