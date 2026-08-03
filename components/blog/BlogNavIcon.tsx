/** Shared illustrated nav icon for blog home + inner pages. */
export function BlogNavIcon({
  src,
  className,
  width,
  height,
}: {
  src: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className={className ?? "blog-nav__icon"}
    />
  );
}
