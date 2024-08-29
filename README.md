
# Simple Shopping Cart Application

This is a simple shopping cart web application built with Node.js, Express, and PostgreSQL. It allows users to view products, add them to a shopping cart, and remove items from the cart.

## Features

- Display a list of products from a PostgreSQL database.
- Add products to a shopping cart.
- View and manage the shopping cart (quantity, total price).
- Remove items from the shopping cart.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: JavaScript runtime environment.
- **npm**: Node.js package manager.
- **PostgreSQL**: Relational database.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/simple-shopping-cart.git
   cd simple-shopping-cart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the PostgreSQL database:**
    - Create a PostgreSQL database named `tt`.
    - Create a `product` table with the following columns:
      ```sql
      
      CREATE TABLE product (
        product_id SERIAL PRIMARY KEY,
        product_brand VARCHAR(100) NOT NULL,
        product_price NUMERIC(8,2) NOT NULL,
        product_ram CHAR(5) NOT NULL,
        product_storage VARCHAR(50) NOT NULL,
        product_camera VARCHAR(20) NOT NULL,
        product_quantity INTEGER NOT NULL,
        product_name VARCHAR(100),
        product_price DECIMAL(10, 2),
        product_image VARCHAR(100),
        product_status CHAR(1) NOT NULL CHECK (product_status IN ('0', '1')) 
      );
      ```
      
```sql
ALTER TABLE product
  ADD PRIMARY KEY (product_id);
```
```sql
ALTER TABLE product
  ADD COLUMN product_id SERIAL PRIMARY KEY;
```

```sql
CREATE SEQUENCE product_id_seq;

ALTER TABLE product
  ALTER COLUMN product_id SET NOT NULL,
  ALTER COLUMN product_id SET DEFAULT nextval('product_id_seq');

ALTER SEQUENCE product_id_seq OWNED BY product.product_id;

```
```sql
SELECT setval('product_id_seq', COALESCE((SELECT MAX(product_id) FROM product), 1), false);

```
    - Insert some sample data into the `product` table.

4. **Configure database connection:**
    - Ensure your PostgreSQL configuration matches the one in `server.js`:
      ```javascript
      const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "tt",
        password: "Ezo20901",
        port: 5432,
      });
      ```

## Running the Application

1. **Start the server:**
   ```bash
   node server.js
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

- `server.js`: Main server file handling routes and server logic.
- `views/`: Directory containing EJS templates.
    - `product.ejs`: Main template for displaying products and the shopping cart.
- `public/`: Directory for static files like images and CSS (if needed).

## Dependencies

The application uses the following npm packages:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **pg**: PostgreSQL client for Node.js.
- **body-parser**: Middleware for parsing incoming request bodies.
- **express-session**: Session middleware for Express.
- **ejs**: Embedded JavaScript templating.

---
