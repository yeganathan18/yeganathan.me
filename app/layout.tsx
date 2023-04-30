import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: "Yeganathan S",
	description:
		"Software engineer intern at economize.cloud and Founder of gitwonk.com",
	openGraph: {
		title: "Yeganathan S",
		description:
			"Software engineer intern at economize.cloud and Founder of gitwonk.com",
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
		card: "summary_large_image",
		title: "Yeganathan S",
		description: "Software engineer intern at economize.cloud and Founder of gitwonk.com",
		images: ['https://yeganathan.me/og.png'],
		creator: "@yeganathans",
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
		<html
			lang="en"
			className={[inter.variable, calSans.variable].join(" ")}
			suppressHydrationWarning
		>
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
