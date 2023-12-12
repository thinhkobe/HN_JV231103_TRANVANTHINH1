// Mảng chứa thông tin các thẻ ngân hàng
let cards = [];
console.log(cards);
// Lấy các phần tử DOM
const cardNumberInput = document.getElementById("cardNumber");
const expiryDateInput = document.getElementById("expiryDate");
const cvvInput = document.getElementById("cvv");
const saveButton = document.querySelector(".btn");
const tableBody = document.querySelector("tbody");
const cardImages = document.querySelectorAll(".card-group img");


// Thêm sự kiện cho nút Save
saveButton.addEventListener("click", (e) => {
  // lấy dữ liệu từ người dùng
  let cardNumber = cardNumberInput.value;
  let expiryDate = expiryDateInput.value;
  let cvv = cvvInput.value;
  // Kiểm tra và hiển thị thông báo lỗi
  if (
    !validateCardNumber(cardNumber) ||
    !validateExpiryDate(expiryDate) ||
    !validateCVV(cvv)
  ) {
    alert("Hãy kiểm tra lại thông tin thẻ.");
    return;
  }

  // Thêm thông tin thẻ từ người dùng nhập vào mảng
  const newCard = {
    cardNumber: cardNumber,
    expiryDate: expiryDate,
    cvv: cvv,
  };
  cards.push(newCard);

  // Reset giá trị các ô input
  cardNumberInput.value = "";
  expiryDateInput.value = "";
  cvvInput.value = "";

  // Hiển thị danh sách thẻ
  displayCardList();
});

// Hàm hiển thị danh sách thẻ
function displayCardList() {
  // Xóa nội dung cũ của bảng
  tableBody.innerHTML = "";

  // Duyệt qua mảng và hiển thị thông tin thẻ
  cards.forEach((card, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td>IMG</td>
                       <td>${maskCardNumber(card.cardNumber)}</td>
                       <td>${card.expiryDate}</td>
                       <td>${card.cvv}</td>
                       <td class="table-btn-group">
                         <button class="table-btn" onclick="viewCard(${index})">View</button>
                         <button class="table-btn" onclick="editCard(${index})">Edit</button>
                         <button class="table-btn" onclick="deleteCard(${index})">Delete</button>
                       </td>`;
  });
}

// Hàm xóa thẻ khỏi danh sách
function deleteCard(index) {
  cards.splice(index, 1);
  displayCardList();
}

// Hàm đánh dấu số thẻ để ẩn số ở cột Card Number
function maskCardNumber(cardNumber) {
  const visiblePart = cardNumber.slice(0, -10); // Lấy phần số hiển thị
  const maskedPart = "*".repeat(6); // Tạo chuỗi 6 ký tự "*"
  return `${visiblePart}${maskedPart}`;
}

// Hàm đánh dấu số CVV
function maskCVV(cvv) {
  return "*".repeat(cvv.length);
}

// Biến để lưu trạng thái "đang chỉnh sửa"
let editingIndex = -1;

// Thêm sự kiện cho nút Edit
function editCard(index) {
  // Lưu chỉ số của thẻ đang được chỉnh sửa
  editingIndex = index;

  // Hiển thị thông tin của thẻ trong form "Select card"
  const cardToEdit = cards[index];
  cardNumberInput.value = cardToEdit.cardNumber;
  expiryDateInput.value = cardToEdit.expiryDate;
  cvvInput.value = cardToEdit.cvv;
}
// Hàm kiểm tra tính hợp lệ của số thẻ
function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber);
}

// Hàm kiểm tra tính hợp lệ của ngày hết hạn
function validateExpiryDate(expiryDate) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return regex.test(expiryDate);
}

// Hàm kiểm tra tính hợp lệ của CVV
function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

const updateButton= document.querySelector(".editBtn")
// Thêm sự kiện cho nút edit
updateButton.addEventListener("click", (e) => {
  // Lấy dữ liệu từ người dùng
  let cardNumber = cardNumberInput.value;
  let expiryDate = expiryDateInput.value;
  let cvv = cvvInput.value;

  // Kiểm tra và hiển thị thông báo lỗi
  if (
    !validateCardNumber(cardNumber) ||
    !validateExpiryDate(expiryDate) ||
    !validateCVV(cvv)
  ) {
    alert("Hãy kiểm tra lại thông tin thẻ.");
    return;
  }

  // Cập nhật thông tin thẻ trong mảng
  const editedCard = {
    cardNumber: cardNumber,
    expiryDate: expiryDate,
    cvv: cvv,
  };
  cards[editingIndex] = editedCard;

  // Reset giá trị các ô input
  cardNumberInput.value = "";
  expiryDateInput.value = "";
  cvvInput.value = "";

  // Hiển thị lại danh sách thẻ
  displayCardList();

});

// Thêm sự kiện click cho mỗi hình ảnh
cardImages.forEach((image, index) => {
    image.addEventListener("click", () => selectCard(index))
  });
