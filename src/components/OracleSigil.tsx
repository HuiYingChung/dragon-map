import Image from "next/image";

interface OracleSigilProps {
  size?: number;
  className?: string;
}

export default function OracleSigil({ size = 20, className }: OracleSigilProps) {
  return (
    <Image
      src="/oracle-sigil.webp"
      alt=""
      aria-hidden
      width={size}
      height={size}
      draggable={false}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
