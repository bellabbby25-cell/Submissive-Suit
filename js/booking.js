const duration = document.getElementById("duration");
const toy = document.getElementById("toy");
const total = document.getElementById("total");
const totalValue = document.getElementById("totalValue");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

function updateTotal() {
  const finalPrice = Number(duration.value) + Number(toy.value);
  total.textContent = "$" + finalPrice.toLocaleString("en-US");
  totalValue.value = "$" + finalPrice;
}

duration?.addEventListener("change", updateTotal);
toy?.addEventListener("change", updateTotal);
updateTotal();

bookingForm?.addEventListener("submit", async event => {
  event.preventDefault();
  updateTotal();

  const submitButton = bookingForm.querySelector('button[type="submit"]');
  bookingMessage.textContent = "Sending your request...";
  submitButton.disabled = true;

  try {
    const response = await fetch(bookingForm.action, {
      method: bookingForm.method,
      body: new FormData(bookingForm),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      bookingMessage.textContent = "Request received. Availability and the next steps will be confirmed by email.";
      bookingForm.reset();
      updateTotal();
    } else {
      bookingMessage.textContent = "Your request could not be sent. Please try again.";
    }
  } catch {
    bookingMessage.textContent = "Your request could not be sent. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
