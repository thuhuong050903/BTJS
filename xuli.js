const API_URL = "https://5f871d4b49ccbb0016176fe1.mockapi.io/ai/";

function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}

var id;
function save() {
  document.getElementById("huy").style.display = none;
  document.getElementById("themmoi").style.display = block;
  document.getElementById("divAddHotel").style.display = none;

  localStorage.setItem("hotels", JSON.stringify(hotels));
  var hotels = JSON.parse(localStorage.getItem("hotels")) || [];
  for (i = 0; i <= hotels.length; i++) {
    id = i;
  }
  var name = document.getElementById("nameproduct").value;
  var price = document.getElementById("priceproduct").value;
  var note = document.getElementById("noteproduct").value;
  var detail = document.getElementById("detailproduct").value;
  let img = document.getElementById("imgproduct").value;
  let image = img.split("\\")[2];
  if (name | detail | note | (price != "")) {
    var oneProduct = {
      id: id,
      name: name,
      price: price,
      note: note,
      detail: detail,
      img: "images/" + image,
    };
    hotels.push(oneProduct);
    callAPI("hotels", "POST", oneProduct).then((response) => {
      show();
      alert("Thêm phòng thành công! ");
    });
  } else {
    reset();
  }
}

function show() {
  var hotels = [];
  callAPI("hotels", "GET", null).then((res) => {
    hotelscaihungve = res.data;
    let row = "";
    for (i in hotels) {
      row += "<tr>";
      row += "<td>" + hotels[i].id + "</td>";
      row += "<td>" + hotels[i].name + "</td>";
      row +=
        "<td>" +
        "<img src'" +
        hotels[i].img +
        "'style=' width: 80px; height: 80px;'>" +
        "</td>";
      row += "<td>" + hotels[i].price + "</td>";
      row += "<td>" + hotels[i].note + "</td>";
      row +=
        "<td>" +
        `button type = "button" onclick="editsp(${i})" class="btn btn-success"> Edit</button>` +
        "</td>";
      row +=
        "<td>" +
        `button type = "button" onclick="deletesp(${i})" class ="btn btn-danger">Delete</button>` +
        "</td>";
      row += "</tr>";
    }
    document.getElementById("tab").innerHTML = row;
  });
}
