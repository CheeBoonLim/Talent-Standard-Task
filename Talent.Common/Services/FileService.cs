using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string name, FileType type)
        {
            //Your code here;
            string fileURL = "";
            string pathWeb = _environment.WebRootPath;
            switch (type)
            {
                case FileType.ProfilePhoto:
                    string pathValue = pathWeb + _tempFolder;
                    var path = pathValue + name;
                    using (var fileStream = new FileStream(path, FileMode.Open))
                    {
                        fileURL = fileStream.Name;
                    }
                    break;
                case FileType.UserVideo:
                    throw new NotImplementedException();
                case FileType.UserCV:
                    throw new NotImplementedException();
            }
            return fileURL;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;
            // unique file name
            var uniqueFileName = "";
            string pathWeb = _environment.WebRootPath;

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                uniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                var path = pathValue + uniqueFileName;
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                Console.WriteLine(path);
            }
            return uniqueFileName;
        }

        public async Task<bool> DeleteFile(string name, FileType type)
        {
            //Your code here;
            string fileURL = "";
            string pathWeb = _environment.WebRootPath;
            switch (type)
            {
                case FileType.ProfilePhoto:
                    fileURL = pathWeb + _tempFolder + name;
                    FileInfo file = new FileInfo(fileURL);
                    if (file.Exists)
                    {
                        File.Delete(fileURL);
                    }
                    break;
                case FileType.UserVideo:
                    throw new NotImplementedException();
                case FileType.UserCV:
                    throw new NotImplementedException();
            }
            return true;
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
