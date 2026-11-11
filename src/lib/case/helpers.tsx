import type { ReactNode } from "react";

export { default as JourneyMap } from "./JourneyMap";
export { default as FlowDiagram } from "./FlowDiagram";
export { default as Personas } from "./Personas";
export { default as Annotate } from "./Annotate";

export const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="case-section case-reveal scroll-mt-28 delay-[50ms] [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 [.case-domis-sections_&]:[border-top-style:none] [.case-domis-sections_&]:py-[52px] [.case-domis-sections_&]:first:mt-[44px] [.case-domis-sections_&]:last:pb-[72px]"
  >
    <h2 className="case-section__title mb-0 overflow-hidden text-left text-[18px] leading-[1.35] font-medium">
      <span className="case-rise block [transform:translateY(110%)] [transition:transform_0.9s_var(--mn-ease)] motion-reduce:[transform:none] motion-reduce:transition-none max-lg:[transform:none] max-lg:transition-none [.case-reveal.is-visible_&]:[transform:translate(0)]">
        {title}
      </span>
    </h2>
    <div className="case-section__body [&_li::marker]:text-faint mt-[22px] flex flex-col gap-6 text-left text-[15px] leading-[1.6] [&_a:not([class])]:underline [&_a:not([class])]:[text-decoration-color:var(--case-accent-line)] [&_a:not([class])]:underline-offset-[3px] [&_a[class]]:text-[var(--case-accent-text)] [&_a[class]]:no-underline [&_a[class]:hover]:underline [&_li]:pl-1 [&_li]:leading-[1.6] [&_li+li]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-inherit! [&_p]:text-inherit! [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-inherit!">
      {children}
    </div>
  </section>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="case-lead overflow-hidden text-[16px] leading-[1.6]">
    <span className="case-rise block [transform:translateY(110%)] delay-[0.14s] [transition:transform_0.9s_var(--mn-ease)] motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 [.case-reveal.is-visible_&]:[transform:translate(0)]">
      {children}
    </span>
  </p>
);

export const Subhead = ({ children }: { children: ReactNode }) => (
  <h3 className="case-subhead mt-2 pt-2 text-left text-[16px] leading-[1.35] font-medium first:mt-0 first:pt-0">
    {children}
  </h3>
);

export const P = ({ children }: { children: ReactNode }) => <p>{children}</p>;

export const Pullquote = ({ children }: { children: ReactNode }) => (
  <blockquote className="case-pullquote [&_footer]:text-muted my-1 border-l-2 [border-left-color:var(--case-accent)] py-1 pl-5 text-left [&_footer]:mt-2 [&_footer]:text-[13px] [&_p]:text-[16px] [&_p]:leading-[1.55] [&_p]:font-medium">
    <p>{children}</p>
  </blockquote>
);

export const Callout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <aside className="case-callout rounded-[14px] border-none border-transparent p-[2rem_2.25rem] text-left">
    <p className="case-callout__title mb-1 text-[14px] font-medium">{title}</p>
    <div className="case-callout__body text-soft [&_li::marker]:text-faint mt-4 flex flex-col gap-4 text-left text-[15px] leading-[1.6] [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  </aside>
);

export const Tbl = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="case-table-wrap overflow-x-auto rounded-[14px] border-none text-left">
    <table className="case-table w-full min-w-full border-collapse text-left text-[14px]">
      <thead>
        <tr>
          {head.map((h) => (
            <th
              key={h}
              className="text-ink border-b border-[#00000014] bg-[#fafafa] px-4 py-3 font-medium whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&_tr:last-child_td]:[border-bottom:none] [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-[#0000000d]">
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="text-soft px-4 py-3 align-top">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Metrics = ({
  items,
}: {
  items: { value: string; label: string }[];
}) => (
  <div className="case-metric-grid grid gap-3 sm:grid-cols-2">
    {items.map((m) => (
      <div className="case-metric rounded-[14px] border-none p-5" key={m.label}>
        <p className="case-metric__value text-[28px] font-medium">{m.value}</p>
        <p className="case-metric__label text-muted mt-1 text-[13px]">
          {m.label}
        </p>
      </div>
    ))}
  </div>
);

export const Fig = ({
  src,
  alt,
  caption,
  video,
  wide,
  phone,
  natural,
}: {
  src: string;
  alt: string;
  caption: string;
  video?: boolean;
  wide?: boolean;
  phone?: boolean;
  natural?: boolean;
}) => (
  <figure
    className={`case-media my-3 rounded-[24px] p-[44px_24px_30px] ${wide ? "case-media--wide" : ""}${phone ? " case-media--phone" : ""}${natural ? " case-media--natural" : ""}`}
  >
    {video ? (
      <video src={src} autoPlay loop muted playsInline aria-label={alt} />
    ) : (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={
          phone
            ? "mx-auto block h-auto w-full max-w-[min(100%,232px)] object-contain"
            : "mx-auto block h-auto w-full max-w-full object-contain"
        }
      />
    )}
    <figcaption className="case-media__caption mx-auto mt-5 max-w-[min(100%,60ch)] pb-1 text-center text-[12.5px]/[1.5]">
      {caption}
    </figcaption>
  </figure>
);

export const MediaGrid = ({
  kind,
  children,
}: {
  kind: "phones" | "screens" | "solo" | "2" | "3";
  children: ReactNode;
}) => {
  let cls = "case-media-grid grid justify-items-center gap-10";
  if (kind === "phones") {
    cls =
      "case-media-grid case-media-grid--2 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 case-media-grid--phones";
  } else if (kind === "screens" || kind === "3") {
    cls =
      "case-media-grid case-media-grid--3 grid grid-cols-1 justify-items-center gap-10 min-[1200px]:grid-cols-3";
  } else if (kind === "2") {
    cls =
      "case-media-grid case-media-grid--2 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2";
  }
  return <div className={cls}>{children}</div>;
};

export const Spot = ({
  src,
  alt,
  title,
  body,
}: {
  src: string;
  alt: string;
  title: string;
  body: string;
}) => (
  <figure className="mn-spot relative my-6 grid grid-cols-[1fr_auto_1fr] items-center py-9 max-[720px]:grid-cols-1 max-[720px]:justify-items-center max-[720px]:gap-5 max-[720px]:py-3">
    <div className="mn-spot__phone col-start-2 w-[min(232px,62vw)] translate-y-[18px] opacity-0 transition-[opacity_0.8s_var(--mn-ease),transform_0.9s_var(--mn-ease)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[720px]:col-start-1 [.mn-spot.is-in_&]:translate-y-0 [.mn-spot.is-in_&]:opacity-100">
      {" "}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        data-zoom="1"
        data-cursor="Open"
        tabIndex={0}
        role="button"
        aria-label={`Open larger: ${alt}`}
        className="block h-auto w-full cursor-zoom-in [transition:transform_0.4s_var(--mn-ease),filter_0.3s_ease] hover:[transform:scale(1.015)]"
      />
    </div>
    <figcaption className="mn-spot__note relative col-start-3 ml-[-28px] flex max-w-[200px] flex-col gap-1 pl-[76px] text-left max-[720px]:col-start-1 max-[720px]:m-0 max-[720px]:max-w-[30ch] max-[720px]:items-center max-[720px]:p-0 max-[720px]:text-center">
      <span
        className="mn-spot__line absolute top-[10px] left-0 h-0 w-16 origin-left scale-x-0 border-t-[1.5px] border-dotted [border-top-color:var(--case-accent,var(--mn-accent))] transition-[transform_0.7s_var(--mn-ease)_0.35s] before:absolute before:top-[-4px] before:left-[-3px] before:size-1.5 before:scale-0 before:rounded-full before:transition-[transform_0.35s_var(--mn-ease)_0.3s] before:content-[''] before:[background:var(--case-accent,var(--mn-accent))] after:absolute after:top-[-4px] after:right-[-3px] after:size-1.5 after:scale-0 after:rounded-full after:transition-[transform_0.35s_var(--mn-ease)_0.95s] after:content-[''] after:[background:var(--case-accent,var(--mn-accent))] motion-reduce:scale-x-100 motion-reduce:transition-none before:motion-reduce:scale-100 before:motion-reduce:transition-none after:motion-reduce:scale-100 after:motion-reduce:transition-none max-[720px]:hidden [.mn-spot.is-in_&]:scale-x-100 [.mn-spot.is-in_&]:before:scale-100 [.mn-spot.is-in_&]:after:scale-100"
        aria-hidden="true"
      />
      <span className="mn-spot__title -translate-x-[6px] text-[15px] font-medium opacity-0 transition-[opacity_0.5s_ease_0.9s,transform_0.6s_var(--mn-ease)_0.9s] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none [.mn-spot.is-in_&]:translate-x-0 [.mn-spot.is-in_&]:opacity-100">
        {title}
      </span>
      <span className="mn-spot__body -translate-x-[6px] text-[13px] leading-[1.5] opacity-0 transition-[opacity_0.5s_ease_1s,transform_0.6s_var(--mn-ease)_1s] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none [.mn-spot.is-in_&]:translate-x-0 [.mn-spot.is-in_&]:opacity-100">
        {body}
      </span>
    </figcaption>
  </figure>
);

export const Pair = ({
  items,
}: {
  items: { src: string; alt: string; caption: string }[];
}) => (
  <div className="mn-pair my-2 flex items-start justify-center gap-8 rounded-[32px] px-6 pt-9 pb-7 max-[560px]:gap-[14px] max-[560px]:rounded-3xl max-[560px]:px-3 max-[560px]:py-5">
    {items.map((it) => (
      <figure className="mn-pair__item m-0 flex-[0_1_196px]" key={it.src}>
        {" "}
        <img
          src={it.src}
          alt={it.alt}
          loading="lazy"
          decoding="async"
          draggable="false"
          data-zoom="1"
          data-cursor="Open"
          tabIndex={0}
          role="button"
          aria-label={`Open larger: ${it.alt}`}
          className="block h-auto w-full cursor-zoom-in rounded-2xl [transition:transform_0.4s_var(--mn-ease),filter_0.3s_ease] hover:[transform:scale(1.015)]"
        />
        <figcaption className="mt-[14px] text-center text-[12.5px] leading-[1.5]">
          {it.caption}
        </figcaption>
      </figure>
    ))}
  </div>
);

export const StepRow = ({ steps }: { steps: string[] }) => (
  <div className="case-step-row overflow-x-auto rounded-[14px] border-none p-5 text-left">
    <div className="case-step-row__track flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span className="case-step-row__item flex items-center gap-2" key={s}>
          <span className="case-step-row__pill text-soft rounded-lg border border-[#00000014] bg-[#fafafa] px-3 py-2 text-center text-[12px] font-medium">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span
              className="case-step-row__arrow text-faint text-[14px] font-medium"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </span>
      ))}
    </div>
  </div>
);

export const Tokens = ({
  items,
}: {
  items: { name: string; value: string; role: string; font?: boolean }[];
}) => (
  <div className="case-token-grid my-2 grid gap-5 sm:grid-cols-2">
    {items.map((t) => (
      <div
        className="case-token flex items-start gap-3 rounded-[14px] border-none p-[1.25rem_1.35rem] text-left"
        key={t.name}
      >
        {t.font ? (
          <span
            className="case-token__swatch case-token__swatch--font mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#00000014] bg-white text-[15px] font-semibold text-[#111]"
            style={{ fontFamily: t.value }}
            aria-hidden="true"
          >
            Aa
          </span>
        ) : (
          <span
            className="case-token__swatch mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-[#0000000f]"
            style={{ background: t.value }}
            aria-hidden="true"
          />
        )}
        <span className="case-token__text flex flex-col gap-[0.15rem]">
          <span className="case-token__name text-ink text-[13px] font-medium">
            {t.name}
          </span>
          <span className="case-token__value text-muted text-[12px]">
            {t.value}
          </span>
          <span className="case-token__role text-muted mt-2 text-[12px] leading-[1.55]">
            {t.role}
          </span>
        </span>
      </div>
    ))}
  </div>
);
