# systems/database/chaterp-persistence-tests/tests/conftest.py

import sys
import os
import io

# Forcer la sortie standard en UTF-8 pour éviter UnicodeEncodeError sur la console Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Remonter un dossier vers systems/database/chaterp-persistence/src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'chaterp-persistence')))

os.environ.setdefault("DATABASE_API_URL", "http://localhost:8000")
