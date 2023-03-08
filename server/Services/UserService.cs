using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Options;

namespace TestTask.MongoDB;

public class UserService {

    private readonly IMongoCollection<User> _users;

    public UserService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.connectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.databaseName);
        _users = database.GetCollection<User>(mongoDBSettings.Value.userCollectionName);
    }

    public async Task CreateAsync(User user) {
        await _users.InsertOneAsync(user);
        return;
    }

    public async Task<List<User>> GetAsync() {
        return await _users.Find(new BsonDocument()).ToListAsync();
    }

    public async Task DeleteAsync(string id) {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("id", id);
        await _users.DeleteOneAsync(filter);
        return;
    }
}