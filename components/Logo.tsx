import Image from 'next/image';

// The brand lockup (640×212, transparent PNG trimmed to the artwork). Shown at
// its natural ratio — no cropping, so it never distorts. Its transparent
// background sits directly on the white header / footer. Height from className.
export default function Logo({
  priority = false,
  className = '',
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="TT Design"
      width={640}
      height={212}
      priority={priority}
      sizes="420px"
      className={className}
    />
  );
}
