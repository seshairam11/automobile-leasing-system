import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <View><Text>Something went wrong</Text></View>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
