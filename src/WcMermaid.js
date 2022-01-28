import mermaid from 'mermaid';

const mermaidAPI = mermaid.mermaidAPI;

/**
 * WcMermaid
 * @class
 */
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

  /**
   * @returns {ChildNode[]}
   * @private
   */
  get __textNodes() {
    return Array.from(this.childNodes).filter(
      node => node.nodeType === this.TEXT_NODE
    );
  }

  /**
   * @returns {string}
   * @private
   */
  get __textContent() {
    return this.__textNodes.map(node => node.textContent?.trim()).join('');
  }

  __renderGraph() {
    /** @type {Promise<void>} */
    this.updated = new Promise(resolve => {
      try {
        if (this.__textContent !== '') {
          mermaidAPI.render(
            'graph',
            this.__textContent,
            /** @param {string} svg */ svg => {
              if (this.shadowRoot) {
                this.shadowRoot.innerHTML = svg;
              }
              resolve();
            }
          );
        } else {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
          }
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
    if (this.__textNodeObservers) {
      this.__textNodeObservers.forEach(observer => observer.disconnect());
    }
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

    if (this.__observer) {
      this.__observer.disconnect();
      this.__observer = null;
    }
  }
}
