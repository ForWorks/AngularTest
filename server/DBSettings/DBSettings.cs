namespace TestTask.MongoDB;

public class MongoDBSettings {
    public string connectionURI { get; set; } = string.Empty;
    public string databaseName { get; set; } = string.Empty;
    public string usersCollectionName { get; set; } = string.Empty;
    public string rolesCollectionName { get; set; } = string.Empty;
}