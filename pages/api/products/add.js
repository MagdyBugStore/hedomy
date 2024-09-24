import connectDB from '../../../db';
import Product from '../../../models/Product';
import fileupload from './multer'; // Make sure to adjust the import path

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Use the `upload` middleware to handle file uploads
      fileupload(req, res, async function (error) {
        if (error) {
          console.error('Error uploading file:', error);
          return res.status(500).json({ error: 'Error uploading file , cause ' + error });
        }

        // If the file upload is successful, you can access the uploaded file URLs via req.file.location
        // const {
        //   title,
        //   desc,
        //   gender,
        //   colors,
        //   brand,
        //   category,
        //   slug,
        //   images,
        //   price,
        //   totalSell,
        //   gallery,
        //   condition,
        //   vendor,
        //   featured,
        //   trending,
        //   discount,
        //   variations,
        //   material,
        //   tags,
        //   sizes,
        //   review,
        //   rating,
        //   stock,
        //   ratingScore,
        //   dimension,
        // } = req.body;

        // // Create a new product using the Product model
        // const product = new Product({
        //   title: {
        //     en: title.en,
        //     ar: title.ar,
        //   },
        //   desc: {
        //     en: desc.en,
        //     ar: desc.ar,
        //   },
        //   gender: gender,
        //   colors: colors,
        //   brand: brand,
        //   category: category,
        //   slug: slug,
        //   images: images,
        //   price: price,
        //   totalSell: totalSell,
        //   gallery: gallery,
        //   condition: condition,
        //   vendor: vendor,
        //   featured: featured,
        //   trending: trending,
        //   discount: {
        //     banner: discount.banner,
        //     percentage: discount.percentage,
        //     expireDate: discount.expireDate,
        //     isActive: discount.isActive,
        //   },
        //   variations: variations,
        //   material: {
        //     en: material.en,
        //     ar: material.ar,
        //   },
        //   tags: tags,
        //   sizes: sizes,
        //   review: review,
        //   rating: rating,
        //   stock: stock,
        //   ratingScore: ratingScore,
        //   dimension: {
        //     en: dimension.en,
        //     ar: dimension.ar,
        //   },
        // });

        // // Save the product to the database
        // const savedProduct = await product.save();
        // res.status(201).json(savedProduct);
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });ش
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
