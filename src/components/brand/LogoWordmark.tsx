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
            fontWeight: 500,
            fontSize: '16px',
            letterSpacing: '0.15em',
            lineHeight: 1.2,
            textTransform: 'uppercase',
          }}
        >
          Andrew Teece
        </div>
        <div
          className='text-muted-foreground'
          style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
          }}
        >
          Visual Artist
        </div>
      </div>
    </div>
  );
}
