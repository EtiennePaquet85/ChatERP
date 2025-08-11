// systems/backend/chaterp-server/src/DTOs/EmployeeDtos.cs
namespace src.DTOs
{
    /// <summary>
    /// Objet utilisé pour créer ou mettre à jour un employé (sans ID).
    /// </summary>
    public class EmployeeData
    {
        public required string Name { get; set; }
        public required string Role { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public required string Address { get; set; }
        public required string Department { get; set; }
        public required string Manager { get; set; }
        public required string Status { get; set; }
        public required string HireDate { get; set; }
        public required string PhotoUrl { get; set; }
    }

    /// <summary>
    /// Objet utilisé pour lire un employé (avec ID).
    /// </summary>
    public class EmployeeWithId : EmployeeData
    {
        public required int Id { get; set; }
    }
}
