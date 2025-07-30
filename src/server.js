require('dotenv').config();
const express=require("express");
 const mongoose=require("mongoose");
 const app=express();
 const Book=require("./models/Book");
 const port=3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors({
  origin: 'https://first-mern-project-gao7.vercel.app/', 
  credentials: true
}));


 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("DB is connected finally"))
  .catch(() => console.log("DB is not connected"))
 
app.get("/", (req, res) => {
  res.send("🚀 Backend is working!");
});

 app.get("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
/* 
    app.get("/books", async (req, res) => {
      try {
        const {
          page,
          limit,
          genre,
          minYear,
          maxYear,
          author,
          minPrice,
          maxPrice,
          sortBy,
          order,
          search,
        } = req.query;

        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        // Build filter object
        const filter = {};

        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ];
        }

        if (genre) filter.genre = genre;
        if (minYear || maxYear) {
          filter.publishedYear = {
            ...(minYear && { $gte: parseInt(minYear) }),
            ...(maxYear && { $lte: parseInt(maxYear) })
          };
        }
        if (author) filter.author = { $regex: author, $options: "i" };
        if (minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && { $gte: parseFloat(minPrice) }),
            ...(maxPrice && { $lte: parseFloat(maxPrice) })
          };
        }

        // Sort options
        const sortOptions = { [sortBy || 'title']: order === 'desc' ? -1 : 1 };

        // Execute queries in parallel for better performance
        const [books, totalBooks] = await Promise.all([
          Book
            .find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(perPage),
            
          Book.countDocuments(filter)
        ]);

        res.json({
          books,
          totalBooks,
          currentPage,
          totalPages: Math.ceil(totalBooks / perPage)
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

 
*/
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    console.log("Books count:", books.length);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete("/books/:id", async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});
app.listen(port,()=>{
 console.log(`server is running at http://localhost:${port}`);
 });
 

