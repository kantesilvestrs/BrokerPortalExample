using System.Buffers;
using System.Text;
using Microsoft.Extensions.Primitives;

namespace BrokerPortalApi;

public static class Extensions
{
    public static string GenerateToken( params string[ ] parts )
    {
        var sb = parts.Aggregate( new StringBuilder( parts.Length * 50 ),
                                  ( sb,
                                    p ) => sb.Append( p ) );
        ReadOnlySpan<byte> bytes = Encoding.UTF8.GetBytes( sb.ToString( ) );
        return Convert.ToBase64String( bytes );
    }

    private static readonly Random Random = new( );

    public static string GenerateIxr( )
    {
        var sb = Enumerable
                .Range( 0, 6 )
                .Aggregate( new StringBuilder( 7 ),
                            ( sb,
                              _ ) => sb.Append( Random.Next( 0, 9 ) ) );
        return $"IXR{sb}A755";
    }
}
