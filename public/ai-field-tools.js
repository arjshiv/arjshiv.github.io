(() => {
  const corpus = [
    {
      id: 'residesk',
      title: 'ResiDesk',
      href: '#now',
      text: 'I co-founded ResiDesk to help rental properties hear what residents are saying, answer well, understand what is actually happening, and get the right issue to the person who can move it without making someone read every text by hand.',
      tags: ['residesk', 'housing', 'resident', 'texts', 'operator', 'customer'],
    },
    {
      id: 'demo',
      title: 'Demos are not adoption',
      href: '#operating-system',
      text: 'A prototype can win the room and still lose to the spreadsheet the next morning. The room is not the test. The test is whether people still use it mid-work, mid-mess, when nobody is watching.',
      tags: ['demo', 'adoption', 'spreadsheet', 'trust', 'work'],
    },
    {
      id: 'ai-view',
      title: 'AI view',
      href: '#writing',
      text: 'I care about AI that shortens the distance between a real problem and a finished task. Context, tests, handoff, and judgment matter more than novelty or model names.',
      tags: ['ai', 'context', 'evaluation', 'judgment', 'handoff', 'model'],
    },
    {
      id: 'blackrock',
      title: 'BlackRock',
      href: '#about',
      text: 'At BlackRock, the lesson was that interface quality matters when someone is making a decision with real money behind it. A tool has to survive contact with the next morning.',
      tags: ['blackrock', 'interface', 'money', 'decision'],
    },
    {
      id: 'climb',
      title: 'Climb Credit',
      href: '#about',
      text: 'At Climb Credit, we asked what happened to earnings after the program. That pushed outcomes into underwriting, product, and data, and took annual loan volume from 1 million dollars to 300 million dollars.',
      tags: ['climb', 'credit', 'underwriting', 'outcomes', 'earnings'],
    },
    {
      id: 'physics',
      title: 'Physics and software',
      href: '#about',
      text: 'I studied applied physics because I liked real systems, messy measurement, and problems where small details changed the answer. Software became serious when it saved hours of lab work and stopped feeling like a separate thing.',
      tags: ['physics', 'measurement', 'software', 'systems'],
    },
    {
      id: 'talks',
      title: 'Talks',
      href: '#conversations',
      text: 'In the talks I usually end up in the same place: physics taught me to care about measurement, software became useful when it saved real time, and ResiDesk is about hearing residents clearly enough to act.',
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
      ['#now', 'Start with the current ResiDesk work.'],
      ['#signal-map', 'Then look at how resident messages turn into work someone owns.'],
      ['#recent', 'Use the outside links around resident feedback, retention, and NOI.'],
      ['#conversations', 'Watch the longer explanation if you want to hear it less polished.'],
      ['#links', 'Use the press links when you want external sourcing.'],
    ],
    founder: [
      ['#operating-system', 'Start with how I think about building.'],
      ['#writing', 'Read the useful-AI principles.'],
      ['#about', 'Look at the path from physics to finance to housing.'],
      ['#ai-field-tools', 'Try the Useful AI test against your own idea before you polish the demo.'],
      ['#conversations', 'Watch the company-systems conversations.'],
    ],
    journalist: [
      ['#about', 'Start with the narrative arc.'],
      ['#work', 'Use the measured work history.'],
      ['#recent', 'Pull recent writing and article links.'],
      ['#conversations', 'Use talks for direct voice.'],
      ['#links', 'Grab external press, panels, recordings, and dates.'],
    ],
    candidate: [
      ['#operating-system', 'Read how the company thinks about work.'],
      ['#now', 'Understand the current focus.'],
      ['#about', 'Get the personal path and operating bias.'],
      ['#writing', 'Read the principles.'],
      ['#links', 'Use recordings to hear how the work sounds without site polish.'],
    ],
    investor: [
      ['#now', 'Start with the current company focus.'],
      ['#work', 'Look at prior operating outcomes.'],
      ['#recent', 'Check the public links.'],
      ['#investing', 'Read the investing lens.'],
      ['#ai-field-tools', 'Use the simulator to see how the product thesis turns into operator work.'],
    ],
  };

  const talkLenses = {
    harnoor: ['Physics made me care about measurement.', 'Software became useful when it saved real time.', 'ResiDesk starts with the customer, not the AI demo.'],
    greg: ['The useful part of AI is leverage inside actual company work.', 'Context has to travel with the task.', 'A system is only good if it changes what someone does next.'],
    wellfound: ['The team needs people who can carry context.', 'The work is close to residents, operators, and messy edge cases.', 'Trust matters because a human team still owns the judgment.'],
    '20for20': ['Wi-Fi complaints are not just support tickets.', 'Resident sentiment can show owners where the building is leaking trust.', 'The output has to be useful to the operator, not just interesting to analyze.'],
  };

  const signalFixtures = {
    garden: ['The laundry app charged me twice again.', 'Can someone fix the courtyard lights?', 'My renewal offer went up but the pool has been closed.', 'Package room door is stuck.'],
    urban: ['Elevator 2 has been down all week.', 'The noise above me starts after midnight.', 'Guest parking rules are confusing.', 'Can maintenance enter while I am at work?'],
    student: ['Wi-Fi drops during exams.', 'Roommate transfer policy is unclear.', 'The trash chute smells bad.', 'My guarantor needs the lease link again.'],
    workforce: ['AC is out and I work nights.', 'I need a payment plan before Friday.', 'The playground gate does not latch.', 'Can I get text updates instead of portal notices?'],
  };

  const designCritique = [
    ['Argument', '9.0', 'The page is clearest when it starts with the job: customers are already saying useful things, and the tool should help someone act on them.'],
    ['Hierarchy', '8.2', 'The top half scans well. The lower tools section should keep behaving like a small workbench, not a pile of equal-weight cards.'],
    ['Detail', '8.0', 'The cool palette, hard shadows, and mono labels are distinctive. The risk is over-bordering; every line needs to help the reader.'],
    ['Function', '9.1', 'The browser tools do real work without a server: answer, route, score, simulate, highlight, and keep notes locally. That is more useful than a fake chat widget.'],
    ['Taste', '8.5', 'The best version of the site should feel like a useful object. Push each interaction toward judgment, not novelty.'],
  ];

  const tweakBriefs = {
    legibility: {
      title: 'Legibility pass',
      steps: ['Audit hover states first; text should never get lighter during motion.', 'Keep long paragraphs under 68 characters per line.', 'Use borders to group choices, not to outline every empty surface.'],
    },
    speed: {
      title: 'Speed pass',
      steps: ['Keep AI tools lazy-loaded and avoid any JavaScript above the fold.', 'Prefer content-visibility for lower sections and compressed images for public link cards.', 'Make interactions transform-only so old browsers do less paint work.'],
    },
    voice: {
      title: 'Voice pass',
      steps: ['Replace abstract claims with the job: residents text, operators decide, someone owns the next step.', 'Use first person when the claim is personal.', 'Cut anything that sounds like a press release or a transcript summary.'],
    },
    proof: {
      title: 'Public-link pass',
      steps: ['Move the visitor from claim to source quickly: work history, talks, writing, press.', 'Name the outcome, then link the source.', 'Do not let design flourishes hide the actual evidence.'],
    },
  };

  const proofPackets = {
    operator: [
      ['ResiDesk', '#now', 'Start with the current work: resident texts, building context, and routing the right issue to the right person.'],
      ['Resident messages', '#signal-map', 'Then show how raw resident messages become work someone owns.'],
      ['Law360', 'https://www.law360.com/real-estate-authority/articles/2275147/residesk-simplifies-resident-engagement-for-deeper-results', 'Use the external link on resident feedback and retention.'],
    ],
    founder: [
      ['How I build', '#operating-system', 'Use the six principles as the company-building spine.'],
      ['Useful AI test', '#ai-field-tools', 'Score an AI idea against context, owner, next step, measurement, and trust before calling it real.'],
      ['System design essay', 'https://hackernoon.com/as-ai-models-converge-system-design-becomes-the-differentiator', 'Read the point of view on systems around models.'],
    ],
    journalist: [
      ['Work arc', '#work', 'Use the path from physics to BlackRock, Climb, and ResiDesk.'],
      ['Talks', '#conversations', 'Pull direct voice from interviews and panels, not just the polished site copy.'],
      ['Links', '#links', 'Use the press links as external sourcing.'],
    ],
    investor: [
      ['Now', '#now', 'Start with the current ResiDesk focus.'],
      ['Prior outcomes', '#work', 'Use BlackRock and Climb to show the pattern is not housing-only.'],
      ['Investing lens', '#investing', 'Read the founder and customer-context filter.'],
    ],
  };

  const compassItems = [
    ['Now', '#now', 'what I am building'],
    ['Map', '#signal-map', 'how resident messages turn into decisions'],
    ['Work', '#work', 'the work arc'],
    ['Public', '#recent', 'outside links'],
    ['Talks', '#conversations', 'direct voice'],
    ['Writing', '#writing', 'AI point of view'],
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
    const text = `${doc.title} ${doc.text} ${doc.tags.join(' ')}`.toLowerCase();
    return queryTokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
  };
  const topDocs = (query, count = 3) => corpus.map((doc) => ({ ...doc, score: scoreDoc(query, doc) })).sort((a, b) => b.score - a.score).slice(0, count);
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  const answerFromCorpus = (question) => {
    const docs = topDocs(question).filter((doc) => doc.score > 0);
    const usableDocs = docs.length ? docs : [corpus[0], corpus[2], corpus[1]];
    const lead = usableDocs[0];
    return `
      <p><strong>What this site can say:</strong> ${escapeHtml(lead.text)}</p>
      <ul>
        ${usableDocs.map((doc) => `<li><a href="${doc.href}">${escapeHtml(doc.title)}</a>: ${escapeHtml(doc.text)}</li>`).join('')}
      </ul>
    `;
  };

  const getBrowserLanguageModel = () => globalThis.LanguageModel || globalThis.ai?.languageModel || null;

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
      status.classList.add('is-browser');
      return;
    }
    if (hasWebGpu) {
      status.textContent = 'WebGPU available';
      status.classList.add('is-local');
      return;
    }
    status.textContent = 'Local fallback active';
    status.classList.add('is-local');
  };

  const initAsk = () => {
    const form = document.querySelector('#ai-ask-form');
    const input = document.querySelector('#ai-question');
    const output = document.querySelector('#ai-answer');
    if (!form || !input || !output) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) {
        output.innerHTML = '<p class="article-meta">Ask a real question first.</p>';
        return;
      }
      output.innerHTML = '<p class="article-meta">Checking the site notes...</p>';
      output.innerHTML = (await answerWithBrowserModel(question)) || answerFromCorpus(question);
    });
    window.addEventListener('site-command-ask', (event) => {
      input.value = String(event.detail || '').trim();
      if (input.value) form.requestSubmit();
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
      output.innerHTML = guides[select.value].map(([href, copy]) => `<li><a href="${href}">${href.replace('#', '')}</a> ${copy}</li>`).join('');
    });
    button.click();
  };

  const initTalkLens = () => {
    const select = document.querySelector('#talk-lens');
    const button = document.querySelector('#run-lens');
    const output = document.querySelector('#lens-output');
    if (!select || !button || !output) return;
    button.addEventListener('click', () => {
      output.innerHTML = `<ul>${talkLenses[select.value].map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
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
      ['Trust', ['trust', 'review', 'approve', 'judgment', 'risk', 'flag']],
    ];
    button.addEventListener('click', () => {
      const text = input.value.trim().toLowerCase();
      if (!text) {
        output.innerHTML = '<p class="article-meta">Paste the idea first.</p>';
        return;
      }
      const hits = checks.map(([label, words]) => [label, words.some((word) => text.includes(word))]);
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

  const initSignalSim = () => {
    const select = document.querySelector('#building-type');
    const button = document.querySelector('#simulate-signals');
    const output = document.querySelector('#signal-sim-output');
    if (!select || !button || !output) return;
    button.addEventListener('click', () => {
      const messages = signalFixtures[select.value];
      output.innerHTML = `
        <strong>Incoming resident messages</strong>
        <ul>${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join('')}</ul>
        <strong>Operator view</strong>
        <ul>
          <li>Theme: maintenance, access, and communication gaps.</li>
          <li>Risk: repeated small issues become renewal objections because nobody sees the pattern early enough.</li>
          <li>Next step: route urgent cases, then show the owner the recurring pattern.</li>
        </ul>
      `;
    });
    button.click();
  };

  const initHighlights = () => {
    const button = document.querySelector('#toggle-highlights');
    const terms = ['customer', 'context', 'measurement', 'follow-through', 'trust', 'demo', 'resident', 'operator', 'judgment', 'next step'];
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
    input.value = localStorage.getItem('arjun-site-notes') || '';
    input.addEventListener('input', () => localStorage.setItem('arjun-site-notes', input.value));
    summarize.addEventListener('click', () => {
      const sentences = input.value.split(/[.!?]\s+/).map((item) => item.trim()).filter(Boolean);
      output.innerHTML = sentences.length
        ? `<ul>${sentences.slice(0, 4).map((sentence) => `<li>${escapeHtml(sentence)}</li>`).join('')}</ul>`
        : '<p class="article-meta">No notes yet.</p>';
    });
    clear.addEventListener('click', () => {
      input.value = '';
      localStorage.removeItem('arjun-site-notes');
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
        <p class="critique-verdict"><strong>Verdict:</strong> The site is strongest when it behaves like a useful object. Keep pushing toward fewer decorations, more judgment, and clearer sources.</p>
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
    const select = document.querySelector('#proof-audience');
    const button = document.querySelector('#build-proof-packet');
    const output = document.querySelector('#proof-packet-output');
    if (!select || !button || !output) return;
    const render = () => {
      const packet = proofPackets[select.value] || proofPackets.operator;
      output.innerHTML = `
        <ol class="proof-packet-list">
          ${packet.map(([title, href, note]) => `<li><a href="${href}">${escapeHtml(title)}</a><p>${escapeHtml(note)}</p></li>`).join('')}
        </ol>
        <button type="button" class="text-link ai-copy-output" data-copy-kind="proof">Copy packet</button>
      `;
    };
    button.addEventListener('click', render);
    window.addEventListener('site-command-proof', (event) => {
      const audience = String(event.detail || 'operator');
      if (proofPackets[audience]) select.value = audience;
      render();
    });
    output.addEventListener('click', async (event) => {
      if (!event.target.matches('[data-copy-kind="proof"]')) return;
      const copied = await copyText(output.innerText.replace('Copy packet', '').trim());
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
      <a class="site-compass-link" href="${href}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(title)}</strong>
        <em>${escapeHtml(note)}</em>
      </a>
    `).join('');
  };

  detectBrowserAI();
  initAsk();
  initGuide();
  initTalkLens();
  initUsefulAi();
  initSignalSim();
  initHighlights();
  initDesignCritique();
  initTweaks();
  initProofPacket();
  initOperatorMemo();
  initSiteCompass();
  initNotes();
})();
