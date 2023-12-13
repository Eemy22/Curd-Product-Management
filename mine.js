let title= document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creatbtn = document.getElementById("creatbtn");


let mood="create";
let tmp ;

// get total
function getTotal() {
  if (price.value != "") {
    let result =( +price.value + +ads.value + +taxes.value )- +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#cb5f5f";
    
    
    
    
  }
  
}

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
creatbtn.onclick = function () {
   
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count
  if(title.value != '' && price.value != ''&& category.value != ''){
   if(mood ==="create"){
  if(newPro.count > 1){
    for(i =0; i< newPro.count;i++){
        dataPro.push(newPro);
        
    }
  }else{
    dataPro.push(newPro);
  }
  }else{
    dataPro[ tmp] =newPro;
    mood = "create";
    creatbtn.innerHTML ="Create";
    count.style.display = "block";
  scroll({
    top : 0,
    behavior:"smooth"
  })
  }
  clearDate();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
  
};
// clear inputs
function clearDate() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read
function showData() {
    getTotal()
  let table = "";
  for (i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>      
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updataData(${i})"id="update">ubdate</button></td>
        <td><button onclick="deletDta(${i})">delet</button></td>
    </tr>`;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDleteAll = document.getElementById('deleteAll');
  if(dataPro.length > 0){
    
    btnDleteAll.innerHTML=`
    <button onclick="deleteAll()" class="create">delet All (${dataPro.length})</button>
    `
  }else{ btnDleteAll.innerHTML=''};
  
}
showData() 
// delet data
function deletDta(i){
    dataPro.splice(i,1);
    localStorage.product =JSON.stringify(dataPro);
    showData();
    
};
// delete all data 
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData()

};

//update Date

function updataData(i){
  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  getTotal()
  count.style.display="none";
  category.value = dataPro[i].category;
  creatbtn.innerHTML="Update";
  mood ="Update";
  tmp = i;
  
  //console.log(i)
};

// search
let searchMood =`title`;
function getSearchMood(id){
  let search = document.getElementById("search");
  if(id == `searchTitle`){
    searchMood = `title`;
    
  }else{
    searchMood =`category`;
    
  }
  search.placeholder = "Search by "+ searchMood;
  search.focus()
  search.value =``;

  
}

function searchDate(value){
   let table =``;
   for ( let i = 0;i < dataPro.length; i++){
if(searchMood == "title"){
      

        
        if(dataPro[i].title.includes(value)){
         
          table += `
          <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>      
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updataData(${i})"id="update">ubdate</button></td>
          <td><button onclick="deletDta(${i})">delet</button></td>
      </tr>`;
          
        }
        
     
   }else{
   

        
      if(dataPro[i].category.includes(value)){
       
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>      
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updataData(${i})"id="update">ubdate</button></td>
        <td><button onclick="deletDta(${i})">delet</button></td>
    </tr>`;
        
      }
      

   }
   }
      document.getElementById('tbody').innerHTML = table;
}




