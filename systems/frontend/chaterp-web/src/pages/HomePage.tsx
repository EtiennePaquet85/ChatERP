// systems/frontend/chaterp-web/src/pages/HomePage.tsx

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Testimonials />
            </main>
            <Footer />
        </>
    );
}
