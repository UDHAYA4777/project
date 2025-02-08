import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong.
          </h1>
          <p>
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
