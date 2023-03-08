using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using MongoDB.Bson;

namespace TestTask;  

public class User {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    public string name { get; set; } = string.Empty;
    [BsonElement("roles")]
    [JsonPropertyName("roles")]
    public List<Role> roles { get; set; } = null!;
}
