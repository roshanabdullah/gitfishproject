$(document).ready(function(){
    
    $('#customermanagement').hide(0);
    
    $('#show1').click(function(event) {
        event.preventDefault();
        $('#customermanagement').show();
        $('#salesmanagement').hide();
        $('#billmanagement').hide();
        $('#reportmanagement').hide();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
        
       
        
        
        
        
        
    });
    $('#show2').click(function(event){
        event.preventDefault();
        $('#salesmanagement').show();
        $('#customermanagement').hide();
        $('#billmanagement').hide();
        $('#reportmanagement').hide();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
       
        
        
        
        
    })

    
    $('#show3').click(function(event){
        event.preventDefault();
        
        $('#billmanagement').show();
        $('#salesmanagement').hide();
        $('#reportmanagement').hide();
        $('#customermanagement').hide();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
        
        
        
       
    })
   
    $('#show4').click(function(event){
        event.preventDefault();
        $('#reportmanagement').show();
        $('#billmanagement').hide();
        $('#customermanagement').hide();
        $('#salesmanagement').hide();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
        
        
        
    })


    
    
    
});


$(document).ready(function(){
    
    $('#addButton').click(function(event) {
        event.preventDefault();
        $('#customermanagement').show();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
    });
    $('#deleteButton').click(function(event) {
        event.preventDefault();
        $('#deleteCustomer').show();
        $('#customermanagement').hide();
        $('#editCustomer').hide();
        $('#listCustomer').hide();
    });
    $('#editButton').click(function(event) {
        event.preventDefault();
        
        $('#editCustomer').show();
        $('#customermanagement').hide();
        $('#deleteCustomer').hide();
        $('#listCustomer').hide();
      
       
        
    });
    $('#listButton').click(function(event) {
        event.preventDefault();
        
        $('#listCustomer').show();
        $('#customermanagement').hide();
        $('#deleteCustomer').hide();
        $('#editCustomer').hide();
        
    });
    
    $('#goBackList').click(function(event) {
        event.preventDefault();
         $('#customermanagement').show();
         $('#listCustomer').hide();
    });
    
    $('#goBackEdit').click(function(event) {
        event.preventDefault();
         $('#customermanagement').show();
         $('#editCustomer').hide();
    });


    $('#goBackDelete').click(function(event) {
        event.preventDefault();
         $('#customermanagement').show();
         $('#deleteCustomer').hide();
    });
    

});




