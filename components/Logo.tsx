import Image from 'next/image';

// The brand lockup (629×271). Shown at its natural ratio — no cropping, so it
// never distorts. Its white background blends into the solid-white header /
// footer, so the surrounding padding is invisible. Height comes from className.
export default function Logo({
  priority = false,
  className = '',
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/logo.jpg"
      alt="TT Design"
      width={629}
      height={271}
      priority={priority}
      sizes="420px"
      className={className}
    />
  );
}
