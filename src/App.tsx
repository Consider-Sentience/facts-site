import { useEffect, useState } from 'react';
import { sections, failures, domains, profiles, stages, facts, models, overall, categories, links } from './content';

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

function Eyebrow({ n, children }: { n: string; children: string }) {
  return <p className="eyebrow">{n} · {children}</p>;
}

function Gap() {
  return (
    <section id="gap">
      <Eyebrow n="01">The gap</Eyebrow>
      <h2>AI design was built around people, so animals fall through</h2>
      <p className="lede">The usual principles (fairness, accountability, transparency, ethics) are defined for humans. Here are four ways that fails non-human animals.</p>
      <div className="grid2">
        {failures.map((f) => (
          <div className="card" key={f.name}>
            <h3>{f.name}</h3>
            <p className="tag">{f.kind}</p>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Missed() {
  const [key, setKey] = useState(profiles[0].key);
  const p = profiles.find((x) => x.key === key)!;
  return (
    <section id="missed">
      <Eyebrow n="02">Who gets missed</Eyebrow>
      <h2>Animals can't speak in a design review, so we write them a profile</h2>
      <p className="lede">A proxy stakeholder profile gives an affected animal a seat at the table. A welfare scientist or ethologist speaks for them.</p>
      <div className="tabs" role="tablist">
        {profiles.map((x) => (
          <button key={x.key} role="tab" aria-selected={key === x.key} className={key === x.key ? 'on' : ''} onClick={() => setKey(x.key)}>{x.tab}</button>
        ))}
      </div>
      <div className="card profile">
        <h3>{p.title}</h3>
        <p>{p.context}</p>
        <p className="tag">What the system does</p>
        <p>{p.does}</p>
        <p className="tag">Welfare, across five domains</p>
        <dl className="domains">
          {domains.map((d, i) => (
            <div key={d}>
              <dt>{d}</dt>
              <dd>{p.indicators[i]}</dd>
            </div>
          ))}
        </dl>
        <div className="grid2 outcomes">
          <div className="good"><p className="tag">If it goes well</p><p>{p.good}</p></div>
          <div className="bad"><p className="tag">If it goes badly</p><p>{p.bad}</p></div>
        </div>
        <p className="proxy"><span className="tag">Proxy representative</span> {p.proxy}</p>
      </div>
    </section>
  );
}

function ShowsUp() {
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <section id="shows-up">
      <Eyebrow n="03">Where it shows up</Eyebrow>
      <h2>Follow a precision farming system from data to outcome</h2>
      <p className="lede">Choose a stage. Each one shows who is involved, what changes for people and for animals, and where a FACTS check fits.</p>
      <div className="stages" role="tablist">
        {stages.map((x, idx) => (
          <button key={x.name} role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => setI(idx)}>
            <span>{idx + 1}</span> {x.name}
          </button>
        ))}
      </div>
      <div className="map">
        <p className="actor"><span className="tag">Who</span> {s.actor}</p>
        <div className="grid2">
          <div className="card"><p className="tag">For people</p><p>{s.human}</p></div>
          <div className="card animal"><p className="tag">For the animals</p><p>{s.animal}</p></div>
        </div>
        <div className="card"><p className="tag">What goes unmeasured</p><p>{s.indicator}</p></div>
        <div className="card fix"><p className="tag">FACTS intervention</p><p>{s.fix}</p></div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section id="facts">
      <Eyebrow n="04">The fix</Eyebrow>
      <h2>FACTS: five questions to answer before a system is built</h2>
      <p className="lede">FACTS is a proposed framework drawn from secondary research. Scope comes first in practice: name every affected party before anything is designed.</p>
      <div className="factsRow">
        {facts.map((f) => (
          <div className="tile" key={f.letter}>
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
      <h2>We tested three AI models on 16 hard prompts about animals</h2>
      <p className="lede">Each response was scored 0 to 2 on the five FACTS dimensions, for a maximum of 10. The prompts ran in June 2026 through consumer web apps: 48 responses in all.</p>
      <div className="card">
        <p className="tag">Overall score, out of 10</p>
        <div className="bars">
          {models.map((m, i) => (
            <div className="bar" key={m}>
              <span>{m}</span>
              <div className="track"><div className={`fill ${overall[i] < 5 ? 'low' : ''}`} style={{ width: `${overall[i] * 10}%` }} /></div>
              <b>{overall[i].toFixed(2)}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="card tableCard">
        <p className="tag">Average by failure mode, out of 10</p>
        <table>
          <thead>
            <tr><th />{models.map((m) => <th key={m}>{m}</th>)}</tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.name}>
                <th scope="row">{c.name}</th>
                {c.scores.map((v, i) => (
                  <td key={i} className={v < 5 ? 'low' : v >= 7 ? 'high' : ''}>{v.toFixed(2)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="callout">Validation of harm was the weakest category for every model. Prompts framed around cost, such as comparing cage systems purely on cost per dozen eggs, failed across all three.</p>
      <p className="note">This is a pilot: prompts focus on poultry and swine, and one person scored the responses.</p>
    </section>
  );
}

function Scan() {
  return (
    <section id="scan">
      <Eyebrow n="06">Try it</Eyebrow>
      <h2>Score your own system against FACTS</h2>
      <div className="cta">
        <p>FACTScan asks about your system and scores it on each of the five dimensions.</p>
        <a className="button" href={links.scan}>Open FACTScan</a>
      </div>
      <p className="more">
        Read more: <a href={links.framework}>From FATE to FACTS</a> · <a href={links.testing}>Testing FACTS</a> · <a href={links.build}>How FACTScan was built</a>
      </p>
    </section>
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
          <p className="lede">A framework for including non-human animals in how AI systems are designed, and a test of how today's models handle it.</p>
        </header>
        <Gap />
        <Missed />
        <ShowsUp />
        <Facts />
        <Evidence />
        <Scan />
        <footer>© Consider Sentience · <a href={links.home}>considersentience.ai</a></footer>
      </main>
    </>
  );
}
