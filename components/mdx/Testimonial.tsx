import type { ReactNode } from "react";

export function Testimonial({
  author,
  role,
  date,
  dateTime,
  context,
  children,
}: {
  author: string;
  role: string;
  date: string;
  dateTime?: string;
  context: string;
  children: ReactNode;
}) {
  return (
    <figure className="testimonial">
      <blockquote className="testimonial__quote">{children}</blockquote>
      <figcaption className="testimonial__caption">
        <cite className="testimonial__author">{author}</cite>
        <p className="testimonial__role">{role}</p>
        <p className="testimonial__meta">
          <time dateTime={dateTime ?? date}>{date}</time>
          <span aria-hidden="true"> · </span>
          {context}
        </p>
      </figcaption>
    </figure>
  );
}
