// ---------- Get Elements ---------
let title = document.getElementById("title"),
    price = document.getElementById("price"),
    taxes = document.getElementById("taxes"),
    ads = document.getElementById("ads"),
    discount = document.getElementById("discount"),
    total = document.getElementById("total"),
    count = document.getElementById("count"),
    category = document.getElementById("category"),
    submit = document.getElementById("submit"),
    tbody = document.getElementById("tbody"),
    mood = "create",
    assistant;

// ------------- Get Total ---------
function getTotal() {
    let totalValue = +price.value + +taxes.value +
                     +ads.value - +discount.value;
    if(price.value != "") {
        total.innerHTML = totalValue;
        total.style.background = "rgb(102, 102, 1)"
    }else {
        total.innerHTML = ""
        total.style.background = "#a00d02"
    }
}
// ------------- End Get Total --------

// ------------- Create Product ----------
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}
submit.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
// -------- start count function ----------
    if( title.value != ''
        && price.value != '' 
        && category.value != ''
        && newProduct.count <= 100){
        if(mood === "create"){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataProduct.push(newProduct)
                }
            }else{
                dataProduct.push(newProduct)
            }
        }else {
            dataProduct[assistant] = newProduct;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block"
        }
        clearData()
    }else {
        let error = document.getElementById("error");
        error.innerHTML = `<h3>your data is not a valid</h3>`;
        error.style.border = "1px solid rgb(96, 19, 19)";
        error.style.width = 'fit-content';
        error.style.padding = '5px'
    }

// -------- end count function ---------

// -------- save in localStorage ------
    localStorage.setItem("product", JSON.stringify(dataProduct))
// -------- end save data in localStorage --------
    readData()
}
// ------------- End Function Create Product --------

// ------------- Clear Data From Inputs ----------
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.background = "#a00d02"
}

// ------------- Read Data ----------
function readData() {
    let table = "";
    for(let i= 0; i < dataProduct.length; i++){
        table += ` 
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataProduct.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">[ ${dataProduct.length} ] deleteAll</button>`
    }else{
        btnDelete.innerHTML = "";
    }
}

// Turn On Read Data
readData()

// ------------- Delete One Product ---------
function deletePro(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}
// ------------- Delete All Product ---------
function deleteAll() {
    dataProduct.splice(0);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}

// -------------- Update Data ------------
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataProduct[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    assistant = i;
    scroll({
        top:0,
        behavior: "smooth"
    })
}

// -------------- Searsh In Data ------------

// -------------- Get Searsh Mood -------------
let searshMood = "title";
function getSearshMood(id){
    let searsh = document.getElementById("search");

    if(id == "searchTitle"){
        searshMood = "title";
    }else{
        searshMood = "category";
    }
    searsh.placeholder = `Searsh By ${searshMood}`
searsh.focus()
searsh.value = '';
readData()
}

// -------------- Searsh ----------
function searshData(value) {
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        if(searshMood == "title"){
            if(dataProduct[i].title.includes(value.toLowerCase())) {
                table += ` 
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
            }
        }else{
            if(dataProduct[i].category.includes(value.toLowerCase())) {
                table += ` 
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table;
}








let up = document.querySelector(".one"),
    down = document.querySelector(".two");
up.onclick = function() {
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
down.onclick = function() {
    window.scrollTo(0, document.body.scrollHeight)
}