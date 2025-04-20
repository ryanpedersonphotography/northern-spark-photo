const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dnx4og9au',
  api_key: '315643497461161',
  api_secret: 'xRKGCnNLuvKLpX3HTs4TlnXC6zw'
});

cloudinary.api.resources({ max_results: 500 })
  .then(result => {
    console.log(JSON.stringify(result.resources, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });
