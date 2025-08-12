// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC01a.cs

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
    public class EmployeesControllerTestsUC01a
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC01a.cs";

        public EmployeesControllerTestsUC01a()
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
            Name = "John Doe",
            Email = "john@example.com",
            Role = "Développeur",
            Phone = "1234567",
            Address = "123 rue principale",
            Department = "IT",
            Manager = "Michael",
            Status = "Actif",
            HireDate = "2023-01-01",
            PhotoUrl = "http://url/photo.jpg"
        };

        [Fact(DisplayName = "Succès de la création d’un employé")]
        public async Task CreateEmployeeAsync_ReturnsOk_WhenSuccessful()
        {
            string testName = "Succès de la création d’un employé";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : CreateEmployeeAsync_ReturnsOk_WhenSuccessful");

            var mockEmployee = GetSampleEmployee();
            var mockId = 1;

            _mockService
                .Setup(s => s.CreateEmployeeAsync(mockEmployee))
                .ReturnsAsync((true, mockId, Array.Empty<string>()));

            var result = await _controller.CreateEmployeeAsync(mockEmployee);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var json = JsonSerializer.Serialize(okResult.Value);
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;

            var expectedMessage = "Employé créé avec succès.";
            var returnedMessage = root.GetProperty("message").GetString();

            var expectedId = 1;
            var returnedId = root.GetProperty("id").GetInt32();

            Console.WriteLine($"Résultat attendu : message = '{expectedMessage}', id = {expectedId}");
            Console.WriteLine($"Résultat reçu    : message = '{returnedMessage}', id = {returnedId}");
            Console.WriteLine($"État du test     : {(expectedMessage == returnedMessage && expectedId == returnedId ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Échec de validation lors de la création")]
        public async Task CreateEmployeeAsync_ReturnsBadRequest_WhenValidationFails()
        {
            string testName = "Échec de validation lors de la création";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : CreateEmployeeAsync_ReturnsBadRequest_WhenValidationFails");

            var mockEmployee = GetSampleEmployee();
            var mockErrors = new[] { "mockErrors - Le nom est requis.", "Email invalide." };

            _mockService
                .Setup(s => s.CreateEmployeeAsync(mockEmployee))
                .ReturnsAsync((false, null, mockErrors));

            var result = await _controller.CreateEmployeeAsync(mockEmployee);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            var json = JsonSerializer.Serialize(badRequestResult.Value);
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;

            var expectedErrors = mockErrors;
            var returnedErrors = new List<string>();

            foreach(var e in root.GetProperty("errors").EnumerateArray())
            {
                returnedErrors.Add(e.GetString());
            }

            Console.WriteLine($"Résultat attendu : [{string.Join(", ", expectedErrors)}]");
            Console.WriteLine($"Résultat reçu    : [{string.Join(", ", returnedErrors)}]");
            Console.WriteLine($"État du test     : {(returnedErrors.Count == expectedErrors.Length && !expectedErrors.Except(returnedErrors).Any() ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Exception levée lors de la création")]
        public async Task CreateEmployeeAsync_ThrowsException_WhenServiceFails()
        {
            string testName = "Exception levée lors de la création";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : CreateEmployeeAsync_ThrowsException_WhenServiceFails");

            var mockEmployee = GetSampleEmployee();
            var mockMessage = "mockMessage - Erreur inattendue";

            _mockService
                .Setup(s => s.CreateEmployeeAsync(mockEmployee))
                .ThrowsAsync(new Exception(mockMessage));

            var exception = await Assert.ThrowsAsync<Exception>(() =>
                _controller.CreateEmployeeAsync(mockEmployee));

            var expectedMessage = mockMessage;
            var returnedMessage = exception.Message;

            Console.WriteLine($"Résultat attendu : {expectedMessage}");
            Console.WriteLine($"Résultat reçu    : {returnedMessage}");
            Console.WriteLine($"État du test     : {(returnedMessage == expectedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }
    }
}
