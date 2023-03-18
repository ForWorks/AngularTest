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

    public async Task CreateUserAsync(User user) {
        await _users.InsertOneAsync(user);
        return;
    }

    public async Task UpdateUserAsync(string id, User newUser) {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("id", id);
        UpdateDefinition<User> update = Builders<User>.Update
            .Set(user => user.name, newUser.name)
            .Set(user => user.roles, newUser.roles);
        await _users.UpdateOneAsync(filter, update);
        return;
    }

    public async Task<List<User>> GetUserAsync() {
        return await _users.Find(new BsonDocument()).ToListAsync();
    }

    public async Task DeleteUserAsync(string id) {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("id", id);
        await _users.DeleteOneAsync(filter);
        return;
    }
}