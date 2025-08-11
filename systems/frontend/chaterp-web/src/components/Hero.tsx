// systems/frontend/chaterp-web/src/components/Hero.tsx

import { useNavigate } from 'react-router-dom';

export function Hero() {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/trial');
    };

    return (
        <section className="hero">
            <h1>Centralisez tous vos processus.</h1>
            <p>Une plateforme simple et intuitive!</p>
            <a href="/trial" className="button" onClick={handleClick}>
                Découvrir ChatERP
            </a>
        </section>
    );
}
