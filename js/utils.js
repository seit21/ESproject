import displayModal from "./modal.js";
const fetchProducts = async (url) => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("An error occurred during the fetch:", error);
  }
};
function get(item) {
  if (document.querySelector(item)) {
    return document.querySelector(item);
  } else {
    console.log(`${item} is not found!`);
  }
}

function getStorageItems(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
}

function addUserItemToStorage(id, email, username, password) {
  let item = { id, email, username, password};
  localStorage.setItem('user', JSON.stringify(item));
}

function addItemToStorage(productID, key) {
  const likes = getStorageItems(key) || [];
  const existingItemIndex = likes.findIndex((product) => product.id == productID);
  const comingitem = menuArray.find((item) => item.id == productID);

  if (existingItemIndex === -1) {
    likes.push(comingitem);
    localStorage.setItem(key, JSON.stringify(likes));
  } else {
    // likes.splice(existingItemIndex, 1); // Remove the existing item
    // localStorage.setItem(key, JSON.stringify(likes));
    // console.log('Item removed:', productID);
  }
}



function removeItemFromStorage(id, key) {
  const likes = getStorageItems(key);
  const updatedLikes = likes.filter((item) => item.id != id);
  localStorage.setItem(key, JSON.stringify(updatedLikes));
}
function addToCart(){
  let cartIcons = document.querySelectorAll(".cart_icon")
  console.log(cartIcons);
cartIcons.forEach(cartIcon =>{
    cartIcon.addEventListener('click', function(){
        let cartIconId = cartIcon.closest('div').id
        console.log(cartIconId);
       displayModal(cartIconId)          
    })
})
}
function likeBg() {
  let newMenuArray = getStorageItems('menuArray');
  const likeIcons = document.querySelectorAll('.like_icon');
  
  likeIcons.forEach(likeIcon => {
      let likeIconId = likeIcon.closest('div').id;
      const newObject = newMenuArray.find((item) => item.id == likeIconId);
      let isliked = newObject.isliked;

      if (isliked) {
          likeIcon.style.backgroundImage = "url('../assets/icons/red_like_icon.svg')";
      } else {
          likeIcon.style.backgroundImage = "url('../assets/icons/like_icon.svg')";
      }

      likeIcon.addEventListener('click', function() {
          if (!isliked) {
              addToLikes(likeIconId);
              likeIcon.style.backgroundImage = "url('../assets/icons/red_like_icon.svg')";
          } else {
              removeFromLikes(likeIconId);
              likeIcon.style.backgroundImage = "url('../assets/icons/like_icon.svg')";
          }
          isliked = !isliked; // Toggle isliked status
      });
  });
}

function addToLikes(id) {
  let likeCount = get('.likes__count');
  let newMenuArray = getStorageItems('menuArray');
  const likeItem = newMenuArray.find((item) => item.id == id);
  
  if (!likeItem.isliked) {
      likeItem.isliked = true;
      addItemToStorage(id, "likes");
      let likes = getStorageItems('likes');
      let count1 = likes.length;
      likeCount.innerText = count1;
      localStorage.setItem('menuArray', JSON.stringify(newMenuArray));
  }
}

function removeFromLikes(id) {
  let likeCount = get('.likes__count');
  let newMenuArray = getStorageItems('menuArray');
  const likeItem = newMenuArray.find((item) => item.id == id);
  
  if (likeItem.isliked) {
      likeItem.isliked = false;
      removeItemFromStorage(id, 'likes');
      let likes = getStorageItems('likes');
      let count1 = likes.length;
      likeCount.innerText = count1;
      localStorage.setItem('menuArray', JSON.stringify(newMenuArray));
  }
}

const menuArray = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    rating: 4.12,

    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    category: ["Электроника", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    rating: 4.32,

    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: ["Бытовая техника", "Акция"],
    discountPrice: 39.19,
    replyNumber: 229,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },

  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    rating: 2.82,

    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: ["Аксессуары", "Акция"],
    discountPrice: 19.99,
    replyNumber: 19,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    rating: 3.82,

    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: ["Красота и уход", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    rating: 4.22,

    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: ["Здоровье", "Акция"],
    discountPrice: 29.99,
    replyNumber: 239,
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    rating: 4.2,

    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: ["Товары для дома", "Акция"],
    discountPrice: 31.99,
    replyNumber: 29,
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    rating: 4.42,

    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: ["Хобби и творчество", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },

  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    rating: 4.81,

    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: ["Товары для дома", "Акция"],
    discountPrice: 32.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  },

  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    rating: 4.52,

    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: ["Одежда", "Акция"],
    discountPrice: 39.99,
    replyNumber: 119,
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    rating: 2.82,

    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: ["Бытовая техника", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    rating: 4.12,

    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: [" Электроника", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    rating: 4.22,

    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: ["Электроника", "Акция"],
    discountPrice: 39.99,
    replyNumber: 21,
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    rating: 4.87,

    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: ["Одежда", "Акция"],
    discountPrice: 39.99,
    replyNumber: 21,
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    rating: 1.82,

    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: ["Хобби и творчество", "Акция"],
    discountPrice: 9.99,
    replyNumber: 39,
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    rating: 4.22,

    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: ["Одежда", "Акция"],
    discountPrice: 39.9,
    replyNumber: 29,
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    rating: 3.82,

    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: [" Здоровье", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    rating: 4.81,

    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: [" Здоровье", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: ["Хобби и творчество", "Акция"],
    discountPrice: 39.99,
    replyNumber: 219,
    rating: 4.12,

    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  },
  {
    id: 20,
    title: "Opna Women's Short Sleeve Moisture",
    price: 475,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque id nisi commodi consequuntur asperiores!",
    rating: 4.52,

    image:
      "https://images.uzum.uz/cklotqjk9fq68304kta0/t_product_540_high.jpg#1707622468871",
    category: "Хобби и творчество",
    discountPrice: 39.99,
    replyNumber: 219,
  },
  {
    id: 21,
    title: "ad et natus qui",
    price: 475,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque id nisi commodi consequuntur asperiores!",
    rating: 4.52,

    image:
      "https://images.uzum.uz/cklotqjk9fq68304kta0/t_product_540_high.jpg#1707622468871",
    category: "Бытовая техника",
    discountPrice: 39.99,
    replyNumber: 219,
  },
  {
    id: 22,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    rating: 4.69,
    category: " Аксессуары",
    discountPrice: 39.99,
    replyNumber: 22,
    image: "https://cdn.dummyjson.com/product-images/1/1.jpg",
  },
  {
    id: 23,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    rating: 4.44,
    stock: 34,
    discountPrice: 31.99,
    replyNumber: 20,
    category: " Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/2/1.jpg",
  },
  {
    id: 24,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    rating: 4.09,
    discountPrice: 19.99,
    replyNumber: 22,
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
    image: "https://cdn.dummyjson.com/product-images/3/1.jpg",
  },
  {
    id: 25,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,

    rating: 4.3,
    discountPrice: 19.99,
    replyNumber: 22,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/4/1.jpg",
  },
  {
    id: 26,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    rating: 4.09,
    discountPrice: 19.99,
    replyNumber: 22,
    category: " Здоровье",
    image: "https://cdn.dummyjson.com/product-images/5/1.jpg",
  },
  {
    id: 27,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    rating: 4.57,
    discountPercentage: 11.02,
    discountPrice: 39.99,
    category: "Здоровье",
    replyNumber: 22,
    image: "https://cdn.dummyjson.com/product-images/6/1.png",
  },
  {
    id: 28,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    rating: 4.25,
    discountPrice: 39.99,
    replyNumber: 22,
    category: " Электроника",
    image: "https://cdn.dummyjson.com/product-images/7/1.jpg",
  },
  {
    id: 29,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    rating: 4.43,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/8/1.jpg",
  },
  {
    id: 30,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    rating: 4.54,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/9/1.jpg",
  },
  {
    id: 31,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    rating: 4.43,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/10/1.jpg",
  },
  {
    id: 32,
    title: "perfume Oil",
    description:
      "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    price: 13,
    rating: 4.26,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/11/1.jpg",
  },
  {
    id: 33,
    title: "Brown Perfume",
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    price: 40,
    rating: 4,
    discountPrice: 39.99,
    replyNumber: 12,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/12/1.jpg",
  },
  {
    id: 34,
    title: "Fog Scent Xpressio Perfume",
    description:
      "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
    price: 13,
    rating: 4.59,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Хобби и творчество",
    image: "https://cdn.dummyjson.com/product-images/13/1.jpg",
  },
  {
    id: 35,
    title: "Non-Alcoholic Concentrated Perfume Oil",
    description:
      "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
    price: 120,
    rating: 4.21,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Хобби и творчество",
    image: "https://cdn.dummyjson.com/product-images/14/1.jpg",
  },
  {
    id: 36,
    title: "Eau De Perfume Spray",
    description:
      "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
    price: 30,
    rating: 4.7,
    discountPrice: 39.99,
    replyNumber: 22,
    category: " Здоровье",
    image: "https://cdn.dummyjson.com/product-images/15/1.jpg",
  },
  {
    id: 37,
    title: "Hyaluronic Acid Serum",
    description:
      "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
    price: 19,
    rating: 4.83,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "skincare",
    image: "https://cdn.dummyjson.com/product-images/16/1.png",
  },
  {
    id: 38,
    title: "Tree Oil 30ml",
    description:
      "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
    price: 12,
    rating: 4.52,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/17/1.jpg",
  },
  {
    id: 39,
    title: "Oil Free Moisturizer 100ml",
    description:
      "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
    price: 40,
    rating: 1.82,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "skincare",
    image: "https://cdn.dummyjson.com/product-images/18/1.jpg",
  },
  {
    id: 40,
    title: "Skin Beauty Serum.",
    description:
      "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
    price: 46,
    rating: 4.81,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/19/1.jpg",
  },
  {
    id: 41,
    title: "Freckle Treatment Cream- 15gm",
    description:
      "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
    price: 70,
    rating: 4.06,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/20/1.jpg",
  },
  {
    id: 42,
    title: "- Daal Masoor 500 grams",
    description: "Fine quality Branded Product Keep in a cool and dry place",
    price: 20,
    rating: 4.12,
    category: " Здоровье",
    discountPrice: 39.99,
    replyNumber: 22,
    image: "https://cdn.dummyjson.com/product-images/21/1.png",
  },
  {
    id: 43,
    title: "Elbow Macaroni - 400 gm",
    description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
    price: 14,
    rating: 4.22,
    discountPrice: 39.99,
    replyNumber: 22,
    category: " Здоровье",
    image: "https://cdn.dummyjson.com/product-images/22/1.jpg",
  },
  {
    id: 44,
    title: "Orange Essence Food Flavou",
    description:
      "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
    price: 14,
    rating: 4.85,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/23/1.jpg",
  },
  {
    id: 45,
    title: "cereals muesli fruit nuts",
    description:
      "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
    price: 46,
    rating: 4.94,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/24/1.jpg",
  },
  {
    id: 46,
    title: "Gulab Powder 50 Gram",
    description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
    price: 70,
    rating: 4.87,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/25/1.png",
  },
  {
    id: 47,
    title: "Plant Hanger For Home",
    description:
      "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
    price: 41,
    rating: 4.08,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Товары для дома",
    image: "https://cdn.dummyjson.com/product-images/26/1.jpg",
  },
  {
    id: 48,
    title: "Flying Wooden Bird",
    description:
      "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
    price: 51,
    rating: 4.41,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Товары для дома",
    image: "https://cdn.dummyjson.com/product-images/27/1.jpg",
  },
  {
    id: 49,
    title: "3D Embellishment Art Lamp",
    description:
      "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
    price: 20,
    rating: 4.82,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Товары для дома",
    image: "https://cdn.dummyjson.com/product-images/28/1.jpg",
  },
  {
    id: 50,
    title: "Handcraft Chinese style",
    description:
      "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
    price: 60,
    rating: 4.44,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Хобби и творчество",
    image: "https://cdn.dummyjson.com/product-images/29/1.jpg",
  },
  {
    id: 51,
    title: "Key Holder",
    description:
      "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    rating: 4.92,
    discountPrice: 39.99,
    replyNumber: 22,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/30/1.jpg",
  },
  {
    id: 52,
    title: "Comfortable Running Shoes",
    description:
      "Ideal for jogging and running activities. Breathable material for maximum comfort.",
    price: 49.99,
    rating: 4.75,
    discountPrice: 59.99,
    replyNumber: 18,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/52/1.jpg",
  },
  {
    id: 53,
    title: "Healthy Green Tea Extract",
    description:
      "Boost your immunity with this high-quality green tea extract. Rich in antioxidants.",
    price: 15.99,
    rating: 4.88,
    discountPrice: 19.99,
    replyNumber: 30,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/53/1.jpg",
  },
  {
    id: 54,
    title: "Stylish Leather Jacket",
    description:
      "Fashionable leather jacket for a trendy look. Stay warm in style.",
    price: 79.99,
    rating: 4.6,
    discountPrice: 99.99,
    replyNumber: 25,
    category: "Одежда",
    image: "https://cdn.dummyjson.com/product-images/54/1.jpg",
  },
  {
    id: 55,
    title: "Smart Fitness Tracker",
    description:
      "Track your health and fitness goals with this advanced smart tracker.",
    price: 59.99,
    rating: 4.9,
    discountPrice: 69.99,
    replyNumber: 35,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/55/1.jpg",
  },
  {
    id: 56,
    title: "Aromatherapy Essential Oils Set",
    description:
      "Create a relaxing atmosphere with this set of essential oils. Perfect for self-care.",
    price: 24.99,
    rating: 4.85,
    discountPrice: 29.99,
    replyNumber: 28,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/56/1.jpg",
  },
  {
    id: 57,
    title: "Compact Blender",
    description:
      "Efficient and compact blender for smoothies and shakes. Easy to clean and use.",
    price: 34.99,
    rating: 4.7,
    discountPrice: 39.99,
    replyNumber: 20,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/57/1.jpg",
  },
  {
    id: 58,
    title: "Orthopedic Memory Foam Pillow",
    description:
      "Ensure a good night's sleep with this ergonomic memory foam pillow. Neck support at its best.",
    price: 29.99,
    rating: 4.8,
    discountPrice: 34.99,
    replyNumber: 26,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/58/1.jpg",
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    rating: 4.22,

    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: ["Обувь", "Акция"],
    discountPrice: 19.99,
    replyNumber: 212,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    id: 59,
    title: "Classic Leather Watch",
    description:
      "Timeless design with a leather strap. Elevate your style with this classic timepiece.",
    price: 69.99,
    rating: 4.6,
    discountPrice: 79.99,
    replyNumber: 22,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/59/1.jpg",
  },
  {
    id: 60,
    title: "Silk Sleep Mask",
    description:
      "Experience luxurious sleep with this silk sleep mask. Gentle on your skin and eyes.",
    price: 12.99,
    rating: 4.9,
    discountPrice: 14.99,
    replyNumber: 18,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/60/1.jpg",
  },
  {
    id: 61,
    title: "Wireless Bluetooth Earbuds",
    description:
      "Immerse yourself in music with these wireless earbuds. High-quality sound and comfortable fit.",
    price: 49.99,
    rating: 4.7,
    discountPrice: 59.99,
    replyNumber: 30,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/61/1.jpg",
  },
  {
    id: 62,
    title: "Cotton Casual T-Shirt",
    description:
      "Stay cool and stylish with this comfortable cotton t-shirt. Perfect for casual outings.",
    price: 19.99,
    rating: 4.5,
    discountPrice: 24.99,
    replyNumber: 23,
    category: "Одежда",
    image: "https://cdn.dummyjson.com/product-images/62/1.jpg",
  },
  {
    id: 63,
    title: "Digital Blood Pressure Monitor",
    description:
      "Monitor your blood pressure at home with this easy-to-use digital device. Stay healthy!",
    price: 39.99,
    rating: 4.85,
    discountPrice: 49.99,
    replyNumber: 28,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/63/1.jpg",
  },
  {
    id: 64,
    title: "Travel-friendly Toiletry Bag",
    description:
      "Organize your essentials while traveling with this compact and durable toiletry bag.",
    price: 15.99,
    rating: 4.6,
    discountPrice: 19.99,
    replyNumber: 21,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/64/1.jpg",
  },

  {
    id: 65,
    title: "Anti-Aging Face Serum",
    description:
      "Revitalize your skin with this anti-aging face serum. Achieve a youthful and radiant glow.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 39.99,
    replyNumber: 35,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/65/1.jpg",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    rating: 4.81,

    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: ["Одежда", "Акция"],
    discountPrice: 39.29,
    replyNumber: 29,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: 66,
    title: "Smart Home Security Camera",
    description:
      "Keep an eye on your home with this smart security camera. Easy setup and high-resolution video.",
    price: 79.99,
    rating: 4.8,
    discountPrice: 89.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/66/1.jpg",
  },
  {
    id: 67,
    title: "Soothing Lavender Scented Candles",
    description:
      "Relax and unwind with the calming aroma of lavender. Set the mood with these candles.",
    price: 17.99,
    rating: 4.7,
    discountPrice: 21.99,
    replyNumber: 19,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/67/1.jpg",
  },
  {
    id: 68,
    title: "Compact Espresso Maker",
    description:
      "Brew your favorite espresso at home with this space-saving and efficient espresso maker.",
    price: 49.99,
    rating: 4.85,
    discountPrice: 59.99,
    replyNumber: 31,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/68/1.jpg",
  },
  {
    id: 69,
    title: "Running Armband for Smartphones",
    description:
      "Keep your smartphone secure while jogging with this adjustable and comfortable running armband.",
    price: 12.99,
    rating: 4.6,
    discountPrice: 15.99,
    replyNumber: 24,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/69/1.jpg",
  },

  {
    id: 70,
    title: "Fitness Yoga Mat",
    description:
      "Enhance your yoga practice with this non-slip and comfortable fitness yoga mat.",
    price: 24.99,
    rating: 4.9,
    discountPrice: 29.99,
    replyNumber: 29,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/70/1.jpg",
  },
  {
    id: 71,
    title: "Leather Business Briefcase",
    description:
      "Carry your essentials in style with this spacious and elegant leather business briefcase.",
    price: 69.99,
    rating: 4.8,
    discountPrice: 79.99,
    replyNumber: 27,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/71/1.jpg",
  },
  {
    id: 72,
    title: "Aloe Vera Gel Moisturizer",
    description:
      "Hydrate and soothe your skin with this natural aloe vera gel moisturizer. Perfect for all skin types.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 17.99,
    replyNumber: 22,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/72/1.jpg",
  },
  {
    id: 73,
    title: "Wireless Charging Pad",
    description:
      "Charge your devices wirelessly with this sleek and efficient wireless charging pad.",
    price: 34.99,
    rating: 4.85,
    discountPrice: 39.99,
    replyNumber: 33,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/73/1.jpg",
  },
  {
    id: 74,
    title: "Stainless Steel Water Bottle",
    description:
      "Stay hydrated on the go with this durable and stylish stainless steel water bottle.",
    price: 19.99,
    rating: 4.6,
    discountPrice: 24.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/74/1.jpg",
  },
  {
    id: 75,
    title: "Casual Denim Jeans",
    description:
      "Upgrade your wardrobe with these comfortable and versatile casual denim jeans.",
    price: 39.99,
    rating: 4.9,
    discountPrice: 49.99,
    replyNumber: 28,
    category: "Одежда",
    image: "https://cdn.dummyjson.com/product-images/75/1.jpg",
  },
  {
    id: 76,
    title: "Digital Kitchen Scale",
    description:
      "Accurately measure your ingredients with this digital kitchen scale. Compact and easy to use.",
    price: 18.99,
    rating: 4.7,
    discountPrice: 21.99,
    replyNumber: 20,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/76/1.jpg",
  },
  {
    id: 77,
    title: "Refreshing Green Tea Facial Cleanser",
    description:
      "Cleanse and rejuvenate your skin with this refreshing green tea facial cleanser.",
    price: 12.99,
    rating: 4.8,
    discountPrice: 15.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/77/1.jpg",
  },
  {
    id: 78,
    title: "Smart Home Thermostat",
    description:
      "Control your home's temperature with this smart and energy-efficient home thermostat.",
    price: 59.99,
    rating: 4.9,
    discountPrice: 69.99,
    replyNumber: 32,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/78/1.jpg",
  },
  {
    id: 79,
    title: "Hiking Backpack",
    description:
      "Explore the outdoors with this spacious and comfortable hiking backpack. Durable and reliable.",
    price: 49.99,
    rating: 4.7,
    discountPrice: 59.99,
    replyNumber: 26,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/79/1.jpg",
  },
  {
    id: 80,
    title: "Compact Hair Dryer",
    description:
      "Achieve quick and efficient hair drying with this compact and powerful hair dryer.",
    price: 29.99,
    rating: 4.6,
    discountPrice: 34.99,
    replyNumber: 19,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/80/1.jpg",
  },
  {
    id: 81,
    title: "Magnetic Posture Corrector",
    description:
      "Improve your posture with this magnetic posture corrector. Comfortable and discreet.",
    price: 17.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 24,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/81/1.jpg",
  },
  {
    id: 82,
    title: "Classic Leather Belt",
    description:
      "Complete your look with this timeless classic leather belt. Adjustable and stylish.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/82/1.jpg",
  },
  {
    id: 83,
    title: "Hydrating Rose Water Mist",
    description:
      "Revitalize your skin with this hydrating rose water mist. Refreshing and soothing.",
    price: 13.99,
    rating: 4.9,
    discountPrice: 16.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/83/1.jpg",
  },
  {
    id: 84,
    title: "Wireless Noise-Canceling Headphones",
    description:
      "Immerse yourself in music without distractions with these wireless noise-canceling headphones.",
    price: 79.99,
    rating: 4.8,
    discountPrice: 89.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/84/1.jpg",
  },
  {
    id: 85,
    title: "Bamboo Fiber Bed Sheets",
    description:
      "Experience ultimate comfort with these luxurious bamboo fiber bed sheets. Soft and eco-friendly.",
    price: 44.99,
    rating: 4.7,
    discountPrice: 54.99,
    replyNumber: 22,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/85/1.jpg",
  },
  {
    id: 86,
    title: "Chic Sunglasses",
    description:
      "Protect your eyes in style with these chic sunglasses. UV protection and trendy design.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 34.99,
    replyNumber: 25,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/86/1.jpg",
  },
  {
    id: 87,
    title: "Detoxifying Charcoal Face Mask",
    description:
      "Pamper your skin with this detoxifying charcoal face mask. Cleanses and revitalizes.",
    price: 16.99,
    rating: 4.6,
    discountPrice: 19.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/87/1.jpg",
  },
  {
    id: 88,
    title: "Smart Wi-Fi Plugs",
    description:
      "Control your appliances remotely with these smart Wi-Fi plugs. Energy-efficient and convenient.",
    price: 24.99,
    rating: 4.8,
    discountPrice: 29.99,
    replyNumber: 31,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/88/1.jpg",
  },
  {
    id: 89,
    title: "Portable Blender",
    description:
      "Blend your favorite smoothies on the go with this portable and rechargeable blender.",
    price: 39.99,
    rating: 4.9,
    discountPrice: 49.99,
    replyNumber: 27,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/89/1.jpg",
  },
  {
    id: 90,
    title: "Teeth Whitening Kit",
    description:
      "Achieve a bright smile with this effective teeth whitening kit. Professional results at home.",
    price: 27.99,
    rating: 4.7,
    discountPrice: 32.99,
    replyNumber: 20,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/90/1.jpg",
  },

  {
    id: 91,
    title: "Memory Foam Seat Cushion",
    description:
      "Enhance your comfort with this ergonomic memory foam seat cushion. Perfect for long hours of sitting.",
    price: 19.99,
    rating: 4.8,
    discountPrice: 24.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/91/1.jpg",
  },
  {
    id: 92,
    title: "Leather Passport Holder",
    description:
      "Travel in style with this leather passport holder. Keep your essentials organized and secure.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 18.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/92/1.jpg",
  },
  {
    id: 93,
    title: "Vitamin C Serum",
    description:
      "Revitalize your skin with this potent vitamin C serum. Brightens and nourishes for a radiant complexion.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 34.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/93/1.jpg",
  },
  {
    id: 94,
    title: "Wireless Charging Stand",
    description:
      "Charge your devices conveniently with this sleek wireless charging stand. Perfect for desks and nightstands.",
    price: 34.99,
    rating: 4.8,
    discountPrice: 39.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/94/1.jpg",
  },
  {
    id: 95,
    title: "Cozy Fleece Blanket",
    description:
      "Snuggle up with this cozy fleece blanket. Perfect for chilly evenings and movie nights.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 22,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/95/1.jpg",
  },
  {
    id: 96,
    title: "Wireless Bluetooth Speaker",
    description:
      "Enjoy high-quality sound with this portable wireless Bluetooth speaker. Ideal for outdoor activities.",
    price: 44.99,
    rating: 4.9,
    discountPrice: 54.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/96/1.jpg",
  },
  {
    id: 97,
    title: "Gym Duffel Bag",
    description:
      "Carry your workout essentials in style with this spacious and durable gym duffel bag.",
    price: 29.99,
    rating: 4.6,
    discountPrice: 34.99,
    replyNumber: 19,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/97/1.jpg",
  },
  {
    id: 98,
    title: "Facial Cleansing Brush",
    description:
      "Deep clean your skin with this advanced facial cleansing brush. Exfoliate and rejuvenate for a radiant glow.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/98/1.jpg",
  },
  {
    id: 99,
    title: "Smart Home Lighting Kit",
    description:
      "Transform your home with this smart lighting kit. Control colors and brightness with ease.",
    price: 59.99,
    rating: 4.9,
    discountPrice: 69.99,
    replyNumber: 32,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/99/1.jpg",
  },
  {
    id: 100,
    title: "Reusable Grocery Bags",
    description:
      "Go green with these reusable and eco-friendly grocery bags. Durable and spacious for your shopping needs.",
    price: 12.99,
    rating: 4.7,
    discountPrice: 15.99,
    replyNumber: 24,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/100/1.jpg",
  },
  {
    id: 101,
    title: "Resistance Band Set",
    description:
      "Enhance your home workouts with this versatile resistance band set. Suitable for various exercises.",
    price: 24.99,
    rating: 4.8,
    discountPrice: 29.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/101/1.jpg",
  },
  {
    id: 102,
    title: "Leather Watch Box",
    description:
      "Organize and display your watch collection with this elegant leather watch box. Stylish and practical.",
    price: 29.99,
    rating: 4.7,
    discountPrice: 34.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/102/1.jpg",
  },
  {
    id: 103,
    title: "Collagen Boosting Night Cream",
    description:
      "Revitalize your skin while you sleep with this collagen-boosting night cream. Wake up to radiant skin.",
    price: 19.99,
    rating: 4.9,
    discountPrice: 24.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/103/1.jpg",
  },
  {
    id: 104,
    title: "Wireless Gaming Mouse",
    description:
      "Step up your gaming experience with this responsive and wireless gaming mouse. Ergonomic design for comfort.",
    price: 34.99,
    rating: 4.8,
    discountPrice: 39.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/104/1.jpg",
  },
  {
    id: 105,
    title: "Soothing Lavender Pillow Mist",
    description:
      "Promote relaxation and better sleep with this soothing lavender pillow mist. Calming fragrance.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 18.99,
    replyNumber: 22,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/105/1.jpg",
  },
  {
    id: 106,
    title: "Bluetooth Fitness Tracker",
    description:
      "Track your fitness goals with this feature-packed Bluetooth fitness tracker. Heart rate monitor and more.",
    price: 44.99,
    rating: 4.9,
    discountPrice: 54.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/106/1.jpg",
  },
  {
    id: 107,
    title: "Running Shoe Insoles",
    description:
      "Enhance the comfort of your running shoes with these supportive and shock-absorbing insoles.",
    price: 12.99,
    rating: 4.6,
    discountPrice: 15.99,
    replyNumber: 19,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/107/1.jpg",
  },
  {
    id: 108,
    title: "Vitamin E Infused Body Lotion",
    description:
      "Nourish your skin with this vitamin E infused body lotion. Hydrates and leaves skin feeling silky smooth.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/108/1.jpg",
  },
  {
    id: 109,
    title: "Wireless Charging Mouse Pad",
    description:
      "Effortlessly charge your devices with this multi-functional wireless charging mouse pad. Sleek and practical.",
    price: 39.99,
    rating: 4.9,
    discountPrice: 49.99,
    replyNumber: 27,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/109/1.jpg",
  },
  {
    id: 110,
    title: "Organic Green Tea Sampler",
    description:
      "Experience a variety of organic green teas with this sampler pack. Refreshing and full of antioxidants.",
    price: 17.99,
    rating: 4.7,
    discountPrice: 21.99,
    replyNumber: 24,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/110/1.jpg",
  },

  {
    id: 111,
    title: "Adjustable Dumbbell Set",
    description:
      "Build strength at home with this adjustable dumbbell set. Compact and versatile for various workouts.",
    price: 49.99,
    rating: 4.8,
    discountPrice: 59.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/111/1.jpg",
  },
  {
    id: 112,
    title: "Minimalist Leather Wallet",
    description:
      "Streamline your essentials with this minimalist leather wallet. Slim design with ample card slots.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/112/1.jpg",
  },
  {
    id: 113,
    title: "Hyaluronic Acid Serum",
    description:
      "Hydrate and plump your skin with this hyaluronic acid serum. Achieve a youthful and radiant complexion.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 34.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/113/1.jpg",
  },
  {
    id: 114,
    title: "Wireless Ergonomic Keyboard",
    description:
      "Enhance your typing experience with this wireless ergonomic keyboard. Comfortable and efficient.",
    price: 34.99,
    rating: 4.8,
    discountPrice: 39.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/114/1.jpg",
  },
  {
    id: 115,
    title: "Cozy Knit Throw Blanket",
    description:
      "Stay warm and cozy with this stylish knit throw blanket. Perfect for adding warmth to any room.",
    price: 18.99,
    rating: 4.7,
    discountPrice: 21.99,
    replyNumber: 22,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/115/1.jpg",
  },
  {
    id: 116,
    title: "Bluetooth Wireless Earphones",
    description:
      "Experience wireless freedom with these Bluetooth earphones. Crisp sound and comfortable fit.",
    price: 44.99,
    rating: 4.9,
    discountPrice: 54.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/116/1.jpg",
  },
  {
    id: 117,
    title: "Yoga Mat Towel",
    description:
      "Enhance your yoga practice with this absorbent and non-slip yoga mat towel. Perfect for hot yoga sessions.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 18.99,
    replyNumber: 19,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/117/1.jpg",
  },
  {
    id: 118,
    title: "Tea Tree Oil Acne Treatment",
    description:
      "Combat acne with this effective tea tree oil treatment. Soothes and promotes clear skin.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/118/1.jpg",
  },
  {
    id: 119,
    title: "Smart Home Doorbell Camera",
    description:
      "Secure your home with this smart doorbell camera. Monitor your doorstep with HD video and two-way audio.",
    price: 59.99,
    rating: 4.9,
    discountPrice: 69.99,
    replyNumber: 32,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/119/1.jpg",
  },
  {
    id: 120,
    title: "Stainless Steel Mixing Bowls",
    description:
      "Upgrade your kitchen with this set of durable and versatile stainless steel mixing bowls.",
    price: 12.99,
    rating: 4.7,
    discountPrice: 15.99,
    replyNumber: 24,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/120/1.jpg",
  },

  {
    id: 121,
    title: "Adjustable Jump Rope",
    description:
      "Stay fit with this adjustable jump rope. Suitable for various workouts and fitness levels.",
    price: 14.99,
    rating: 4.8,
    discountPrice: 18.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/121/1.jpg",
  },
  {
    id: 122,
    title: "Leather Camera Strap",
    description:
      "Add style to your photography gear with this durable leather camera strap. Adjustable and comfortable.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/122/1.jpg",
  },
  {
    id: 123,
    title: "Retinol Anti-Wrinkle Serum",
    description:
      "Combat signs of aging with this retinol anti-wrinkle serum. Smooths and firms for youthful skin.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 34.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/123/1.jpg",
  },
  {
    id: 124,
    title: "Wireless Charging Desk Lamp",
    description:
      "Illuminate your workspace and charge devices simultaneously with this wireless charging desk lamp.",
    price: 34.99,
    rating: 4.8,
    discountPrice: 39.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/124/1.jpg",
  },
  {
    id: 125,
    title: "Soft Flannel Bed Sheets",
    description:
      "Experience ultimate comfort with these soft flannel bed sheets. Cozy and perfect for colder nights.",
    price: 18.99,
    rating: 4.7,
    discountPrice: 21.99,
    replyNumber: 22,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/125/1.jpg",
  },
  {
    id: 126,
    title: "Wireless Noise-Canceling Earbuds",
    description:
      "Enjoy immersive audio with these wireless noise-canceling earbuds. Compact and great for on-the-go.",
    price: 44.99,
    rating: 4.9,
    discountPrice: 54.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/126/1.jpg",
  },
  {
    id: 127,
    title: "Compact Folding Umbrella",
    description:
      "Stay dry in style with this compact folding umbrella. Lightweight and easy to carry in your bag.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 18.99,
    replyNumber: 19,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/127/1.jpg",
  },
  {
    id: 128,
    title: "Nourishing Hair Mask",
    description:
      "Revitalize your hair with this nourishing hair mask. Deep conditions and adds shine to your locks.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/128/1.jpg",
  },
  {
    id: 129,
    title: "Smart Home Security System",
    description:
      "Protect your home with this comprehensive smart home security system. Monitor and control remotely.",
    price: 59.99,
    rating: 4.9,
    discountPrice: 69.99,
    replyNumber: 32,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/129/1.jpg",
  },
  {
    id: 130,
    title: "Stainless Steel Food Storage Containers",
    description:
      "Organize your kitchen with these durable stainless steel food storage containers. Seal in freshness.",
    price: 12.99,
    rating: 4.7,
    discountPrice: 15.99,
    replyNumber: 24,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/130/1.jpg",
  },
  {
    id: 131,
    title: "Massage Therapy Roller",
    description:
      "Relieve muscle tension with this massage therapy roller. Compact design for targeted relief.",
    price: 14.99,
    rating: 4.8,
    discountPrice: 18.99,
    replyNumber: 25,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/131/1.jpg",
  },
  {
    id: 132,
    title: "Canvas Tote Bag",
    description:
      "Carry your essentials in style with this durable canvas tote bag. Spacious and perfect for everyday use.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/132/1.jpg",
  },
  {
    id: 133,
    title: "Collapsible Water Bottle",
    description:
      "Stay hydrated on the go with this collapsible water bottle. Compact and easy to carry in your bag.",
    price: 9.99,
    rating: 4.9,
    discountPrice: 12.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/133/1.jpg",
  },
  {
    id: 134,
    title: "HD Webcam with Microphone",
    description:
      "Upgrade your video calls with this HD webcam featuring a built-in microphone. Crystal clear communication.",
    price: 29.99,
    rating: 4.8,
    discountPrice: 34.99,
    replyNumber: 28,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/134/1.jpg",
  },
  {
    id: 135,
    title: "Plush Memory Foam Bath Mat",
    description:
      "Step out of the shower onto this plush memory foam bath mat. Absorbs water and adds comfort.",
    price: 19.99,
    rating: 4.7,
    discountPrice: 24.99,
    replyNumber: 22,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/135/1.jpg",
  },
  {
    id: 136,
    title: "Wireless Sport Earphones",
    description:
      "Elevate your workouts with these wireless sport earphones. Sweat-resistant and comfortable for active use.",
    price: 24.99,
    rating: 4.8,
    discountPrice: 29.99,
    replyNumber: 26,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/136/1.jpg",
  },
  {
    id: 137,
    title: "Portable Laptop Stand",
    description:
      "Improve your posture and comfort with this portable laptop stand. Adjustable for ergonomic use.",
    price: 34.99,
    rating: 4.9,
    discountPrice: 39.99,
    replyNumber: 27,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/137/1.jpg",
  },
  {
    id: 138,
    title: "Tea Infuser Set",
    description:
      "Enjoy a perfect cup of tea with this tea infuser set. Stylish design for brewing loose leaf tea.",
    price: 12.99,
    rating: 4.7,
    discountPrice: 15.99,
    replyNumber: 24,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/138/1.jpg",
  },
  {
    id: 139,
    title: "Leather Laptop Sleeve",
    description:
      "Protect your laptop in style with this leather laptop sleeve. Slim and elegant for business or travel.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/139/1.jpg",
  },
  {
    id: 140,
    title: "Aromatherapy Essential Oil Diffuser",
    description:
      "Create a calming atmosphere with this aromatherapy essential oil diffuser. LED lights and mist control.",
    price: 29.99,
    rating: 4.9,
    discountPrice: 34.99,
    replyNumber: 30,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/140/1.jpg",
  },
  {
    id: 141,
    title: "Cushioned Running Socks",
    description:
      "Enhance your running experience with these cushioned running socks. Moisture-wicking and comfortable.",
    price: 9.99,
    rating: 4.6,
    discountPrice: 12.99,
    replyNumber: 19,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/141/1.jpg",
  },
  {
    id: 142,
    title: "Anti-Fatigue Standing Desk Mat",
    description:
      "Reduce fatigue with this anti-fatigue standing desk mat. Ergonomically designed for prolonged standing.",
    price: 18.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/142/1.jpg",
  },
  {
    id: 143,
    title: "Gentle Facial Cleansing Wipes",
    description:
      "Effortlessly cleanse your face with these gentle facial cleansing wipes. Suitable for all skin types.",
    price: 7.99,
    rating: 4.7,
    discountPrice: 9.99,
    replyNumber: 24,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/143/1.jpg",
  },
  {
    id: 144,
    title: "Wireless Charging Car Mount",
    description:
      "Charge your phone on the go with this wireless charging car mount. Secure and convenient for travel.",
    price: 34.99,
    rating: 4.9,
    discountPrice: 39.99,
    replyNumber: 27,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/144/1.jpg",
  },
  {
    id: 145,
    title: "Digital Kitchen Scale",
    description:
      "Accurately measure ingredients with this digital kitchen scale. Sleek and compact for easy storage.",
    price: 14.99,
    rating: 4.7,
    discountPrice: 18.99,
    replyNumber: 22,
    category: "Бытовая техника",
    image: "https://cdn.dummyjson.com/product-images/145/1.jpg",
  },
  {
    id: 146,
    title: "Fitness Tracker Watch",
    description:
      "Track your fitness goals with this versatile fitness tracker watch. Heart rate monitor and sleep tracking.",
    price: 29.99,
    rating: 4.8,
    discountPrice: 34.99,
    replyNumber: 28,
    category: "Здоровье",
    image: "https://cdn.dummyjson.com/product-images/146/1.jpg",
  },
  {
    id: 147,
    title: "Leather Desk Organizer",
    description:
      "Organize your workspace with this stylish leather desk organizer. Multiple compartments for efficiency.",
    price: 22.99,
    rating: 4.7,
    discountPrice: 27.99,
    replyNumber: 18,
    category: "Аксессуары",
    image: "https://cdn.dummyjson.com/product-images/147/1.jpg",
  },
  {
    id: 148,
    title: "Revitalizing Eye Cream",
    description:
      "Refresh tired eyes with this revitalizing eye cream. Reduces puffiness and dark circles.",
    price: 16.99,
    rating: 4.8,
    discountPrice: 21.99,
    replyNumber: 23,
    category: "Красота и уход",
    image: "https://cdn.dummyjson.com/product-images/148/1.jpg",
  },
  {
    id: 149,
    title: "Wireless Bluetooth Keyboard",
    description:
      "Boost your productivity with this wireless Bluetooth keyboard. Compact and compatible with various devices.",
    price: 34.99,
    rating: 4.9,
    discountPrice: 39.99,
    replyNumber: 27,
    category: "Электроника",
    image: "https://cdn.dummyjson.com/product-images/149/1.jpg",
  },
  {
    id: 150,
    title: "Durable Hiking Backpack",
    description:
      "Embark on outdoor adventures with this durable hiking backpack. Spacious compartments and comfortable design.",
    price: 49.99,
    rating: 4.7,
    discountPrice: 59.99,
    replyNumber: 22,
    category: "Обувь",
    image: "https://cdn.dummyjson.com/product-images/150/1.jpg",
  },
];
function setMenuArrayToLocalStorage(menuArray) {
  if (!localStorage.getItem('menuArray')) {
      localStorage.setItem('menuArray', JSON.stringify(menuArray));
  }
}
setMenuArrayToLocalStorage(menuArray)
// console.log(menuArray);
menuArray.forEach(item=>{
  let category = item.category
  item.isliked = false 
  let array =[]
  if (typeof category === 'string') {
    array.push(category)
    array.push("Все")
    item.category = array
  } else if (Array.isArray(category)) {
    category.push("Все")
  } else {
    console.log("Invalid category format");
  }
  // localStorage.setItem('menuArray', JSON.stringify(menuArray));
})
export {
  fetchProducts,
  get,
  menuArray,
  getStorageItems,
  addUserItemToStorage,
  addItemToStorage,
  removeItemFromStorage,
  addToLikes,
  likeBg,
  addToCart
};
