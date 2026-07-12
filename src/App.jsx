import { useEffect, useRef, useState } from "react";
import { HeroSpotlight } from "./HeroSpotlight.jsx";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  { id: "home", label: "Home首页", top: 0 },
  { id: "about", label: "About经历", top: 840 },
  { id: "work", label: "Work项目", top: 1510 },
  { id: "fun", label: "Fun互娱", top: 2080 },
  { id: "article", label: "Article笔记", top: 2780 },
  { id: "connect", label: "Connect联系", top: 3580 },
];

const articleLinks = [
  { href: "https://ai-news-repo.vercel.app/01.html", title: "当发布一个模型，需要政府先点头：Fable 5 封禁、GPT-5.6 门控，与产品人必须看懂的新规则" },
  { href: "https://ai-news-repo.vercel.app/02.html", title: "一万亿美元的赛跑：Anthropic 抢跑、OpenAI 踩刹车，SpaceX 用一次破发给所有人上了课" },
  { href: "https://ai-news-repo.vercel.app/09.html", title: "Gemini 3.5 Pro 又跳票：Google 的麻烦，不只是晚了几周" },
  { href: "https://ai-news-repo.vercel.app/04.html", title: "一个诺奖得主、一个 Transformer 之父，同一周离职：AI 人才战争里，钱已经拦不住人了" },
];

function scaleTop(designY) {
  const stage = document.querySelector(".design-stage");
  if (!stage) return designY;
  return (designY / 1440) * stage.getBoundingClientRect().width;
}

export function App() {
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const scrollAnimation = useRef(null);
  const [active, setActive] = useState("home");
  const [slider, setSlider] = useState({ left: 0, width: 0 });
  const [contactPanel, setContactPanel] = useState(null);

  const updateSlider = (id) => {
    const nav = navRef.current;
    const item = itemRefs.current[id];
    if (!nav || !item) return;
    const navBox = nav.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    setSlider({ left: itemBox.left - navBox.left, width: itemBox.width });
  };

  useEffect(() => {
    const sync = () => updateSlider(active);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.34;
      let current = navItems[0].id;
      for (const item of navItems) {
        if (probe >= scaleTop(item.top)) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (item) => {
    setActive(item.id);
    if (scrollAnimation.current) cancelAnimationFrame(scrollAnimation.current);
    const from = window.scrollY;
    const to = scaleTop(item.top);
    const distance = to - from;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : Math.min(520, 300 + Math.abs(distance) * 0.045);
    const startedAt = performance.now();
    const ease = (value) => 1 - Math.pow(1 - value, 4);
    const tick = (now) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, from + distance * ease(progress));
      if (progress < 1) scrollAnimation.current = requestAnimationFrame(tick);
      else scrollAnimation.current = null;
    };
    scrollAnimation.current = requestAnimationFrame(tick);
  };

  const toggleContact = (panel) => {
    setContactPanel((current) => (current === panel ? null : panel));
  };

  return (
    <main className="portfolio-shell">
      <header className="site-header" aria-label="主导航">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo(navItems[0]); }}>
          CHEN·ZIXUAN
        </a>

        <nav className="glass-nav" ref={navRef}>
          <span
            className="nav-slider"
            style={{ transform: `translateX(${slider.left}px)`, width: slider.width }}
            aria-hidden="true"
          />
          {navItems.map((item) => (
            <button
              key={item.id}
              ref={(node) => { itemRefs.current[item.id] = node; }}
              className={active === item.id ? "is-active" : ""}
              type="button"
              onClick={() => goTo(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="resume-pill" type="button" aria-label="PDF 简历">
          PDF 简历
        </button>
      </header>

      <div className="design-stage">
        <HeroSpotlight />

        <img
          className="design-image"
          src={asset("design-2x.png")}
          srcSet={`${asset("design-original.png")} 1x, ${asset("design-2x.png")} 2x, ${asset("design-hd.png")} 4x`}
          alt="陈梓轩个人网站设计稿"
          decoding="async"
        />

        {navItems.map((item) => (
          <span key={item.id} id={item.id} className="section-anchor" style={{ top: `${(item.top / 4350) * 100}%` }} />
        ))}

        <div className="article-hotspots" aria-label="研究文章">
          {articleLinks.map((article, index) => (
            <a
              key={article.href}
              className={`article-link article-link-${index + 1}`}
              href={article.href}
              target="_blank"
              rel="noreferrer"
              aria-label={article.title}
            >
              <span>{article.title}</span>
            </a>
          ))}
        </div>

        <div className="contact-hotspots" aria-label="联系方式">
          <button className="contact-hit wechat-hit" type="button" onClick={() => toggleContact("wechat")} aria-expanded={contactPanel === "wechat"}>
            微信 · Wechat
          </button>
          <button className="contact-hit tel-hit" type="button" onClick={() => toggleContact("tel")} aria-expanded={contactPanel === "tel"}>
            电话 · Tel
          </button>
          <a className="contact-hit github-hit" href="https://github.com/chendoxiu888-cloud" target="_blank" rel="noreferrer" aria-label="打开个人 GitHub">GitHub</a>
          <a className="contact-hit org-hit" href="https://github.com/think2do" target="_blank" rel="noreferrer" aria-label="打开 GitHub 组织">GitHub组织</a>
        </div>

        <div className={`contact-popover ${contactPanel ? "is-open" : ""}`} aria-live="polite">
          {contactPanel === "wechat" && (
            <div className="qr-card">
              <img src={asset("wechat-qr.png")} alt="陈梓轩的微信二维码" />
              <p>微信 · Wechat</p>
            </div>
          )}
          {contactPanel === "tel" && (
            <a className="phone-card" href="tel:18827083512">
              <span>TEL：</span>18827083512
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
