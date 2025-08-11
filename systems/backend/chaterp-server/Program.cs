// systems/backend/chaterp-server/Program.cs
﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using src.Clients;
using src.Services;
using System;
using System.IO;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

/******************** 🔧 Configuration des services ********************/

// Récupération des URLs frontend local et cloud depuis configuration
var frontendUrls = builder.Configuration.GetSection("FrontendApiUrls").Get<string[]>();

// Vérification que les URLs sont définies
if (frontendUrls == null || frontendUrls.Length == 0)
{
    throw new Exception("La liste FrontendApiUrls doit contenir au moins une URL !");
}

// Configuration CORS avec les URLs récupérées
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(frontendUrls)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Ajoute les services nécessaires pour la documentation de l'API (Swagger/OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "ChatERP Server API",
        Version = "v1",
        Description = "Documentation de l’API du backend ChatERP",
    });

    // Inclusion du fichier XML de documentation généré par le compilateur
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

// Récupérer l'URL de l'API Database depuis une variable d'environnement (ou utiliser localhost par défaut)
var databaseApiUrl = Environment.GetEnvironmentVariable("DATABASE_API_URL")
                    ?? builder.Configuration["DatabaseApiUrl"]
                    ?? throw new Exception("DatabaseApiUrl is not set");

Console.WriteLine($"👀 Database API URL used = {databaseApiUrl}");

builder.Services.AddHttpClient<IEmployeeApiClient, HttpEmployeeApiClient>(client =>
{
    client.BaseAddress = new Uri(databaseApiUrl);
});

// Enregistre le service métier unifié EmployeeService
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// Active le support des contrôleurs MVC/WebAPI
builder.Services.AddControllers();

/******************** 🌐 Configuration du serveur web ********************/

// Récupérer le port depuis env var ou configuration
var port = Environment.GetEnvironmentVariable("BACKEND_API_PORT")
          ?? builder.Configuration["BackendApiPort"]
          ?? throw new Exception("BACKEND_API_PORT or BackendApiPort is not set");

builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

/******************** 🚀 Configuration de la pipeline HTTP ********************/

var app = builder.Build();

// Endpoint pour injecter le script qui masque le menu
app.MapGet("/swagger-hide-menu.js", async context =>
{
    context.Response.ContentType = "application/javascript";
    await context.Response.WriteAsync(@"
        window.addEventListener('load', function() {
            var style = document.createElement('style');
            style.innerHTML = '.download-url-wrapper { display: none !important; }'; /* Masque le menu Select a definition */
            document.head.appendChild(style);
        });
    ");
});

// Active la documentation Swagger même en production (utile pour tests internes)
app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "ChatERP Server API v1");
    options.DocumentTitle = "ChatERP Server API – Swagger UI";
    options.InjectJavascript("/swagger-hide-menu.js");
});

// Redirige la racine "/" vers Swagger UI pour ouvrir directement la page Swagger
app.MapGet("/", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

// Redirection HTTP → HTTPS uniquement en environnement de développement
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// IMPORTANT: Active CORS avant UseAuthorization ou MapControllers
app.UseCors("AllowFrontend");

// Mappe les contrôleurs API
app.MapControllers();

app.Run();
