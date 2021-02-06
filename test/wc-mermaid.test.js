import { expect, fixture, html } from '@open-wc/testing';

import '../wc-mermaid.js';

describe('WcMermaid', () => {
  it('should not draw anything by default', async () => {
    const el = await fixture(html` <wc-mermaid></wc-mermaid>`);

    expect(el.shadowRoot.hasChildNodes()).to.be.false;
  });

  it('should not draw anything if the specified graph has a syntax error', async () => {
    const el = await fixture(html` <wc-mermaid>ffasdfasd</wc-mermaid>`);

    expect(el.shadowRoot.hasChildNodes()).to.be.false;
  });

  it('should draw a graph defined in light DOM with a literal string', async () => {
    const el = await fixture(html` <wc-mermaid>graph TD; A-->B;</wc-mermaid>`);

    expect(el.shadowRoot.hasChildNodes()).to.be.true;
    expect(el.shadowRoot.firstChild.nodeName).to.be.equal('svg');
  });

  it('should draw a graph defined in light DOM with a template literal', async () => {
    const graph = 'A-->B;';
    const el = await fixture(html` <wc-mermaid>
      graph TD; ${graph}</wc-mermaid
    >`);

    expect(el.shadowRoot.hasChildNodes()).to.be.true;
    expect(el.shadowRoot.firstChild.nodeName).to.be.equal('svg');
  });

  it('should update a draw if the graph definition is updated', async () => {
    const el = await fixture(html` <wc-mermaid>graph TD; A--> B;</wc-mermaid>`);

    const firstDraw = el.shadowRoot.firstChild.outerHTML;

    el.firstChild.data = 'graph TD; A--> B; B-->C;';

    await el.updated;

    const secondDraw = el.shadowRoot.firstChild.outerHTML;

    expect(firstDraw).to.not.be.eql(secondDraw);
  });

  it('should remove the draw if the graph text is removed', async () => {
    const el = await fixture(html` <wc-mermaid>graph TD; A--> B;</wc-mermaid>`);

    expect(el.shadowRoot.hasChildNodes()).to.be.true;
    expect(el.shadowRoot.firstChild.nodeName).to.be.equal('svg');

    el.firstChild.data = '';

    await el.updated;

    expect(el.shadowRoot.hasChildNodes()).to.be.false;
  });

  it('should remove the draw if the graph node is removed', async () => {
    const el = await fixture(html` <wc-mermaid>graph TD; A--> B;</wc-mermaid>`);

    expect(el.shadowRoot.hasChildNodes()).to.be.true;
    expect(el.shadowRoot.firstChild.nodeName).to.be.equal('svg');

    el.removeChild(el.firstChild);

    await el.updated;

    expect(el.shadowRoot.hasChildNodes()).to.be.false;
  });
});
