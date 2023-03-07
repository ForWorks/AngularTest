using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Options;

namespace TestTask.MongoDB;

public class UsersService {

    private readonly IMongoCollection<User> _users;

    public UsersService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.connectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.databaseName);
        _users = database.GetCollection<User>(mongoDBSettings.Value.usersCollectionName);
    }

    public async Task CreateAsync(User user) {
        await _users.InsertOneAsync(user);
        return;
    }

    public async Task<List<User>> GetAsyns() {
        return await _users.Find(new BsonDocument()).ToListAsync();
    }
}