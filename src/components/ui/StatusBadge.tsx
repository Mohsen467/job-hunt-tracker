import { cn } from '@/lib/utils';

const colorMap: Record<string, string> = {
  gray: 'bg-gray-100 text-gray-800 ring-gray-200',
  blue: 'bg-blue-100 text-blue-800 ring-blue-200',
  yellow: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  purple: 'bg-purple-100 text-purple-800 ring-purple-200',
  orange: 'bg-orange-100 text-orange-800 ring-orange-200',
  green: 'bg-green-100 text-green-800 ring-green-200',
  emerald: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  red: 'bg-red-100 text-red-800 ring-red-200',
  slate: 'bg-slate-100 text-slate-800 ring-slate-200',
};

export function StatusBadge({ color = 'gray', children }: { color?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset', colorMap[color] ?? colorMap.gray)}>
      {children}
    </span>
  );
}
