// systems/backend/chaterp-server/src/Services/EmployeeService.cs

using src.Clients;
using src.DTOs;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;

namespace src.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeApiClient _employeeClient;

        public EmployeeService(IEmployeeApiClient employeeClient)
        {
            _employeeClient = employeeClient;
        }

        /* 🔎 Validation des données */

        // Vérifie si une adresse courriel est syntaxiquement valide
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // Vérifie si une chaîne représente une date valide (format flexible ISO/UTC/etc.)
        private bool IsValidDate(string date)
        {
            return !string.IsNullOrEmpty(date) && DateTime.TryParse(date, out _);
        }

        // Valide les données de création ou de mise à jour d’un employé
        private string[] ValidateEmployeeData(EmployeeData employee)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(employee.Name) || employee.Name.Length < 2)
                errors.Add("Le nom doit contenir au moins 2 caractères.");

            if (string.IsNullOrWhiteSpace(employee.Role))
                errors.Add("Le rôle est requis.");

            if (string.IsNullOrWhiteSpace(employee.Email) || !IsValidEmail(employee.Email))
                errors.Add("Un courriel valide est requis.");

            if (string.IsNullOrWhiteSpace(employee.Phone) || employee.Phone.Length < 7)
                errors.Add("Le numéro de téléphone est requis et doit contenir au moins 7 caractères.");

            if (string.IsNullOrWhiteSpace(employee.Address) || employee.Address.Length < 5)
                errors.Add("L'adresse est requise et doit contenir au moins 5 caractères.");

            if (string.IsNullOrWhiteSpace(employee.Department))
                errors.Add("Le département est requis.");

            if (string.IsNullOrWhiteSpace(employee.Manager))
                errors.Add("Le gestionnaire est requis.");

            if (string.IsNullOrWhiteSpace(employee.Status))
                errors.Add("Le statut est requis.");

            if (string.IsNullOrWhiteSpace(employee.HireDate) || !IsValidDate(employee.HireDate))
                errors.Add("La date d'embauche est invalide ou manquante.");

            return errors.ToArray();
        }

        // Valide l’identifiant d’un employé (pour UC02, UC03, UC04)
        private string[] ValidateEmployeeId(int id)
        {
            return id <= 0 ? new[] { "L'ID doit être un entier positif." } : Array.Empty<string>();
        }

        /* 🚀 Opérations métier */

        // Créer un employé (UC01a)
        public async Task<(bool isSuccess, int? id, string[] errors)> CreateEmployeeAsync(EmployeeData employee)
        {
            var errors = ValidateEmployeeData(employee);
            if (errors.Length > 0)
                return (false, null, errors);

            try
            {
                int id = await _employeeClient.CreateEmployeeAsync(employee);
                return (true, id, Array.Empty<string>());
            }
            catch (Exception ex)
            {
                return (false, null, new[] { ex.Message });
            }
        }

        // Téléverser une photo d’employé (UC01b)
        public async Task<(bool isSuccess, string? storageUrl, string[] errors)> UploadEmployeePhotoAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return (false, null, new[] { "Aucun fichier reçu ou fichier vide." });

            try
            {
                var storageUrl = await _employeeClient.UploadEmployeePhotoAsync(file);
                return (true, storageUrl, Array.Empty<string>());
            }
            catch (Exception ex)
            {
                return (false, null, new[] { ex.Message });
            }
        }

        // Consulter tous les employés (UC02a)
        public async Task<List<EmployeeWithId>> GetAllEmployeesAsync()
        {
            return await _employeeClient.GetAllEmployeesAsync();
        }

        // Consulter un employé par ID (UC02b)
        public async Task<EmployeeWithId?> GetEmployeeByIdAsync(int id)
        {
            var errors = ValidateEmployeeId(id);
            if (errors.Length > 0)
                return null;

            return await _employeeClient.GetEmployeeByIdAsync(id);
        }

        // Mettre à jour un employé (UC03)
        public async Task<(bool isSuccess, string[] errors)> UpdateEmployeeAsync(int id, EmployeeData updatedEmployee)
        {
            var errors = new List<string>();
            errors.AddRange(ValidateEmployeeId(id));
            errors.AddRange(ValidateEmployeeData(updatedEmployee));

            if (errors.Count > 0)
                return (false, errors.ToArray());

            try
            {
                bool isSuccess = await _employeeClient.UpdateEmployeeAsync(id, updatedEmployee);
                return isSuccess
                    ? (true, Array.Empty<string>())
                    : (false, new[] { "Erreur inconnue lors de la mise à jour." });
            }
            catch (Exception ex)
            {
                return (false, new[] { ex.Message });
            }
        }

        // Supprimer un employé (UC04)
        public async Task<(bool isSuccess, string[] errors)> DeleteEmployeeAsync(int id)
        {
            var errors = ValidateEmployeeId(id);
            if (errors.Length > 0)
                return (false, errors);

            try
            {
                bool isSuccess = await _employeeClient.DeleteEmployeeAsync(id);
                return isSuccess
                    ? (true, Array.Empty<string>())
                    : (false, new[] { "Erreur inconnue lors de la suppression." });
            }
            catch (Exception ex)
            {
                return (false, new[] { ex.Message });
            }
        }
    }
}
