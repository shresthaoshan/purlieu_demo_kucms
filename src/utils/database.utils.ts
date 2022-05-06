import { writeFile } from "fs";
import { readFile } from "fs/promises";
import path from "path";

interface RecordInterface {
	id: string;
	name: string;
	amount: number;
}

const filepath = path.resolve(__dirname, "database.json");

const getFileContent = async () => {
	const file = await readFile(filepath, {
		encoding: "utf-8",
		flag: "r+",
	});
	const content = JSON.parse(file) as RecordInterface[];
	return content;
};

const updateAmount = async (id: string, amount: number) => {
	const content = await getFileContent();
	const recordIndex = content.findIndex((item) => item.id == id);

	if (recordIndex < 0) return;

	content[recordIndex].amount += amount;
	writeFile(filepath, JSON.stringify(content), (err) => {});
};

const listRecords = async () => {
	return getFileContent();
};

export default {
	listRecords,
	updateAmount,
};
