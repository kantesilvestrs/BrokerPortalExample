using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using BrokerPortalApi.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace BrokerPortalApi.Tests;

public partial class IntegrationTests
{
    [Fact]
    public async Task GivenCorrectCredentials_WhenLoggingIn_ShouldReturnToken()
    {
        var apiFactory = new PortalApiFactory( );
        var client = apiFactory.CreateClient( );

        var response = await client.PostAsync( "/login",
                          apiFactory.CreateJson( new { Username = "insurx", Password = "supersecretpassword1" } ) );

        response.EnsureSuccessStatusCode( );

        var stream = await response.Content.ReadAsStreamAsync( );
        var result = await JsonSerializer.DeserializeAsync<LoginResponse>( stream, PortalApiFactory.Options ); 

        result.Success
           .Should( )
           .Be( true );

        result
           .Token.Should( )
           .NotBeNullOrWhiteSpace( );
    }
    
    [Fact]
    public async Task GivenASubmissionWithToken_WhenSubmittingPolicy_ShouldReturnOk()
    {
        var apiFactory = new PortalApiFactory( );
        var client = apiFactory.CreateClient( );

        var loginResponse = await client.PostAsync( "/login",
                          apiFactory.CreateJson( new { Username = "insurx", Password = "supersecretpassword1" } ) );

        loginResponse.EnsureSuccessStatusCode( );

        var loginResponseStream = await loginResponse.Content.ReadAsStreamAsync( );
        var loginResult = await JsonSerializer.DeserializeAsync<LoginResponse>( loginResponseStream, PortalApiFactory.Options ); 

        var submission = new SubmissionModel
                         {
                             PolicyName = "Test Policy",
                             InsurableLimit = 1000m,
                             Lines = [ "Line 1", "Line 2" ]
                         };
        
        var submissionResponse = await client.PostAsync( "/submission?token=" + loginResult.Token,
                          apiFactory.CreateJson( submission ) );
        
        submissionResponse.EnsureSuccessStatusCode( );
        
        
        var submissionResponseStream = await submissionResponse.Content.ReadAsStreamAsync( );
        var submissionResult = await JsonSerializer.DeserializeAsync<SubmissionResponse>( submissionResponseStream, PortalApiFactory.Options );
        
        submissionResult.Success
           .Should( )
           .Be( true );

        submissionResult
           .Ixr.Should( )
           .MatchRegex(MyRegex());
    }
    
    [Fact]
    public async Task GivenABadSubmissionWithToken_WhenSubmittingPolicy_ShouldReturnBadRequest()
    {
        var apiFactory = new PortalApiFactory( );
        var client = apiFactory.CreateClient( );

        var loginResponse = await client.PostAsync( "/login",
                          apiFactory.CreateJson( new { Username = "insurx", Password = "supersecretpassword1" } ) );

        loginResponse.EnsureSuccessStatusCode( );

        var loginResponseStream = await loginResponse.Content.ReadAsStreamAsync( );
        var loginResult = await JsonSerializer.DeserializeAsync<LoginResponse>( loginResponseStream, PortalApiFactory.Options ); 

        var submission = new SubmissionModel
                         {
                             PolicyName = "Test Policy",
                             InsurableLimit = -0.1m,
                             Lines = [ "Line 1", "Line 2" ]
                         };
        
        var submissionResponse = await client.PostAsync( "/submission?token=" + loginResult.Token,
                          apiFactory.CreateJson( submission ) );
        
        submissionResponse.StatusCode.Should( ).Be( HttpStatusCode.BadRequest );
        
        var submissionResponseStream = await submissionResponse.Content.ReadAsStreamAsync( );
        var submissionResult = await JsonSerializer.DeserializeAsync<FailureResponse>( submissionResponseStream, PortalApiFactory.Options );
        
        submissionResult.Success
           .Should( )
           .Be( false );

        submissionResult
           .Error.Should( )
           .Be( "We can't be giving you money..." );
    }
    
    [Fact]
    public async Task GivenASubmissionWithoutToken_WhenSubmittingPolicy_ShouldReturnUnauthorised()
    {
        var apiFactory = new PortalApiFactory( );
        var client = apiFactory.CreateClient( );

        var submission = new SubmissionModel
                         {
                             PolicyName = "Test Policy",
                             InsurableLimit = 1000m,
                             Lines = [ "Line 1", "Line 2" ]
                         };
        
        var submissionResponse = await client.PostAsync( "/submission?token=",
                          apiFactory.CreateJson( submission ) );
        
        submissionResponse.StatusCode.Should().Be(HttpStatusCode.Unauthorized );
    }

    [GeneratedRegex("IXR(\\d{6})A755")]
    private static partial Regex MyRegex();
}

public record struct LoginResponse( bool Success, string Token );

public record struct SubmissionResponse( bool Success, string Ixr );
public record struct FailureResponse( bool Success, string Error );

public class PortalApiFactory
    : WebApplicationFactory<Program>
{
    public static readonly JsonSerializerOptions Options = new( )
                                                           {
                                                               PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                                                               PropertyNameCaseInsensitive = true
                                                           };

    public HttpContent CreateJson( object data )
    {
        return new StringContent(
            JsonSerializer.Serialize( data,
                                      Options
            ),
            Encoding.UTF8,
            "application/json" );
    }
}