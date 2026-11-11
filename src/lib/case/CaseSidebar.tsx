import { useEffect, useState } from "react";

const go = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document
    .querySelector(`#${id}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export interface CaseSectionLink {
  id: string;
  label: string;
}

export default function CaseSidebar({
  sections,
}: {
  sections: CaseSectionLink[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    for (const { id } of sections) {
      const el = document.querySelector(`#${id}`);
      if (el) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <aside
        className="group/sidebar fixed top-1/2 left-[20px] z-50 hidden -translate-y-1/2 rounded-[14px] bg-transparent pt-[10px] pr-[14px] pb-[10px] pl-[10px] text-left focus-within:backdrop-blur-[14px] focus-within:backdrop-saturate-[1.6] hover:backdrop-blur-[14px] hover:backdrop-saturate-[1.6] lg:block"
        aria-label="Case study sections"
      >
        <nav>
          <ul className="m-0 flex list-none flex-col gap-0 p-0">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className={`relative flex h-[15px] items-center gap-[10px] p-0 text-[12.5px] whitespace-nowrap no-underline before:shrink-0 before:rounded-[2px] before:content-[''] before:[transition:width_0.45s_cubic-bezier(0.22,1,0.36,1),background-color_0.3s_ease,opacity_0.3s_ease] ${
                    active === s.id
                      ? "font-medium before:h-[1.5px] before:w-[22px] before:bg-[var(--case-accent)] before:opacity-100"
                      : "font-normal before:h-[1.5px] before:w-[10px] before:bg-transparent before:opacity-70 hover:before:w-[14px] hover:before:opacity-100"
                  }`}
                >
                  <span className="hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[12px] leading-[1.2] [transition:opacity_0.25s_ease,transform_0.35s_cubic-bezier(0.22,1,0.36,1),color_0.25s_ease] ${
                      active === s.id
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-focus-within/sidebar:translate-x-0 group-focus-within/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <nav
        className="sticky top-[58px] z-[45] -mx-[20px] mb-[40px] hidden py-[10px] max-[600px]:top-[52px] min-[761px]:block lg:hidden"
        aria-label="Case study sections"
      >
        <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto overscroll-x-contain px-[20px] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={go(s.id)}
              className="flex-none rounded-full bg-transparent px-[12px] py-[6px] text-[12.5px] font-medium whitespace-nowrap no-underline"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
