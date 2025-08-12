// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC04.cs

using Microsoft.AspNetCore.Mvc;
using Moq;
using src.Controllers;
using src.Services;
using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;

namespace tests.Controllers
{
    public class EmployeesControllerTestsUC04
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC04.cs";

        public EmployeesControllerTestsUC04()
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

        [Fact(DisplayName = "Succès de la suppression d’un employé")]
        public async Task DeleteEmployeeAsync_ReturnsOk_WhenSuccessful()
        {
            string testName = "Succès de la suppression d’un employé";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : DeleteEmployeeAsync_ReturnsOk_WhenSuccessful");

            var mockEmployeeId = 3;

            _mockService
                .Setup(s => s.DeleteEmployeeAsync(mockEmployeeId))
                .ReturnsAsync((true, Array.Empty<string>()));

            var result = await _controller.DeleteEmployeeAsync(mockEmployeeId);
            var okResult = Assert.IsType<OkObjectResult>(result);

            var json = JsonSerializer.Serialize(okResult.Value);
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;

            var expectedMessage = "Employé supprimé avec succès.";
            var returnedMessage = root.GetProperty("message").GetString();

            Console.WriteLine($"Résultat attendu : message = '{expectedMessage}'");
            Console.WriteLine($"Résultat reçu    : message = '{returnedMessage}'");
            Console.WriteLine($"État du test     : {(expectedMessage == returnedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Échec de validation lors de la suppression")]
        public async Task DeleteEmployeeAsync_ReturnsBadRequest_WhenValidationFails()
        {
            string testName = "Échec de validation lors de la suppression";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : DeleteEmployeeAsync_ReturnsBadRequest_WhenValidationFails");

            var mockEmployeeId = 3;
            var mockErrors = new[] { "mockErrors - L’employé n’existe pas.", "Suppression non autorisée." };

            _mockService
                .Setup(s => s.DeleteEmployeeAsync(mockEmployeeId))
                .ReturnsAsync((false, mockErrors));

            var result = await _controller.DeleteEmployeeAsync(mockEmployeeId);
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

        [Fact(DisplayName = "Exception levée lors de la suppression")]
        public async Task DeleteEmployeeAsync_ThrowsException_WhenServiceFails()
        {
            string testName = "Exception levée lors de la suppression";
            PrintTestStart(testName);

            Console.WriteLine($"▶️  Task : DeleteEmployeeAsync_ThrowsException_WhenServiceFails");

            var mockEmployeeId = 3;
            var mockMessage = "Erreur interne lors de la suppression";

            _mockService
                .Setup(s => s.DeleteEmployeeAsync(mockEmployeeId))
                .ThrowsAsync(new Exception(mockMessage));

            var exception = await Assert.ThrowsAsync<Exception>(() =>
                _controller.DeleteEmployeeAsync(mockEmployeeId));

            var expectedMessage = mockMessage;
            var returnedMessage = exception.Message;

            Console.WriteLine($"Résultat attendu : {expectedMessage}");
            Console.WriteLine($"Résultat reçu    : {returnedMessage}");
            Console.WriteLine($"État du test     : {(returnedMessage == expectedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }
    }
}
