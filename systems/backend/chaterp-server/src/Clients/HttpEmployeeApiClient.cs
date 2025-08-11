// systems/backend/chaterp-server/src/Clients/HttpEmployeeApiClient.cs

using src.DTOs;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace src.Clients
{
    public class HttpEmployeeApiClient : IEmployeeApiClient
    {
        private readonly HttpClient _httpClient;

        public HttpEmployeeApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // Créer un nouvel employé (UC01a)
        public async Task<int> CreateEmployeeAsync(EmployeeData employee)
        {
            var response = await _httpClient.PostAsJsonAsync("/api/employees", employee);

            if (!response.IsSuccessStatusCode)
                throw new Exception(await ExtractErrorMessageAsync(response));

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            if (doc.RootElement.TryGetProperty("id", out var idProp))
                return idProp.GetInt32();

            throw new Exception("L'identifiant de l'employé n'a pas été retourné.");
        }

        // Téléverser une photo d’employé (UC01b)
        public async Task<string> UploadEmployeePhotoAsync(IFormFile file)
        {
            using var content = new MultipartFormDataContent();
            await using var stream = file.OpenReadStream();
            var streamContent = new StreamContent(stream);
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

            content.Add(streamContent, "file", file.FileName);

            var response = await _httpClient.PostAsync("/api/employees/photo-upload", content);

            if (!response.IsSuccessStatusCode)
                throw new Exception(await ExtractErrorMessageAsync(response));

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("storageUrl", out var urlProp))
                return urlProp.GetString() ?? throw new Exception("StorageUrl non retournée.");
            else
                throw new Exception("Format de réponse inattendu.");
        }

        // Récupérer tous les employés (UC02a)
        public async Task<List<EmployeeWithId>> GetAllEmployeesAsync()
        {
            var response = await _httpClient.GetAsync("/api/employees");
            if (!response.IsSuccessStatusCode)
                return new List<EmployeeWithId>();

            var employees = await response.Content.ReadFromJsonAsync<List<EmployeeWithId>>();
            return employees ?? new List<EmployeeWithId>();
        }

        // Récupérer un employé par ID (UC02b)
        public async Task<EmployeeWithId?> GetEmployeeByIdAsync(int id)
        {
            var response = await _httpClient.GetAsync($"/api/employees/{id}");
            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadFromJsonAsync<EmployeeWithId>();
        }

        // Mettre à jour un employé (UC03)
        public async Task<bool> UpdateEmployeeAsync(int id, EmployeeData employee)
        {
            var response = await _httpClient.PutAsJsonAsync($"/api/employees/{id}", employee);

            if (response.IsSuccessStatusCode)
                return true;

            throw new Exception(await ExtractErrorMessageAsync(response));
        }

        // Supprimer un employé (UC04)
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"/api/employees/{id}");

            if (response.IsSuccessStatusCode)
                return true;

            throw new Exception(await ExtractErrorMessageAsync(response));
        }

        private async Task<string> ExtractErrorMessageAsync(HttpResponseMessage response)
        {
            try
            {
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                if (doc.RootElement.TryGetProperty("detail", out var detail))
                {
                    return detail.GetString() ?? $"HTTP {response.StatusCode}";
                }
            }
            catch
            {
                // ignore parse errors
            }

            return $"HTTP {response.StatusCode}";
        }
    }
}
