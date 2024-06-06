let productName = document.getElementById("pName");
let productPrice = document.getElementById("pPrice");
let productDescrption = document.getElementById("pDescrption");
let productimges = document.getElementById("pImges");
let updateProductsButton = document.getElementById("updateProducts");
let addProductButton = document.getElementById("addProduct");
let searchProductInput = document.getElementById("searchProduct");
let listOfProduct = [];
let localStorageKey = "allProducts";
let getIndexOfWillUpdate;
let isSearching = false;
let searchResults = [];

// Check if local storage has value, store this value into array, and call function to display products
if (JSON.parse(localStorage.getItem(localStorageKey))) {
  listOfProduct = JSON.parse(localStorage.getItem(localStorageKey));
  addItemsAuto(listOfProduct);
}

// Function to add product to global array
function addProductToArray() {
  let products = {
    imges: `imgs/portfolio/${productimges.files[0]?.name || "6.jpg"}`,
    name: productName.value.toLowerCase(),
    Descrption: productDescrption.value,
    price: productPrice.value,
  };
  if (!validationAtAddProduct(products)) {
    return; // Stop execution if validation fails
  }
  listOfProduct.push(products);
  addToLocalStorage();
  addItemsAuto(listOfProduct);
  restOrSetValue();
}

if (listOfProduct.length === 0) {
  showModal("Dont Have Any Product Please Add Some Products.");
  // return false; // Return false indicating validation failed
}

// Function to validate product input
function validationAtAddProduct(products) {
  products.name = products.name.toLowerCase();
  if (!products.name) {
    console.error("Product Name is required.");
    showModal("Product Name Is Required.");
    return false; // Return false indicating validation failed
  } else if (
    // change list to lower because i convert it to lowercase
    products.name !== "phone" &&
    products.name !== "tv" &&
    products.name !== "watch" &&
    products.name !== "remote" &&
    products.name !== "labtob"
  ) {
    productName.value = ``;
    console.error("You Must Select From Option");
    showModal("You Must Select From Option");
    return false; // Return false indicating validation failed
  }
  if (!products.price) {
    console.error("Product Price is required.");
    showModal("Product Price is required.");
    return false; // Return false indicating validation failed
  } else if (products.price < 6000 || products.price > 10000) {
    console.error(
      "Product Price is required. And Value Must Be Between 6000 And 10000"
    );
    showModal(
      "Product Price is required. And Value Must Be Between 6000 And 10000"
    );
    return false; // Return false indicating validation failed
  }
  if (!products.Descrption) {
    console.error("Product Description is required.");
    showModal("Product Description Is Required.");
    return false; // Return false indicating validation failed
  } else if (products.Descrption.length > 250) {
    console.error("Product Description Must Be Between 1 To 250 Char");
    showModal("Product Description Is Must Be Between 1 To 250 Char");
    return false; // Return false indicating validation failed
  }
  if (!productimges.files.length) {
    console.error("Product Image is required.");
    showModal("Product Image Is Required.");
    return; // Stop execution if validation fails
  }
  return true; // Return true indicating validation passed
}

// Function to show modal with a message
function showModal(message) {
  document.getElementById("warringMaseege").innerHTML = message;
  let myModal = new bootstrap.Modal(document.getElementById("modalValdtion"));
  myModal.show();
}

// Function to add items when adding a product
function addItemsAuto(arrayLoop) {
  let repet = "";
  for (let i = 0; i < arrayLoop.length; i++) {
    repet += `<div class="col-md-4">
      <div class="card">
        <div class="p-2 conProductImges">
          <img  src="${
            arrayLoop[i].imges
          }" class="card-img-top img-fluid" alt="Product Image" />
        </div>
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <h5 class="card-title h6">${
            arrayLoop[i].searchName || arrayLoop[i].name
          }</h5>
          <h5 class="card-title">Description</h5>
          <p class="card-text">${
            arrayLoop[i].searchDescrption || arrayLoop[i].Descrption
          }</p>
          <h5 class="card-title h6">Price</h5>
          <span>${arrayLoop[i].searchPrice || arrayLoop[i].price}</span>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-danger px-3 mt-2 d-block" onclick="deleteProduct(${i})">Delete</button>
            <button type="button" class="btn btn-outline-success px-4 mt-2 d-block" onclick="editProduct(${i})">Edit</button>
          </div>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("insertItems").innerHTML = repet;
}

// Function to clear or set input values
function restOrSetValue(productValue) {
  productimges.value = "";
  productName.value = productValue ? productValue.name : "";
  productPrice.value = productValue ? productValue.price : "";
  productDescrption.value = productValue ? productValue.Descrption : "";
  console.log(productimges.files[productValue] = productValue ? productValue.imges.split("/").pop() : "");
  console.log(productimges.files[productValue]);
  searchProductInput.value = "";
}

// Function to delete products
function deleteProduct(index) {
  const realIndex = isSearching ? searchResults[index].realIndex : index;
  listOfProduct.splice(realIndex, 1); // Remove the product at the given index
  addItemsAuto(isSearching ? searchResults : listOfProduct);
  addItemsAuto(listOfProduct);
  addToLocalStorage();
  restOrSetValue();
}

// Function to edit products
function editProduct(index) {
  const realIndex = isSearching ? searchResults[index].realIndex : index;
  getIndexOfWillUpdate = realIndex;
  let realProduct = listOfProduct[realIndex];
  if (realProduct) {
    // productName.value       = realProduct.name;
    // productPrice.value      = realProduct.price;
    // productDescrption.value = realProduct.Descrption;
    // console.log(productimges.files[0]   = realProduct.imges.split("/").pop());
    // productimges.files[0]   = realProduct.imges.split("/").pop();
    restOrSetValue(realProduct);
    changeButtonCaseEdit();
  } else {
    console.error("Product not found at index:", realIndex);
  }
}

// Function to change button case to Edit
function changeButtonCaseEdit() {
  updateProductsButton.classList.remove("d-none");
  addProductButton.classList.add("d-none");
}

// Function to change button case to Update
function changeButtonCaseUpdate() {
  updateProductsButton.classList.add("d-none");
  addProductButton.classList.remove("d-none");
}

// Function to update product data
function updateProductsData() {
  changeButtonCaseUpdate();
  listOfProduct[getIndexOfWillUpdate].name = productName.value;
  listOfProduct[getIndexOfWillUpdate].price = productPrice.value;
  listOfProduct[getIndexOfWillUpdate].Descrption = productDescrption.value;
  if (productimges.files[0]) {
    listOfProduct[
      getIndexOfWillUpdate
    ].imges = `imgs/portfolio/${productimges.files[0].name}`;
  }
  addToLocalStorage();
  addItemsAuto(listOfProduct);
  restOrSetValue();
}

// Function to search products
function searchProduct() {
  isSearching = true;
  searchResults = [];
  let keyWord = searchProductInput.value.toLowerCase();
  for (let i = 0; i < listOfProduct.length; i++) {
    if (
      listOfProduct[i].name.toLowerCase().includes(keyWord) ||
      listOfProduct[i].price.toLowerCase().includes(keyWord) ||
      listOfProduct[i].Descrption.toLowerCase().includes(keyWord)
    ) {
      let productCopy = { ...listOfProduct[i], realIndex: i };

      productCopy.searchName = listOfProduct[i].name
        .toLowerCase()
        .replace(
          new RegExp(keyWord, "gi"),
          (match) => `<span class="text-bg-warning">${match}</span>`
        );
      productCopy.searchDescrption = listOfProduct[
        i
      ].Descrption.toLowerCase().replace(
        new RegExp(keyWord, "gi"),
        (match) => `<span class="text-bg-warning">${match}</span>`
      );
      productCopy.searchPrice = listOfProduct[i].price
        .toLowerCase()
        .replace(
          new RegExp(keyWord, "gi"),
          (match) => `<span class="text-bg-warning">${match}</span>`
        );

      searchResults.push(productCopy);
    }
  }
  // If Not Matched Value
  if (searchResults.length === 0) {
    addItemsAuto(searchResults);
    showModal("No Product Found.");
    return false; // Return false indicating validation failed
  }
  addItemsAuto(searchResults);
}

// Function to add products to local storage
function addToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(listOfProduct));
}

function validationInputRegex(element) {
  // console.log(element.id);
  let regex = {
    pName: /^(Phone|TV|Watch|Remote|Labtob)$/,
    pPrice: /^(6\d{3}|[7-9]\d{3}|10000)$/,
    pDescrption: /^.{0,250}$/, // Keeping original key as pDescrption
  };

  let isValidRegx = regex[element.id].test(element.value);

  if (isValidRegx) {
    console.log(`Match`);
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');

    switch (element.id) {
      case 'pName':
        document.getElementById('messagePnameValid').classList.add('d-none');
        break;
      case 'pPrice':
        document.getElementById('messagePriceValid').classList.add('d-none');
        break;
      case 'pDescrption':
        document.getElementById('messageDescrptionValid').classList.add('d-none');
        break;
    }
  } else {
    console.log(`Not Match`);
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');

    switch (element.id) {
      case 'pName':
        document.getElementById('messagePnameValid').classList.remove('d-none');
        break;
      case 'pPrice':
        document.getElementById('messagePriceValid').classList.remove('d-none');
        break;
      case 'pDescrption':
        document.getElementById('messageDescrptionValid').classList.remove('d-none');
        break;
    }
  }
}

// Fn Under Planing
// function addHighLightSearchProduct(search) {
//     for (let i = 0; i < listOfProduct.length; i++) {
//         listOfProduct[i].searchName = listOfProduct[i].search.toLowerCase().replace(keyWord ,`<span class="text-bg-warning">${keyWord}</span>`);
//     }
//   }

// localStorage.setItem(`userName` ,`Ahmed`);
// localStorage.setItem(`userAge`, 23);
// localStorage.removeItem(`userName`);
// let getItemFromLocalStorage = localStorage.getItem(`userAge`);
// console.log(getItemFromLocalStorage);
// console.log(localStorage.length);
// console.log(localStorage.key(0));
