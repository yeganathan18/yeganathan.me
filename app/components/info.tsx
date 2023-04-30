"use client";

import { Info as InfoIcon } from "lucide-react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

type InfoProps = {
  title: string;
  children?: React.ReactNode;
};

export const Info = ({ title, children }: InfoProps) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>
            <InfoIcon className="text-zinc-500 hover:text-emerald-400  h-6 w-6" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 text-zinc-300 border-zinc-500 border-dashed font-mono">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-xs font-medium">{title}</h4>
              {children}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
