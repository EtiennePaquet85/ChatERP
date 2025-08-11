# systems/database/chaterp-persistence/scripts/create_employees_db.py

# 🚀 Script pour créer la base de données employees.db
#
# 💡 Ce script peut être exécuté tel quel.
#
# 📁 Emplacement de création : ChatERP/systems/database/chaterp-persistence/data/employees.db
#
# ▶️ Exemple d'exécution depuis le dossier chaterp-persistence :
# (.venv) C:\Code\ChatERP\systems\database\chaterp-persistence> python scripts/create_employees_db.py

import aiosqlite
import asyncio
import os

async def create_employees_db():
    base_dir = os.getcwd()
    data_dir = os.path.join(base_dir, "data")
    os.makedirs(data_dir, exist_ok=True)

    db_path = os.path.join(data_dir, "employees.db")

    async with aiosqlite.connect(db_path) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                department TEXT NOT NULL,
                manager TEXT NOT NULL,
                status TEXT NOT NULL,
                hireDate TEXT NOT NULL,
                photoUrl TEXT NOT NULL
            )
        """)
        await db.commit()

    print(f"Base de données créée ou mise à jour ici : {db_path}")

if __name__ == "__main__":
    asyncio.run(create_employees_db())
