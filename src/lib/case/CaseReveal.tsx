import { useEffect } from "react";

export default function CaseReveal() {
  useEffect(() => {
    const els = [
      ...document.querySelectorAll<HTMLElement>(".case-reveal, .mn-spot"),
    ];
    if (!("IntersectionObserver" in window) || els.length === 0) {
      for (const el of els) {
        el.classList.add(
          el.classList.contains("mn-spot") ? "is-in" : "is-visible"
        );
      }
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains("mn-spot")
                ? "is-in"
                : "is-visible"
            );
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    for (const el of els) {
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
