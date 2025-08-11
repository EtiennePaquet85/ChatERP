// systems/frontend/chaterp-web/src/components/Spinner.tsx

import "../styles/spinner.css";

type SpinnerProps = {
    message: string;
    variant?: "fullscreen" | "overlay";
    className?: string;
};

export function Spinner({ message, variant = "fullscreen", className = "" }: SpinnerProps) {
    const containerClass =
        variant === "overlay" ? "spinner-overlay" : "spinner-fullscreen";

    return (
        <div className={`${containerClass} ${className}`}>
            <div className="spinner" />
            <p className="spinner-message">{message}</p>
        </div>
    );
}
