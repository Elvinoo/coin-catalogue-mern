import express from "express";

import cors from "cors";
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
app.use('/images', express.static(__dirname + '/public/images'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
import Coin from "./Models/CoinModel.js"
import  User from "./Models/UserModel.js";

app.use(
  cors({
    origin: "*",
  })
);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on the port " + PORT);
  });
});
app.get("/", async (req, res) => {
  try {
    const coins = await Coin.find({ isRemoved: false });

    res.status(200).json(coins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/coins/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const coins = await Coin.find({
      category: { $regex: `${category}`, $options: "i" },
    });
    res.status(200).json(coins);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/addCoin", async (req, res) => {
  const coin = new Coin({
    ...req.body,
  });
  try {
    await coin.save();
    res.status(200).json({ newCoin: coin, successfull: true });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/search", async (req, res) => {
  const { q, ...rest } = req.query;

  let query = {
    isRemoved: 0,
    price: { $gte: Number(rest.priceFrom), $lte: Number(rest.priceTo )},
    year: { $gte: Number(rest.yearFrom), $lte: Number(rest.yearTo) },
  };


  
  if (rest.category) query.category = rest.category;
  if (rest.country) query.country = rest.country;
  if (rest.metal) query.metal = rest.metal;

  try {
    let data;
    if (Object.keys(rest).length === 0) {
      data = await Coin.find({
        $or: [
          { coinName: { $regex: q, $options: "i" } },
          { longDesc: { $regex: q, $options: "i" } },
        ],
        isRemoved: 0,
      });
    } else {
      data = await Coin.find(query);
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ found: 0 });
  }
});
app.put("/editCoin/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const coin = await Coin.findByIdAndUpdate(id, updatedData);
   
    if (coin) {
      res.send({ successful: true });
    } else {
      res.status(404).send({ error: "Coin not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//#region
//Registration part here
/* app.post("/register", async (req, res) => {
  try {
    const { login, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ login, password });

    // Hash the password
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
}); */
//#endregion

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ login: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const coin = await Coin.findByIdAndUpdate(id, { isRemoved: true });
    if (coin) {
      res.send({ isRemoved: true });
    } else {
      res.status(404).send({ error: "Coin not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.put("/editCoin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const coin = await Coin.findByIdAndUpdate(id, updatedData, { new: true });
    res.send({ successful: true, coin });
  } catch (err) {
    res.send({ error: err });
  }
});
/* 
const x_api_key = process.env.X_API_KEY;
connection.connect((err) => {
    if (!err) {
        console.log('Connected to database!')
    } else {
        console.log(err)
    }
})

const apiKeyVerificationMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey !== x_api_key) {
        return res.status(401).send('Unauthorized');
    }
    next();
};
app.use(apiKeyVerificationMiddleware);


app.post("/admin-panel/register", (req, res) => {
    const { userName, password } = req.body;

    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        userName: userName.toLowerCase(),
        password: hash
    }
    connection.query("SELECT * FROM user_login WHERE userName=?", [userName], (err, data) => {
        if (err) {
            return res.status(400).send(err)
        } else {
            if (data.length > 0) {
                res.send('The Username is taken. Try another')
            } else {
                connection.query("INSERT INTO user_login SET ?", user, (err, data) => {
                    if (err) return res.status(500).send({ error: "Internal Server Error" })
                    res.send("User sucessfully registered")
                })
            }
        }
    })
});
app.post("/login", (req, res) => {

    const { userName, password } = req.body;
    connection.query("SELECT * FROM user_login WHERE userName=?", [userName], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred while checking the user credentials." });
        }
        if (data.length === 0) {
            res.status(401).json({ error: "Invalid Username" })
        } else {
            const hashedPassword = data[0].password;
            const verification = bcrypt.compareSync(password, hashedPassword)
            if (verification) {
                const user = data[0]
                const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "1h"
                });
                res.status(200).json({ loggedIn: true, token })
            } else {
                res.send({ error: "Invalid password. Please try again" })
            }

        }
    })

})






app.get("/admin-panel/editCoin", (req, res) => {
    connection.query(`SELECT * FROM coins WHERE isRemoved=0 ORDER BY id DESC;`, (err, data) => {
        if (err) return res.status(500).send({ error: "Couldn't connect to Database" })
        res.json(data)
    })
});


app.put('/editCoin/:id', (req, res) => {
    const { id } = req.params;
    let updatedData = req.body;
    let query = 'UPDATE coins SET ? WHERE id=?'
    connection.query(query, [updatedData, id], (err, data) => {
        if (err) {
            res.send({ err })
        } else {
            res.send({ successfull: true })
        }
    })
});





 */
