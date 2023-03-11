using Microsoft.AspNetCore.Mvc;
using TestTask.MongoDB;
using TestTask;

namespace server.Controllers;

[Controller]
[Route("api/Roles")]
public class RoleController : ControllerBase {

    private readonly RoleService _roleService;

    public RoleController(RoleService rolesService) {
        _roleService = rolesService;
    }
    
    [HttpGet]
    public async Task<List<Role>> GetRoles() {
        return await _roleService.GetAsyns();
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] Role role) {
        await _roleService.CreateAsync(role);
        return CreatedAtAction(nameof(GetRoles), new { id = role.id }, role);
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteRole(string id) {
        await _roleService.DeleteAsync(id);
        return NoContent();
    }
}
