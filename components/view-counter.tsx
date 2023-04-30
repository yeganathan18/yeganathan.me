import { Eye } from "lucide-react";

type ViewCounterProps = {
  views: number;
};

export default function ViewCounter({ views }: ViewCounterProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4">
      <span
        title="View counter for this post"
        className="duration-200 text-sm hover:font-medium flex items-center gap-1 
            text-zinc-400 hover:text-zinc-300 rounded-full px-4 py-2 border-2 border-zinc-800"
      >
        <Eye className="w-5 h-5" /> {views}
      </span>
    </div>
  );
}
