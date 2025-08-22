import { LogoMark } from './LogoMark';

export function LogoWordmark({
  className = '',
  markSize = 24,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <div className={['flex items-center gap-2', className].join(' ')}>
      <LogoMark size={markSize} />
      <div className='leading-tight'>
        <div
          className='font-serif'
          style={{
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Andrew Teece
        </div>
        <div
          className='text-muted-foreground'
          style={{
            fontSize: '10px',
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
          }}
        >
          Photography
        </div>
      </div>
    </div>
  );
}
