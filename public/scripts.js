
//way of openening files and making HTTP Requests
var request = new XMLHttpRequest();

//opens a new connection
request.open('GET', 'http://localhost:3003/users', true)

var tableData;
var table;

request.onload = function() {
  tableData = JSON.parse(this.response);
  //createTable(data);
  //$('#userTable').DataTable();
  loadTable(tableData);
}

function loadTable(userData){
  table = $('#userTable').DataTable( {
    data: userData,
    columns: [
        { data: 'id' },
        { data: 'first_name' },
        { data: 'last_name' },
        { data: 'age' }
    ]
} );
}

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[3] ) || 0; // use data for the age column

        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);


request.send()
//
$(document).ready(function(){
    //loadTable(tableData);
    $('#min, #max').keyup( function() {
        table.draw();
    });
});
