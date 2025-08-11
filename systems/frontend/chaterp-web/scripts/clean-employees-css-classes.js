// systems/frontend/chaterp-web/scripts/clean-employees-css-classes.js

/**
 * 🧼 Script Node.js – Nettoyage des classes CSS inutilisées dans le module Frontend (chaterp-web)
 *
 * 🧭 Objectif :
 *   Supprimer automatiquement les classes CSS définies mais non utilisées dans chaterp-web, en analysant statiquement le code source.
 *
 * 📁 Dossier contenant le CSS à nettoyer :
 *   - systems/frontend/chaterp-web/src/styles
 * 
 * 📂 Dossier contenant les fichiers à analyser :
 *   - systems/frontend/chaterp-web/src
 *
 * ⚙️ Comportement :
 * - Extrait toutes les classes définies dans le fichier `employees.css`
 * - Analyse récursivement tous les fichiers sources React/JS/HTML pour identifier les classes utilisées
 * - Supprime automatiquement les blocs CSS correspondant aux classes non référencées
 * - Réécrit le fichier `employees.css` nettoyé
 *
 * ✅ Résultat :
 * - Affiche :
 *   - Le nombre total de classes définies
 *   - Le nombre de classes réellement utilisées
 *   - Le nombre de classes supprimées
 * - Écrit :
 *   - Le fichier CSS actuel `employees.css` mis à jour (overwrite)
 *
 * ▶️ Exemple d’exécution depuis le dossier chaterp-web :
 * PS C:\Code\ChatERP\systems\backend\chaterp-web> powershell.exe -ExecutionPolicy Bypass -File ./scripts/clean-employees-css-classes.js
 *
 * 🔧 Dépendances :
 * - Exécuté avec Node.js (aucun package externe requis)
 * - Utilise uniquement `fs`, `path`, `url` (core Node modules)
 *
 * 📝 Écrit en UTF-8 – Aucune dépendance à un framework externe
 */


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSS_PATH = path.resolve(__dirname, '../src/styles/employees.css');
const SRC_DIR = path.resolve(__dirname, '../src');
const VALID_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.html'];

// 📌 Extraire toutes les classes CSS définies
function extractCssClasses(css) {
    const regex = /\.(?!\d)([\w-]+)[^{]*\{/g;
    const classes = new Set();
    let match;
    while ((match = regex.exec(css))) {
        classes.add(match[1]);
    }
    return classes;
}

// 🔍 Scanner tous les fichiers du frontend pour détecter les classes utilisées
function findUsedClasses(dir) {
    const used = new Set();

    function scan(filePath) {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            fs.readdirSync(filePath).forEach(f => scan(path.join(filePath, f)));
        } else if (VALID_EXTENSIONS.includes(path.extname(filePath))) {
            const content = fs.readFileSync(filePath, 'utf-8');
            for (const match of content.matchAll(/class(Name)?=["'`]([^"'`]+)["'`]/g)) {
                const classNames = match[2].split(/\s+/);
                classNames.forEach(cls => used.add(cls.trim()));
            }
        }
    }

    scan(dir);
    return used;
}

// ✂️ Supprimer tous les blocs CSS dont aucune classe n'est utilisée
function cleanCss(css, usedClasses) {
    return css.replace(/\/\*[\s\S]*?\*\/|[^{}]+\{[^{}]*\}/g, (block) => {
        const classMatches = [...block.matchAll(/\.(?!\d)([\w-]+)/g)];
        const keep = classMatches.some(m => usedClasses.has(m[1]));
        return keep ? block : '';
    });
}

// 🚀 Script principal
function run() {
    console.log('🔎 Analyse des classes CSS non utilisées...');
    const css = fs.readFileSync(CSS_PATH, 'utf-8');
    const definedClasses = extractCssClasses(css);
    const usedClasses = findUsedClasses(SRC_DIR);

    const unusedClasses = [...definedClasses].filter(c => !usedClasses.has(c));
    console.log(`🧵 ${definedClasses.size} classes définies`);
    console.log(`✅ ${usedClasses.size} classes utilisées`);
    console.log(`🧹 ${unusedClasses.length} classes supprimées`);

    const cleaned = cleanCss(css, usedClasses);
    fs.writeFileSync(CSS_PATH, cleaned, 'utf-8');
    console.log(`💾 Fichier CSS mis à jour : ${CSS_PATH}`);
}

run();
