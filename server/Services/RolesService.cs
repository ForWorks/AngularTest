using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Options;

namespace TestTask.MongoDB;

public class RolesService {

    private readonly IMongoCollection<Role> _roles;

    public RolesService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.connectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.databaseName);
        _roles = database.GetCollection<Role>(mongoDBSettings.Value.rolesCollectionName);
    }

    public async Task CreateAsync(Role role) {
        await _roles.InsertOneAsync(role);
        return;
    }

    public async Task<List<Role>> GetAsyns() {
        return await _roles.Find(new BsonDocument()).ToListAsync();
    }
}