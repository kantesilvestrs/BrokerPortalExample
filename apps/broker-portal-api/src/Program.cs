using BrokerPortalApi;
using BrokerPortalApi.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(c => c.AddDefaultPolicy(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
builder.Services.AddEndpointsApiExplorer( );
builder.Services.AddSwaggerGen( c => c.SwaggerDoc( "v0.1",
                                                   new() { Title = "Broker Portal API", Version = "v0.1" } ) );
var app = builder.Build();

app.UseSwagger( );
app.UseSwaggerUI( c => { c.SwaggerEndpoint( "v0.1/swagger.json", "Broker Portal API v0.1" ); } );

app.MapPost( "/login",
            ( LoginModel model,
              HttpContext ctx ) =>
            {
                if ( model is { Username: "insurx", Password: "supersecretpassword1" } )
                {
                    return Results.Ok( new
                                       {
                                           success = true,
                                           token = Extensions.GenerateToken( model.Username, model.Password )
                                       } );
                }

                return Results.Unauthorized();
            } )
   .WithName( "Login" )
   .WithOpenApi();

List<SubmissionModel> submissions = [ ];
app
   .MapPost( "/submission",
             ( [FromBody] SubmissionModel model,
               [FromQuery] string token ) =>
             {
                 if ( ! CheckToken( token ) )
                 {
                     return Results.Unauthorized( );
                 }

                 if ( string.IsNullOrWhiteSpace( model.PolicyName ) )
                 {
                     return Results.BadRequest( new { success = false, error = "Policy name needs a value" } );
                 }

                 if ( model.Lines.Length <= 0 )
                 {
                     return Results.BadRequest( new { success = false, error = "We need to know what to cover" } );
                 }

                 if ( model.InsurableLimit <= 0m )
                 {
                     return Results.BadRequest( new { success = false, error = "We can't be giving you money..." } );
                 }

                 model.Ixr = Extensions.GenerateIxr( );
                 submissions.Add( model );
                 return Results.Ok( new { success = true, ixr = model.Ixr } );
             } )
   .WithName( "SubmitPolicy" )
   .WithOpenApi( );

app.Run();
return;

bool CheckToken( string tokenInput )
{
    return tokenInput == Extensions.GenerateToken( "insurx", "supersecretpassword1" );
}

public partial class Program { }
