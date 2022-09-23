// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const cors = require('cors')({ origin: true });

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
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
		);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
