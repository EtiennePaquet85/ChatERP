// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC02b.cs

using Microsoft.AspNetCore.Mvc;
using Moq;
using src.Controllers;
using src.DTOs;
using src.Services;
using System;
using System.Threading.Tasks;
using Xunit;

namespace tests.Controllers
{
    public class EmployeesControllerTestsUC02b
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC02b.cs";

        public EmployeesControllerTestsUC02b()
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

        [Fact(DisplayName = "Employé trouvé avec succès par ID")]
        public async Task GetEmployeeByIdAsync_ReturnsEmployee_WhenFound()
        {
            string testName = "Employé trouvé avec succès par ID";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : GetEmployeeByIdAsync_ReturnsEmployee_WhenFound");

            int mockEmployeeId = 1;
            var mockEmployee = new EmployeeWithId
            {
                Id = mockEmployeeId,
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
            };

            _mockService
                .Setup(s => s.GetEmployeeByIdAsync(mockEmployeeId))
                .ReturnsAsync(mockEmployee);

            var result = await _controller.GetEmployeeByIdAsync(mockEmployeeId);
            var actionResult = Assert.IsType<ActionResult<EmployeeWithId>>(result);

            var expectedEmployee = mockEmployee;
            var returnedEmployee = Assert.IsType<EmployeeWithId>(actionResult.Value);

            Console.WriteLine($"ID attendu : {expectedEmployee.Id}");
            Console.WriteLine($"ID reçu : {returnedEmployee.Id}");
            Console.WriteLine($"Nom attendu : {expectedEmployee.Name}");
            Console.WriteLine($"Nom reçu : {returnedEmployee.Name}");
            Console.WriteLine($"Rôle attendu : {expectedEmployee.Role}");
            Console.WriteLine($"Rôle reçu : {returnedEmployee.Role}");

            bool testPassed =
                returnedEmployee.Id == expectedEmployee.Id &&
                returnedEmployee.Name == expectedEmployee.Name &&
                returnedEmployee.Role == expectedEmployee.Role &&
                returnedEmployee.Email == expectedEmployee.Email &&
                returnedEmployee.Phone == expectedEmployee.Phone &&
                returnedEmployee.Address == expectedEmployee.Address &&
                returnedEmployee.Department == expectedEmployee.Department &&
                returnedEmployee.Manager == expectedEmployee.Manager &&
                returnedEmployee.Status == expectedEmployee.Status &&
                returnedEmployee.HireDate == expectedEmployee.HireDate &&
                returnedEmployee.PhotoUrl == expectedEmployee.PhotoUrl;

            Console.WriteLine($"État du test     : {(testPassed ? "Passed ✅" : "Failed ❌")}");

            Assert.True(testPassed);
            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Employé introuvable par ID")]
        public async Task GetEmployeeByIdAsync_ReturnsNotFound_WhenEmployeeDoesNotExist()
        {
            string testName = "Employé introuvable par ID";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : GetEmployeeByIdAsync_ReturnsNotFound_WhenEmployeeDoesNotExist");

            int mockEmployeeId = 999;

            _mockService
                .Setup(s => s.GetEmployeeByIdAsync(mockEmployeeId))
                .ReturnsAsync((EmployeeWithId)null);

            var result = await _controller.GetEmployeeByIdAsync(mockEmployeeId);
            var actionResult = Assert.IsType<ActionResult<EmployeeWithId>>(result);
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);

            var expectedCode = 404;
            var returnedCode = notFoundResult.StatusCode;

            var expectedMessage = $"Employé introuvable.";
            var returnedObject = notFoundResult.Value;
            string returnedMessage = "";

            if(returnedObject is not null)
            {
                var props = returnedObject.GetType().GetProperty("message");
                returnedMessage = props.GetValue(returnedObject).ToString();
            }

            Console.WriteLine($"Code HTTP attendu   : {expectedCode}");
            Console.WriteLine($"Code HTTP reçu      : {returnedCode}");
            Console.WriteLine($"Message attendu     : {expectedMessage}");
            Console.WriteLine($"Message reçu        : {returnedMessage}");

            bool testPassed =
                returnedCode == expectedCode &&
                returnedMessage == expectedMessage;

            Console.WriteLine($"État du test        : {(testPassed ? "Passed ✅" : "Failed ❌")}");
            Assert.True(testPassed);

            PrintTestEnd(testName);
        }
    }
}
