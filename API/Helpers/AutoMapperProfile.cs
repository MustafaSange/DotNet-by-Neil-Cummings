using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<AppUser, MemberDTO>()
        .ForMember(
          dest => dest.PhotoUrl,
          option => option.MapFrom(
            source => source.Photos.FirstOrDefault(
              photo => photo.IsMain
            ).Url
          ))
        .ForMember(
          dest => dest.Age,
          options => options.MapFrom(
            source => source.DateOfBirth.CalculateAge()
          ));
      CreateMap<Photo, PhotoDTO>();
    }
  }
}