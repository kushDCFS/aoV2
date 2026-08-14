import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The site's one scroll-reveal primitive. Every page should compose from
 * this rather than hand-rolling motion — a page with five different reveal
 * timings feels assembled, not designed.
 *
 * Physics: 24px rise, 96% -> 100% scale, custom cubic matching --ease-out in
 * index.css, staggered via `delay`. Triggers once, 80px before entering the
 * viewport, so nothing pops in already visible on a fast scroll.
 */
const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 22, className = "", as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.62, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Wrap a list; children stagger automatically via `RevealItem`. */
export function RevealGroup({ children, className = "", stagger = 0.07 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "", y = 18 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, scale: 0.99 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A number that counts up when it enters view. Use for stat tiles — a static
 * "34+" is inert; the count landing on it is what makes a stat feel alive.
 */
export function CountUp({ value, duration = 0.9, className = "" }) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(reduceMotion ? value : "0");

  const numeric = React.useMemo(() => {
    const match = String(value).match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, ""), 10) : null;
  }, [value]);

  const prefix = numeric != null ? String(value).split(String(numeric).replace(/\B(?=(\d{3})+(?!\d))/g, ","))[0] : "";
  const suffix = numeric != null ? String(value).slice(prefix.length + String(numeric).length) : "";

  React.useEffect(() => {
    if (reduceMotion || numeric == null) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * numeric).toLocaleString());
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, duration, reduceMotion]);

  if (numeric == null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
