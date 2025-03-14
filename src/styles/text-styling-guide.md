# Tailwind CSS Text Styling Guide

## Font Sizes
```tsx
// From smallest to largest
text-xs     // 0.75rem (12px)
text-sm     // 0.875rem (14px)
text-base   // 1rem (16px)
text-lg     // 1.125rem (18px)
text-xl     // 1.25rem (20px)
text-2xl    // 1.5rem (24px)
text-3xl    // 1.875rem (30px)
text-4xl    // 2.25rem (36px)
text-5xl    // 3rem (48px)
text-6xl    // 3.75rem (60px)
text-7xl    // 4.5rem (72px)
text-8xl    // 6rem (96px)
text-9xl    // 8rem (128px)
```

## Font Weights
```tsx
font-thin       // 100
font-extralight // 200
font-light      // 300
font-normal     // 400
font-medium     // 500
font-semibold   // 600
font-bold       // 700
font-extrabold  // 800
font-black      // 900
```

## Text Colors (Using Our Theme)
```tsx
// Main text colors from tailwind.config.js
text-col_text        // #DCDCDC (Platinum)
text-col_text/90     // 90% opacity
text-col_text/80     // 80% opacity
text-col_text/70     // 70% opacity
text-col_text/60     // 60% opacity
text-col_text/50     // 50% opacity

// Accent colors
text-col_accent      // #4C00FF (Bright Blue)
text-col_secondary   // #3900BD (Medium Blue)
text-col_alert       // #B30021 (Firebrick)
```

## Text Alignment
```tsx
text-left      // Align text to the left
text-center    // Center text
text-right     // Align text to the right
text-justify   // Justify text
```

## Text Decoration
```tsx
// Underline
underline
no-underline
decoration-solid
decoration-double
decoration-dotted
decoration-dashed
decoration-wavy

// Underline Thickness
decoration-auto
decoration-from-font
decoration-0
decoration-1
decoration-2
decoration-4
decoration-8

// Underline Offset
underline-offset-auto
underline-offset-0
underline-offset-1
underline-offset-2
underline-offset-4
underline-offset-8
```

## Text Transform
```tsx
uppercase      // UPPERCASE TEXT
lowercase      // lowercase text
capitalize     // Capitalize Each Word
normal-case    // Normal text
```

## Letter Spacing
```tsx
tracking-tighter  // -0.05em
tracking-tight    // -0.025em
tracking-normal   // 0em
tracking-wide     // 0.025em
tracking-wider    // 0.05em
tracking-widest   // 0.1em
```

## Line Height
```tsx
leading-none      // 1
leading-tight     // 1.25
leading-snug      // 1.375
leading-normal    // 1.5
leading-relaxed   // 1.625
leading-loose     // 2
```

## Text Overflow
```tsx
truncate           // Truncate with ...
text-ellipsis     // Add ... if needed
text-clip         // Clip text
```

## Font Style
```tsx
italic           // Italic text
not-italic      // Normal text
```

## Common Combinations
```tsx
// Headings
className="text-2xl font-bold text-col_text"
className="text-xl font-semibold text-col_text/80"

// Body Text
className="text-base font-normal text-col_text/70"

// Labels
className="text-sm font-medium text-col_text/60"

// Small Print
className="text-xs font-normal text-col_text/50"
```

## Responsive Text
```tsx
// Changes size based on screen width
className="text-sm md:text-base lg:text-lg"

// Changes weight based on screen width
className="font-normal md:font-medium lg:font-bold"
```

## Using with Inter Font (from layout.tsx)
```tsx
// The Inter font is already applied globally through layout.tsx
// You can use it directly with any text styling
className="font-inter text-lg font-medium"
```

## Hover and Focus States
```tsx
hover:text-col_accent
focus:text-col_secondary
hover:font-bold
hover:underline
```

## Examples Using Our Theme Colors
```tsx
// Primary Text
className="text-col_text font-medium"          // Main text

// Secondary Text
className="text-col_text/70 font-normal"       // Less prominent

// Accent Text
className="text-col_accent font-semibold"      // Highlighted

// Alert Text
className="text-col_alert font-bold"           // Warning/Error
``` 