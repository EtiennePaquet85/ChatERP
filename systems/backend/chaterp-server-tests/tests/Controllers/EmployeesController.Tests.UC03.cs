// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC03.cs

using Microsoft.AspNetCore.Mvc;
using Moq;
using src.Controllers;
using src.DTOs;
using src.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;

namespace tests.Controllers
{
    public class EmployeesControllerTestsUC03
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC03.cs";

        public EmployeesControllerTestsUC03()
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

        private EmployeeData GetSampleEmployee() => new EmployeeData
        {
            Name = "Jane Smith",
            Email = "jane@example.com",
            Role = "Designer",
            Phone = "7654321",
            Address = "456 avenue secondaire",
            Department = "Design",
            Manager = "Dwight",
            Status = "Actif",
            HireDate = "2022-06-15",
            PhotoUrl = "http://url/photo2.jpg"
        };

        [Fact(DisplayName = "Succès de la mise à jour d’un employé")]
        public async Task UpdateEmployeeAsync_ReturnsOk_WhenSuccessful()
        {
            string testName = "Succès de la mise à jour d’un employé";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : UpdateEmployeeAsync_ReturnsOk_WhenSuccessful");

            var mockEmployee = GetSampleEmployee();
            var mockEmployeeId = 2;

            _mockService
                .Setup(s => s.UpdateEmployeeAsync(mockEmployeeId, mockEmployee))
                .ReturnsAsync((true, Array.Empty<string>()));

            var result = await _controller.UpdateEmployeeAsync(mockEmployeeId, mockEmployee);
            var okResult = Assert.IsType<OkObjectResult>(result);

            var json = JsonSerializer.Serialize(okResult.Value);
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;

            var expectedMessage = "Employé mis à jour avec succès.";
            var returnedMessage = root.GetProperty("message").GetString();

            Console.WriteLine($"Résultat attendu : message = '{expectedMessage}'");
            Console.WriteLine($"Résultat reçu    : message = '{returnedMessage}'");
            Console.WriteLine($"État du test     : {(expectedMessage == returnedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Échec de validation lors de la mise à jour")]
        public async Task UpdateEmployeeAsync_ReturnsBadRequest_WhenValidationFails()
        {
            string testName = "Échec de validation lors de la mise à jour";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : UpdateEmployeeAsync_ReturnsBadRequest_WhenValidationFails");

            var mockEmployee = GetSampleEmployee();
            var mockEmployeeId = 2;
            var mockErrors = new[] { "mockErrors - Le rôle est requis.", "Adresse invalide." };

            _mockService
                .Setup(s => s.UpdateEmployeeAsync(mockEmployeeId, mockEmployee))
                .ReturnsAsync((false, mockErrors));

            var result = await _controller.UpdateEmployeeAsync(mockEmployeeId, mockEmployee);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            var json = JsonSerializer.Serialize(badRequestResult.Value);
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;

            var expectedErrors = mockErrors;
            var returnedErrors = root.GetProperty("errors").EnumerateArray().Select(e => e.GetString()).ToList();

            Console.WriteLine($"Résultat attendu : [{string.Join(", ", expectedErrors)}]");
            Console.WriteLine($"Résultat reçu    : [{string.Join(", ", returnedErrors)}]");
            Console.WriteLine($"État du test     : {(returnedErrors.Count == expectedErrors.Length && !expectedErrors.Except(returnedErrors).Any() ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Exception levée lors de la mise à jour")]
        public async Task UpdateEmployeeAsync_ThrowsException_WhenServiceFails()
        {
            string testName = "Exception levée lors de la mise à jour";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : UpdateEmployeeAsync_ThrowsException_WhenServiceFails");

            var mockEmployee = GetSampleEmployee();
            var mockEmployeeId = 2;
            var mockMessage = "mockMessage - Erreur serveur lors de la mise à jour";

            _mockService
                .Setup(s => s.UpdateEmployeeAsync(mockEmployeeId, mockEmployee))
                .ThrowsAsync(new Exception(mockMessage));

            var exception = await Assert.ThrowsAsync<Exception>(() =>
                _controller.UpdateEmployeeAsync(mockEmployeeId, mockEmployee));

            var expectedMessage = mockMessage;
            var returnedMessage = exception.Message;

            Console.WriteLine($"Résultat attendu : {expectedMessage}");
            Console.WriteLine($"Résultat reçu    : {returnedMessage}");
            Console.WriteLine($"État du test     : {(returnedMessage == expectedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }
    }
}
