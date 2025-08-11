# systems/backend/chaterp-server/Dockerfile

# Étape 1 : Image de base pour l'exécution
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Étape 2 : Image de build (sans jamais utiliser /src)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /build

# Copier uniquement le fichier .csproj pour restaurer les dépendances
COPY chaterp-server.csproj ./
RUN dotnet restore

# Copier le reste du code source
COPY . ./
RUN dotnet publish -c Release -o /out

# Étape 3 : Image finale d'exécution
FROM base AS final
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "chaterp-server.dll"]
