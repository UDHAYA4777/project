import React, { Component } from "react";
import ReactDOM from "react-dom";

// ErrorBoundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Unexpected Application Error!</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Component
const App = () => {
  const data = undefined; // Simulating an undefined value

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Application</h1>
      <p>Data length: {data?.length || "No data available"}</p>
    </div>
  );
};

// Rendering the App inside ErrorBoundary
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
