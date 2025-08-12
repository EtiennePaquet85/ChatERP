// systems/backend/chaterp-server-tests/tests/Controllers/EmployeesController.Tests.UC01b.cs

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using src.Controllers;
using src.Services;
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;

namespace tests.Controllers
{
    public class EmployeesControllerTestsUC01b
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;
        private const string FILENAME = "EmployeesController.Tests.UC01b.cs";

        public EmployeesControllerTestsUC01b()
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

        private IFormFile CreateFakeFile(string fileName = "photo.jpg", string contentType = "image/jpeg")
        {
            var content = new byte[] { 1, 2, 3, 4 };
            var stream = new MemoryStream(content);
            return new FormFile(stream, 0, content.Length, "file", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };
        }

        [Fact(DisplayName = "Succès du téléversement d’une photo")]
        public async Task UploadEmployeePhotoAsync_ReturnsOk_WhenSuccessful()
        {
            string testName = "Succès du téléversement d’une photo";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : UploadEmployeePhotoAsync_ReturnsOk_WhenSuccessful");

            var mockFile = CreateFakeFile();
            var mockUrl = "https://storage.mock.com/photo.jpg";

            _mockService
                .Setup(s => s.UploadEmployeePhotoAsync(mockFile))
                .ReturnsAsync((true, mockUrl, Array.Empty<string>()));

            var result = await _controller.UploadEmployeePhotoAsync(mockFile);
            var okResult = Assert.IsType<OkObjectResult>(result);

            var json = JsonSerializer.Serialize(okResult.Value);
            using var doc = JsonDocument.Parse(json);

            var expectedUrl = mockUrl;
            var returnedUrl = doc.RootElement.GetProperty("storageUrl").GetString();

            Console.WriteLine($"Résultat attendu : storageUrl = '{expectedUrl}'");
            Console.WriteLine($"Résultat reçu    : storageUrl = '{returnedUrl}'");
            Console.WriteLine($"État du test     : {(returnedUrl == expectedUrl ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Fichier vide ou invalide lors du téléversement")]
        public async Task UploadEmployeePhotoAsync_ReturnsBadRequest_WhenFileIsInvalid()
        {
            string testName = "Fichier vide ou invalide lors du téléversement";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : UploadEmployeePhotoAsync_ReturnsBadRequest_WhenFileIsInvalid");

            IFormFile mockFile = null;
            var mockErrors = new[] { "mockErrors - Aucun fichier reçu ou fichier vide." };

            _mockService
                .Setup(s => s.UploadEmployeePhotoAsync(null))
                .ReturnsAsync((false, null, mockErrors));

            var result = await _controller.UploadEmployeePhotoAsync(mockFile);
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);

            var json = JsonSerializer.Serialize(badRequest.Value);
            using var doc = JsonDocument.Parse(json);
            var errorsArray = doc.RootElement.GetProperty("errors").EnumerateArray();

            var expectedErrors = mockErrors;
            var returnedErrors = errorsArray.Select(e => e.GetString()).ToArray();

            Console.WriteLine($"Résultat attendu : [{string.Join(", ", expectedErrors)}]");
            Console.WriteLine($"Résultat reçu    : [{string.Join(", ", returnedErrors)}]");
            Console.WriteLine($"État du test     : {(returnedErrors.Length == expectedErrors.Length && !expectedErrors.Except(returnedErrors).Any() ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }

        [Fact(DisplayName = "Exception levée lors du téléversement")]
        public async Task UploadEmployeePhotoAsync_ThrowsException_WhenServiceFails()
        {
            string testName = "Exception levée lors du téléversement";
            PrintTestStart(testName);

            Console.WriteLine("▶️  Task : UploadEmployeePhotoAsync_ThrowsException_WhenServiceFails");

            var file = CreateFakeFile();
            var mockMessage = "mockMessage - Erreur inattendue";

            _mockService
                .Setup(s => s.UploadEmployeePhotoAsync(file))
                .ThrowsAsync(new Exception(mockMessage));

            var exception = await Assert.ThrowsAsync<Exception>(() =>
                _controller.UploadEmployeePhotoAsync(file));

            var expectedMessage = mockMessage;
            var returnedMessage = exception.Message;

            Console.WriteLine($"Résultat attendu : {expectedMessage}");
            Console.WriteLine($"Résultat reçu    : {returnedMessage}");
            Console.WriteLine($"État du test     : {(returnedMessage == expectedMessage ? "Passed ✅" : "Failed ❌")}");

            PrintTestEnd(testName);
        }
    }
}
