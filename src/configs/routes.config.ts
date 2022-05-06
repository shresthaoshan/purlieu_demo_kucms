import { RequestListener } from "http";
import { onPayment } from "../listeners/webhooks/payment";
import { default as database } from "../utils/database.utils";

export interface METHOD_LISTENERS {
	[path: string]: RequestListener;
}

export interface Routes {
	POST: METHOD_LISTENERS;
	GET: METHOD_LISTENERS;
	PUT: METHOD_LISTENERS;
}

const home: RequestListener = (req, res) => {
	res.write("Hello, world!");
	res.end();
};
const list: RequestListener = async (req, res) => {
	const _l = await database.listRecords();
	res.setHeader("Content-Type", "application/json");
	res.write(JSON.stringify(_l));
	res.end();
};

const routes: Routes = {
	POST: {
		"/payment": onPayment,
	},
	GET: {
		"/": home,
		"/list": list,
	},
	PUT: {},
};

export default routes;
