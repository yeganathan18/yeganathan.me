import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "yeganathan.me",
		template: "%s | yeganathan.me",
	},
	description: "Software engineer intern at economize.cloud and founder of gitwonk.com",
	openGraph: {
		title: "cyeganathan.me",
		description:
			"Software engineer at economize.cloud and founder of gitwonk.com",
		url: "https://yeganathan.me",
		siteName: "yeganathan.me",
		images: [
			{
				url: "https://yeganathan.me/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Yeganathan",
		card: "summary_large_image",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black selection:bg-white selection:text-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
