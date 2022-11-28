using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class UserRepository : IUserRepository
  {

    private readonly IMapper _mapper;
    private readonly DataContext _context;
    public UserRepository(
      DataContext context,
      IMapper mapper
    )
    {
      _mapper = mapper;
      _context = context;
    }

    // public async Task<IEnumerable<AppUser>> GetUsersAsync()
    // {
    //   return await _context.Users
    //     .Include(user => user.Photos)
    //     .ToListAsync();
    // }

    // public async Task<AppUser> GetUserByIdAsync(int id)
    // {
    //   return await _context.Users.FindAsync(id);
    // }

    public async Task<AppUser> GetUserByUserNameAsync(string userName)
    {
      return await _context.Users
        .Include(user => user.Photos)
        .SingleOrDefaultAsync(user => user.UserName == userName.ToLower());
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
      _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
    {
      return await  _context.Users
        .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<MemberDTO> GetMemberAsync(string userName)
    {
      return await _context.Users
        .Where(user => user.UserName == userName.ToLower())
        .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }
  }
}