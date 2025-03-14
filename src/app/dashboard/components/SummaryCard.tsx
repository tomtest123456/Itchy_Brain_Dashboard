/* 
    /src/app/dashboard/components/SummaryCard.tsx
    ---------------------------------------------
    A minimal card to display a summary metric.
    
    Component Structure:
    ┌─────────── Card Container ───────────┐
    │                                      │
    │   ┌────── Title Section ──────┐      │
    │   │      Total Distance       │      │
    │   └──────────────────────────┘      │
    │                                      │
    │   ┌────── Value Section ──────┐     │
    │   │         11,847           │      │
    │   └──────────────────────────┘      │
    │                                      │
    │   ┌────── Unit Section ──────┐      │
    │   │           km             │      │
    │   └──────────────────────────┘      │
    │                                      │
    └──────────────────────────────────────┘
*/

interface SummaryCardProps {
    title: string;
    value: number | string;
    unit?: string;
}

export default function SummaryCard({ title, value, unit }: SummaryCardProps) {
    return (
        // Card Container
        // ------------------------------------------------
        // flex flex-col    : Display children in a vertical column
        // items-center     : Center children horizontally
        // justify-between  : Distribute space between children evenly
        // h-full           : Height = 100% of parent
        // w-full           : Width = 100% of parent
        <div className={`
            flex flex-col
            items-center
            justify-between
            h-full
            w-full
            relative
        `}>
            {/* Title Section (Total Distance, Avg Speed, etc.) */}
            {/* ------------------------------------------------ */}
            {/* absolute        : Position absolutely within container */}
            {/* top-[5%]        : Position from top of container */}
            {/* text-center     : Center align the text */}
            {/* text-sm         : Font size = 0.875rem (14px) */}
            {/* font-semibold   : Font weight = 600 */}
            {/* text-col_text/80: Text color with 80% opacity */}
            <div className={`
                absolute
                top-[5%]
                w-full
                text-center
            `}>
                <h2 className={`
                    text-sm
                    font-semibold
                    text-col_text/80
                `}>
                    {title}
                </h2>
            </div>

            {/* Value Display (11,847, 32.1, etc.) */}
            {/* ------------------------------------------------ */}
            {/* absolute        : Position absolutely within container */}
            {/* top-[50%]       : Position in middle of container */}
            {/* -translate-y-1/2: Move up by half its height to center */}
            {/* text-3xl        : Font size = 1.875rem (30px) */}
            {/* font-bold       : Font weight = 700 */}
            {/* text-col_text   : Main text color */}
            <div className={`
                absolute
                top-[50%]
                -translate-y-1/2
                w-full
                text-center
            `}>
                <span className={`
                    text-3xl
                    font-bold
                    text-col_text
                `}>
                    {value}
                </span>
            </div>

            {/* Unit Display (km, km/h, etc.) */}
            {/* ------------------------------------------------ */}
            {/* absolute        : Position absolutely within container */}
            {/* bottom-[12%]   : Position from bottom of container */}
            {/* text-xs        : Font size = 0.75rem (12px) */}
            {/* font-semibold  : Font weight = 600 */}
            {/* text-col_text/80: Text color with 80% opacity */}
            {unit && (
                <div className={`
                    absolute
                    bottom-[5%]
                    w-full
                    text-center
                `}>
                    <span className={`
                        text-xs
                        font-semibold
                        text-col_text/80
                    `}>
                        {unit}
                    </span>
                </div>
            )}
        </div>
    );
}
