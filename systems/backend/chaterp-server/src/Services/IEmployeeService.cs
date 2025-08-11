// systems/backend/chaterp-server/src/Services/IEmployeeService.cs

using Microsoft.AspNetCore.Http;
using src.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace src.Services
{
    public interface IEmployeeService
    {
        Task<(bool isSuccess, int? id, string[] errors)> CreateEmployeeAsync(EmployeeData employee);
        Task<(bool isSuccess, string? storageUrl, string[] errors)> UploadEmployeePhotoAsync(IFormFile file);
        Task<List<EmployeeWithId>> GetAllEmployeesAsync();
        Task<EmployeeWithId?> GetEmployeeByIdAsync(int id);
        Task<(bool isSuccess, string[] errors)> UpdateEmployeeAsync(int id, EmployeeData updatedEmployee);
        Task<(bool isSuccess, string[] errors)> DeleteEmployeeAsync(int id);
    }
}
