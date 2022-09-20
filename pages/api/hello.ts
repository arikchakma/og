// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const cors = require('cors')({ origin: true });

// import type { NextApiRequest, NextApiResponse } from 'next';
// import * as cheerio from 'cheerio';
// import fetch from 'node-fetch';
// import getUrls from 'get-urls';
// import puppeteer from 'puppeteer';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export type Data = {
// 	url: string;
// 	title: string;
// 	favicon: string | undefined;
// 	description: string | undefined;
// 	image: string | undefined;
// 	author: string | undefined;
// 	screenshot?: string | Buffer;
// };

// let getImageBase64 = async (url: string) => {
// 	let browser = await puppeteer.launch();
// 	let page = await browser.newPage();
// 	await page.setViewport({ width: 1920, height: 1080 });
// 	await page.goto(url);
// 	let image = await page.screenshot({
// 		encoding: 'base64',
// 	});
// 	await browser.close();
// 	return image;
// };

// export default async function og(
// 	req: NextApiRequest,
// 	res: NextApiResponse<Data | { error: any }>
// ) {
// 	try {
// 		const scrapeMetatags = (text: string) => {
// 			const urls = Array.from(getUrls(text));

// 			const requests = urls.map(async (url) => {
// 				const res = await fetch(url);
// 				const html = await res.text();
// 				const $ = cheerio.load(html);

// 				const getMetatag = (name: string) =>
// 					$(`meta[name=${name}]`).attr('content') ||
// 					$(`meta[property="og:${name}"]`).attr('content') ||
// 					$(`meta[property="twitter:${name}"]`).attr('content');

// 				return {
// 					url,
// 					title: $('title').first().text(),
// 					favicon: $('link[rel="shortcut icon"]').attr('href'),
// 					// description: $('meta[name=description]').attr('content'),
// 					description: getMetatag('description'),
// 					image: getMetatag('image'),
// 					author: getMetatag('author'),
// 					screenshot: await getImageBase64(url),
// 				};
// 			});
// 			return Promise.all(requests);
// 		};
// 		const result: Data[] = await scrapeMetatags(req.query.url as string);
// 		const resultCloudSS = await cloudinary.uploader.upload(
// 			`data:image/png;base64,${result[0].screenshot}`,
// 			{
// 				folder: 'ogs',
// 			}
// 		);
// 		// const resultCloudCover: any =
// 		// 	result[0].image &&
// 		// 	(await cloudinary.uploader.upload(`${result[0].image}`, {
// 		// 		folder: 'covers',
// 		// 	}));

// 		res.status(200).json({
// 			...result[0],
// 			screenshot: resultCloudSS.secure_url,
// 			// image: resultCloudCover?.secure_url,
// 		});
// 	} catch (error: any) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

// // images.weserv.nl/?url=arikko.dev/static/images/banner.png

// Nextjs hello world api
export default function hello(req: any, res: any) {
	res.status(200).json({ name: 'John Doe' });
}
