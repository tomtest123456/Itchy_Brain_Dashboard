/* 
    /src/app/dashboard/components/SummaryCard.tsx
    ---------------------------------------------
    A minimal card to display a summary metric.
    - Text is centered both horizontally & vertically.
    - No extra header or outline.
*/

interface SummaryCardProps {
    title: string;
    value: number | string;
    unit?: string;
}

export default function SummaryCard({ title, value, unit }: SummaryCardProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-2">
            <h2 className="text-center text-sm text-text/70">{title}</h2>
            <div className="text-center">
                <span className="block text-3xl font-bold text-text">{value}</span>
                {unit && <span className="text-sm text-text/70">{unit}</span>}
            </div>
        </div>
    );
}
