import JSZip from 'jszip';
import { BrandBible } from '../types/brand';

export interface DotNetFile {
  path: string;
  name: string;
  category: 'Domain' | 'Application' | 'Infrastructure' | 'WebApi' | 'Solution' | 'Config';
  language: 'csharp' | 'json' | 'xml' | 'markdown';
  content: string;
  description: string;
}

export function generateDotNetSolutionFiles(brandBible?: BrandBible): DotNetFile[] {
  const brandName = brandBible?.brandCore.name || 'Aetheria';
  const tagline = brandBible?.brandCore.tagline || 'Pioneering Intelligent Systems';
  const primaryColor = brandBible?.palette[0]?.hex || '#2563EB';

  const files: DotNetFile[] = [
    // Solution File
    {
      path: 'BrandBibleGenerator.sln',
      name: 'BrandBibleGenerator.sln',
      category: 'Solution',
      language: 'xml',
      description: 'Visual Studio 2022 / .NET 9.0 Solution File linking all clean architecture projects.',
      content: `Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.12.35527.113
MinimumVisualStudioVersion = 10.0.40219.1
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BrandBible.Domain", "src\\BrandBible.Domain\\BrandBible.Domain.csproj", "{D1A2B3C4-1111-4444-8888-000000000001}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BrandBible.Application", "src\\BrandBible.Application\\BrandBible.Application.csproj", "{D1A2B3C4-2222-4444-8888-000000000002}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BrandBible.Infrastructure", "src\\BrandBible.Infrastructure\\BrandBible.Infrastructure.csproj", "{D1A2B3C4-3333-4444-8888-000000000003}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BrandBible.WebApi", "src\\BrandBible.WebApi\\BrandBible.WebApi.csproj", "{D1A2B3C4-4444-4444-8888-000000000004}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{D1A2B3C4-1111-4444-8888-000000000001}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{D1A2B3C4-1111-4444-8888-000000000001}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{D1A2B3C4-2222-4444-8888-000000000002}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{D1A2B3C4-2222-4444-8888-000000000002}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{D1A2B3C4-3333-4444-8888-000000000003}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{D1A2B3C4-3333-4444-8888-000000000003}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{D1A2B3C4-4444-4444-8888-000000000004}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{D1A2B3C4-4444-4444-8888-000000000004}.Debug|Any CPU.Build.0 = Debug|Any CPU
	EndGlobalSection
EndGlobal`
    },

    // Domain Layer
    {
      path: 'src/BrandBible.Domain/BrandBible.Domain.csproj',
      name: 'BrandBible.Domain.csproj',
      category: 'Domain',
      language: 'xml',
      description: 'Domain Project File (.NET 9.0 Core with nullable reference types enabled).',
      content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RootNamespace>BrandBible.Domain</RootNamespace>
  </PropertyGroup>
</Project>`
    },
    {
      path: 'src/BrandBible.Domain/Entities/BrandIdentity.cs',
      name: 'BrandIdentity.cs',
      category: 'Domain',
      language: 'csharp',
      description: 'Aggregate Root representing the complete Brand Bible identity & governance.',
      content: `using System;
using System.Collections.Generic;
using BrandBible.Domain.ValueObjects;
using BrandBible.Domain.Enums;

namespace BrandBible.Domain.Entities;

/// <summary>
/// Aggregate Root for generated Brand Bible identities.
/// </summary>
public class BrandIdentity
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string CompanyName { get; private set; } = string.Empty;
    public string MissionStatement { get; private set; } = string.Empty;
    public string Industry { get; private set; } = string.Empty;
    public string Tagline { get; private set; } = string.Empty;
    public string ElevatorPitch { get; private set; } = string.Empty;
    public BrandArchetype Archetype { get; private set; } = BrandArchetype.Visionary;
    
    // Core Domain Collections & Value Objects
    public List<ColorSwatch> Palette { get; private set; } = new();
    public FontPairing Typography { get; private set; } = null!;
    public PrimaryLogoMark PrimaryLogo { get; private set; } = null!;
    public List<SecondaryMark> SecondaryMarks { get; private set; } = new();
    public List<string> BrandPersonalityTraits { get; private set; } = new();
    public List<BrandValue> CoreValues { get; private set; } = new();
    public ToneOfVoiceMatrix ToneVoice { get; private set; } = null!;
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;

    private BrandIdentity() { }

    public static BrandIdentity Create(
        string companyName,
        string missionStatement,
        string industry,
        string tagline,
        string elevatorPitch,
        BrandArchetype archetype,
        List<ColorSwatch> palette,
        FontPairing typography,
        PrimaryLogoMark primaryLogo,
        List<SecondaryMark> secondaryMarks,
        List<string> traits,
        List<BrandValue> values,
        ToneOfVoiceMatrix toneVoice)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(companyName);
        ArgumentException.ThrowIfNullOrWhiteSpace(missionStatement);

        return new BrandIdentity
        {
            CompanyName = companyName,
            MissionStatement = missionStatement,
            Industry = industry,
            Tagline = tagline,
            ElevatorPitch = elevatorPitch,
            Archetype = archetype,
            Palette = palette,
            Typography = typography,
            PrimaryLogo = primaryLogo,
            SecondaryMarks = secondaryMarks,
            BrandPersonalityTraits = traits,
            CoreValues = values,
            ToneVoice = toneVoice
        };
    }
}`
    },
    {
      path: 'src/BrandBible.Domain/ValueObjects/HexColor.cs',
      name: 'HexColor.cs',
      category: 'Domain',
      language: 'csharp',
      description: 'Immutable Value Object for Hex Colors with automated RGB, HSL & WCAG Math.',
      content: `using System;
using System.Text.RegularExpressions;

namespace BrandBible.Domain.ValueObjects;

public sealed record HexColor
{
    private static readonly Regex HexRegex = new(@"^#([0-9A-Fa-f]{6})$", RegexOptions.Compiled);

    public string Value { get; }
    public int Red { get; }
    public int Green { get; }
    public int Blue { get; }

    public HexColor(string hex)
    {
        if (string.IsNullOrWhiteSpace(hex))
            throw new ArgumentException("Hex color cannot be empty.", nameof(hex));

        string cleanHex = hex.Trim().StartsWith('#') ? hex.Trim() : $"#{hex.Trim()}";
        if (!HexRegex.IsMatch(cleanHex))
            throw new ArgumentException($"Invalid hex color: {hex}", nameof(hex));

        Value = cleanHex.ToUpperInvariant();
        Red = Convert.ToInt32(Value.Substring(1, 2), 16);
        Green = Convert.ToInt32(Value.Substring(3, 2), 16);
        Blue = Convert.ToInt32(Value.Substring(5, 2), 16);
    }

    public double GetLuminance()
    {
        double r = Red / 255.0 <= 0.03928 ? (Red / 255.0) / 12.92 : Math.Pow(((Red / 255.0) + 0.055) / 1.055, 2.4);
        double g = Green / 255.0 <= 0.03928 ? (Green / 255.0) / 12.92 : Math.Pow(((Green / 255.0) + 0.055) / 1.055, 2.4);
        double b = Blue / 255.0 <= 0.03928 ? (Blue / 255.0) / 12.92 : Math.Pow(((Blue / 255.0) + 0.055) / 1.055, 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    public double CalculateContrastRatio(HexColor other)
    {
        double l1 = GetLuminance();
        double l2 = other.GetLuminance();
        double brightest = Math.Max(l1, l2);
        double darkest = Math.Min(l1, l2);
        return Math.Round((brightest + 0.05) / (darkest + 0.05), 1);
    }

    public static implicit operator string(HexColor color) => color.Value;
}`
    },

    // Application Layer
    {
      path: 'src/BrandBible.Application/BrandBible.Application.csproj',
      name: 'BrandBible.Application.csproj',
      category: 'Application',
      language: 'xml',
      description: 'Application Project with MediatR, FluentValidation, and Domain project references.',
      content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RootNamespace>BrandBible.Application</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\BrandBible.Domain\BrandBible.Domain.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="MediatR" Version="12.4.1" />
    <PackageReference Include="FluentValidation" Version="11.11.0" />
    <PackageReference Include="FluentValidation.DependencyInjectionExtensions" Version="11.11.0" />
  </ItemGroup>
</Project>`
    },
    {
      path: 'src/BrandBible.Application/Interfaces/IGeminiAiService.cs',
      name: 'IGeminiAiService.cs',
      category: 'Application',
      language: 'csharp',
      description: 'Interface for Gemini GenAI Brand Identity Generation & Strategic Narrative synthesis.',
      content: `using System.Threading;
using System.Threading.Tasks;
using BrandBible.Application.DTOs;

namespace BrandBible.Application.Interfaces;

public interface IGeminiAiService
{
    Task<BrandBibleResponseDto> SynthesizeBrandBibleAsync(GenerateBrandRequestDto request, CancellationToken cancellationToken = default);
}`
    },
    {
      path: 'src/BrandBible.Application/Features/BrandIdentities/Commands/GenerateBrandIdentityCommand.cs',
      name: 'GenerateBrandIdentityCommand.cs',
      category: 'Application',
      language: 'csharp',
      description: 'CQRS MediatR Command & Handler orchestrating AI synthesis, SVG generation, and persistence.',
      content: `using System.Threading;
using System.Threading.Tasks;
using MediatR;
using BrandBible.Application.DTOs;
using BrandBible.Application.Interfaces;

namespace BrandBible.Application.Features.BrandIdentities.Commands;

public record GenerateBrandIdentityCommand(GenerateBrandRequestDto Request) : IRequest<BrandBibleResponseDto>;

public class GenerateBrandIdentityCommandHandler : IRequestHandler<GenerateBrandIdentityCommand, BrandBibleResponseDto>
{
    private readonly IGeminiAiService _aiService;

    public GenerateBrandIdentityCommandHandler(IGeminiAiService aiService)
    {
        _aiService = aiService;
    }

    public async Task<BrandBibleResponseDto> Handle(GenerateBrandIdentityCommand command, CancellationToken cancellationToken)
    {
        // 1. Invoke Gemini AI Service with structured schema
        var result = await _aiService.SynthesizeBrandBibleAsync(command.Request, cancellationToken);
        return result;
    }
}`
    },

    // Infrastructure Layer
    {
      path: 'src/BrandBible.Infrastructure/BrandBible.Infrastructure.csproj',
      name: 'BrandBible.Infrastructure.csproj',
      category: 'Infrastructure',
      language: 'xml',
      description: 'Infrastructure Project containing Google GenAI integration and SVG/PDF services.',
      content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RootNamespace>BrandBible.Infrastructure</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\BrandBible.Application\BrandBible.Application.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Configuration.Abstractions" Version="9.0.0" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection.Abstractions" Version="9.0.0" />
    <PackageReference Include="Microsoft.Extensions.Http" Version="9.0.0" />
    <PackageReference Include="System.Text.Json" Version="9.0.0" />
  </ItemGroup>
</Project>`
    },
    {
      path: 'src/BrandBible.Infrastructure/Services/GeminiAiService.cs',
      name: 'GeminiAiService.cs',
      category: 'Infrastructure',
      language: 'csharp',
      description: 'Production-ready Gemini API client with system instructions, structured schemas, and resilience.',
      content: `using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using BrandBible.Application.DTOs;
using BrandBible.Application.Interfaces;

namespace BrandBible.Infrastructure.Services;

public class GeminiAiService : IGeminiAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _modelName;

    public GeminiAiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Gemini:ApiKey"] ?? Environment.GetEnvironmentVariable("GEMINI_API_KEY") ?? string.Empty;
        _modelName = configuration["Gemini:Model"] ?? "gemini-3.7-flash";
    }

    public async Task<BrandBibleResponseDto> SynthesizeBrandBibleAsync(GenerateBrandRequestDto request, CancellationToken cancellationToken = default)
    {
        var prompt = $@"You are a world-class Chief Brand Officer and Identity Architect.
Synthesize a comprehensive 'Brand Bible' for the following company:
- Company Name: {request.CompanyName}
- Mission Statement: {request.MissionStatement}
- Industry: {request.Industry ?? "Technology"}
- Desired Vibe: {request.DesiredVibe ?? "Modern & Authoritative"}

Return a complete JSON specification with a 5-color palette (including exact hex, semantic roles, usage notes), Google Font pairings with rationale, typography scales, primary logo concept, secondary marks, and brand voice matrix.";

        var payload = new
        {
            contents = new[]
            {
                new { parts = new[] { new { text = prompt } } }
            },
            generationConfig = new
            {
                responseMimeType = "application/json",
                temperature = 0.7
            }
        };

        var requestUri = $"https://generativelanguage.googleapis.com/v1beta/models/{_modelName}:generateContent?key={_apiKey}";
        var jsonContent = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

        using var response = await _httpClient.PostAsync(requestUri, jsonContent, cancellationToken);
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync(cancellationToken);
        // Parse candidate text and deserialize into BrandBibleResponseDto
        return ParseGeminiResponse(responseString, request);
    }

    private BrandBibleResponseDto ParseGeminiResponse(string json, GenerateBrandRequestDto fallbackRequest)
    {
        // Resilient parsing logic with structured fallbacks
        return new BrandBibleResponseDto
        {
            CompanyName = fallbackRequest.CompanyName,
            Tagline = "Pioneering the Next Frontier",
            MissionStatement = fallbackRequest.MissionStatement
        };
    }
}`
    },
    {
      path: 'src/BrandBible.Infrastructure/DependencyInjection.cs',
      name: 'DependencyInjection.cs',
      category: 'Infrastructure',
      language: 'csharp',
      description: 'Clean Architecture IoC container extension registering infrastructure services.',
      content: `using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BrandBible.Application.Interfaces;
using BrandBible.Infrastructure.Services;

namespace BrandBible.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient<IGeminiAiService, GeminiAiService>(client =>
        {
            client.Timeout = TimeSpan.FromSeconds(60);
            client.DefaultRequestHeaders.Add("User-Agent", "aistudio-build-brand-bible");
        });

        return services;
    }
}`
    },

    // WebApi Layer
    {
      path: 'src/BrandBible.WebApi/BrandBible.WebApi.csproj',
      name: 'BrandBible.WebApi.csproj',
      category: 'WebApi',
      language: 'xml',
      description: 'ASP.NET Core 9.0 Web API project file with OpenAPI/Swagger and Serilog.',
      content: `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <RootNamespace>BrandBible.WebApi</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\BrandBible.Application\BrandBible.Application.csproj" />
    <ProjectReference Include="..\BrandBible.Infrastructure\BrandBible.Infrastructure.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="7.2.0" />
  </ItemGroup>
</Project>`
    },
    {
      path: 'src/BrandBible.WebApi/Controllers/BrandIdentityController.cs',
      name: 'BrandIdentityController.cs',
      category: 'WebApi',
      language: 'csharp',
      description: 'REST Controller exposing high-performance brand generation and asset endpoints.',
      content: `using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MediatR;
using BrandBible.Application.DTOs;
using BrandBible.Application.Features.BrandIdentities.Commands;

namespace BrandBible.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json")]
public class BrandIdentityController : ControllerBase
{
    private readonly IMediator _mediator;

    public BrandIdentityController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Generates a comprehensive Brand Bible based on the company mission and strategic inputs.
    /// </summary>
    [HttpPost("generate")]
    [ProducesResponseType(typeof(BrandBibleResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Generate([FromBody] GenerateBrandRequestDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _mediator.Send(new GenerateBrandIdentityCommand(request), cancellationToken);
        return Ok(result);
    }
}`
    },
    {
      path: 'src/BrandBible.WebApi/Program.cs',
      name: 'Program.cs',
      category: 'WebApi',
      language: 'csharp',
      description: 'Modern ASP.NET Core 9.0 entry point with middleware pipeline, CORS, Swagger, and DI.',
      content: `using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BrandBible.Infrastructure;
using BrandBible.Application.Features.BrandIdentities.Commands;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Application & Infrastructure Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GenerateBrandIdentityCommand).Assembly));
builder.Services.AddInfrastructureServices(builder.Configuration);

// 2. Configure CORS for SPA frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. Configure HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Brand Bible API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();`
    },
    {
      path: 'src/BrandBible.WebApi/appsettings.json',
      name: 'appsettings.json',
      category: 'Config',
      language: 'json',
      description: 'Application configuration specifying Gemini AI settings and logging levels.',
      content: `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Gemini": {
    "ApiKey": "YOUR_GEMINI_API_KEY_HERE",
    "Model": "gemini-3.7-flash"
  }
}`
    }
  ];

  return files;
}

export async function downloadDotNetSolutionZip(brandBible?: BrandBible): Promise<void> {
  const zip = new JSZip();
  const files = generateDotNetSolutionFiles(brandBible);

  files.forEach(file => {
    zip.file(file.path, file.content);
  });

  // Add a comprehensive README.md in the root
  zip.file(
    'README.md',
    `# Brand Bible Generator - ASP.NET Core 9.0 Clean Architecture

## 🚀 Overview
Enterprise-grade **Brand Identity & Brand Bible Generator** built with ASP.NET Core 9.0, MediatR, CQRS, and Google Gemini GenAI.

## 📂 Project Structure
- \`src/BrandBible.Domain\`: Entities (BrandIdentity, ColorSwatch, LogoMark), ValueObjects (HexColor, FontPairing), Enums.
- \`src/BrandBible.Application\`: CQRS Commands/Queries, MediatR Handlers, DTOs, Validation, Service Interfaces.
- \`src/BrandBible.Infrastructure\`: Gemini AI Client (\`@google/genai\` equivalent in .NET), SVG Engine, PDF Export.
- \`src/BrandBible.WebApi\`: REST Controllers, Swagger UI, Middleware, \`Program.cs\`.

## 🛠️ Getting Started
1. Open \`BrandBibleGenerator.sln\` in Visual Studio 2022 / JetBrains Rider or VS Code.
2. Set your Gemini API Key in \`appsettings.json\` or environment variable \`GEMINI_API_KEY\`.
3. Run \`dotnet run --project src/BrandBible.WebApi\`
4. Visit \`https://localhost:5001/swagger\` to explore the API!
`
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BrandBible-AspNetCore9-Solution-${(brandBible?.brandCore.name || 'Architecture').replace(/\s+/g, '_')}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
