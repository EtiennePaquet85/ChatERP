# systems/database/chaterp-persistence/scripts/read_employees_db.py

# 🚀 Script pour lire et afficher les employés depuis la base employees.db
#
# 💡 Ce script peut être exécuté tel quel.
#
# 📁 Emplacement attendu de la base : ChatERP/systems/database/chaterp-persistence/data/employees.db
#
# ▶️ Exemple d'exécution depuis le dossier chaterp-persistence :
# (.venv) C:\Code\ChatERP\systems\database\chaterp-persistence> python scripts/read_employees_db.py

import aiosqlite
import asyncio
import os

async def read_employees():
    base_dir = os.getcwd()
    data_dir = os.path.join(base_dir, "data")
    db_path = os.path.join(data_dir, "employees.db")

    async with aiosqlite.connect(db_path) as db:
        async with db.execute("""
            SELECT
                id, name, role, email, phone, address, department,
                manager, status, hireDate, photoUrl
            FROM employees
        """) as cursor:
            rows = await cursor.fetchall()
            if not rows:
                print("Aucun employé trouvé dans la base.")
            else:
                for row in rows:
                    print(f"id={row[0]}, name={row[1]}, role={row[2]}, email={row[3]}, phone={row[4]}, "
                          f"address={row[5]}, department={row[6]}, manager={row[7]}, status={row[8]}, "
                          f"hireDate={row[9]}, photoUrl={row[10]}")

if __name__ == "__main__":
    asyncio.run(read_employees())
