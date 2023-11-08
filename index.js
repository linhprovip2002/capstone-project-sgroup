const http = require("https");

const options = {
  "method": "POST",
  "hostname": "track.customer.io",
  "port": null,
  "path": "/api/v1/segments/20/add_customers",
  "headers": {
    "content-type": "application/json",
    "Authorization": "Basic REPLACE_BASIC_AUTH"
  }
};

const req = http.request(options, function (res) {
  const chunks = [
    "ids" [
        "customer_id1",
        "customer_id2"
        ]
  ];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ids: ['string']}));
req.end();