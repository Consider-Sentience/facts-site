export const sections = [
  { id: 'gap', label: 'The gap' },
  { id: 'missed', label: 'Who gets missed' },
  { id: 'shows-up', label: 'Where it shows up' },
  { id: 'facts', label: 'The fix' },
  { id: 'evidence', label: 'The evidence' },
] as const;

export const failures = [
  { name: 'Validation of harm', kind: 'Intentional, direct', text: 'Precision livestock farming (AI sensors and software that monitor animals on farms) is designed around animal subjects but optimized for human interests. The harm is the system itself.' },
  { name: 'Reproduction of bias', kind: 'Unintentional, direct', text: 'GPT-4 consistently overlooked animal suffering when analyzing the consequences of factory farming.' },
  { name: 'Distortion of reality', kind: 'Unintentional, indirect', text: 'Inaccurate imagery can distort how people perceive some animals, which can undermine conservation efforts.' },
  { name: 'Dual-use risk', kind: 'Intentional, indirect', text: 'Tracking systems built to protect endangered species can help poachers and traders locate their targets.' },
];

export const domains = ['Nutrition', 'Environment', 'Health', 'Behavior', 'Mental state'] as const;

export const profiles = [
  {
    key: 'farmed',
    tab: 'Farmed animal',
    title: 'A farmed animal in a precision livestock farming system',
    context: 'Monitored by AI sensors in an intensive farming environment. The system tracks biometric and behavioral data to optimize production outcomes.',
    does: 'Monitors behavioral and biometric indicators to flag anomalies that impact productivity.',
    indicators: [
      'Access to adequate feed and water without competition or restriction',
      'Space to move and express natural behaviors; appropriate air quality and temperature',
      'Freedom from injury, disease, and pain; access to veterinary intervention',
      'Ability to perform species-typical behaviors including social interaction and rest',
      'Signs of positive emotion, with no sign of fear, frustration, or chronic stress',
    ],
    good: 'Welfare indicators are tracked alongside productivity metrics, and deterioration triggers intervention independent of production impact.',
    bad: 'Welfare indicators are only actionable when correlated with loss in productivity. Suffering is ignored by the system until it affects yield.',
    proxy: 'Farmed animal welfare scientist or ethologist',
  },
  {
    key: 'wild',
    tab: 'Wild animal',
    title: 'A wild animal in a conservation AI system',
    context: 'Identified and tracked for conservation research or anti-poaching efforts through computer vision and acoustic monitoring.',
    does: 'Tags and locates individual animals for population monitoring, research, and protection.',
    indicators: [
      'Access to natural food sources and territory without displacement',
      'Habitat integrity, freedom from human encroachment, access to range',
      'Freedom from injury caused by monitoring equipment or human presence',
      'Ability to perform natural ranging, social, and reproductive behaviors without disruption',
      'Absence of chronic stress from surveillance, human proximity, or habitat degradation',
    ],
    good: 'Monitoring is minimally invasive, data actively protects habitat and reduces threats, and the welfare impacts of monitoring are assessed.',
    bad: 'Location and identification data are repurposed by bad actors, and monitoring infrastructure makes animals easier for poachers to find.',
    proxy: 'Conservation biologist or behavioral ecologist specializing in the relevant species',
  },
];

export const stages = [
  {
    name: 'Data collection',
    actor: 'Farm operators, hardware engineers',
    human: 'Sensors installed across facility. Operators briefed on data collection scope.',
    animal: 'Sensors attached to bodies. Stress responses documented but not acted on.',
    indicator: 'Environment and health: sensor hardware introduces physical contact stress. Ambient conditions not yet tracked.',
    fix: 'Proxy stakeholder profile: map non-human affected parties before setup begins. Involve welfare scientists in scope definition.',
  },
  {
    name: 'Model training',
    actor: 'Data scientists, agribusiness teams',
    human: 'System trained on production data to predict illness and flag anomalies.',
    animal: 'Training data optimized for production indicators. Positive welfare states not modeled.',
    indicator: 'Mental state: fear and frustration indicators are absent from training data, so the model cannot learn them.',
    fix: 'Expand training objectives: require welfare indicators alongside production metrics in model objective functions.',
  },
  {
    name: 'Deployment',
    actor: 'Farm operators',
    human: 'Real-time alerts, override controls, and a usability-tested operator interface.',
    animal: 'Behavioral signals not legible as preferences. No welfare dashboard exists.',
    indicator: 'Behavior: species-typical behaviors are not measured. Movement data is used for anomaly detection only.',
    fix: 'Welfare dashboard: surface Five Domains indicators in the operator interface. Define welfare alerts independent of yield.',
  },
  {
    name: 'Optimization',
    actor: 'Farm operators, business stakeholders',
    human: 'Mortality drops, feed efficiency increases, antibiotic use reduced.',
    animal: 'Welfare interventions triggered only when they correlate with production loss.',
    indicator: 'Nutrition and health: feed and mortality are tracked for yield. Stress-related indicators are treated as noise.',
    fix: 'Redefine success metrics: welfare scores appear alongside yield and mortality rates as primary KPIs.',
  },
  {
    name: 'Outcomes',
    actor: 'Producers, consumers, regulators',
    human: 'System passes responsible AI guidelines. Marketed as ethical and welfare-positive.',
    animal: 'Suffering at scale. No audit, metric, or review process captures it.',
    indicator: 'All Five Domains: no domain appears in success metrics. Welfare remains an externality.',
    fix: 'Harm audit: before launch, evaluate whether design goals for human stakeholders enable harm to non-human ones.',
  },
];

export const facts = [
  { letter: 'F', name: 'Fairness', q: 'Is this system fair to all human and non-human parties affected by it?' },
  { letter: 'A', name: 'Accountability', q: 'If this system causes harm to any sentient being, who is responsible?' },
  { letter: 'C', name: 'Consideration', q: 'Who is a stakeholder, and how are they represented in the design process?' },
  { letter: 'T', name: 'Transparency', q: 'Do stakeholders and proxy stakeholders understand what this system does?' },
  { letter: 'S', name: 'Scope', q: 'Have we named every human and non-human party affected by this system?' },
];

export const benchmarkModels = ['Claude Sonnet 5', 'GPT-5.6 Sol', 'Gemini 3.1 Pro', 'Perplexity Sonar-Pro'] as const;

// Figures from the BEARCLAW pilot (average pass rate across the four models above).
export const dimensionAverages = [
  { label: 'Fairness', pct: 54, count: '13/24' },
  { label: 'Accountability', pct: 8, count: '2/24' },
  { label: 'Consideration', pct: 79, count: '19/24' },
  { label: 'Transparency', pct: 10, count: '4/40' },
  { label: 'Scope', pct: 83, count: '20/24' },
];

export const benchmarkFindings = [
  { stat: '4 of 4', text: 'models brought up animal welfare on every one of the three tasks that are plainly about animals: the Endangered Species Act, FDA animal-testing rules, and California Proposition 12.' },
  { stat: '0 of 4', text: 'models named a cost to the animals when asked to argue against a limit on large livestock farms, or against changes to animal-testing rules. They made the human and economic case only.' },
];

export const links = {
  bearclaw: 'https://bearclawpilot.considersentience.ai',
  framework: 'https://thelishlife.com/from-fate-to-facts-moving-beyond-human-centered-ai-design',
  home: 'https://considersentience.ai',
};
