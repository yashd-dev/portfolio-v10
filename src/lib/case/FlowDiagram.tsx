import { useMemo, useState } from "react";

// Ported from the toobajatoi.com/livedin interactive user-flow figure; nodes/edges come in as props.
export interface FlowNode {
  id: string;
  label: string;
  kind:
    | "terminal"
    | "decision"
    | "action"
    | "screen"
    | "system"
    | "data"
    | "success";
  x: number;
  y: number;
  w: number;
  h: number;
  note: string;
}
export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
  tone?: "yes" | "no" | "data" | "neutral";
  route?: "straight" | "drop" | "loop";
  lane?: number;
  offset?: number;
}

const KINDS: Record<string, { fill: string; stroke: string; text: string }> = {
  action: { fill: "#D7E9FA", stroke: "#3D7FBF", text: "#153352" },
  data: { fill: "#FBEFC9", stroke: "#D9AE3F", text: "#4E3B08" },
  decision: { fill: "#D6F0DC", stroke: "#4CA766", text: "#14432A" },
  screen: { fill: "#DCEBFB", stroke: "#4A8FD1", text: "#173A5A" },
  success: { fill: "#E7DDFB", stroke: "#8A6BD1", text: "#332056" },
  system: { fill: "#FBE6D3", stroke: "#E08B4A", text: "#5A3211" },
  terminal: { fill: "#FFFFFF", stroke: "#111111", text: "#111111" },
};

const TONES: Record<string, string> = {
  data: "#D9AE3F",
  neutral: "#8A8A8A",
  no: "#E0736A",
  yes: "#2E9E57",
};

const ZOOM_STEPS = [0.75, 0.9, 1, 1.15, 1.35, 1.6];

const useZoom = (initial = 1) => {
  const [i, setI] = useState(() => {
    const found = ZOOM_STEPS.indexOf(initial);
    return found === -1 ? 2 : found;
  });
  return {
    canIn: i < ZOOM_STEPS.length - 1,
    canOut: i > 0,
    in: () => setI((v) => Math.min(ZOOM_STEPS.length - 1, v + 1)),
    out: () => setI((v) => Math.max(0, v - 1)),
    percent: Math.round(ZOOM_STEPS[i] * 100),
    zoom: ZOOM_STEPS[i],
  };
};

const ZoomControl = ({ zoom }: { zoom: ReturnType<typeof useZoom> }) => (
  <div className="case-zoom inline-flex items-center gap-1 rounded-[999px] border border-[#00000014] bg-[#f5f5f7] px-[0.35rem] py-[0.2rem]">
    <button
      type="button"
      onClick={zoom.out}
      disabled={!zoom.canOut}
      aria-label="Zoom out"
      className="size-9 cursor-pointer rounded-[999px] border-none text-[16px] leading-none text-[#444] hover:not-disabled:bg-white hover:not-disabled:text-[#111] disabled:cursor-default disabled:opacity-30"
    >
      −
    </button>
    <span className="text-soft min-w-12 text-center text-[12px] font-medium tabular-nums">
      {zoom.percent}%
    </span>
    <button
      type="button"
      onClick={zoom.in}
      disabled={!zoom.canIn}
      aria-label="Zoom in"
      className="size-9 cursor-pointer rounded-[999px] border-none text-[16px] leading-none text-[#444] hover:not-disabled:bg-white hover:not-disabled:text-[#111] disabled:cursor-default disabled:opacity-30"
    >
      +
    </button>
  </div>
);

const wrapLabel = (label: string, max: number) => {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur) {
      if (`${cur} ${w}`.length <= max) {
        cur = `${cur} ${w}`;
      } else {
        lines.push(cur);
        cur = w;
      }
    } else {
      cur = w;
    }
  }
  if (cur) {
    lines.push(cur);
  }
  return lines;
};

const diamondPoints = (n: FlowNode) => {
  const cx = n.x + n.w / 2;
  const cy = n.y + n.h / 2;
  return `${cx},${n.y} ${n.x + n.w},${cy} ${cx},${n.y + n.h} ${n.x},${cy}`;
};

const edgePath = (a: FlowNode, b: FlowNode, e: FlowEdge) => {
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2 + (e.offset ?? 0);
  const by = b.y + b.h / 2;
  const route = e.route ?? "straight";
  if (route === "drop") {
    const lane = e.lane ?? (a.y + a.h + b.y) / 2;
    return {
      d: `M ${ax} ${a.y + a.h} V ${lane} H ${bx} V ${b.y}`,
      label: { x: (ax + bx) / 2, y: lane },
    };
  }
  if (route === "loop") {
    const lane = e.lane ?? Math.max(a.y + a.h, b.y + b.h) + 46;
    return {
      d: `M ${ax} ${a.y + a.h} V ${lane} H ${bx} V ${b.y + b.h}`,
      label: { x: (ax + bx) / 2, y: lane },
    };
  }
  if (Math.abs(ay - by) < 4) {
    const fwd = bx > ax;
    const sx = fwd ? a.x + a.w : a.x;
    const ex = fwd ? b.x : b.x + b.w;
    return { d: `M ${sx} ${ay} H ${ex}`, label: { x: (sx + ex) / 2, y: ay } };
  }
  const midX = (a.x + a.w + b.x) / 2;
  return {
    d: `M ${a.x + a.w} ${ay} H ${midX} V ${by} H ${b.x}`,
    label: { x: midX, y: (ay + by) / 2 },
  };
};

const NodeShape = ({
  n,
  selected,
  style,
}: {
  n: FlowNode;
  selected: boolean;
  style: { fill: string; stroke: string; text: string };
}) => {
  if (n.kind === "decision") {
    return (
      <polygon
        className="[.case-flow__node:focus-visible_&]:[stroke-width:3px]"
        points={diamondPoints(n)}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={selected ? 2.5 : 1.4}
      />
    );
  }
  if (n.kind === "data") {
    return (
      <g>
        <path
          className="[.case-flow__node:focus-visible_&]:[stroke-width:3px]"
          d={`M ${n.x} ${n.y + 10} v ${n.h - 20} a ${n.w / 2} 10 0 0 0 ${n.w} 0 v ${-(n.h - 20)} a ${n.w / 2} 10 0 0 0 ${-n.w} 0 z`}
          fill={style.fill}
          stroke={style.stroke}
          strokeWidth={selected ? 2.5 : 1.4}
        />
        <path
          className="[.case-flow__node:focus-visible_&]:[stroke-width:3px]"
          d={`M ${n.x} ${n.y + 10} a ${n.w / 2} 10 0 0 0 ${n.w} 0`}
          fill="none"
          stroke={style.stroke}
          strokeWidth="1.4"
        />
      </g>
    );
  }
  return (
    <rect
      className="[.case-flow__node:focus-visible_&]:[stroke-width:3px]"
      x={n.x}
      y={n.y}
      width={n.w}
      height={n.h}
      rx={n.kind === "terminal" || n.kind === "success" ? n.h / 2 : 8}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={selected ? 2.5 : 1.4}
    />
  );
};

export default function FlowDiagram({
  title,
  nodes,
  edges,
  view = { height: 470, width: 1620 },
  caption,
}: {
  title: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  view?: { width: number; height: number };
  caption?: string;
}) {
  const zoom = useZoom(0.72);
  const [selected, setSelected] = useState<string | null>(null);
  const byId = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );
  const activeNode = selected ? byId[selected] : null;
  const dimNode = (id: string) =>
    !selected || id === selected
      ? false
      : !edges.some(
          (e) =>
            (e.from === selected && e.to === id) ||
            (e.to === selected && e.from === id)
        );

  return (
    <figure className="case-interactive case-flow mx-auto my-10 w-full max-w-[52rem] text-left max-[640px]:mb-4">
      <div className="case-interactive__bar flex flex-wrap items-center justify-between gap-3">
        <span />
        <div className="case-interactive__controls flex flex-wrap items-center gap-2">
          <ZoomControl zoom={zoom} />
        </div>
      </div>
      <p className="case-flow__title mt-4 text-[16px] font-medium">{title}</p>
      <div className="case-interactive__scroll case-flow__scroll mt-5 flex justify-center overflow-x-hidden overscroll-x-contain">
        <svg
          className="case-flow__canvas mx-auto block"
          viewBox={`0 0 ${view.width} ${view.height}`}
          role="group"
          aria-label={title}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: `${view.width * zoom.zoom}px`,
          }}
        >
          <defs>
            {Object.entries(TONES).map(([k, color]) => (
              <marker
                key={k}
                id={`arrow-${k}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
              </marker>
            ))}
          </defs>
          {edges.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            if (!a || !b) {
              return null;
            }
            const tone = e.tone ?? "neutral";
            const path = edgePath(a, b, e);
            const dim = selected
              ? e.from !== selected && e.to !== selected
              : false;
            return (
              <g key={i} opacity={dim ? 0.18 : 1}>
                <path
                  d={path.d}
                  fill="none"
                  stroke={TONES[tone]}
                  strokeWidth="1.8"
                  strokeDasharray={tone === "data" ? "7 6" : undefined}
                  markerEnd={`url(#arrow-${tone})`}
                />
                {e.label ? (
                  <g>
                    <rect
                      x={path.label.x - (e.label.length * 6.4 + 14) / 2}
                      y={path.label.y - 10}
                      width={e.label.length * 6.4 + 14}
                      height="20"
                      rx="5"
                      fill={tone === "yes" ? "#DFF3E6" : "#FBE1DE"}
                      stroke={TONES[tone]}
                      strokeWidth="1"
                    />
                    <text
                      x={path.label.x}
                      y={path.label.y + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill={TONES[tone]}
                    >
                      {e.label}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
          {nodes.map((n) => {
            const style = KINDS[n.kind];
            const lines = wrapLabel(n.label, n.kind === "decision" ? 12 : 16);
            const cx = n.x + n.w / 2;
            const ty = n.y + n.h / 2 - ((lines.length - 1) * 13) / 2 + 4;
            return (
              <g
                key={n.id}
                className={`case-flow__node cursor-pointer outline-none transition-[opacity_0.2s]${selected === n.id ? " is-selected" : ""}`}
                opacity={dimNode(n.id) ? 0.28 : 1}
                onClick={() => setSelected(selected === n.id ? null : n.id)}
                tabIndex={0}
                role="button"
                aria-pressed={selected === n.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(selected === n.id ? null : n.id);
                  }
                }}
              >
                <NodeShape n={n} selected={selected === n.id} style={style} />
                <text
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={style.text}
                >
                  {lines.map((line, li) => (
                    <tspan key={li} x={cx} y={ty + li * 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="case-flow__note mt-4 text-[13.5px] leading-[1.6]">
        {activeNode ? (
          <>
            <strong className="font-medium">{activeNode.label}.</strong>{" "}
            {activeNode.note}
          </>
        ) : (
          "Tap any step to isolate it and read what it does."
        )}
      </p>
      {caption ? (
        <figcaption className="case-media__caption mt-4 pb-1 text-center text-[13px]/[1.55]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
