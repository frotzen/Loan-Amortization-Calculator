function displayMessage() {
  let myMessage = document.getElementById("message").value;
  //alert(myMessage);

  Swal.fire({
    backdrop: false,
    title: "App Name",
    text: myMessage,
  });
}
