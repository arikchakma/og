/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	const [data, setData] = useState<any>(null);
	const [url, setUrl] = useState<string>('');
	const fetchData = async (url: string) => {
		const res = await fetch('/api/og?url=' + url);
		return await res.json();
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const res = await fetchData(url);
		setData(res);
	};

	return (
		<div>
			<Head>
				<title>Open Graph Data Generator | Arikko</title>
			</Head>

			<main>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button type="submit">Submit</button>
				</form>

				{data && (
					<div>
						<h1>{data?.title}</h1>
						<p>{data?.url}</p>
						<p>{data?.description}</p>
						<Image
							src={`https://images.weserv.nl/?url=${data?.image}`}
							width={1920}
							height={1080}
							alt="screenshot"
						/>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
