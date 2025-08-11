// systems/backend/chaterp-server/src/Clients/IEmployeeApiClient.cs

using src.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace src.Clients
{
    public interface IEmployeeApiClient
    {
        // Créer un nouvel employé (UC01a)
        Task<int> CreateEmployeeAsync(EmployeeData employee);

        // Téléverser une photo d’employé (UC01b)
        Task<string> UploadEmployeePhotoAsync(IFormFile file);

        // Récupérer la liste de tous les employés (UC02a)
        Task<List<EmployeeWithId>> GetAllEmployeesAsync();

        // Récupérer un employé par ID (UC02b)
        Task<EmployeeWithId?> GetEmployeeByIdAsync(int id);

        // Mettre à jour un employé (UC03)
        Task<bool> UpdateEmployeeAsync(int id, EmployeeData employee);

        // Supprimer un employé (UC04)
        Task<bool> DeleteEmployeeAsync(int id);
    }
}
