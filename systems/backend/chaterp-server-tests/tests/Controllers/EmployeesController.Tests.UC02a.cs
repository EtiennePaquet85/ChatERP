// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC02a.cs

using Microsoft.AspNetCore.Mvc;
using Moq;
using src.Controllers;
using src.DTOs;
using src.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace tests.Controllers
{
    public class EmployeesControllerTestsUC02a
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC02a.cs";

        public EmployeesControllerTestsUC02a()
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            _mockService = new Mock<IEmployeeService>();
            _controller = new EmployeesController(_mockService.Object);
        }

        private void PrintTestStart(string testName)
        {
            Console.WriteLine("====================================================================");
            Console.WriteLine($"Début test - {testName}");
            Console.WriteLine("--------------------------------------------------------------------");
            Console.WriteLine($"📄  File : {FILENAME}");
        }

        private void PrintTestEnd(string testName)
        {
            Console.WriteLine("--------------------------------------------------------------------");
            Console.WriteLine($"Fin test - {testName}");
            Console.WriteLine("====================================================================");
        }

        [Fact(DisplayName = "Succès de la consultation de tous les employés")]
        public async Task GetAllEmployeesAsync_ReturnsEmployeeList_WhenSuccessful()
        {
            string testName = "Succès de la consultation de tous les employés";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : GetAllEmployeesAsync_ReturnsEmployeeList_WhenSuccessful");

            var mockEmployees = new List<EmployeeWithId>
            {
                new()
                {
                    Id = 1,
                    Name = "Alice Martin",
                    Role = "Développeuse",
                    Email = "alice@example.com",
                    Phone = "514-123-4567",
                    Address = "123 rue Principale, Montréal",
                    Department = "TI",
                    Manager = "Jean Dupuis",
                    Status = "Actif",
                    HireDate = "2023-01-15",
                    PhotoUrl = "https://example.com/photos/alice.jpg"
                },
                new()
                {
                    Id = 2,
                    Name = "Bob",
                    Role = "Designer",
                    Email = "bob@example.com",
                    Phone = "514-987-6543",
                    Address = "456 avenue des Arts, Montréal",
                    Department = "Marketing",
                    Manager = "Julie Tremblay",
                    Status = "Actif",
                    HireDate = "2022-08-01",
                    PhotoUrl = "https://example.com/photos/bob.jpg"
                }
            };

            _mockService
                .Setup(s => s.GetAllEmployeesAsync())
                .ReturnsAsync(mockEmployees);

            var result = await _controller.GetAllEmployeesAsync();
            var okResult = Assert.IsType<ActionResult<List<EmployeeWithId>>>(result);

            var expectedEmployees = mockEmployees;
            var returnedEmployees = Assert.IsType<List<EmployeeWithId>>(okResult.Value);

            Console.WriteLine($"Résultat attendu : {expectedEmployees.Count} employés");
            Console.WriteLine($"Résultat reçu    : {returnedEmployees.Count} employés");

            for(int i = 0; i < expectedEmployees.Count; i++)
            {
                Console.WriteLine($"  - Employé [{expectedEmployees[i].Id}] : ");
                Console.WriteLine($"             Nom attendu : {expectedEmployees[i].Name}");
                Console.WriteLine($"             Nom reçu : {returnedEmployees[i].Name}");
                Console.WriteLine($"             Rôle attendu : {expectedEmployees[i].Role}");
                Console.WriteLine($"             Rôle reçu : {returnedEmployees[i].Role}");
                Console.WriteLine($"             Email attendu: {expectedEmployees[i].Department}");
                Console.WriteLine($"             Email reçu : {returnedEmployees[i].Department}");
            }

            bool testPassed = returnedEmployees.Count == expectedEmployees.Count &&
                              !expectedEmployees.Where((e, i) =>
                                  e.Id != returnedEmployees[i].Id ||
                                  e.Name != returnedEmployees[i].Name ||
                                  e.Role != returnedEmployees[i].Role ||
                                  e.Email != returnedEmployees[i].Email ||
                                  e.Phone != returnedEmployees[i].Phone ||
                                  e.Address != returnedEmployees[i].Address ||
                                  e.Department != returnedEmployees[i].Department ||
                                  e.Manager != returnedEmployees[i].Manager ||
                                  e.Status != returnedEmployees[i].Status ||
                                  e.HireDate != returnedEmployees[i].HireDate ||
                                  e.PhotoUrl != returnedEmployees[i].PhotoUrl
                              ).Any();

            Console.WriteLine($"État du test     : {(testPassed ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Liste vide d’employés retournée avec succès")]
        public async Task GetAllEmployeesAsync_ReturnsEmptyList_WhenNoEmployeesExist()
        {
            string testName = "Liste vide d’employés retournée avec succès";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : GetAllEmployeesAsync_ReturnsEmptyList_WhenNoEmployeesExist");

            var mockEmployees = new List<EmployeeWithId>();

            _mockService
                .Setup(s => s.GetAllEmployeesAsync())
                .ReturnsAsync(mockEmployees);

            var result = await _controller.GetAllEmployeesAsync();
            var okResult = Assert.IsType<ActionResult<List<EmployeeWithId>>>(result);

            var expectedEmployees = mockEmployees;
            var returnedEmployees = Assert.IsType<List<EmployeeWithId>>(okResult.Value);

            Console.WriteLine($"Résultat attendu : {expectedEmployees.Count} employé(s)");
            Console.WriteLine($"Résultat reçu    : {returnedEmployees.Count} employé(s)");

            Assert.Empty(returnedEmployees);
            Console.WriteLine("État du test     : Passed ✅");

            PrintTestEnd(testName);
        }
    }
}
