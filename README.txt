Dacă ai nevoie să modifici produsele, de exemplu să schimbi prețurile, numele, 
descrierile sau să adaugi elemente noi, ar trebui să editezi direct acest array în fișierul tău products.js



Pentru a modifica un produs existent, schimbă proprietățile relevante direct în obiectele array-ului. De exemplu, dacă dorești să actualizezi prețul pentru
 "Fujifilm X100T Compact Digital Camera" de la 520.00 la 530.00 USD, ai modifica proprietatea de preț astfel:

{
  "name": "Fujifilm X100T Compact Digital Camera",
  "imagePath": "images/product_1.png",
  "price": 530.00,  // Preț actualizat
  "category": "Men",
  "description": "O cameră compactă versatilă cu un senzor de 16 MP, perfectă pentru captarea imaginilor de înaltă calitate în deplasare."
},


Pentru a adăuga un produs nou, ai adăuga un obiect nou în array cu toate detaliile necesare:

{
  "name": "Numele Produsului Nou",
  "imagePath": "images/new_product.png",
  "price": 300.00,
  "category": "Category",  // Exemplu: "Men", "Women", "Accessories"
  "description": "Descrierea noului produs."
}


produsele de pe pagina sunt incarcate dinamic ultilizant scriptui js 
shopingcart ul stie ce produse luam din localStorage al paginii il salvam