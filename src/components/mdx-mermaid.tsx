import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type MermaidModule = typeof import('mermaid')

let mermaidModulePromise: Promise<MermaidModule> | undefined
let mermaidInitialized = false

function getMermaidModule() {
  mermaidModulePromise ??= import('mermaid')
  return mermaidModulePromise
}

function initializeMermaid(module: MermaidModule) {
  if (mermaidInitialized) {
    return module.default
  }

  module.default.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: {
      background: '#060708',
      primaryColor: '#101114',
      primaryTextColor: '#F4F4F5',
      primaryBorderColor: '#30343A',
      lineColor: '#71717A',
      secondaryColor: '#0B0C0E',
      secondaryTextColor: '#D4D4D8',
      secondaryBorderColor: '#262A30',
      tertiaryColor: '#060708',
      tertiaryTextColor: '#B6BAC3',
      tertiaryBorderColor: '#31343A',
      mainBkg: '#101114',
      nodeBorder: '#30343A',
      clusterBkg: '#0B0C0E',
      clusterBorder: '#262A30',
      edgeLabelBackground: '#060708',
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontSize: '16px',
      darkMode: true,
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: false,
      nodeSpacing: 48,
      rankSpacing: 72,
      diagramPadding: 24,
      padding: 24,
    },
  })

  mermaidInitialized = true
  return module.default
}

export function MermaidDiagram({
  chart,
  className,
}: {
  chart: string
  className?: string
}) {
  const [svg, setSvg] = useState<string>()
  const [error, setError] = useState<string>()
  const containerRef = useRef<HTMLDivElement>(null)
  const diagramId = useId().replaceAll(':', '')

  useEffect(() => {
    let cancelled = false

    async function renderDiagram() {
      try {
        const module = await getMermaidModule()
        const mermaid = initializeMermaid(module)
        await mermaid.parse(chart)

        const { svg: renderedSvg, bindFunctions } = await mermaid.render(
          `mermaid-${diagramId}`,
          chart,
        )

        if (cancelled) {
          return
        }

        setError(undefined)
        setSvg(renderedSvg)

        queueMicrotask(() => {
          if (!cancelled && bindFunctions && containerRef.current) {
            bindFunctions(containerRef.current)
          }
        })
      } catch (cause) {
        if (cancelled) {
          return
        }

        setSvg(undefined)
        setError(cause instanceof Error ? cause.message : 'Unable to render Mermaid diagram.')
      }
    }

    void renderDiagram()

    return () => {
      cancelled = true
    }
  }, [chart, diagramId])

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/30 p-4 sm:p-5">
        {svg ? (
          <div
            ref={containerRef}
            className="flex justify-center [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <pre className="overflow-x-auto rounded-[1rem] border border-border/70 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
            <code>{chart}</code>
          </pre>
        )}
      </div>
      {error ? (
        <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
          Mermaid render failed: {error}
        </figcaption>
      ) : null}
    </figure>
  )
}

function isMermaidLanguage(className?: string) {
  return className?.split(/\s+/).includes('language-mermaid') ?? false
}

function collectNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((child) => collectNodeText(child)).join('')
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const props =
      node.props && typeof node.props === 'object'
        ? (node.props as Record<string, unknown>)
        : undefined

    return props ? collectNodeText((props.children as ReactNode) ?? '') : ''
  }

  return ''
}

function collectClassNames(node: ReactNode): string[] {
  if (Array.isArray(node)) {
    return node.flatMap((child) => collectClassNames(child))
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const props =
      node.props && typeof node.props === 'object'
        ? (node.props as Record<string, unknown>)
        : undefined

    if (!props) {
      return []
    }

    const ownClassName =
      typeof props.className === 'string' ? props.className.split(/\s+/) : []

    return [
      ...ownClassName,
      ...collectClassNames((props.children as ReactNode) ?? []),
    ]
  }

  return []
}

function looksLikeMermaidChart(value: string) {
  const normalized = value.trimStart()

  return /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|requirementDiagram|block-beta|packet-beta|kanban|architecture)\b/m.test(
    normalized,
  )
}

export function MermaidPre(
  props: HTMLAttributes<HTMLPreElement> & {
    children?: React.ReactNode
    fallback: (props: HTMLAttributes<HTMLPreElement>) => React.ReactNode
  },
) {
  const { children, fallback, ...rest } = props
  const classNames = collectClassNames(children)
  const chart = collectNodeText(children).trim()

  if (
    chart &&
    (classNames.some((className) => isMermaidLanguage(className)) ||
      looksLikeMermaidChart(chart))
  ) {
    return <MermaidDiagram chart={chart} className="my-8" />
  }

  return fallback({ ...rest, children })
}
