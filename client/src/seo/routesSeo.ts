export type RouteSeo = {
  title: string
  description: string
}

const DEFAULT: RouteSeo = {
  title: 'ReactOne',
  description: 'ReactOne: guides, snippets, and workflows for modern React development.',
}

export function getRouteSeo(pathname: string): RouteSeo {
  const map: Record<string, RouteSeo> = {
    '/': {
      title: 'ReactOne — Build React faster',
      description: 'A curated hub for React guides, snippets, and production-ready patterns.',
    },
    '/login': {
      title: 'Login — ReactOne',
      description: 'Sign in to your ReactOne account.',
    },
    '/signup': {
      title: 'Sign up — ReactOne',
      description: 'Create your ReactOne account.',
    },
    '/profile': {
      title: 'Profile — ReactOne',
      description: 'View your profile details.',
    },
    '/stitch-guide': {
      title: 'Stitch Guide — ReactOne',
      description: 'AI-powered UI generation workflow using Google Stitch.',
    },
    '/google-auth': {
      title: 'Google Auth — ReactOne',
      description: 'OAuth 2.0 flow and production-ready integration notes.',
    },
    '/auth-flow-code': {
      title: 'Auth Flow Code — ReactOne',
      description: 'Production-ready authentication flow snippets and patterns.',
    },
    '/figma-mcp': {
      title: 'Figma MCP — ReactOne',
      description: 'Bridge Figma design and React code using MCP.',
    },
    '/axios-react': {
      title: 'Axios in React — ReactOne',
      description: 'HTTP client best practices and patterns for React apps.',
    },
    '/tanstack-query': {
      title: 'TanStack Query — ReactOne',
      description: 'Async state management patterns with TanStack Query.',
    },
    '/redux-toolkit': {
      title: 'Redux Toolkit — ReactOne',
      description: 'Global state management patterns with Redux Toolkit.',
    },
    '/zustand': {
      title: 'Zustand — ReactOne',
      description: 'Lightweight state management patterns with Zustand.',
    },
    '/react-query': {
      title: 'React Query — ReactOne',
      description: 'Server state, caching, and data fetching patterns.',
    },
    '/react-hook-form': {
      title: 'React Hook Form — ReactOne',
      description: 'Performant form handling patterns with React Hook Form.',
    },
    '/formik': {
      title: 'Formik — ReactOne',
      description: 'Robust form handling patterns with Formik.',
    },
    '/backend-integration': {
      title: 'Backend Integration — ReactOne',
      description: 'Node.js and Express integration patterns.',
    },
    '/mongo-vs-postgres': {
      title: 'MongoDB vs PostgreSQL — ReactOne',
      description: 'A comprehensive comparison between Document and Relational databases.',
    },
    '/axios-post-guide': {
      title: 'Axios POST Guide — ReactOne',
      description: 'Comprehensive guide to Axios POST requests, including interceptors and advanced patterns.',
    },

  }

  return map[pathname] ?? DEFAULT
}

