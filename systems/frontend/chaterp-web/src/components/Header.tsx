// systems/frontend/chaterp-web/src/components/Header.tsx
export function Header() {
    return (
        <header className="header">
            <div className="header-title">
                <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="title-part1">Chat</span>
                    <span className="title-part2">ERP</span>
                </a>
            </div>
            <nav className="header-nav">
                <a href="/contact" className="button">Contactez-nous</a>
            </nav>
        </header>
    );
}
