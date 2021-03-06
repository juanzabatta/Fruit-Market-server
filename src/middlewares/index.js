const whiteList = [
	{
		url: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	},
	{
		url: 'http://localhost:8080',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	},
	// {
	//   url:'https://fruit-market-mevn.herokuapp.com/',
	//   methods: [ 'GET', 'POST', 'PUT', 'DELETE']
	// },
	// {
	//   url:'https://web.postman.co',
	//   methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
	// }
];

const corsOptions = (req, callback) => {
	const domainDetails = whiteList.find(
		(item) => item.url === req.header('Origin'),
	);

	if (domainDetails && domainDetails.methods.indexOf(req.method) !== -1) {
		callback(null, { origin: true, methods: true });
	} else {
		callback(null, { origin: false });
	}
};

module.exports = corsOptions;
