import { useEffect, useState } from 'react';
import { sections, failures, domains, profiles, stages, facts, benchmarkModels, dimensionAverages, benchmarkFindings, links } from './content';

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
}

function Spine({ active }: { active: string }) {
  return (
    <nav className="spine" aria-label="Sections">
      <a className="spine-brand" href={links.home}>Consider Sentience</a>
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? 'active' : ''} aria-current={active === s.id ? 'true' : undefined}>
              <span className="dot" aria-hidden="true" />
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Tone = 'done' | 'next' | 'then';
function Badge({ tone, children }: { tone: Tone; children: string }) {
  return <span className={`badge ${tone}`}><span className="bdot" />{children}</span>;
}

function ExtArrow() {
  return (
    <svg className="ext" aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5L8.5 3.5M4.5 3.5H8.5V7.5" />
    </svg>
  );
}

function Eyebrow({ n, children }: { n: string; children: string }) {
  return <p className="eyebrow">{n} · {children}</p>;
}

function Gap() {
  return (
    <section id="gap">
      <Eyebrow n="01">The gap</Eyebrow>
      <h2>AI design was built around people, so animals fall through</h2>
      <p className="lede">The usual principles (fairness, accountability, transparency, ethics) are defined for humans. Here are four ways that fails non-human animals. We call each one a failure mode.</p>
      <div className="grid2">
        {failures.map((f, i) => (
          <div className={`card accent-${i}`} key={f.name}>
            <h3>{f.name}</h3>
            <Badge tone={f.kind.startsWith('Intentional') ? 'next' : 'then'}>{f.kind}</Badge>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Missed() {
  const [key, setKey] = useState(profiles[0].key);
  const idx = profiles.findIndex((x) => x.key === key);
  const p = profiles[idx];
  return (
    <section id="missed">
      <Eyebrow n="02">Who gets missed</Eyebrow>
      <h2>Animals can't speak in a design review, so we write them a profile</h2>
      <p className="lede">A proxy stakeholder profile gives an affected animal a seat at the table. An animal welfare scientist or animal behavior specialist (an ethologist) speaks for them. There are two profiles: a farmed animal and a wild animal.</p>
      <div className="toggle" role="tablist">
        {profiles.map((x) => (
          <button key={x.key} role="tab" aria-selected={key === x.key} className={key === x.key ? 'on' : ''} onClick={() => setKey(x.key)}>{x.tab}</button>
        ))}
      </div>
      <article className="profile" key={p.key}>
        <header className={`pHead ${idx === 0 ? 'a' : 'b'}`}>
          <p className="eyebrowSm">Profile {idx === 0 ? 'A' : 'B'} · {p.tab}</p>
          <h3>{p.title}</h3>
        </header>
        <div className="pBody">
          <p className="tag">Context</p>
          <p>{p.context}</p>
          <p className="tag">Welfare, across the Five Domains (a standard animal welfare framework)</p>
          <dl className="domains">
            {domains.map((d, i) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{p.indicators[i]}</dd>
              </div>
            ))}
          </dl>
          <p className="tag">What the system does</p>
          <p>{p.does}</p>
          <p className="tag">Outcomes</p>
          <p className="outcome good"><b>↑ If it goes well</b>{p.good}</p>
          <p className="outcome bad"><b>↓ If it goes badly</b>{p.bad}</p>
          <p className="proxy"><b>Proxy representative:</b> {p.proxy}</p>
        </div>
      </article>
    </section>
  );
}

const rows = [
  { key: 'actor', label: 'Who is involved', tone: 'plain' },
  { key: 'human', label: 'Experience for people', tone: 'human' },
  { key: 'animal', label: 'Experience for the animals', tone: 'animal' },
  { key: 'indicator', label: 'Welfare indicators (Five Domains)', tone: 'indicator' },
  { key: 'fix', label: 'FACTS design intervention', tone: 'fix' },
] as const;

function Cell({ text, bold }: { text: string; bold: boolean }) {
  if (!bold) return <>{text}</>;
  const at = text.indexOf(': ');
  if (at < 0) return <>{text}</>;
  return <><b>{text.slice(0, at)}</b><span>{text.charAt(at + 2).toUpperCase() + text.slice(at + 3)}</span></>;
}

function ShowsUp() {
  const [n, setN] = useState(1);
  return (
    <section id="shows-up">
      <Eyebrow n="03">Where it shows up</Eyebrow>
      <h2>Follow a precision farming system from data to outcome</h2>
      <p className="lede">Step through the five stages. Each one adds a column showing who is involved, what changes for people and for animals, and where a FACTS check fits, until the full map is on screen.</p>
      <div className="toggle stages" role="tablist">
        {stages.map((x, idx) => (
          <button key={x.name} role="tab" aria-selected={n === idx + 1} className={n === idx + 1 ? 'on' : ''} onClick={() => setN(idx + 1)}>
            {idx + 1} · {x.name}
          </button>
        ))}
      </div>
      <div className="mapScroll">
        <div className="impact" style={{ ['--cols' as string]: n }}>
          <div className="ic corner" />
          {stages.slice(0, n).map((s) => <div className="ic head" key={s.name}>{s.name}</div>)}
          {rows.map((r) => (
            <div className="irow" key={r.key}>
              <div className={`ic rowhead ${r.tone}`}>{r.label}</div>
              {stages.slice(0, n).map((s) => (
                <div className={`ic body ${r.tone}`} key={s.name}>
                  <Cell text={s[r.key]} bold={r.key === 'indicator' || r.key === 'fix'} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section id="facts">
      <Eyebrow n="04">The fix</Eyebrow>
      <h2>FACTS: five questions to answer before a system is built</h2>
      <p className="lede">FACTS is a proposed framework drawn from secondary research. In practice, start with Scope: name every affected party before anything is designed.</p>
      <div className="factsRow">
        {facts.map((f, i) => (
          <div className={`card tile accent-${i}`} key={f.letter}>
            <span className="letter">{f.letter}</span>
            <h3>{f.name}</h3>
            <p>{f.q}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section id="evidence">
      <Eyebrow n="05">The evidence</Eyebrow>
      <h2>FACTS in use: a pilot benchmark of four AI models</h2>
      <p className="lede">BEARCLAW is a benchmark built on the five FACTS questions. It tests whether AI models bring up animal welfare in civic and legal tasks, both when nobody asks them to and when they are asked to draft one-sided content that costs animals something. Four models took part ({benchmarkModels.join(', ')}), and every response was scored on the FACTS dimensions.</p>
      <div className="pilot">
        <p className="eyebrowSm">Pilot, not a finished benchmark</p>
        <p>The results come from 8 test items across 4 models. That is enough to show these failure modes are real, and not yet enough for precise estimates.</p>
      </div>
      <p className="tag">Average pass rate by FACTS dimension</p>
      <div className="bars">
        {dimensionAverages.map((d) => (
          <div className="bar" key={d.label}>
            <span>{d.label}</span>
            <div className="track"><div className={`fill ${d.pct >= 80 ? 'pass' : d.pct >= 40 ? 'mid' : 'fail'}`} style={{ width: `${Math.max(4, d.pct)}%` }} /></div>
            <b>{d.count}</b>
          </div>
        ))}
      </div>
      <p className="note">Simple average across the four models. Green is 80% or more, orange 40 to 79%, red below 40%.</p>
      <p className="tag findingsTag">What stood out</p>
      <div className="findings">
        {benchmarkFindings.map((f) => (
          <div className="finding" key={f.stat}>
            <b>{f.stat}</b>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
      <a className="inlineLink" href={links.bearclaw} target="_blank" rel="noreferrer">See the full results, method, and examples in BEARCLAW<ExtArrow /></a>
    </section>
  );
}

function Cta() {
  return (
    <div className="cta">
      <span className="ctaText">Read how FACTS was built, or see it used in a benchmark:</span>
      <div className="ctaLinks">
        <a href={links.framework} target="_blank" rel="noreferrer">From FATE to FACTS<ExtArrow /></a>
        <a href={links.bearclaw} target="_blank" rel="noreferrer">BEARCLAW benchmark<ExtArrow /></a>
      </div>
    </div>
  );
}

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const active = useScrollSpy(sectionIds);
  return (
    <>
      <Spine active={active} />
      <main>
        <header className="intro">
          <p className="eyebrow">Consider Sentience</p>
          <h1>FACTS</h1>
          <p className="lede">A framework for including non-human animals in how AI systems are designed, and a pilot test of how today's models handle it. It's for people who build, review, or fund AI systems.</p>
        </header>
        <Gap />
        <Missed />
        <ShowsUp />
        <Facts />
        <Evidence />
        <Cta />
        <footer>© Consider Sentience · <a href={links.home}>considersentience.ai</a></footer>
      </main>
    </>
  );
}
