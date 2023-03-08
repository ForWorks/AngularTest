namespace TestTask.MongoDB;

public class MongoDBSettings {
    public string connectionURI { get; set; } = string.Empty;
    public string databaseName { get; set; } = string.Empty;
    public string userCollectionName { get; set; } = string.Empty;
    public string roleCollectionName { get; set; } = string.Empty;
}