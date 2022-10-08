using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;
using AutoMapper;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    
    public UsersController(
      IUserRepository userRepository,
      IMapper mapper)
    {
      _mapper = mapper;
      _userRepository = userRepository;
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
      var users = await _userRepository.GetMembersAsync();
      // var usersToReturn = _mapper.Map<IEnumerable<MemberDTO>>(users);

      return Ok(users);
    }

    [HttpGet("{userName}")]
    public async Task<ActionResult<MemberDTO>> GetUser(string userName)
    {
      var user = await _userRepository.GetMemberAsync(userName);
      
      return user;
    }
  }
}