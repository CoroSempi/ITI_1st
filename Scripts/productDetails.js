
var url=window.location.search;
var newurl=url.substring(1);
var iddetails=newurl.split("=");
id=iddetails[1];

var xhr=new XMLHttpRequest();
xhr.open("GET",`https://dummyjson.com/products/${id}`)

xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
        console.log(xhr.response);
        const products=JSON.parse(xhr.response);
        console.log(products);
        displayproducts(products);
           displayreviews(products)

        AddtoCart.addEventListener("click",function(){
            var quantity=parseInt(quantityDisplay.value);
            console.log(quantity);      
            addToCart(products,quantity);
            CartDialogue()
     }
       );    
    }
 }
function displayproducts(products){
     
         var productdetails= document.getElementById("productdetails");
         var productimage=document.getElementById("productimage");

       // add element details

    //title&sale
         var title= document.createElement("div");
         var txt=document.createTextNode(products.title);
         title.style.fontWeight = "bold";
         title.style.fontSize = "24px";
         title.style.float="left"
         var sale=document.createElement("span")
         var salenumber=document.createTextNode(products.discountPercentage+"% sale")
         sale.style.border=" 2px"
         sale.style.borderRadius = '10px'
         sale.style.marginLeft="240PX"
         sale.style.backgroundColor="pink"
         sale.style.width="250px"
         sale.style.height="200px"
         sale.appendChild(salenumber)
         title.appendChild(txt);
         productdetails.appendChild(title);
         productdetails.appendChild(sale);
        //price
         var price=document.createElement("div");
         var txt1=document.createTextNode("$"+products.price); 
         price.style.paddingTop="30px"
         price.style.fontSize="28px"
         price.appendChild(txt1)
          productdetails.appendChild(price)
          //rating
        var ratingspan=document.createElement("span")
        var starspan=document.createElement("img")
        starspan.src="../Assets/star.png"
        starspan.width="15"
        ratingspan.appendChild(starspan)
        var rating=document.createTextNode(products.rating)
        ratingspan.appendChild(rating)
        // ratingspan.style.paddingTop="25px"
        ratingspan.style.marginLeft="500PX"
        productdetails.appendChild(ratingspan)

       //brandname,category,availability
        var extradetails=document.createElement("div");
        extradetails.style.paddingTop="20px"
         var vector1=document.createElement("img");
         vector1.src="../Assets/Vector.png"
          vector1.style.paddingLeft="5px"
         vector1.style.paddingRight="5px"
         var vector2=document.createElement("img")
         vector2.src="../Assets/Vector.png"
         vector2.style.paddingLeft="5px"
         vector2.style.paddingRight="5px"

        if(products.brand){
            var brandspan=document.createElement("span");
            var brand=document.createTextNode(products.brand)
            brandspan.appendChild(brand)
            extradetails.appendChild(brandspan)
            extradetails.appendChild(vector1);
        }
     
        var categoryspan=document.createElement("span")
        var category= document.createTextNode(products.category);
        categoryspan.appendChild(category);

        var availabilityspan = document.createElement("span");
        var availability =document.createTextNode(products.availabilityStatus)
        availabilityspan.style.color= "green"; 
        availabilityspan.appendChild(availability);

        extradetails.appendChild(categoryspan)
        extradetails.appendChild(vector2)
        extradetails.appendChild(availabilityspan)
        productdetails.appendChild(extradetails)


         var description=document.createElement("div");
         var txt2=document.createTextNode(products.description);
         description.style.paddingTop="30px"
         description.style.fontSize="larger"
         description.style.color="gray"
         description.appendChild(txt2)
          productdetails.appendChild(description)
        //add photo images 
       
         const mainImage= document.getElementById("main-img");
         const gallery=document.getElementById("gallery");

         var images=products.images;
        var productimage=document.createElement("img");
        productimage.src=images[0];
        productimage.height="300"
        productimage.width="150"
        mainImage.appendChild(productimage)


         if (images.length > 1) {
            for (let i = 0; i < images.length; i++) {
            const img = document.createElement("img");
            img.src = images[i];
            img.height="100";
            img.width="100";
            img.style.border="solid 1px gray"
            img.style.marginLeft="10px"
            gallery.appendChild(img);

            img.addEventListener("click", function() {
                productimage.src = images[i];
            });
           };
        } else {
            
            gallery.style.display = "none";
        }
      
        
    }
    //add to cart 
   var cartDetails= document.getElementById("cart-details");
    var AddtoCart=document.createElement("button");
    AddtoCart.classList.add("Addtocart")
    const  AddtoCartImg = document.createElement("img");
    AddtoCartImg.src = "../Assets/cartButton.png";
    const AddToCartText = document.createElement("span");
    AddToCartText.textContent = "Add to Cart";
    AddtoCart.appendChild(AddtoCartImg);
    AddtoCart.appendChild(AddToCartText);
    cartDetails.appendChild(AddtoCart);
        
    //   quantatiy 
             var quantitydiv=document.createElement("div")
            quantitydiv.classList.add("quantity-Counter")
             quantitydiv.innerHTML =`<button id="decrease-btn">-</button>
            <input value="${1}" type="text" id="quantity" />
             <button id="increase-btn"">+</button>
             `
             cartDetails.appendChild(quantitydiv);
            const quantityDisplay = document.getElementById("quantity");
             const decreaseBtn = document.getElementById("decrease-btn");
             const increaseBtn = document.getElementById("increase-btn");
             
        // Increase quantity
 
          increaseBtn.addEventListener("click",function(){
          let currentValue=parseInt(quantityDisplay.value);
            currentValue++;
            quantityDisplay.value=currentValue;
           }) ; 
      // Decrease quantity
         decreaseBtn.addEventListener("click", function() {
         let currentValue=parseInt(quantityDisplay.value);
         if (currentValue > 1) {
          currentValue--;
          quantityDisplay.value = currentValue;
      }
  });
 
function displayreviews(products){
      var reviews=products.reviews;
     console.log(reviews);
       for(let i=0;i<reviews.length;i++){
         var container1=document.createElement("div")
         container1.classList="content"
         var nameContainer=document.createElement("h3")
         var nameContainervalue=document.createTextNode(reviews[i].reviewerName)
         nameContainer.appendChild(nameContainervalue);
         container1.appendChild(nameContainer);
        //  var dot1=document.createElement("img");
        //  dot1.sre="../Assets/BG.png";
        //  container1.appendChild(dot1);
         var emailContainer=document.createElement("h5");
         var emailContainervalue=document.createTextNode(reviews[i].reviewerEmail )
         emailContainer.appendChild(emailContainervalue);
         container1.appendChild(emailContainer);
        //  var dot2=document.createElement("img");
        //  dot2.sre="../Assets/BG.png";
        // dot2.width="5px"
        //  dot2.height="5px"
        //  container1.appendChild(dot2)
         var dateContainer=document.createElement("p");
          //convert Iso Date to local Date
         var isodate=new Date(reviews[i].date);
         var date=isodate.toLocaleDateString();
        var dateContainervalue=document.createTextNode(date)
         dateContainer.appendChild(dateContainervalue)
          container1.appendChild(dateContainer);
          var starcontainer=document.createElement("span");
          starcontainer.classList="star-container"
         var starspan1=document.createElement("img")
          starspan1.src="../Assets/star.png"
          starspan1.width="20"
          starcontainer.appendChild(starspan1)
          var ratingspan1=document.createElement("span")
          var rating1=document.createTextNode(reviews[i].rating)
          ratingspan1.appendChild(rating1)
          starcontainer.appendChild(ratingspan1)
          container1.appendChild(starcontainer)
           var reviewContent= document.getElementById("reviews-content")
           reviewContent.appendChild(container1);
            var comment=document.createElement("div");
            comment.classList="comment"
             var commentValue=document.createTextNode(reviews[i].comment)
            comment.appendChild(commentValue);
            container1.appendChild(comment);
       }
}

 
