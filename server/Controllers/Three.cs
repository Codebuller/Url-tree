using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text;
using System.Net;
using System.Threading;
using HtmlAgilityPack;
namespace runtime_flex.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Three : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<Three> _logger;

        public Three(ILogger<Three> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
       [HttpPost]
        public ActionResult<JsonDocument> MyMethod([FromBody] JsonDocument clientJson)
        {
            JsonElement root = clientJson.RootElement;
            JsonElement inputElement = root.GetProperty("input");
            string url = inputElement.GetString();
            string result = ""; 
               
            Queue<string> list = new Queue<string>();
            List<string> set  = new List<string>();
            list.Enqueue(url);
            
            while(list.Count!=0  )
           {
            
            string nowLink =  list.Dequeue();
            HtmlDocument doc = new HtmlDocument();
            doc = GetDocument(nowLink);
            if(doc.DocumentNode.SelectNodes("//a")!=null)
                foreach(HtmlNode node  in doc.DocumentNode.SelectNodes("//a"))
                {   
                    if( node.GetAttributeValue("href",null) == null)
                        continue;
                        string path = node.GetAttributeValue("href",null);
                    
                    int collSlash = 0;
                    for(int i = 0;i<path.Length-1;++i)
                        if(path[i]=='/')
                            ++collSlash;
                    if(collSlash>2 || collSlash==0)
                        continue;
                    
                    
                    if(path.Substring(0, Math.Min(path.Length,8))!= "https://"
                        && path.Substring(0, Math.Min(path.Length,7))!= "http://" ){
                        bool t = true;
                        if(path[path.Length - 1] == '/')
                                    path = path.Substring(0, path.Length-1);
                        for(int i=0; i<set.Count;++i)
                            if(set[i]==(url + path))
                                t=false;
                            
                        for(int i = 0;i<path.Length;++i)
                            if(path[i]==' ')
                                t = false;
                            if(t==true){
                                
                                    
                                    if(collSlash!=2)
                                    list.Enqueue(url + path);
                                    set.Add((url + path));
                                    result+= collSlash.ToString() + url + path + " ";
                                
                            }
                            }
            }
           }
               var message = new { data = result };
                var json = JsonSerializer.Serialize(message);
                return Content(json, "application/json");

        }
        static HtmlDocument GetDocument(string link){
            var doc = new HtmlDocument();
            try{
                doc.OptionReadEncoding = false;
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(link);
                request.Method = "GET";
                request.PreAuthenticate = true;
                request.Credentials = CredentialCache.DefaultCredentials;
                request.UseDefaultCredentials = true;
            using (var response = (HttpWebResponse)request.GetResponse())
            {
                using (var stream = response.GetResponseStream())
                {
                    doc.Load(stream, Encoding.UTF8);
                }
            }
            return doc;
           }
            catch{
                doc = new HtmlDocument();
                return doc;
           }
            }


    }
}
