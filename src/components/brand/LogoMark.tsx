export function LogoMark({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  // Inherit color from parent via currentColor
  return (
    <svg
      viewBox='0 0 64 64'
      width={size}
      height={size}
      className={className}
      aria-hidden='true'
    >
      {/* Corners */}
      <g
        fill='none'
        stroke='currentColor'
        strokeWidth={2.5}
        strokeLinecap='round'
      >
        {/* TL */}
        <path d='M14 26V16h10' />
        {/* TR */}
        <path d='M50 26V16H40' />
        {/* BL */}
        <path d='M14 38v10h10' />
        {/* BR */}
        <path d='M50 38v10H40' />
      </g>

      {/* Monogram */}
      <text
        x='32'
        y='38'
        textAnchor='middle'
        fontFamily='Fraunces, ui-serif, Georgia, serif'
        fontWeight={600}
        fontSize='22'
        fill='currentColor'
      >
        AT
      </text>
    </svg>
  );
}
