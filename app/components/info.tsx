"use client";

import { Info as InfoIcon } from "lucide-react";
import Link from "next/link";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export const Info: React.FC = () => {
	return (
		<div className="fixed bottom-0 right-0 z-50 p-4">
			<HoverCard>
				<HoverCardTrigger asChild>
					<button>
						<InfoIcon className="text-zinc-500 hover:text-zinc-400  h-6 w-6" />
					</button>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 text-zinc-300 border-zinc-500 border-dashed font-mono">
					<div className="flex justify-between space-x-4">
						<div className="space-y-1">
							<h4 className="text-xs font-medium">Code Attribution 💚</h4>
							<p className="text-xs text-zinc-400">
								This project is an independent fork of{" "}
								<Link
									className="underline hover:decoration-emerald-500"
									href="https://github.com/chronark/chronark.com.git"
								>
									chronark/chronark.com
								</Link>{" "}
							</p>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};
