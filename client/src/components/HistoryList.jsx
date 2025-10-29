import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HistoryList({ items = [] }) {
  useEffect(() => {
    // Select all elements with class "searches"
    const elements = document.querySelectorAll(".searches");

    // Animate each search item as it scrolls into view
    elements.forEach((el, i) => {
      if (!items.length) return; // no items yet
      gsap.to(el, {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",   // when element is near bottom of viewport
          end: "bottom 80%",  // optional
          scrub: 2,           // smooth animation while scrolling
          markers: false,     // set true to debug
        },
      });
    });

    // cleanup on unmount
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [items.length]);

  return (
    <div style={{ marginTop: 20 }}>
      <h4 className="text-lg font-semibold mb-3">Your search history</h4>
      <ul className="tracking-[-.08rem]">
        {items.map((h) => (
          <li
            className="searches opacity-0 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
            key={h._id}
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {h.term}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              – {new Date(h.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
