import { IncomingMessage, RequestListener } from "http";
import { default as database } from "../../utils/database.utils";

interface PayloadInterface {
	idx: string;
	receipent: string;
	verifiedAmount: number;
	gateway: string;
	remarks: string;
	type: string;
}

const apiKey = process.env.API_KEY ?? "";

const verifyCallback = async (req: IncomingMessage) => {
	const _apiKey = req.headers.authorization;
	return apiKey === _apiKey;
};

export const onPayment: RequestListener = async (req, res) => {
	let data = "";
	req.on("data", (chunk) => {
		data += chunk;
	});
	req.on("end", async () => {
		const verified = await verifyCallback(req);

		if (!verified) {
			res.statusCode = 402;
			res.end();
			return;
		}

		const body = JSON.parse(data) as PayloadInterface;

		await database.updateAmount(body.receipent, body.verifiedAmount / 100);

		res.statusCode = 200;
		res.write("Congrats on successful payment.");
		res.end();
	});
};
