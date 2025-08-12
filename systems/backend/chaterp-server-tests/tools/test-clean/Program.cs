// systems/backend/chaterp-server-tests/tools/test-clean/Program.cs

using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        string currentDir = Directory.GetCurrentDirectory();

        if (currentDir.Contains(@"\.nuget\packages", StringComparison.OrdinalIgnoreCase))
        {
            Console.Error.WriteLine("\n❌ Cet outil ne doit pas être exécuté depuis le cache NuGet global.");
            Console.Error.WriteLine("\n💡 Utilise la version locale via 'dotnet tool run test-clean' depuis chaterp-server-tests.");
            Environment.Exit(1);
        }

        string cleanScript = Path.Combine(currentDir, "scripts", "clean-coverage-report.ps1");

        if (!File.Exists(cleanScript))
        {
            Console.Error.WriteLine($"\n❌ Script introuvable : {cleanScript}");
            Environment.Exit(1);
        }

        Console.WriteLine("\n🧹 Initialisation du nettoyage des anciens fichiers de couverture...");

        var psProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "powershell",
                Arguments = $"-ExecutionPolicy Bypass -File \"{cleanScript}\"",
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
            Console.Error.WriteLine("❌ Le nettoyage a échoué (erreur interne au script).");
            Environment.Exit(psProcess.ExitCode);
        }

        Console.WriteLine("✅ Tous les fichiers temporaires ont été correctement nettoyés.");
    }
}
