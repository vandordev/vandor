export const productDocsManifest = {
  vx: {
    product: 'vx',
    label: 'vx',
    sourceRoot: '../vx',
    versions: {
      v0: {
        title: 'vx v0',
        description: 'Versioned documentation for vx v0, the Vandor CLI.',
        pages: [
          {
            source: 'docs/src/content/docs/index.md',
            slug: 'index',
            title: 'vx',
            description:
              'A modern terminal-first CLI from Vandor Dev, built with Go, Cobra, and Bubble Tea.',
          },
          {
            source: 'docs/src/content/docs/install.md',
            slug: 'install',
            title: 'Install',
            description: 'Installation instructions for vx.',
          },
          {
            source: 'docs/src/content/docs/guides/quickstart.md',
            slug: 'guides/quickstart',
            title: 'Quick Start',
            description: 'Get started with vx.',
          },
          {
            source: 'docs/src/content/docs/commands/vx.md',
            slug: 'commands/vx',
            title: 'vx',
            description: 'Root command reference for vx.',
          },
          {
            source: 'docs/src/content/docs/commands/view.md',
            slug: 'commands/view',
            title: 'view',
            description: 'Inspect a local vpkg package, export, or direct .vxt file.',
          },
          {
            source: 'docs/src/content/docs/commands/gen.md',
            slug: 'commands/gen',
            title: 'gen',
            description: 'Preview or apply generation for a local vpkg export or .vxt file.',
          },
          {
            source: 'docs/src/content/docs/commands/config.md',
            slug: 'commands/config',
            title: 'config',
            description: 'View or edit configuration.',
          },
          {
            source: 'docs/src/content/docs/commands/config-init.md',
            slug: 'commands/config-init',
            title: 'config init',
            description: 'Generate a default config file.',
          },
          {
            source: 'docs/src/content/docs/commands/completion.md',
            slug: 'commands/completion',
            title: 'completion',
            description: 'Generate shell completion scripts.',
          },
        ],
      },
    },
  },
  vxt: {
    product: 'vxt',
    label: 'vxt',
    sourceRoot: '../vxt',
    versions: {
      v0: {
        title: 'vxt v0',
        description: 'Versioned documentation for vxt v0, the Vandor templating library.',
        pages: [
          {
            source: 'README.md',
            slug: 'index',
            title: 'vxt',
            description: 'Overview and quick start for the vxt templating library.',
          },
          {
            source: 'docs/getting-started.md',
            slug: 'getting-started',
            title: 'Getting Started',
            description: 'First successful vxt document-mode flow for Go developers.',
          },
          {
            source: 'docs/document-mode.md',
            slug: 'document-mode',
            title: 'Document Mode',
            description: 'Primary authoring guide for document-mode .vxt templates.',
          },
          {
            source: 'docs/runtime-api.md',
            slug: 'runtime-api',
            title: 'Runtime API',
            description: 'Compile, validate, plan, write, and apply lifecycle reference.',
          },
          {
            source: 'docs/go-bindings.md',
            slug: 'go-bindings',
            title: 'Go Bindings',
            description: 'Typed Go binding workflow for vxt document-mode templates.',
          },
          {
            source: 'docs/concepts.md',
            slug: 'concepts',
            title: 'Concepts',
            description: 'Product boundaries and mental model for vxt.',
          },
        ],
      },
    },
  },
}
