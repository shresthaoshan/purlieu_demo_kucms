import { RequestListener } from "http";
import { onPayment } from "../listeners/webhooks/payment";

export interface METHOD_LISTENERS {
	[path: string]: RequestListener;
}

export interface Routes {
	POST: METHOD_LISTENERS;
	GET: METHOD_LISTENERS;
	PUT: METHOD_LISTENERS;
}

const routes: Routes = {
	POST: {
		"/payment": onPayment,
	},
	GET: {},
	PUT: {},
};

export default routes;
