import { useEffect, useRef } from "react";

export function HeroSpotlight() {
  const heroRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reveal = revealRef.current;
    if (!hero || !reveal) return undefined;

    const target = { x: -700, y: -700 };
    const smooth = { x: -700, y: -700 };
    let frame = 0;

    const setPointer = (event) => {
      const rect = hero.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };

    const clearPointer = () => {
      target.x = -700;
      target.y = -700;
    };

    const animate = () => {
      smooth.x += (target.x - smooth.x) * 0.1;
      smooth.y += (target.y - smooth.y) * 0.1;
      reveal.style.setProperty("--spot-x", `${smooth.x}px`);
      reveal.style.setProperty("--spot-y", `${smooth.y}px`);
      frame = requestAnimationFrame(animate);
    };

    hero.addEventListener("pointermove", setPointer);
    hero.addEventListener("pointerdown", setPointer);
    hero.addEventListener("pointerleave", clearPointer);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", setPointer);
      hero.removeEventListener("pointerdown", setPointer);
      hero.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-spotlight" aria-label="首页动态背景">
      <div className="hero-spotlight__layer hero-spotlight__base" aria-hidden="true" />
      <div ref={revealRef} className="hero-spotlight__layer hero-spotlight__reveal" aria-hidden="true" />

      <h1 className="hero-copy hero-copy--title">
        ZIXUAN CHEN’S
        <br />
        PERSONAL WEBSITE
      </h1>

      <div className="hero-copy hero-copy--intro">
        <p>
          Exploring the future of AI through products,
          <br />
          agents, and real-world applications.
          <br />
          通过 AI 产品、智能体和真实应用，探索人工智能的未来。
        </p>
        <button type="button">陳 · Chatbot</button>
      </div>
    </section>
  );
}
