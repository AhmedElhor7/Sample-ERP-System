let productName = document.getElementById(`pName`);
let productPrice = document.getElementById(`pPrice`);
let productDescrption = document.getElementById(`pDescrption`);
let productimges = document.getElementById(`pImges`);
let updateProductsButton = document.getElementById(`updateProducts`);
let addProductButton = document.getElementById(`addProduct`);
let searchProductInput = document.getElementById(`searchProduct`);
let listOfProduct = [];
// Check if local have value store this value into array and call fun addItemsAuto to display product
if (JSON.parse(localStorage.getItem(`allProducts`))) {
  // convert allProducts have value = (listOfProduct) from array to string becaus store it into array
  listOfProduct = JSON.parse(localStorage.getItem(`allProducts`));
  addItemsAuto(listOfProduct);
}

// This Function To Add Product To Global Array
function addProductToArray() {
  let products = {
    imges: `imgs/4.jpg`,
    name: productName.value,
    Descrption: productDescrption.value,
    price: productPrice.value,
  };
  if (!validationAtAddProduct(products)) {
    return; // Stop execution if validation fails
  }
  listOfProduct.push(products);
  // console.log(listOfProduct);
  // convert listOfProduct from array to string becaus store it into localStorage
  localStorage.setItem(`allProducts`, JSON.stringify(listOfProduct));
  addItemsAuto(listOfProduct);
  rest();
}

// This Function To validation At Input Requierd
function validationAtAddProduct(products) {
  if (!products.name) {
    // Check if name is null or empty
    console.error("Product Name is required.");
    showModal();
    let missingName = (document.getElementById(
      `warringMaseege`
    ).innerHTML = `Product Name Is Required.`);
    return false; // Return false indicating validation failed
  }
  if (!products.price || products.price < 0) {
    console.error(
      "Product Price is required. And Not Accept Value Less Than 0"
    );
    showModal();
    let missingPrice = (document.getElementById(
      `warringMaseege`
    ).innerHTML = `Product Price Is Required. And Not Accept Value Less Than 0`);
    return false; // Return false indicating validation failed
  }
  if (!products.Descrption) {
    console.error("Product Descrption is required.");
    showModal();
    let missingDescrption = (document.getElementById(
      `warringMaseege`
    ).innerHTML = `Product Descrption Is Required.`);
    return false; // Return false indicating validation failed
  }
  return true; // Return true indicating validation passed
}

function showModal() {
  let myModal = new bootstrap.Modal(document.getElementById("modalValdtion"));
  myModal.show();
}

// This Function To Add Items Whan Click On Add Product Button
function addItemsAuto(arrayLoop) {
  let repet = ``;
  for (let i = 0; i < arrayLoop.length; i++) {
    repet += `<div class="col-md-4">
        <div class="card">
          <div class="p-2">
            <img
              src="imgs/portfolio/${i + 1}.jpg"
              class="card-img-top img-fluid"
              alt="Watch"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">Name</h5>
            <h5 class="card-title h6">${arrayLoop[i].searchName ? arrayLoop[i].searchName :arrayLoop[i].name}</h5>
            <h5 class="card-title">Descrption</h5>
            <p class="card-text">${arrayLoop[i].searchDescrption ? arrayLoop[i].searchDescrption :arrayLoop[i].Descrption}</p>
            <h5 class="card-title h6">Price</h5>
            <span>${arrayLoop[i].searchPrice ? arrayLoop[i].searchPrice :arrayLoop[i].price}</span>
            <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-danger px-3 mt-2 d-block" onclick="deletProducts(${i})">Delete</button>
            <button type="button" class="btn btn-outline-success px-4 mt-2 d-block" onclick="editProduct(${i})">Edit</button>
            </div>
            </div>
        </div>
      </div>`;
  }
  document.getElementById(`insertItems`).innerHTML = repet;
}

// This Function To Clear Value From Input
function rest() {
  productName.value = "";
  productPrice.value = "";
  productDescrption.value = "";
  productimges.value = "";
}

// This Function To Delete Items When Click On Delete Button
function deletProducts(counter) {
  listOfProduct.splice(counter, 1); // Remove the product at the given index
  addItemsAuto(listOfProduct);
  localStorage.setItem(`allProducts`, JSON.stringify(listOfProduct));
}
let getIndexOfWillUpdate;

function editProduct(counter) {
  getIndexOfWillUpdate = counter;
  productName.value = listOfProduct[counter].name;
  productPrice.value = listOfProduct[counter].price;
  productDescrption.value = listOfProduct[counter].Descrption;
  changeButtonCaseEdit();
}

function changeButtonCaseEdit() {
  // if buttpn have class d-none remove it if not add it
  updateProductsButton.classList.remove("d-none");
  addProductButton.classList.add("d-none");
}
function changeButtonCaseUpdate() {
  // if buttpn have class d-none remove it if not add it
  updateProductsButton.classList.add("d-none");
  addProductButton.classList.remove("d-none");
}

function updateProductsData() {
  changeButtonCaseUpdate();
  // console.log(getIndexOfWillUpdate);
  listOfProduct[getIndexOfWillUpdate].name = productName.value;
  listOfProduct[getIndexOfWillUpdate].price = productPrice.value;
  listOfProduct[getIndexOfWillUpdate].Descrption = productDescrption.value;
  // update Value into localStorage To Add New Value
  localStorage.setItem(`allProducts`, JSON.stringify(listOfProduct));
  // Call Fun To Overwrite To Add New Value
  addItemsAuto(listOfProduct);
  // To Clear Input Value After Update
  rest();
}
function searchProduct() {
  let arrayForSearch = [];
  // i can use keyWord or use this.value
  let keyWord = searchProductInput.value;
  for (let i = 0; i < listOfProduct.length; i++) {
    if (listOfProduct[i].name.toLowerCase().includes(keyWord.toLowerCase()) || listOfProduct[i].price.toLowerCase().includes(keyWord.toLowerCase()) || listOfProduct[i].Descrption.toLowerCase().includes(keyWord.toLowerCase())) {
      listOfProduct[i].searchName       = listOfProduct[i].name.toLowerCase().replace(keyWord ,`<span class="text-bg-warning">${keyWord}</span>`);
      listOfProduct[i].searchDescrption = listOfProduct[i].Descrption.toLowerCase().replace(keyWord ,`<span class="text-bg-warning">${keyWord}</span>`);
      listOfProduct[i].searchPrice      = listOfProduct[i].price.toLowerCase().replace(keyWord ,`<span class="text-bg-warning">${keyWord}</span>`);

            arrayForSearch.push(listOfProduct[i]);
      addItemsAuto(arrayForSearch);
    }
  }
}

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
