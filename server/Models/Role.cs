using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace TestTask;

public class Role {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }

    public string name { get; set; } = string.Empty;
}