

import fetch from 'node-fetch';

const BASE_URL = 'https://fakestoreapi.com';
const [, , method, resource, ...args] = process.argv;

const log = (data) => console.log(JSON.stringify(data, null, 2));

async function main() {
  try {
    // GET all products
    if (method === 'GET' && resource === 'products' && args.length === 0) {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      log(data);
    }

    // GET product by ID
    else if (method === 'GET' && resource.startsWith('products/')) {
      const productId = resource.split('/')[1];
      const res = await fetch(`${BASE_URL}/products/${productId}`);
      const data = await res.json();
      log(data);
    }

    // POST new product
    else if (method === 'POST' && resource === 'products') {
      const [title, price, category] = args;
      const body = {
        title,
        price: parseFloat(price),
        category
      };

      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      log(data);
    }

    // DELETE product by ID
    else if (method === 'DELETE' && resource.startsWith('products/')) {
      const productId = resource.split('/')[1];
      const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      log(data);
    }

    else {
      console.log('Comando no reconocido. Revisa el formato.');
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
