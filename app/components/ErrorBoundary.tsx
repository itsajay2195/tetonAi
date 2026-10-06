import { Component, ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: { componentStack?: string | null }) {
        console.error("Unhandled render error:", error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorFallback onReset={this.handleReset} />;
        }
        return this.props.children;
    }
}
