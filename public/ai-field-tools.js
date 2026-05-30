(() => {
  const corpus = [
    {
      id: 'residesk',
      title: 'ResiDesk',
      href: '#now',
      text: 'I co-founded ResiDesk to help property teams turn resident texts, reviews, tickets, and calls into answers, building context, and follow-up without rereading the whole history.',
      tags: ['residesk', 'housing', 'resident', 'texts', 'operator', 'customer'],
    },
    {
      id: 'demo',
      title: 'Demos are not adoption',
      href: '#operating-system',
      text: 'A prototype can win the room and still lose to the spreadsheet the next morning. The room is not the test. The test is whether people still use it on a busy day when nobody is watching.',
      tags: ['demo', 'adoption', 'spreadsheet', 'trust', 'work'],
    },
    {
      id: 'ai-view',
      title: 'AI view',
      href: '#writing',
      text: 'I care about AI that survives a normal Tuesday. Context, evals, handoff, trust, and judgment matter more than novelty or model names.',
      tags: ['ai', 'context', 'evaluation', 'judgment', 'handoff', 'model'],
    },
    {
      id: 'blackrock',
      title: 'BlackRock',
      href: '#about',
      text: 'At BlackRock, the lesson was that interface quality matters when someone is making a decision with real money behind it. A tool has to survive the next morning.',
      tags: ['blackrock', 'interface', 'money', 'decision'],
    },
    {
      id: 'climb',
      title: 'Climb Credit',
      href: '#about',
      text: 'At Climb Credit, we asked what happened to earnings after the program. That pushed outcomes into underwriting, product, and data while annual loan volume moved from 1 million dollars to 300 million dollars.',
      tags: ['climb', 'credit', 'underwriting', 'outcomes', 'earnings'],
    },
    {
      id: 'physics',
      title: 'Physics and software',
      href: '#about',
      text: 'I studied applied physics because I liked real systems, messy measurement, and problems where small details changed the answer. Software became serious when it saved hours of lab work and stopped feeling like coursework.',
      tags: ['physics', 'measurement', 'software', 'systems'],
    },
    {
      id: 'talks',
      title: 'Talks',
      href: '#conversations',
      text: 'The talks come back to the same practical lesson: measurement matters, software is useful when it saves real time, and ResiDesk starts with hearing residents clearly enough to act.',
      tags: ['talks', 'video', 'company', 'residesk'],
    },
    {
      id: 'investing',
      title: 'Investing',
      href: '#investing',
      text: 'I have invested in more than 100 startups and tend to back founders who are close to the problem, close to the customer, and honest about what they do not know yet.',
      tags: ['investing', 'founders', 'customer', 'context'],
    },
  ];

  const guides = {
    operator: [
      ['#now', 'Start with what ResiDesk is building now.'],
      ['#residesk-loop', 'Then look at how a resident message becomes work a property team can own.'],
      ['#recent', 'Use the links around resident feedback, retention, and NOI.'],
      ['#conversations', 'Watch the longer explanation in my own words.'],
      ['#links', 'Use the links when you want more background.'],
    ],
    founder: [
      ['#work-table', 'Start with Climb, BlackRock, and ResiDesk.'],
      ['#writing', 'Read the useful-AI principles.'],
      ['#about', 'Look at how physics, finance, and housing led here.'],
      ['#ai-field-tools', 'Try the Useful AI test against your own idea before polishing the demo.'],
      ['#conversations', 'Watch the company-building conversations.'],
    ],
    journalist: [
      ['#conversations', 'Start with talks and direct voice.'],
      ['#work', 'Use the work history and numbers.'],
      ['#recent', 'Pull recent writing and links.'],
      ['#conversations', 'Use talks for the way I actually say it.'],
      ['#links', 'Grab the outside articles, panels, recordings, and dates.'],
    ],
    candidate: [
      ['#operating-system', 'Read how I think about work.'],
      ['#now', 'Understand what most of my week goes into.'],
      ['#about', 'Get how I got here and how I work.'],
      ['#writing', 'Read the principles.'],
      ['#links', 'Use recordings to hear the work in my own words.'],
    ],
    investor: [
      ['#now', 'Start with the current ResiDesk focus.'],
      ['#work', 'Look at the work before ResiDesk.'],
      ['#recent', 'Check the links.'],
      ['#fit-boundaries', 'Read where I can help and where I probably cannot.'],
      ['#ai-field-tools', 'Use the Tuesday test to see whether the product idea turns into property-team work.'],
    ],
    background: [
      ['#work', 'Start with the work history.'],
      ['#work-table', 'Use Climb, BlackRock, and ResiDesk for the actual path.'],
      ['#work', 'Check the roles and what changed.'],
      ['#links', 'Open the public articles, talks, and dates.'],
      ['#conversations', 'Use talks when you want the actual voice.'],
    ],
  };

  const talkLenses = {
    harnoor: ['Physics made me care about measurement.', 'Software became useful when it saved real time.', 'ResiDesk starts with the customer, not the AI demo.'],
    greg: ['The useful part of AI is leverage inside real company work.', 'Context has to travel with the task.', 'A system is only good if it changes what someone does next.'],
    wellfound: ['The team needs people who can carry context.', 'The work is close to residents, operators, and messy edge cases.', 'Trust matters because a real team still owns the judgment.'],
    '20for20': ['Wi-Fi complaints are not just support tickets.', 'Resident sentiment can show owners where the building is leaking trust.', 'The output has to help the operator, not just make an interesting analysis.'],
  };

  const signalFixtures = {
    garden: ['The laundry app charged me twice again.', 'Can someone fix the courtyard lights?', 'My renewal offer went up but the pool has been closed.', 'Package room door is stuck.'],
    urban: ['Elevator 2 has been down all week.', 'The noise above me starts after midnight.', 'Guest parking rules are confusing.', 'Can maintenance enter while I am at work?'],
    student: ['Wi-Fi drops during exams.', 'Roommate transfer policy is unclear.', 'The trash chute smells bad.', 'My guarantor needs the lease link again.'],
    workforce: ['AC is out and I work nights.', 'I need a payment plan before Friday.', 'The playground gate does not latch.', 'Can I get text updates instead of portal notices?'],
  };

  const tuesdayClaims = {
    answers: 'The demo answers customer messages.',
    research: 'The demo summarizes customer research.',
    sales: 'The demo writes sales follow-up.',
    ops: 'The demo moves operational work.',
  };

  const tuesdayEnvironments = {
    operator: 'a busy property team',
    enterprise: 'an enterprise customer',
    field: 'a team doing the work',
    exec: 'an executive review',
  };

  const tuesdayBreakpoints = {
    answers: ['missing policy context', 'unclear handoff', 'tone misses'],
    research: ['bad source match', 'thin summary', 'no one owns the decision'],
    sales: ['generic sales line', 'bad account fit', 'no next step'],
    ops: ['unclear routing', 'missing permissions', 'no clear close-the-loop moment'],
  };

  const tuesdayEnvironmentPressure = {
    operator: ['time pressure', 'too many small exceptions', 'resident trust'],
    enterprise: ['security review', 'system integration', 'rollout work'],
    field: ['low patience', 'mobile use', 'messy inputs'],
    exec: ['ROI path', 'board-level story', 'who owns risk'],
  };

  const designCritique = [
    ['Argument', '9.0', 'The page is clearest when it starts with the job: customers already told you what hurts, and the tool should help someone act on it.'],
    ['Hierarchy', '8.2', 'The top half scans well. The tools section should keep behaving like a small workbench, not a pile of equal-weight cards.'],
    ['Detail', '8.0', 'The cool palette, hard shadows, and mono labels are distinctive. The risk is over-bordering; every line needs to help the reader.'],
    ['Function', '9.1', 'The browser tools do real work without a server: answer, check, simulate, highlight, and keep notes locally. That is more useful than a fake chat widget.'],
    ['Taste', '8.5', 'The best version of the site should feel useful before it feels clever. Push each interaction toward judgment, not novelty.'],
  ];

  const tweakBriefs = {
    legibility: {
      title: 'Legibility fix',
      steps: ['Audit hover states first; text should never get lighter during motion.', 'Keep long paragraphs under 68 characters per line.', 'Use borders to group choices, not to outline every empty surface.'],
    },
    speed: {
      title: 'Speed fix',
      steps: ['Keep AI tools lazy-loaded and avoid any JavaScript above the fold.', 'Prefer content-visibility for lower sections and compressed images for public link cards.', 'Make interactions transform-only so old browsers do less paint work.'],
    },
    voice: {
      title: 'Voice fix',
      steps: ['Replace abstractions with the job: residents text, operators decide, someone owns the next step.', 'Use first person when the point is personal.', 'Cut anything that sounds like a press release or a transcript summary.'],
    },
    sources: {
      title: 'Links fix',
      steps: ['Move the visitor from the main claim to the background quickly: work history, talks, writing, links.', 'Name what happened, then link the source.', 'Do not let design flourishes hide the actual work.'],
    },
  };

  const readingPaths = {
    operator: [
      ['ResiDesk', '#now', 'Start with the current work: resident texts, building context, and getting the right issue to someone who can fix it.'],
      ['Resident messages', '#signal-map', 'Then show how raw resident messages become work someone owns.'],
      ['Law360', 'https://www.law360.com/real-estate-authority/articles/2275147/residesk-simplifies-resident-engagement-for-deeper-results', 'Use the outside article on resident feedback and retention.'],
    ],
    founder: [
      ['How I build', '#operating-system', 'Use the six principles for how I work.'],
      ['Useful AI test', '#ai-field-tools', 'Score an AI idea against context, owner, next step, measurement, and trust before calling it real.'],
      ['System design essay', 'https://hackernoon.com/as-ai-models-converge-system-design-becomes-the-differentiator', 'Read the argument for systems around models.'],
    ],
    'ai-team': [
      ['Tuesday test', '#deployment-room', 'Start with what has to survive after the demo.'],
      ['System design essay', 'https://hackernoon.com/as-ai-models-converge-system-design-becomes-the-differentiator', 'Use the essay for the system-around-the-model argument.'],
      ['ResiDesk loop', '#residesk-loop', 'See how context, handoff, trust, and owner-visible work show up in housing.'],
    ],
    journalist: [
      ['How I got here', '#work', 'Use physics, BlackRock, Climb, and ResiDesk.'],
      ['Talks', '#conversations', 'Pull direct voice from interviews and panels, not just the site copy.'],
      ['Links', '#links', 'Use the articles, talks, and dates.'],
    ],
    investor: [
      ['Now', '#now', 'Start with the current ResiDesk focus.'],
      ['Before ResiDesk', '#work', 'Use BlackRock and Climb to show the pattern is not housing-only.'],
      ['Investing lens', '#investing', 'Read the founder and customer-context filter.'],
    ],
    background: [
      ['Work history', '#work', 'Start with the roles and outcomes.'],
      ['Longer version', '#background', 'Use the background section for outcomes, recognition, and links.'],
      ['External links', '#links', 'Open the public articles, talks, and dates.'],
    ],
  };

  const compassItems = [
    ['More background', '#background', 'work, writing, and talks'],
    ['Now', '#now', 'what I am building now'],
    ['Map', '#signal-map', 'how resident messages become owned work'],
    ['Work', '#work', 'where I worked before'],
    ['Links', '#recent', 'articles and talks'],
    ['Talks', '#conversations', 'direct voice'],
    ['Writing', '#writing', 'AI point of view'],
  ];

  const visualModes = [
    {
      id: 'site-spine',
      label: 'Site spine',
      title: 'The page should have one job.',
      deck: 'How what customers keep saying becomes work someone owns.',
      kind: 'route',
      values: [
        ['Customer', 92],
        ['Context', 84],
        ['Judgment', 77],
        ['Follow-through', 88],
      ],
      notes: ['Start concrete.', 'Keep the owner visible.', 'End with the next step.'],
    },
    {
      id: 'signal-flow',
      label: 'Signal flow',
      title: 'A resident message should not stay in the inbox.',
      deck: 'The useful view is the handoff from a resident text to work an owner can see.',
      kind: 'bars',
      values: [
        ['Text', 96],
        ['Theme', 72],
        ['Owner', 64],
        ['Fix', 58],
      ],
      notes: ['Capture the raw words.', 'Name the pattern.', 'Move the work.'],
    },
    {
      id: 'risk-heatmap',
      label: 'Risk heatmap',
      title: 'Small resident issues get expensive when they repeat.',
      deck: 'The point is to catch ordinary complaints before they quietly become a pattern.',
      kind: 'matrix',
      values: [
        ['Maintenance', 81],
        ['Access', 63],
        ['Noise', 54],
        ['Renewal', 76],
        ['Wi-Fi', 68],
        ['Payments', 47],
      ],
      notes: ['Do not average away pain.', 'Watch repeat issues.', 'Make renewal risk visible.'],
    },
    {
      id: 'proof-constellation',
      label: 'Link map',
      title: 'Do not make the reader hunt.',
      deck: 'Keep links, talks, and company facts close to the part of the page they explain.',
      kind: 'orbit',
      values: [
        ['ResiDesk', 90],
        ['Talks', 76],
        ['Writing', 72],
        ['Press', 66],
        ['Work', 81],
      ],
      notes: ['Keep links close to the claim.', 'Separate talks from work.', 'Make the trail easy.'],
    },
    {
      id: 'trust-stack',
      label: 'Trust stack',
      title: 'A useful answer shows what it used.',
      deck: 'A good answer needs a source, context, an owner, a test, and follow-through.',
      kind: 'stack',
      values: [
        ['Input', 88],
        ['Context', 82],
        ['Owner', 74],
        ['Test', 67],
        ['Follow', 79],
      ],
      notes: ['No answer floats alone.', 'Judgment stays human.', 'The test is use under pressure.'],
    },
    {
      id: 'adoption-curve',
      label: 'Adoption curve',
      title: 'The demo is early. It is not done.',
      deck: 'A local model can help describe the gap, but the chart keeps the test honest.',
      kind: 'route',
      values: [
        ['Demo', 92],
        ['First use', 71],
        ['Busy day', 52],
        ['Habit', 64],
      ],
      notes: ['Room reaction is not adoption.', 'Watch the next morning.', 'Measure repeat use.'],
    },
    {
      id: 'decision-stack',
      label: 'Decision stack',
      title: 'The output has to land where a decision gets made.',
      deck: 'Analysis only matters if it reaches the person who can change the building.',
      kind: 'stack',
      values: [
        ['Resident', 83],
        ['Pattern', 78],
        ['Operator', 86],
        ['Owner', 69],
        ['Change', 62],
      ],
      notes: ['Do not stop at insight.', 'Name the decision.', 'Show who acts.'],
    },
    {
      id: 'context-receipt',
      label: 'Context trail',
      title: 'Before AI answers, it should show what it used.',
      deck: 'Show the inputs before asking anyone to trust the answer.',
      kind: 'bars',
      values: [
        ['Policy', 71],
        ['History', 86],
        ['Lease', 68],
        ['Tone', 61],
      ],
      notes: ['Show inputs.', 'Expose missing context.', 'Let the person judge.'],
    },
    {
      id: 'voice-fingerprint',
      label: 'Voice fingerprint',
      title: 'The copy should sound like me, not a recap of me.',
      deck: 'Check for concrete nouns, first-person judgment, and language that stays close to the job.',
      kind: 'matrix',
      values: [
        ['Concrete', 86],
        ['First person', 68],
        ['Short', 74],
        ['Skeptical', 79],
        ['Specific', 88],
        ['Plain', 82],
      ],
      notes: ['Cut recap voice.', 'Use real nouns.', 'Keep the point narrow.'],
    },
    {
      id: 'customer-compass',
      label: 'Customer compass',
      title: 'The center of the map is still the customer.',
      deck: 'Browser AI is useful here only if it keeps pulling the reader back to the job.',
      kind: 'orbit',
      values: [
        ['Resident', 94],
        ['Operator', 82],
        ['Owner', 73],
        ['Founder', 67],
        ['Candidate', 58],
      ],
      notes: ['Start with the resident.', 'Keep roles distinct.', 'Do not flatten the audience.'],
    },
    {
      id: 'handoff-map',
      label: 'Handoff map',
      title: 'A good answer knows when to hand off.',
      deck: 'The map shows where AI should stop drafting and start routing.',
      kind: 'route',
      values: [
        ['Read', 85],
        ['Draft', 74],
        ['Flag', 81],
        ['Route', 88],
        ['Measure', 67],
      ],
      notes: ['Drafting is not ownership.', 'Escalation should be legible.', 'Measurement closes the loop.'],
    },
    {
      id: 'maintenance-pulse',
      label: 'Maintenance pulse',
      title: 'Maintenance complaints are often a trust chart.',
      deck: 'This view turns repeated small problems into a pulse an operator can read.',
      kind: 'bars',
      values: [
        ['Washer', 52],
        ['Elevator', 88],
        ['Lights', 61],
        ['Package', 73],
      ],
      notes: ['Frequency matters.', 'Repeated small issues count.', 'Show the building pattern.'],
    },
    {
      id: 'renewal-warning',
      label: 'Renewal warning',
      title: 'Renewal risk usually talks before it leaves.',
      deck: 'The heatmap keeps early resident warnings from disappearing into ticket history.',
      kind: 'matrix',
      values: [
        ['Price', 76],
        ['Noise', 58],
        ['Amenities', 71],
        ['Response', 83],
        ['Access', 62],
        ['Safety', 69],
      ],
      notes: ['Listen before renewal season.', 'Show cause, not just churn.', 'Give the owner time.'],
    },
    {
      id: 'demo-gap',
      label: 'Demo gap',
      title: 'Some demos look better than the work they replace.',
      deck: 'The bars show the dangerous gap between a polished room and a busy team.',
      kind: 'bars',
      values: [
        ['Room', 94],
        ['Setup', 64],
        ['Mess', 48],
        ['Repeat', 57],
      ],
      notes: ['A demo can lie by omission.', 'Busy work is the test.', 'Repeat use is the signal.'],
    },
    {
      id: 'owner-briefing',
      label: 'Owner briefing',
      title: 'An owner needs the pattern, not the inbox.',
      deck: 'This stack turns resident noise into a brief a decision-maker can use.',
      kind: 'stack',
      values: [
        ['Raw text', 90],
        ['Theme', 78],
        ['Cost', 61],
        ['Action', 74],
        ['Owner brief', 84],
      ],
      notes: ['Do not forward the mess.', 'Compress without hiding.', 'Tie it to action.'],
    },
    {
      id: 'candidate-lens',
      label: 'Candidate lens',
      title: 'Candidates should see how the work actually feels.',
      deck: 'A browser AI summary can help, but the page should still show the work style directly.',
      kind: 'route',
      values: [
        ['Context', 91],
        ['Ownership', 82],
        ['Mess', 74],
        ['Judgment', 86],
      ],
      notes: ['Show the real job.', 'Reward context carriers.', 'Skip vague culture copy.'],
    },
    {
      id: 'founder-work',
      label: 'Founder work',
      title: 'A good founder answer starts close to the customer.',
      deck: 'This heatmap gives founders and investors a fast way to check where the work is clearest.',
      kind: 'matrix',
      values: [
        ['Customer', 91],
        ['Pain', 84],
        ['Market', 67],
        ['Learning', 76],
        ['Team', 73],
        ['Learning', 82],
      ],
      notes: ['Close to pain beats polish.', 'The claim should travel.', 'Learning speed matters.'],
    },
    {
      id: 'transcript-terrain',
      label: 'Transcript terrain',
      title: 'Talks are useful when they show what keeps coming back.',
      deck: 'The chart shows the topics that keep coming back across the public conversations.',
      kind: 'bars',
      values: [
        ['Physics', 54],
        ['AI', 82],
        ['Housing', 87],
        ['Teams', 66],
      ],
      notes: ['Use talks for voice.', 'Watch repeated themes.', 'Do not over-polish the source.'],
    },
    {
      id: 'article-trail',
      label: 'Article trail',
      title: 'Outside links should make the work easier to understand.',
      deck: 'The map keeps articles, writing, and recordings from becoming a loose link pile.',
      kind: 'orbit',
      values: [
        ['Law360', 78],
        ['20for20', 73],
        ['Hackernoon', 71],
        ['TechTimes', 63],
        ['TechBullion', 66],
      ],
      notes: ['Name what happened.', 'Use the date.', 'Keep the reader oriented.'],
    },
    {
      id: 'how-i-got-here',
      label: 'How I got here',
      title: 'The path makes more sense when it stays tied to measurement.',
      deck: 'Physics, finance, education finance, housing: different rooms, same bias toward useful measurement.',
      kind: 'route',
      values: [
        ['Physics', 70],
        ['BlackRock', 76],
        ['Climb', 85],
        ['ResiDesk', 94],
      ],
      notes: ['Do not make it a bio list.', 'Name the lesson.', 'Connect the work.'],
    },
    {
      id: 'capability-ladder',
      label: 'Capability ladder',
      title: 'Browser AI should degrade like a ladder, not a cliff.',
      deck: 'The stack shows how the site moves from local data to browser model help when available.',
      kind: 'stack',
      values: [
        ['Static data', 96],
        ['Search', 88],
        ['SVG view', 83],
        ['Prompt API', 62],
        ['Model read', 54],
      ],
      notes: ['Feature-detect first.', 'Keep deterministic output.', 'Let newer browsers add depth.'],
    },
    {
      id: 'local-model-state',
      label: 'Model state',
      title: 'The browser model is a bonus, not a dependency.',
      deck: 'This view makes availability explicit so the tool feels honest.',
      kind: 'bars',
      values: [
        ['Fallback', 100],
        ['WebGPU', 58],
        ['Prompt', 42],
        ['Download', 31],
      ],
      notes: ['Always render first.', 'Explain availability.', 'Never hide the fallback.'],
    },
    {
      id: 'note-swarm',
      label: 'Note swarm',
      title: 'Private notes are better when patterns surface locally.',
      deck: 'Nothing leaves the browser. The visualization just helps the reader see what they kept noticing.',
      kind: 'matrix',
      values: [
        ['Demo', 71],
        ['Adoption', 78],
        ['Context', 86],
        ['Housing', 64],
        ['Trust', 82],
        ['AI', 69],
      ],
      notes: ['Keep notes local.', 'Summarize lightly.', 'Show repeated words.'],
    },
    {
      id: 'objection-map',
      label: 'Objection map',
      title: 'The objections should point to the part of the system that answers them.',
      deck: 'Do not let browser AI talk around the hard product questions.',
      kind: 'orbit',
      values: [
        ['Accuracy', 75],
        ['Trust', 89],
        ['Privacy', 72],
        ['Workflow', 84],
        ['ROI', 67],
      ],
      notes: ['Do not dodge hard questions.', 'Map objection to system design.', 'Answer with specifics.'],
    },
    {
      id: 'page-density',
      label: 'Page density',
      title: 'A visual site still needs air.',
      deck: 'This chart treats density as a design variable, not an accident.',
      kind: 'bars',
      values: [
        ['Hero', 70],
        ['Now', 63],
        ['Map', 78],
        ['Tools', 86],
      ],
      notes: ['Watch crowded sections.', 'Leave reading room.', 'Do not pack every surface.'],
    },
    {
      id: 'section-contrast',
      label: 'Contrast map',
      title: 'Playful color still has to read.',
      deck: 'The heatmap keeps visual ambition tied to legibility and hover states.',
      kind: 'matrix',
      values: [
        ['Hero', 88],
        ['Cards', 81],
        ['Hover', 76],
        ['Mobile', 83],
        ['Links', 90],
        ['Tools', 78],
      ],
      notes: ['Contrast is not optional.', 'Hover cannot reduce readability.', 'Mobile counts first.'],
    },
    {
      id: 'reading-time-map',
      label: 'Quick read',
      title: 'Different readers should not need the same entry point.',
      deck: 'This view helps a browser model pull relevant sections without changing the page itself.',
      kind: 'route',
      values: [
        ['Skim', 45],
        ['Longer read', 72],
        ['Deep read', 88],
        ['Reach out', 61],
      ],
      notes: ['Respect skim readers.', 'Keep links close.', 'Make the next click obvious.'],
    },
    {
      id: 'follow-through-queue',
      label: 'Action queue',
      title: 'If nobody owns the queue, the answer did not help.',
      deck: 'The stack shows how local AI can sort work while leaving judgment with a person.',
      kind: 'stack',
      values: [
        ['Urgent', 90],
        ['Owner', 82],
        ['Due next', 71],
        ['Blocked', 59],
        ['Review', 65],
      ],
      notes: ['Prioritize visibly.', 'Keep blockers honest.', 'Review before sending.'],
    },
    {
      id: 'ai-use-case-sorter',
      label: 'Use-case sorter',
      title: 'Useful AI sorts by work changed, not model drama.',
      deck: 'The heatmap makes the browser-AI feature set feel practical instead of magical.',
      kind: 'matrix',
      values: [
        ['Summarize', 76],
        ['Rewrite', 58],
        ['Translate', 52],
        ['Search', 83],
        ['Classify', 80],
        ['Route', 88],
      ],
      notes: ['Prefer narrow jobs.', 'Use model APIs where they fit.', 'Keep routing concrete.'],
    },
    {
      id: 'operator-day',
      label: 'Operator day',
      title: 'The best AI feature gives time back during the day.',
      deck: 'This keeps the product honest: shorter commute from problem to finished work.',
      kind: 'route',
      values: [
        ['Inbox', 83],
        ['Triage', 78],
        ['Reply', 66],
        ['Escalate', 74],
        ['Close loop', 87],
      ],
      notes: ['Save real time.', 'Keep the human in judgment.', 'Close the loop before celebrating.'],
    },
  ];

  const stopWords = new Set('a an and are as at be by for from has have how i in is it its me more my not of on or that the this to what when where who why with you your'.split(' '));

  const tokenize = (value) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((word) => word && !stopWords.has(word));
  const firstSentence = (value) => value.split(/[.!?]\s+/).map((item) => item.trim()).find(Boolean) || value.trim();
  const summarizeTopic = (value) => {
    const tokens = tokenize(value);
    const scored = tokens.reduce((counts, token) => counts.set(token, (counts.get(token) || 0) + 1), new Map());
    return [...scored.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([token]) => token).join(', ') || 'the work';
  };
  const copyText = async (value) => {
    if (!navigator.clipboard?.writeText) return false;
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return false;
    }
  };
  const scoreDoc = (query, doc) => {
    const queryTokens = tokenize(query);
    const title = doc.title.toLowerCase();
    const tags = doc.tags.join(' ').toLowerCase();
    const text = `${doc.title} ${doc.text} ${tags}`.toLowerCase();
    return queryTokens.reduce((score, token) => score + (title.includes(token) ? 2 : 0) + (tags.includes(token) ? 1.5 : 0) + (text.includes(token) ? 1 : 0), 0);
  };
  const topDocs = (query, count = 3) => corpus.map((doc) => ({ ...doc, score: scoreDoc(query, doc) })).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, count);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  const answerFromCorpus = (question) => {
    const docs = topDocs(question).filter((doc) => doc.score > 0);
    const usableDocs = docs.length ? docs : [corpus[0], corpus[2], corpus[1]];
    const lead = usableDocs[0];
    return `
      <p><strong>Short answer:</strong> ${escapeHtml(lead.text)}</p>
      <p class="article-meta">Grounded in ${usableDocs.length} page notes.</p>
      <ul>
        ${usableDocs.map((doc) => `<li><a href="${doc.href}">${escapeHtml(doc.title)}</a>: ${escapeHtml(doc.text)}</li>`).join('')}
      </ul>
    `;
  };

  const getBrowserLanguageModel = () => globalThis.LanguageModel || globalThis.ai?.languageModel || null;

  const visualPlanFromBrowserModel = async (mode) => {
    const api = getBrowserLanguageModel();
    if (!api?.create) return null;
    try {
      const availability = api.availability ? await api.availability() : 'available';
      if (availability === 'unavailable') return null;
      const session = await api.create({
        systemPrompt: 'Read this site-visualization brief and return one plainspoken sentence. No hype. No markdown.',
      });
      const prompt = `Visualization: ${mode.title}\nPoint: ${mode.deck}\nSignals: ${mode.values.map(([label, value]) => `${label} ${value}`).join(', ')}`;
      const response = session.prompt ? await session.prompt(prompt) : null;
      session.destroy?.();
      return response ? String(response).trim().slice(0, 220) : null;
    } catch {
      return null;
    }
  };

  const answerWithBrowserModel = async (question) => {
    const api = getBrowserLanguageModel();
    if (!api?.create) return null;
    try {
      if (api.availability) {
        const availability = await api.availability();
        if (availability === 'unavailable') return null;
      }
      const session = await api.create({
        systemPrompt: 'Answer only from the supplied site notes. Be plainspoken, specific, and concise. If the notes do not answer the question, say so.',
      });
      const notes = topDocs(question, 5).map((doc) => `${doc.title}: ${doc.text}`).join('\n');
      const prompt = `Question: ${question}\n\nSite notes:\n${notes}`;
      const response = session.prompt ? await session.prompt(prompt) : null;
      session.destroy?.();
      return response ? `<p><strong>Browser model:</strong> ${escapeHtml(String(response))}</p>${answerFromCorpus(question)}` : null;
    } catch {
      return null;
    }
  };

  const detectBrowserAI = async () => {
    const status = document.querySelector('#browser-ai-status');
    if (!status) return;
    const hasPromptApi = Boolean(getBrowserLanguageModel());
    const hasWebGpu = Boolean(navigator.gpu);
    if (hasPromptApi) {
      status.textContent = 'Browser model hook available';
      status.title = 'This browser exposes a local language model hook.';
      status.classList.add('is-browser');
      return;
    }
    if (hasWebGpu) {
      status.textContent = 'WebGPU available';
      status.title = 'This browser can run local model features when available.';
      status.classList.add('is-local');
      return;
    }
    status.textContent = 'Local fallback active';
    status.title = 'This uses the built-in page retrieval fallback.';
    status.classList.add('is-local');
  };

  const initAsk = () => {
    const form = document.querySelector('#ai-ask-form');
    const input = document.querySelector('#ai-question');
    const output = document.querySelector('#ai-answer');
    if (!form || !input || !output) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const question = input.value.trim().slice(0, 180);
      if (!question) {
        output.innerHTML = '<p class="article-meta">Ask a real question first.</p>';
        return;
      }
      output.setAttribute('aria-busy', 'true');
      output.innerHTML = '<p class="article-meta">Checking the site notes...</p>';
      output.innerHTML = (await answerWithBrowserModel(question)) || answerFromCorpus(question);
      output.setAttribute('aria-busy', 'false');
    });
    window.addEventListener('site-command-ask', (event) => {
      input.value = String(event.detail || '').trim();
      if (input.value) (form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true })));
    });
    document.querySelectorAll('#conversation-map button').forEach((button) => {
      button.addEventListener('click', () => {
        input.value = button.dataset.question || button.textContent.trim();
        output.innerHTML = answerFromCorpus(input.value);
        output.closest('.ai-tool-primary')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  };

  const initGuide = () => {
    const select = document.querySelector('#guide-persona');
    const button = document.querySelector('#build-guide');
    const output = document.querySelector('#guide-output');
    if (!select || !button || !output) return;
    button.addEventListener('click', () => {
      output.innerHTML = (guides[select.value] || guides.operator).map(([href, copy]) => `<li><a href="${href}">${href.replace('#', '')}</a> ${copy}</li>`).join('');
    });
    button.click();
  };

  const initTalkLens = () => {
    const select = document.querySelector('#talk-lens');
    const button = document.querySelector('#run-lens');
    const output = document.querySelector('#lens-output');
    if (!select || !button || !output) return;
    button.addEventListener('click', () => {
      output.innerHTML = `<ul>${(talkLenses[select.value] || talkLenses.harnoor).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    });
    button.click();
  };

  const initUsefulAi = () => {
    const input = document.querySelector('#useful-ai-input');
    const button = document.querySelector('#score-ai-idea');
    const output = document.querySelector('#ai-score-output');
    if (!input || !button || !output) return;
    const checks = [
      ['Context', ['context', 'history', 'policy', 'lease', 'customer', 'resident']],
      ['Owner', ['owner', 'team', 'person', 'human', 'operator', 'handoff']],
      ['Next step', ['route', 'task', 'follow', 'fix', 'resolve', 'escalate']],
      ['Measurement', ['measure', 'score', 'renewal', 'retention', 'noi', 'outcome']],
      ['Trust', ['trust', 'review', 'approve', 'judgment', 'risk', 'flag', 'tone']],
    ];
    button.addEventListener('click', () => {
      const text = input.value.trim().toLowerCase();
      if (!text) {
        output.innerHTML = '<p class="article-meta">Paste the idea first.</p>';
        return;
      }
      const hits = checks.map(([label, words]) => [label, words.some((word) => new RegExp(`\\b${word}\\w*\\b`, 'i').test(text))]);
      const score = hits.filter(([, hit]) => hit).length;
      const percent = Math.round((score / checks.length) * 100);
      output.innerHTML = `
        <div class="ai-score-meter">
          <strong>${score}/5 useful-work checks</strong>
          <span class="ai-score-bar" aria-hidden="true"><span style="--score-width:${percent}%"></span></span>
          <ul>${hits.map(([label, hit]) => `<li>${hit ? 'Pass' : 'Missing'}: ${label}</li>`).join('')}</ul>
          <p>${score >= 4 ? 'This has the shape of useful AI. The next question is whether a real team would trust it on a busy day.' : 'This still sounds more like a demo than real work. Add context, ownership, and a concrete next step.'}</p>
        </div>
      `;
    });
  };

  const initTuesdayTest = () => {
    const claim = document.querySelector('#tuesday-claim');
    const environment = document.querySelector('#tuesday-env');
    const button = document.querySelector('#run-tuesday-test');
    const output = document.querySelector('#tuesday-output');
    if (!claim || !environment || !button || !output) return;
    const render = () => {
      const claimText = tuesdayClaims[claim.value] || tuesdayClaims.answers;
      const envText = tuesdayEnvironments[environment.value] || tuesdayEnvironments.operator;
      const breakpoints = tuesdayBreakpoints[claim.value] || tuesdayBreakpoints.answers;
      const pressure = tuesdayEnvironmentPressure[environment.value] || tuesdayEnvironmentPressure.operator;
      output.innerHTML = `
        <p><strong>Tuesday setup:</strong> ${escapeHtml(claimText)} Now put it inside ${escapeHtml(envText)}.</p>
        <ul>${breakpoints.map((item) => `<li>Demo risk: ${escapeHtml(item)}</li>`).join('')}</ul>
        <ul>${pressure.map((item) => `<li>Workday pressure: ${escapeHtml(item)}</li>`).join('')}</ul>
        <p><strong>Adoption test:</strong> Name the owner, show the missing context, decide what gets reviewed, and measure whether the work moved.</p>
      `;
    };
    button.addEventListener('click', render);
    render();
  };

  const initSignalSim = () => {
    const select = document.querySelector('#building-type');
    const button = document.querySelector('#simulate-signals');
    const output = document.querySelector('#signal-sim-output');
    if (!select || !button || !output) return;
    button.addEventListener('click', () => {
      const messages = signalFixtures[select.value] || signalFixtures.garden;
      const label = select.selectedOptions[0]?.textContent || 'building';
      output.innerHTML = `
        <strong>Incoming resident messages for ${escapeHtml(label)}</strong>
        <ul>${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join('')}</ul>
        <strong>Operator view</strong>
        <ul>
          <li>Theme: maintenance, access, and communication gaps.</li>
          <li>Risk: repeated small issues become renewal objections because nobody sees the pattern early enough.</li>
          <li>Next step: triage urgent cases, then show the owner the recurring pattern.</li>
        </ul>
      `;
    });
    button.click();
  };

  const initHighlights = () => {
    const button = document.querySelector('#toggle-highlights');
    const terms = ['customer', 'context', 'measurement', 'follow-through', 'trust', 'demo', 'resident', 'operator', 'judgment', 'next step', 'building'];
    let active = false;
    const apply = () => {
      if (document.querySelector('mark.signal-highlight')) return;
      const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || parent.closest('script, style, textarea, input, mark')) return NodeFilter.FILTER_REJECT;
          return terms.some((term) => node.nodeValue.toLowerCase().includes(term)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const fragment = document.createDocumentFragment();
        const pattern = new RegExp(`\\b(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
        node.nodeValue.split(pattern).forEach((part) => {
          if (terms.includes(part.toLowerCase())) {
            const mark = document.createElement('mark');
            mark.className = 'signal-highlight';
            mark.textContent = part;
            fragment.append(mark);
          } else {
            fragment.append(part);
          }
        });
        node.replaceWith(fragment);
      });
    };
    const clear = () => {
      document.querySelectorAll('mark.signal-highlight').forEach((mark) => mark.replaceWith(document.createTextNode(mark.textContent)));
    };
    button?.addEventListener('click', () => {
      active = !active;
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? 'Remove highlights' : 'Highlight pattern';
      if (active) apply();
      else clear();
    });
  };

  const initNotes = () => {
    const input = document.querySelector('#private-notes');
    const summarize = document.querySelector('#summarize-notes');
    const clear = document.querySelector('#clear-notes');
    const output = document.querySelector('#notes-output');
    if (!input || !summarize || !clear || !output) return;
    try {
      input.value = localStorage.getItem('arjun-site-notes') || '';
    } catch {
      input.value = '';
    }
    input.addEventListener('input', () => {
      try {
        localStorage.setItem('arjun-site-notes', input.value);
      } catch {}
    });
    summarize.addEventListener('click', () => {
      const sentences = input.value.split(/[.!?]\s+/).map((item) => item.trim()).filter(Boolean);
      output.innerHTML = sentences.length
        ? `<ul>${sentences.slice(0, 4).map((sentence) => `<li>${escapeHtml(sentence.slice(0, 280))}</li>`).join('')}</ul>`
        : '<p class="article-meta">No notes yet.</p>';
    });
    clear.addEventListener('click', () => {
      input.value = '';
      try {
        localStorage.removeItem('arjun-site-notes');
      } catch {}
      output.innerHTML = '<p class="article-meta">Cleared in this browser.</p>';
    });
  };

  const initDesignCritique = () => {
    const button = document.querySelector('#run-design-critique');
    const output = document.querySelector('#design-critique-output');
    if (!button || !output) return;
    const render = () => {
      output.innerHTML = `
        <div class="critique-grid">
          ${designCritique.map(([label, score, note]) => `
            <div class="critique-score">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(score)}</strong>
              <p>${escapeHtml(note)}</p>
            </div>
          `).join('')}
        </div>
        <p class="critique-verdict"><strong>Verdict:</strong> The site is strongest when it behaves like a useful object. Keep pushing toward fewer decorations, more judgment, and a clearer point.</p>
      `;
    };
    button.addEventListener('click', render);
  };

  const initTweaks = () => {
    const panel = document.querySelector('#site-tweak-panel');
    const output = document.querySelector('#tweak-output');
    if (!panel || !output) return;
    const render = (id) => {
      const brief = tweakBriefs[id];
      if (!brief) return;
      output.innerHTML = `
        <strong>${escapeHtml(brief.title)}</strong>
        <ul>${brief.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ul>
      `;
    };
    panel.querySelectorAll('button[data-tweak]').forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.tweak));
    });
    render('legibility');
  };

  const initProofPacket = () => {
    const select = document.querySelector('#reading-audience');
    const button = document.querySelector('#build-reading-path');
    const output = document.querySelector('#reading-path-output');
    if (!select || !button || !output) return;
    const render = () => {
      const packet = readingPaths[select.value] || readingPaths.operator;
      output.innerHTML = `
        <ol class="reading-path-list">
          ${packet.map(([title, href, note]) => `<li><a href="${href}">${escapeHtml(title)}</a><p>${escapeHtml(note)}</p></li>`).join('')}
        </ol>
        <button type="button" class="text-link ai-copy-output" data-copy-kind="reading">Copy path</button>
      `;
    };
    button.addEventListener('click', render);
    window.addEventListener('site-command-reading', (event) => {
      const audience = String(event.detail || 'operator');
      if (readingPaths[audience]) select.value = audience;
      render();
    });
    output.addEventListener('click', async (event) => {
      if (!event.target.matches('[data-copy-kind="reading"]')) return;
      const copied = await copyText(output.innerText.replace('Copy path', '').trim());
      event.target.textContent = copied ? 'Copied' : 'Copy unavailable';
    });
    render();
  };

  const initOperatorMemo = () => {
    const input = document.querySelector('#operator-memo-input');
    const button = document.querySelector('#build-operator-memo');
    const output = document.querySelector('#operator-memo-output');
    if (!input || !button || !output) return;
    button.addEventListener('click', () => {
      const note = input.value.trim();
      if (!note) {
        output.innerHTML = '<p class="article-meta">Paste the messy notes first.</p>';
        return;
      }
      const topic = summarizeTopic(note);
      output.innerHTML = `
        <div class="operator-memo">
          <strong>Memo</strong>
          <p>${escapeHtml(firstSentence(note))}</p>
          <ul>
            <li><span>Pattern</span>${escapeHtml(topic)}</li>
            <li><span>Question</span>What would I do differently if this kept happening next week?</li>
            <li><span>Decision</span>Name who owns the next step before adding more analysis.</li>
            <li><span>Follow-through</span>Route urgent cases, then show the recurring pattern to the person who can change the building.</li>
          </ul>
          <button type="button" class="text-link ai-copy-output" data-copy-kind="memo">Copy memo</button>
        </div>
      `;
    });
    window.addEventListener('site-command-memo', (event) => {
      input.value = String(event.detail || '').trim();
      if (input.value) button.click();
    });
    output.addEventListener('click', async (event) => {
      if (!event.target.matches('[data-copy-kind="memo"]')) return;
      const copied = await copyText(output.innerText.replace('Copy memo', '').trim());
      event.target.textContent = copied ? 'Copied' : 'Copy unavailable';
    });
  };

  const initSiteCompass = () => {
    const output = document.querySelector('#site-compass-output');
    if (!output) return;
    output.innerHTML = compassItems.map(([title, href, note], index) => `
      <a class="site-compass-link" href="${href}" title="Jump to ${escapeHtml(title)}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(title)}</strong>
        <em>${escapeHtml(note)}</em>
      </a>
    `).join('');
  };

  const renderVisualSvg = (mode) => {
    const width = 560;
    const height = 250;
    const max = Math.max(...mode.values.map(([, value]) => value), 1);
    const textAttrs = 'fill="var(--contrast-ink)" font-family="var(--font-mono)" font-weight="900" letter-spacing=".07em"';
    if (mode.kind === 'route') {
      const points = mode.values.map(([, value], index) => {
        const x = 52 + index * ((width - 104) / Math.max(mode.values.length - 1, 1));
        const y = 196 - (value / max) * 122;
        return [x, y];
      });
      return `
        <svg class="visual-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(mode.title)}">
          <path d="M34 198H526M34 136H526M34 74H526" fill="none" stroke="color-mix(in oklch, var(--contrast-line) 24%, transparent)" stroke-width="2" stroke-dasharray="5 8" />
          <path d="${points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')}" fill="none" stroke="var(--contrast-blue)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          ${points.map(([x, y], index) => `
            <g>
              <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="var(--contrast-mint)" stroke="var(--contrast-line)" stroke-width="3" />
              <text x="${x.toFixed(1)}" y="228" ${textAttrs} font-size="14" text-anchor="middle">${escapeHtml(String(index + 1).padStart(2, '0'))}</text>
            </g>
          `).join('')}
        </svg>
      `;
    }
    if (mode.kind === 'bars') {
      const barWidth = 82;
      const gap = 36;
      return `
        <svg class="visual-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(mode.title)}">
          <path d="M34 198H526M34 136H526M34 74H526" fill="none" stroke="color-mix(in oklch, var(--contrast-line) 24%, transparent)" stroke-width="2" stroke-dasharray="5 8" />
          ${mode.values.map(([label, value], index) => {
            const x = 58 + index * (barWidth + gap);
            const h = Math.max(18, (value / max) * 136);
            const y = 198 - h;
            const fill = index % 2 ? 'color-mix(in oklch, var(--contrast-cyan) 52%, var(--contrast-paper) 48%)' : 'var(--contrast-mint)';
            return `
              <g>
                <rect x="${x}" y="${y.toFixed(1)}" width="${barWidth}" height="${h.toFixed(1)}" rx="10" fill="${fill}" stroke="var(--contrast-line)" stroke-width="3" />
                <text x="${x + barWidth / 2}" y="226" ${textAttrs} font-size="13" text-anchor="middle">${escapeHtml(label)}</text>
              </g>
            `;
          }).join('')}
        </svg>
      `;
    }
    if (mode.kind === 'matrix') {
      return `
        <svg class="visual-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(mode.title)}">
          ${mode.values.map(([label, value], index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const x = 48 + col * 160;
            const y = 52 + row * 82;
            const opacity = (0.34 + (value / max) * 0.46).toFixed(2);
            return `
              <g>
                <rect x="${x}" y="${y}" width="132" height="56" rx="8" fill="var(--contrast-mint)" fill-opacity="${opacity}" stroke="var(--contrast-line)" stroke-width="3" />
                <text x="${x + 14}" y="${y + 24}" ${textAttrs} font-size="13">${escapeHtml(label)}</text>
                <text x="${x + 14}" y="${y + 44}" ${textAttrs} font-size="18" font-variant-numeric="tabular-nums">${escapeHtml(String(value))}</text>
              </g>
            `;
          }).join('')}
        </svg>
      `;
    }
    if (mode.kind === 'orbit') {
      const cx = width / 2;
      const cy = 126;
      return `
        <svg class="visual-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(mode.title)}">
          <circle cx="${cx}" cy="${cy}" r="84" fill="none" stroke="color-mix(in oklch, var(--contrast-blue) 36%, transparent)" stroke-width="3" stroke-dasharray="8 10" />
          <circle cx="${cx}" cy="${cy}" r="33" fill="var(--contrast-blue)" stroke="var(--contrast-line)" stroke-width="3" />
          <text x="${cx}" y="${cy + 5}" fill="var(--contrast-paper)" font-family="var(--font-mono)" font-size="12" font-weight="900" letter-spacing=".08em" text-anchor="middle">SITE</text>
          ${mode.values.map(([label, value], index) => {
            const angle = (-90 + index * (360 / mode.values.length)) * Math.PI / 180;
            const radius = 70 + (value / max) * 24;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            return `
              <g>
                <line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="color-mix(in oklch, var(--contrast-line) 42%, transparent)" stroke-width="2" />
                <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="var(--contrast-mint)" stroke="var(--contrast-line)" stroke-width="3" />
                <text x="${x.toFixed(1)}" y="${(y + 32).toFixed(1)}" ${textAttrs} font-size="12" text-anchor="middle">${escapeHtml(label)}</text>
              </g>
            `;
          }).join('')}
        </svg>
      `;
    }
    if (mode.kind === 'stack') {
      return `
        <svg class="visual-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(mode.title)}">
          ${mode.values.map(([label, value], index) => {
            const x = 64 + index * 74;
            const y = 188 - index * 28;
            const w = 240 + (value / max) * 80;
            const fill = index % 2 ? 'color-mix(in oklch, var(--contrast-cyan) 52%, var(--contrast-paper) 48%)' : 'var(--contrast-mint)';
            return `
              <g>
                <rect x="${x}" y="${y}" width="${w.toFixed(1)}" height="34" rx="8" fill="${fill}" stroke="var(--contrast-line)" stroke-width="3" />
                <text x="${x + 18}" y="${y + 23}" ${textAttrs} font-size="14">${escapeHtml(label)}</text>
              </g>
            `;
          }).join('')}
        </svg>
      `;
    }
    return '';
  };

  const renderVisualMode = async (mode) => {
    const stage = document.querySelector('#visual-stage');
    const status = document.querySelector('#visual-ai-status');
    if (!stage) return;
    stage.innerHTML = `
      <div class="visual-stage-copy">
        <span class="story-label">${escapeHtml(mode.label)}</span>
        <h4>${escapeHtml(mode.title)}</h4>
        <p>${escapeHtml(mode.deck)}</p>
      </div>
      ${renderVisualSvg(mode)}
      <div class="visual-stat-row">
        ${mode.values.map(([label, value]) => `
          <span><strong>${escapeHtml(String(value))}</strong>${escapeHtml(label)}</span>
        `).join('')}
      </div>
      <ul class="visual-notes">
        ${mode.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}
      </ul>
    `;
    const interpretation = await visualPlanFromBrowserModel(mode);
    if (interpretation) {
      status.textContent = 'Browser model added a read';
      status.classList.add('is-browser');
      stage.insertAdjacentHTML('beforeend', `<p class="visual-model-read"><strong>Browser read:</strong> ${escapeHtml(interpretation)}</p>`);
    }
  };

  const initVisualLab = () => {
    const list = document.querySelector('#visual-mode-list');
    if (!list) return;
    list.innerHTML = visualModes.map((mode, index) => `
      <button type="button" class="visual-mode-button" aria-pressed="${index === 0 ? 'true' : 'false'}" data-visual-mode="${escapeHtml(mode.id)}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(mode.label)}</strong>
      </button>
    `).join('');
    const activate = (id) => {
      const mode = visualModes.find((item) => item.id === id) || visualModes[0];
      list.querySelectorAll('.visual-mode-button').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.visualMode === mode.id));
      });
      renderVisualMode(mode);
    };
    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-visual-mode]');
      if (button) activate(button.dataset.visualMode);
    });
    list.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const buttons = [...list.querySelectorAll('.visual-mode-button')];
      const current = Math.max(0, buttons.findIndex((button) => button.getAttribute('aria-pressed') === 'true'));
      const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + direction + buttons.length) % buttons.length;
      buttons[next]?.focus();
      buttons[next]?.click();
    });
    activate(visualModes[0]?.id);
  };

  detectBrowserAI();
  initVisualLab();
  initAsk();
  initGuide();
  initTalkLens();
  initUsefulAi();
  initTuesdayTest();
  initSignalSim();
  initHighlights();
  initDesignCritique();
  initTweaks();
  initProofPacket();
  initOperatorMemo();
  initSiteCompass();
  initNotes();
})();
