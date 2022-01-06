import dotenv from "dotenv";
dotenv.config();

import http from "http";
import routes, { METHOD_LISTENERS } from "./configs/routes.config";

const server = http.createServer();

server.on("request", (req, res) => {
	// Only some type safeties
	if (!req.url) {
		res.statusCode = 400;
		res.write("URL Required.");
		res.end();
		return;
	}
	if (!req.method) {
		res.statusCode = 400;
		res.write("Method Required.");
		res.end();
		return;
	}

	// check if request method is valid
	const method_paths: METHOD_LISTENERS = (routes as any)[req.method];
	if (!method_paths) {
		res.statusCode = 405;
		res.end();
		return;
	}
	// check if the path exists in specified valid method pool
	if (!(method_paths as any)[req.url]) {
		res.statusCode = 404;
		res.end();
		return;
	}
	// trigger the respective listener
	(method_paths as any)[req.url](req, res);
});

server.listen(process.env.PORT, 600, () => console.log("Server Listening..."));
