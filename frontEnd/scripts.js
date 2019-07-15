
//way of openening files and making HTTP Requests
var request = new XMLHttpRequest();

//opens a new connection
request.open('GET', 'http://localhost:3003/users', true)

request.onload = function() {
  var data = JSON.parse(this.response)
  //createTable(data);
  //$('#userTable').DataTable();
  loadTable(data);
}

function createTable(data){
  var counter = 1;
  data.forEach(user =>{
    console.log(user.id);
    var table = document.getElementById('userTable');
    var row = table.insertRow(counter);
    var idCell = row.insertCell(0);
    var firstNameCell = row.insertCell(1);
    var lastNameCell = row.insertCell(2);
    idCell.innerHTML = user.id;
    firstNameCell.innerHTML = user.first_name;
    lastNameCell.innerHTML = user.last_name;
    counter ++;
  })
}

function loadTable(userData){
  $('#userTable').DataTable( {
    data: userData,
    columns: [
        { data: 'id' },
        { data: 'first_name' },
        { data: 'last_name' }
    ]
} );
}

request.send()
//
// $(document).ready(function(){
//     $('#userTable').DataTable();
// });
