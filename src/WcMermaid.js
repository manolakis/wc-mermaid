import 'mermaid/dist/mermaid';

const {
  mermaid: { mermaidAPI },
} = window;

export class WcMermaid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.__renderGraph = this.__renderGraph.bind(this);

    mermaidAPI.initialize({
      logLevel: 'none',
      startOnLoad: false,
    });
  }

  get __textNodes() {
    return Array.from(this.childNodes).filter(
      node => node.nodeType === this.TEXT_NODE
    );
  }

  get __textContent() {
    return this.__textNodes.map(node => node.textContent.trim()).join('');
  }

  __renderGraph() {
    this.updated = new Promise(resolve => {
      try {
        if (this.__textContent !== '') {
          mermaidAPI.render('graph', this.__textContent, svg => {
            this.shadowRoot.innerHTML = svg;
            resolve();
          });
        } else {
          this.shadowRoot.innerHTML = '';
          resolve();
        }
      } catch (_) {
        resolve();
      }
    });
  }

  __observeTextNodes() {
    if (this.__textNodeObservers) {
      this.__cleanTextNodeObservers();
    }

    this.__textNodeObservers = this.__textNodes.map(textNode => {
      const observer = new MutationObserver(this.__renderGraph);

      observer.observe(textNode, { characterData: true });

      return observer;
    });
  }

  __cleanTextNodeObservers() {
    this.__textNodeObservers.forEach(observer => observer.disconnect());
  }

  connectedCallback() {
    this.__observer = new MutationObserver(() => {
      this.__observeTextNodes();
      this.__renderGraph();
    });
    this.__observer.observe(this, { childList: true });
    this.__observeTextNodes();
    this.__renderGraph();
  }

  disconnectedCallback() {
    this.__cleanTextNodeObservers();
    this.__observer.disconnect();
  }
}
