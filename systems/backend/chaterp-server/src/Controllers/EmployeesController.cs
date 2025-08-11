// systems/backend/chaterp-server/src/Controllers/EmployeesController.cs

using Microsoft.AspNetCore.Mvc;
using src.DTOs;
using src.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace src.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // Créer un employé (UC01a)
        // POST api/employees
        [HttpPost]
        public async Task<IActionResult> CreateEmployeeAsync([FromBody] EmployeeData employee)
        {
            var (isSuccess, id, errors) = await _employeeService.CreateEmployeeAsync(employee);

            if (isSuccess)
                return Ok(new { message = "Employé créé avec succès.", id });

            return BadRequest(new { errors });
        }

        // Téléverser une photo d’employé (UC01b)
        // POST api/employees/photo-upload
        [HttpPost("photo-upload")]
        public async Task<IActionResult> UploadEmployeePhotoAsync(IFormFile file)
        {
            var (isSuccess, storageUrl, errors) = await _employeeService.UploadEmployeePhotoAsync(file);

            if (isSuccess)
                return Ok(new { storageUrl });

            return BadRequest(new { errors });
        }

        // Consulter tous les employés (UC02a)
        // GET api/employees
        [HttpGet]
        public async Task<ActionResult<List<EmployeeWithId>>> GetAllEmployeesAsync()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            return employees;
        }

        // Consulter un employé par ID (UC02b)
        // GET api/employees/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeWithId>> GetEmployeeByIdAsync(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
                return NotFound(new { message = "Employé introuvable." });

            return employee;
        }

        // Mettre à jour un employé (UC03)
        // PUT api/employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployeeAsync(int id, [FromBody] EmployeeData updatedEmployee)
        {
            var (isSuccess, errors) = await _employeeService.UpdateEmployeeAsync(id, updatedEmployee);

            if (isSuccess)
                return Ok(new { message = "Employé mis à jour avec succès." });

            return BadRequest(new { errors });
        }

        // Supprimer un employé (UC04)
        // DELETE api/employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeAsync(int id)
        {
            var (isSuccess, errors) = await _employeeService.DeleteEmployeeAsync(id);

            if (isSuccess)
                return Ok(new { message = "Employé supprimé avec succès." });

            return BadRequest(new { errors });
        }
    }
}
