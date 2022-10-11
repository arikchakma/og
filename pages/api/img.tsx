/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

const font = fetch(
	new URL('../../public/static/slkscrb.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontMono = fetch(
	new URL('../../public/static/SF-Mono-Regular.otf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const name = searchParams.get('name');
	const fontData = await font;
	const fontMonoData = await fontMono;

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#0B0F19',
					color: '#F9F9FA',
				}}
			>
				<img
					src="https://og.arikko.dev/static/light.png"
					width={1200}
					height={630}
					tw="absolute -z-10 opacity-60"
				/>
				<h1 tw="font-bold text-6xl">{name}</h1>
				<p
					tw="text-lg text-center opacity-80 w-86 leading-tight tracking-tight"
					style={{ fontFamily: 'SF Mono' }}
				>
					Check out {name}&apos;s awesome nft collections.
				</p>

				<div tw="flex bg-white/10 w-full items-center justify-center absolute bottom-0">
					<p tw="flex text-lg text-[#0B0F19]">
						arikko.eth | vitalik.eth | boer.eth | ped.eth | arikko.eth |
						vitalik.eth | boer.eth | ped.eth
					</p>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Silkscreen',
					data: fontData,
					style: 'normal',
				},
				{
					name: 'SF Mono',
					data: fontMonoData,
					style: 'normal',
				},
			],
		}
	);
}
