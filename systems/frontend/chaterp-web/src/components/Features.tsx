// systems/frontend/chaterp-web/src/components/Features.tsx

import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import "../styles/cards.css";

export function Features() {
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const features = [
        {
            title: "Employés",
            description: "Gérez vos employés efficacement.",
            icon: "https://img.icons8.com/ios-filled/50/user-group-man-man.png",
            link: "/employees",
            color: "#D8EAFE"
        },
        {
            title: "Clients",
            description: "Centralisez vos informations clients.",
            icon: "https://img.icons8.com/ios-filled/50/businessman.png",
            link: "/clients",
            color: "#DAF5DC"
        },
        {
            title: "Produits",
            description: "Organisez et suivez vos produits facilement.",
            icon: "https://img.icons8.com/ios-filled/50/open-box.png",
            link: "/products",
            color: "#FFF4CC"
        }
    ];

    const futureFeatures = Array(3).fill({
        title: "Fonctionnalité future",
        description: "Découvrez cette fonctionnalité prochainement.",
        icon: "https://img.icons8.com/ios/50/clock--v1.png",
        color: "#F0E6F6"
    });

    function handleComingSoon(title: string) {
        setActiveMessage(title);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setActiveMessage(null);
            timeoutRef.current = null;
        }, 6000);
    }

    return (
        <>
            <section className="features">
                {features.map((f) => {
                    const isComingSoon = f.link === "/clients" || f.link === "/products";
                    const showMessage = activeMessage === f.title;

                    if (isComingSoon) {
                        return (
                            <button
                                key={f.title}
                                type="button"
                                className="feature-card"
                                style={{
                                    background: f.color,
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => handleComingSoon(f.title)}
                            >
                                <img src={f.icon} alt={f.title} className="feature-icon" />
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                                {showMessage && (
                                    <div className="feature-message">
                                        La fonctionnalité "{f.title}" arrive bientôt !
                                    </div>
                                )}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={f.title}
                            to={f.link}
                            className="feature-card"
                            style={{ background: f.color }}
                        >
                            <img src={f.icon} alt={f.title} className="feature-icon" />
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </Link>
                    );
                })}
            </section>

            <section className="features" style={{ marginTop: "2rem" }}>
                {futureFeatures.map((f, idx) => (
                    <div
                        key={idx}
                        className="feature-card"
                        style={{
                            background: f.color,
                            border: "2px dashed var(--primary)",
                            color: "var(--primary)",
                            cursor: "default"
                        }}
                    >
                        <img src={f.icon} alt={f.title} className="feature-icon" style={{ filter: "none", opacity: 1 }} />
                        <h3>{f.title}</h3>
                        <p><em>{f.description}</em></p>
                    </div>
                ))}
            </section>
        </>
    );
}
