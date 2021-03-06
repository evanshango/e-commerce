using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    if (brands != null)
                        foreach (var item in brands)
                        {
                            context.ProductBrands.Add(item);
                        }
                    await context.SaveChangesAsync();
                }
                
                if (!context.ProductTypes.Any())
                {
                    var typesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    if (types != null)
                        foreach (var item in types)
                        {
                            context.ProductTypes.Add(item);
                        }   
                    await context.SaveChangesAsync();
                }
                
                if (!context.Products.Any())
                {
                    var prods = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(prods);

                    if (products != null)
                        foreach (var item in products)
                        {
                            context.Products.Add(item);
                        }

                    await context.SaveChangesAsync();
                }
                
                if (!context.DeliveryMethods.Any())
                {
                    var dmData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/delivery.json");
                    var deliveries = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    if (deliveries != null)
                        foreach (var item in deliveries)
                        {
                            context.DeliveryMethods.Add(item);
                        }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(e, e.Message);
            }
        }
    }
}