// systems/backend/chaterp-server-tests/tools/test-coverage/Program.cs

using System;
using System.Diagnostics;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // 🔒 Dossier de tests Backend (chaterp-server-tests)
        string currentDir = Directory.GetCurrentDirectory();

        if (currentDir.Contains(@"\.nuget\packages", StringComparison.OrdinalIgnoreCase))
        {
            Console.Error.WriteLine("❌ Cet outil ne doit pas être exécuté depuis le cache NuGet global.");
            Console.Error.WriteLine("💡 Utilise la version locale via 'dotnet tool run test-coverage' depuis chaterp-server-tests.");
            Environment.Exit(1);
        }

        string testProject = Path.Combine(currentDir, "chaterp-server-tests.csproj");
        string reportScript = Path.Combine(currentDir, "scripts", "generate-coverage-report.ps1");

        if (!File.Exists(testProject))
        {
            Console.Error.WriteLine($"❌ Projet introuvable : {testProject}");
            Environment.Exit(1);
        }

        if (!File.Exists(reportScript))
        {
            Console.Error.WriteLine($"❌ Script introuvable : {reportScript}");
            Environment.Exit(1);
        }

        string testResultsDir = Path.Combine(currentDir, "TestResults");

        // 🧪 Étape 1 : Exécution des tests avec couverture
        var testProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "dotnet",
                Arguments = $"test \"{testProject}\" --collect:\"XPlat Code Coverage\" --results-directory \"{testResultsDir}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                WorkingDirectory = currentDir
            }
        };

        testProcess.OutputDataReceived += (s, e) => { if (e.Data != null) Console.WriteLine(e.Data); };
        testProcess.ErrorDataReceived += (s, e) => { if (e.Data != null) Console.Error.WriteLine(e.Data); };

        testProcess.Start();
        testProcess.BeginOutputReadLine();
        testProcess.BeginErrorReadLine();
        testProcess.WaitForExit();

        if (testProcess.ExitCode != 0)
        {
            Console.Error.WriteLine("❌ Les tests ont échoué.");
            Environment.Exit(testProcess.ExitCode);
        }

        // 📊 Étape 2 : Génération du rapport PowerShell
        Console.WriteLine("\n📊 Génération du rapport de couverture.");

        var psProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "powershell",
                Arguments = $"-ExecutionPolicy Bypass -File \"{reportScript}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                WorkingDirectory = currentDir
            }
        };

        psProcess.OutputDataReceived += (s, e) => { if (e.Data != null) Console.WriteLine(e.Data); };
        psProcess.ErrorDataReceived += (s, e) => { if (e.Data != null) Console.Error.WriteLine(e.Data); };

        psProcess.Start();
        psProcess.BeginOutputReadLine();
        psProcess.BeginErrorReadLine();
        psProcess.WaitForExit();

        if (psProcess.ExitCode != 0)
        {
            Console.Error.WriteLine("❌ La génération du rapport a échoué.");
            Environment.Exit(psProcess.ExitCode);
        }

        Console.WriteLine("✅ Rapport de couverture généré avec succès.");
    }
}
