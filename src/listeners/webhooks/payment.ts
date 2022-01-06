import { RequestListener } from "http";

export const onPayment: RequestListener = (req, res) => {
	res.statusCode = 200;
	res.write("Congrats on successful payment.");
	res.end();
};
