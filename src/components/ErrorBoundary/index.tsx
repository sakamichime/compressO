import React from 'react'

interface Props {
  children?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: undefined, errorInfo: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Error stack:', error.stack)
    console.error('Component stack:', errorInfo.componentStack)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children } = this.props

    if (hasError) {
      const isDev = import.meta.env.DEV

      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-4">
          <h2 className="text-lg font-bold text-red-500">Oops, there is an error!</h2>
          {isDev && error && (
            <div className="w-full max-w-lg bg-red-50 dark:bg-red-900/20 p-4 rounded-lg overflow-auto max-h-60">
              <p className="text-sm font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap">
                {error.message}
              </p>
              {errorInfo && (
                <p className="text-xs font-mono text-red-500 dark:text-red-500 mt-2 whitespace-pre-wrap">
                  {errorInfo.componentStack}
                </p>
              )}
            </div>
          )}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={this.handleReset}
          >
            Try again?
          </button>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
