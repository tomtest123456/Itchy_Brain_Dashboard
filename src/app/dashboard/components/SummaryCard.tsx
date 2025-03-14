/* 
    /src/app/dashboard/components/SummaryCard.tsx
    ---------------------------------------------
    A minimal card to display a summary metric.
    - Uses Inter font with appropriate weights
    - Follows the new color scheme from tailwind.config.js
    - Text is centered both horizontally & vertically
*/

interface SummaryCardProps {
    title: string;
    value: number | string;
    unit?: string;
}

export default function SummaryCard({ title, value, unit }: SummaryCardProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-2">
            <h2 className="text-center text-sm font-medium text-col_text/70">{title}</h2>
            <div className="text-center">
                <span className="block text-3xl font-bold text-col_text">{value}</span>
                {unit && <span className="text-sm font-normal text-col_text/70">{unit}</span>}
            </div>
        </div>
    );
}
