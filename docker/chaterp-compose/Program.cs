// ChatERP/docker/chaterp-compose/Program.cs

using System.Diagnostics;

class Program
{
    static void Main(string[] args)
    {
        // Forcer la console en UTF-8 pour éviter les erreurs d'encodage (ex. emojis)
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        Console.WriteLine("Lancement de chaterp-compose...\n");

        Console.WriteLine("Étape 1/4 : Exécution des tests unitaires et d'intégration\n");

        Console.WriteLine("🔹 Tests backend (.NET)...\n");
        if(!RunShellCommand("dotnet test", @"systems\backend\chaterp-server-tests"))
        {
            Console.WriteLine("❌ Échec des tests backend.\n");
            return;
        }

        Console.WriteLine("🔹 Tests database (Python)...\n");
        if(!RunShellCommand(".venv\\Scripts\\python.exe -m pytest", @"systems\database\chaterp-persistence-tests"))
        {
            Console.WriteLine("❌ Échec des tests database.\n");
            return;
        }

        Console.WriteLine("🔹 Tests frontend (React/Vitest)...\n");
        if(!RunShellCommand("npm run test", @"systems\frontend\chaterp-web-tests"))
        {
            Console.WriteLine("❌ Échec des tests frontend.\n");
            return;
        }

        Console.WriteLine("✅ Étape 1/4 terminée : tous les tests ont été exécutés avec succès.\n");

        Console.WriteLine("Étape 2/4 : Construction des images Docker\n");
        if(!RunDockerCommand("docker compose build", "docker"))
        {
            Console.WriteLine("❌ Construction des images échouée, arrêt.\n");
            return;
        }
        Console.WriteLine("✅ Étape 2/4 terminée : images construites avec succès.\n");

        Console.WriteLine("Étape 3/4 : Poussée des images vers le registre Docker\n");
        if(!RunDockerCommand("docker compose push", "docker"))
        {
            Console.WriteLine("❌ Poussée des images échouée, arrêt.\n");
            return;
        }
        Console.WriteLine("✅ Étape 3/4 terminée : images poussées.\n");

        Console.WriteLine("Étape 4/4 : Démarrage des services avec Docker Compose\n");
        if(!RunDockerCommand("docker compose up -d", "docker"))
        {
            Console.WriteLine("❌ Démarrage des services échoué, arrêt.\n");
            return;
        }
        Console.WriteLine("✅ Étape 4/4 terminée : services démarrés.\n");

        Console.WriteLine("🎉 Déploiement terminé avec succès !\n");
        Console.WriteLine("Appuyez sur une touche pour quitter...\n");
        Console.ReadKey();
    }

    static bool RunDockerCommand(string command, string relativePath)
    {
        Console.WriteLine("— Début de la commande —\n");
        Console.WriteLine($"➡️  Commande docker exécutée : {command}\n");

        // Répertoire de travail contenant le fichier docker-compose.yml (dossier ChatERP/docker)
        string workingDir = GetWorkingDirectory(relativePath);
        Console.WriteLine($"📁 Répertoire d'exécution : {workingDir}\n");

        var processInfo = new ProcessStartInfo("cmd.exe", $"/c {command}")
        {
            WorkingDirectory = workingDir,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = Process.Start(processInfo);
        if(process == null)
        {
            Console.WriteLine($"❌ Erreur : impossible de démarrer le processus pour la commande : {command}\n");
            return false;
        }

        // Affichage en temps réel des sorties standard et erreur
        process.OutputDataReceived += (sender, e) => { if(e.Data != null) Console.WriteLine(e.Data); };
        process.ErrorDataReceived += (sender, e) => { if(e.Data != null) Console.Error.WriteLine(e.Data); };

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        // Timeout de 10 minutes
        if(!process.WaitForExit(10 * 60 * 1000))
        {
            Console.WriteLine("❌ Timeout : la commande a pris trop de temps.\n");
            process.Kill();
            return false;
        }

        Console.WriteLine("— Fin de la commande —\n");

        return process.ExitCode == 0;
    }

    static bool RunShellCommand(string command, string relativePath)
    {
        Console.WriteLine("— Début de la commande —\n");
        Console.WriteLine($"➡️  Commande shell exécutée : {command}\n");

        // Répertoire de travail contenant les test à exécuter
        string workingDir = GetWorkingDirectory(relativePath);
        Console.WriteLine($"📁 Répertoire d'exécution : {workingDir}\n");

        var processInfo = new ProcessStartInfo("cmd.exe", $"/c {command}")
        {
            WorkingDirectory = workingDir,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = Process.Start(processInfo);
        if(process == null)
        {
            Console.WriteLine($"❌ Erreur : impossible de démarrer le processus pour la commande : {command}\n");
            return false;
        }

        process.OutputDataReceived += (sender, e) => { if(e.Data != null) Console.WriteLine(e.Data); };
        process.ErrorDataReceived += (sender, e) => { if(e.Data != null) Console.Error.WriteLine(e.Data); };

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        if(!process.WaitForExit(10 * 60 * 1000))
        {
            Console.WriteLine("❌ Timeout : la commande a pris trop de temps.\n");
            process.Kill();
            return false;
        }

        Console.WriteLine("— Fin de la commande —\n");

        return process.ExitCode == 0;
    }

    static string GetWorkingDirectory(string relativePath)
    {
        // Point de départ : dossier du binaire (.exe ou .dll)
        string? currentPath = AppContext.BaseDirectory;

        // Recherche de la racine du projet, soit le chemin qui dossier contenant ChatERP.sln
        while(currentPath != null && !File.Exists(Path.Combine(currentPath, "ChatERP.sln")))
        {
            currentPath = Directory.GetParent(currentPath)?.FullName;
        }

        if(currentPath == null)
        {
            throw new Exception("❌ Impossible de localiser la racine du projet (ChatERP.sln introuvable).");
        }

        // Combine la racine du projet avec le chemin relatif demandé
        return Path.GetFullPath(Path.Combine(currentPath, relativePath));
    }
}
