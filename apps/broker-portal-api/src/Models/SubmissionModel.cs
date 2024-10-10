namespace BrokerPortalApi.Models;

public record struct SubmissionModel(string Ixr, string PolicyName, decimal InsurableLimit, string[] Lines ); 

