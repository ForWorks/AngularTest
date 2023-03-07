using Microsoft.AspNetCore.Mvc;
using TestTask.MongoDB;
using TestTask;

namespace server.Controllers;

[Controller]
[Route("api/[controller]")]
public class RolesController : ControllerBase {

    private readonly RolesService _rolesService;

    public RolesController(RolesService rolesService) {
        _rolesService = rolesService;
    }
    
    [HttpGet]
    public async Task<List<Role>> Get() {
        return await _rolesService.GetAsyns();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Role role) {
        await _rolesService.CreateAsync(role);
        return CreatedAtAction(nameof(Get), new { id = role.id }, role);
    }
}
