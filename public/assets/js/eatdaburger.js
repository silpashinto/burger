// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
   
    var burgerName = $("#burger_name").val().trim();
    if (burgerName) {

      var newBurger = {
        burger_name: burgerName,
        devoured: 0
      };
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );

    }else{
      alert('Not a valid entry');
    }
    
  });

  $("#todevour li button").on("click", function (event) {  
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
   
    var updatedBurgers = {
      devoured: 1
    };

    var id = $(this).data("id"); 
    // Send the POST request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: updatedBurgers
    }).then(
      function () {
        console.log("updated burger");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });

  $("#devoured li button").on("click", function() {
   
    var id = $(this).data("id");   

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
