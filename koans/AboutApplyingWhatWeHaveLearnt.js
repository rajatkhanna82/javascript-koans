var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      var noMushrooms = function(x){ return x !== "mushrooms"}

      productsICanEat = _(products).filter(function(x) { return ( _(x.ingredients).all(noMushrooms) &&  (x.containsNuts === false))});

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1000)).reduce(function(sum,x){   return ( sum + ((x%3 ==0|| x%5 ==0)?  x: 0)); });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }
  
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
     _(products).chain()
               .map(function(x){ return x.ingredients })
               .flatten()
               .map(function(x){ 
                    ingredientCount[x] = (ingredientCount[x] || 0) +1 ;
                    return;
                   })
               .value();
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
     var largestPrimeFactor = function(n){
        var i = 2;
        while( i<= n){
          if(n%i ==0){
            n = n/i;
          }else{
            i++;
          }
        }
        return i;
      }
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
      function isPalindrome(num){
         return num == parseInt(num.toString().split('').reverse().join(''));
      }

      function largestPalProd(){
        var max = 100;  
        for(var i = 999; i>=100 ; i--){
          for(var j = 999; j >= 100; j--){
             var prod = j*j;
              if(isPalindrome(prod) && max < prod){
                max = prod;
               }
          }
        }
           return max
       }
      
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      

    function primeFactorList(){
          var n = 20;
          var p = new Array(n);
          var prime = [];
          for(var i =1; i<= n ;i++){
            p[i] = true;
          }

          var j = 2;
          while( j<= n ){

             for(i =j+j; i<= n ; i += j){
                 p[i] = false;
             }

             do{
                  j++;

             }while(  p[j] === false)

          }
         for(i= 1;i<=n ;i++){
            if(p[i])
            prime.push(i);
        }
       return (prime.reduce(function(sum,x){ return sum * x}));
       }
    
      
  });


  it("should find the difference between the sum of the squares and the square of the sums", function () {

   // TWO Arguments
    function diffSumSquaresTwoNo(x,y){
        return 2*x*y; // (x + y)^2 = x^2 + y^2 + 2xy
    }

    // N Arguments
    function diffSumSquare(){

      var sumOfSquare =0;
      var sum =0 ;
      if (arguments.length < 2){
        return ;
      }
      for (var i = 0; i< arguments.length ; i++){
        x = parseInt(arguments[i]);  
        sumOfSquare +=   (x*x) ;
        sum += x;
      }

      var squareOfSum = sum * sum;
      return squareOfSum - sumOfSquare;
    }

    
  });

  it("should find the 10001st prime", function () {
        function nthPrimeNumber(){
          var n = 1000000;
          var m = 10001;
          var p = new Array(n) ;
          var prime = [1,2];
          
          for(var i =1; i<= n ;i++){
            p[i] = true;
          }

          var j = 2;
          while( j<= n ){

             for(i =j+j; i<= n ; i += j){
                 p[i] = false;
             }
             do{
                  j++;
                  if(p[j]){
                      prime.push(j);
                      if(prime.length == m){
                          console.log(m+"th prime no. :",prime[m-1]);
                          return prime[m-1] ;
                      }
                  }
                  
             }while(  p[j] === false)
          }
        
          
      }
      
  });

});
