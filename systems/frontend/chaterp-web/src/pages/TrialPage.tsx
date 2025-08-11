// systems/frontend/chaterp-web/src/pages/TrialPage.tsx
import { Header } from '../components/Header';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';

export function TrialPage() {
    return (
        <>
            <Header />
            <main>
                <section className="trial-hero">
                    <h1>Essayez ChatERP gratuitement</h1>
                    <p>Découvrez toutes les fonctionnalités pour centraliser vos processus.</p>
                </section>
                <Features />
            </main>
            <Footer />
        </>
    );
}
