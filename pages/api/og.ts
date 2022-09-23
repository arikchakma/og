// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const cors = require('cors')({ origin: true });
import NextCors from 'nextjs-cors';

import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export type Data = {
	url: string;
	title: string;
	favicon: string | undefined;
	description: string | undefined;
	image: string | undefined;
	author: string | undefined;
};

export default async function og(
	req: NextApiRequest,
	res: NextApiResponse<Data | { error: any }>
) {
	try {
		await NextCors(req, res, {
			// Options
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
			origin: '*',
			optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		});
		const scrapeMetatags = async (url: string) => {
			const res = await fetch(url);
			const html = await res.text();
			const $ = cheerio.load(html);

			const getMetatag = (name: string) =>
				$(`meta[name=${name}]`).attr('content') ||
				$(`meta[property="og:${name}"]`).attr('content') ||
				$(`meta[property="twitter:${name}"]`).attr('content');
			const getFavicon = () =>
				$('link[rel="shortcut icon"]').attr('href') ||
				$('link[rel="icon"]').attr('href');
			return {
				url,
				title: $('title').first().text(),
				favicon: getFavicon(),
				// description: $('meta[name=description]').attr('content'),
				description: getMetatag('description'),
				image: getMetatag('image'),
				author: getMetatag('author'),
			};
		};
		const result: Data = await scrapeMetatags(req.query.url as string);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
