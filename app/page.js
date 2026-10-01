"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ENGAGEMENT_DATE = "25/09/2026"; // <-- Change this to the engagement date.
const SONG = "/our-song.mp3"; // <-- Put your song in /public and keep this name.

const memories = [
  { chapter: "01", title: "البداية", text: "مكونتش عارف يومها، بس أنا كنت بقابل حد هيبقى من أجمل الحاجات اللي في حياتي.", image: "/photos/photo1.jpeg" },
  { chapter: "02", title: "لحظاتنا الصغيرة", text: "فيه ذكريات بتبقى صغيرة، بس بطريقة ما بتبقى هي دي اللي بتفضل معانا على طول.", image: "/photos/photo2.jpeg" },
  { chapter: "03", title: "أيام مش هنساها", text: "كل صورة فيها لحظة أتمنى أعيشها تاني وتالت.", image: "/photos/photo3.jpeg" },
  { chapter: "04", title: "اليوم اللي بقينا فيه لبعض", text: "وبعدين جه اليوم اللي حكايتنا فيه بقت رسمي.", image: "/photos/photo4.jpeg" }
];

const reasons = [
  ["01", "ضحكتك.", "/photos/photo5.jpeg"],
  ["02", "خوفك واهتمامك بيا.", "/photos/photo6.jpeg"],
  ["03", "إني بقدر أكون على طبيعتي معاكي.", "/photos/photo7.jpeg"],
  ["04", "الحاجات الصغيرة اللي بتعمليها من غير ما تاخدي بالك.", "/photos/photo8.jpeg"],
  ["05", "عشان بطريقة ما، الأيام العادية معاكي بتبقى مميزة.", "/photos/photo9.jpeg"],
  ["06", "عشان إنتي إنتي. وده كفاية أوي.", "/photos/photo10.jpeg"]
];

const gallery = Array.from({ length: 8 }, (_, i) => `/photos/photo${i + 11}.jpeg`);

function normalizeDate(value) {
  return value.replace(/\D/g, "");
}

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [activeReason, setActiveReason] = useState(null);
  const [showStart, setShowStart] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowStart(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const unlock = (e) => {
    e.preventDefault();
    if (normalizeDate(password) === normalizeDate(ENGAGEMENT_DATE) && ENGAGEMENT_DATE !== "DD/MM/YYYY") {
      setUnlocked(true);
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError("اممم... مش ده التاريخ اللي بدور عليه.");
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.main
          key="gate"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="gate"
        >
          <div className="stars" />
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="gate-card"
          >
            <span className="tiny-label">سر صغير</span>
            <h1>فيه حكايات مش المفروض كل الناس تعرفها...</h1>
            <p>دي بتبقى مكتوبة لاتنين بس.</p>

            <form onSubmit={unlock}>
              <label>إمتى حكايتنا بدأت رسمي؟</label>
              <input
                value={password}
                onChange={(e) => {
                  let v = e.target.value;
                  if (v.length < password.length) {
                    setPassword(v);
                    setError("");
                    return;
                  }
                  
                  let digits = v.replace(/\D/g, "").slice(0, 8);
                  let res = "";
                  
                  if (digits.length > 0) {
                    let d1 = digits.substring(0, 1);
                    let d2 = digits.substring(0, 2);
                    if (d1 > "3") d2 = "0" + d1;
                    else if (d2.length === 2 && parseInt(d2, 10) > 31) d2 = "31";
                    res += d2;
                    if (res.length === 2) res += " / ";
                  }
                  
                  if (digits.length > 2) {
                    let m1 = digits.substring(2, 3);
                    let m2 = digits.substring(2, 4);
                    if (m1 > "1") m2 = "0" + m1;
                    else if (m2.length === 2 && parseInt(m2, 10) > 12) m2 = "12";
                    res += m2;
                    if (res.length === 7) res += " / ";
                  }
                  
                  if (digits.length > 4) {
                    res += digits.substring(4, 8);
                  }
                  
                  setPassword(res);
                  setError("");
                }}
                placeholder="DD / MM / YYYY"
                inputMode="numeric"
                autoComplete="off"
                dir="ltr"
              />
              <button type="submit">افتح حكايتنا <span className="heartbeat">♡</span></button>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="error"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
          <div className="gate-footer">مكتوبة لشخص واحد بس.</div>
        </motion.main>
      ) : (
        <motion.main
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <audio ref={audioRef} src={SONG} loop preload="none" />

          <button className={`music ${musicOn ? "playing" : "paused"}`} onClick={toggleMusic} aria-label="Toggle music">
            <div className="music-bars">
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
            {musicOn ? "أغنيتنا · شغالة" : "شغل أغنيتنا"}
          </button>

          <section className="hero">
            <div className="hero-glow" />
            <div className="hero-copy">
              <motion.span className="tiny-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }}>حكايتنا</motion.span>
              <h1>
                <motion.span style={{ display: "inline-block" }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.6 }}>وبعدين،</motion.span>
                <br />
                <motion.em initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 2, delay: 2.8, ease: "easeOut" }}>ظهرتي إنتي.</motion.em>
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 4.5 }}>شوية لحظات، وتفاصيل صغيرة، وحكاية لسه بتتكتب.</motion.p>
              <motion.a href="#story" className="scroll-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 5.5 }}>
                انزل تحت عشان نبدأ <span>↓</span>
              </motion.a>
            </div>
          </section>

          <section id="story" className="chapter-intro">
            <span className="tiny-label">الفصل الأول</span>
            <h2>كل حاجة بدأت في لحظة.</h2>
            <p>
              مكونتش عارف الحكاية هتروح لفين. بس كنت متأكد إني عايز أكملها معاكي.
            </p>
          </section>

          <section className="story">
            {memories.map((memory, index) => (
              <article className={`memory ${index % 2 ? "reverse" : ""}`} key={memory.chapter}>
                <motion.div
                  className="memory-image"
                  initial={{ opacity: 0, scale: 1.04 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <img src={memory.image} alt={memory.title} />
                  <span>{memory.chapter}</span>
                </motion.div>
                <motion.div
                  className="memory-copy"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <span className="tiny-label">الفصل {memory.chapter}</span>
                  <h2>{memory.title}</h2>
                  <p>{memory.text}</p>
                </motion.div>
              </article>
            ))}
          </section>

          <section className="engagement">
            <motion.div className="ring" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.5, ease: "easeOut" }}>∞</motion.div>
            <motion.span className="tiny-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }}>اليوم اللي بقينا فيه لبعض رسمي</motion.span>
            <h2>
              <motion.span style={{ display: "inline-block" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 1.2 }}>وبعدين اخترنا نكون </motion.span>
              <motion.em initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 2.2 }}>لبعض.</motion.em>
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 3.8 }}>{ENGAGEMENT_DATE}</motion.p>
          </section>

          <section className="reasons">
            <div className="section-heading">
              <span className="tiny-label">شوية أسباب</span>
              <h2>ممكن أقولك ألف سبب...</h2>
              <p>بس خلينا نبدأ بشوية صغيرين.</p>
            </div>

            <div className="reason-grid">
              {reasons.map(([number, text, image], index) => (
                <button
                  className={`reason-card ${activeReason === index ? "active" : ""}`}
                  key={number}
                  onClick={() => setActiveReason(activeReason === index ? null : index)}
                >
                  <div className="reason-front">
                    <span>{number}</span>
                    <strong>{text}</strong>
                    <small>اضغط عشان تفتح</small>
                  </div>
                  <div className="reason-back">
                    <img src={image} alt="" />
                    <strong>{text}</strong>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="gallery-section">
            <div className="section-heading">
              <span className="tiny-label">معرض صورنا الصغير</span>
              <h2>لحظات أتمنى أعيشها من تاني.</h2>
            </div>
            <div className="gallery">
              {gallery.map((src, i) => (
                <motion.div
                  className={`gallery-item g${i + 1}`}
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                >
                  <img src={src} alt={`صورة ${i + 1}`} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="finale">
            <div>
              <motion.span className="tiny-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}>حاجة أخيرة</motion.span>
              <h2>
                <motion.span style={{ display: "inline-block" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 1.2 }}>أنا مش عارف<br />المستقبل مخبيلنا إيه...</motion.span>
              </h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 2.8 }}>بس عارف مين اللي عايزه معايا فيه.</motion.p>
              
              <motion.div className="final-name" initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 2, delay: 4.5, ease: "easeOut" }}>إنتي.</motion.div>
              
              <motion.div className="heart heartbeat" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 5.5 }}>♡</motion.div>
              
              <motion.p className="ending" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 7.5 }}>
                حكايتنا لسه مخلصتش.<br /><em>ده يدوب الفصل الأول.</em>
              </motion.p>
            </div>
          </section>

          <footer>اتعملت بكل حُب · لأقرب حد لقلبي.</footer>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
