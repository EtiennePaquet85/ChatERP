// systems/frontend/chaterp-web/src/pages/ContactPage.tsx

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/contact.css';

export function ContactPage() {
    return (
        <>
            <Header />
            <main className="contact-page">
                <section className="contact-section">
                    <h2>À propos</h2>
                    <p className="contact-paragraph">
                        Bonjour, je suis <strong>Étienne Paquet</strong>, développeur passionné et diplômé en Génie logiciel de l’ÉTS.
                    </p>
                    <p className="contact-paragraph">
                        J’ai conçu <strong>ChatERP</strong>, une plateforme ERP open-source inspirée d’Odoo, afin de démontrer une application rigoureuse des meilleures pratiques en développement logiciel (
                        <a
                            className="main-link"
                            href="https://www.computer.org/education/bodies-of-knowledge/software-engineering"
                            target="_blank"
                            rel="noreferrer"
                        >
                            SWEBOK V4.0
                        </a>
                        ).
                    </p>
                    <p className="contact-paragraph">
                        Ce projet met en valeur mes compétences dans les domaines suivants :
                    </p>
                    <ul className="contact-list">
                        <li>Architecture logicielle modulaire avec patrons de conception (MVC, Adaptateur)</li>
                        <li>Développement web multi-couches incluant React, ASP.NET Core et FastAPI</li>
                        <li>Mise en place de tests unitaires, d’intégration et de couverture automatisée</li>
                        <li>
                            Utilisation professionnelle de Git, GitHub, CI/CD et{' '}
                            <a
                                className="main-link"
                                href="https://github.com/EtiennePaquet85/ChatERP/tree/main/docs"
                                target="_blank"
                                rel="noreferrer"
                            >
                                documentation technique
                            </a>
                        </li>
                    </ul>
                    <p className="contact-paragraph">
                        Vous pouvez me contacter pour toute question, collaboration ou opportunité professionnelle.
                    </p>
                </section>

                <section className="contact-info">
                    <h2>Coordonnées</h2>
                    <p>
                        <strong>Courriel :</strong>{' '}
                        <a href="mailto:etienne.paquet@gmail.com">etienne.paquet@gmail.com</a><br />
                        <strong>Téléphone :</strong>{' '}
                        <a href="tel:+15147037293">+1-514-703-7293</a><br />
                        <strong>LinkedIn :</strong>{' '}
                        <a href="https://linkedin.com/in/etiennepaquet" target="_blank" rel="noreferrer">
                            linkedin.com/in/etiennepaquet
                        </a>
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}
