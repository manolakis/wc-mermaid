# \<wc-mermaid>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i wc-mermaid
```

## Usage

```html
<wc-mermaid>
  graph TD;
    A --> B;
    A --> C;
    B --> D;
    C --> D;
</wc-mermaid>

<script type="module" src="wc-mermaid/wc-mermaid.js"></script>
```

Also, you can import the component class in case you use scoped elements and dont want to use the specified tag name.

```js
import { WcMermaid } from 'wc-mermaid';
```

## Linting with ECLint, ESLint, Prettier, and Markdown Lint

To scan the project for linting errors, run

```bash
npm run lint
```

You can lint with ECLint, ESLint, Prettier and Markdown lint individually as well

```bash
npm run lint:eclint
```

```bash
npm run lint:eslint
```

```bash
npm run lint:prettier
```

```bash
npm run lint:markdown
```

To automatically fix many linting errors, run

```bash
npm run format
```

You can format using ESLint and Prettier individually as well

```bash
npm run format:eslint
```

```bash
npm run format:prettier
```

## Testing with Web Test Runner

To run the suite of Web Test Runner tests, run

```bash
npm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
