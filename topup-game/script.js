const baseLink = "https://mytopupgame.com"; // ubah di sini jika perlu

const games = [
  {
    id: "zzz",
    name: "Zenless Zone Zero",
    logo: "images/zzz-logo.png",
    description: "Zenless Zone Zero adalah game action gacha ...",
    items: [{ name: "330 Monochrome", price: 70000 }]
  },
  {
    id: "hsr",
    name: "Honkai Star Rail",
    logo: "images/hsr-logo.png",
    description: "Honkai Star Rail adalah RPG ...",
    items: [{ name: "160 Stellar Jade", price: 50000 }, { name: "450 Stellar Jade", price: 130000 }]
  },
  // ... games lainnya
];

// generate daftar logo
const gameList = document.getElementById("game-list");
games.forEach(g => {
  const img = document.createElement("img");
  img.src = g.logo;
  img.alt = g.name;
  img.onclick = () => openModal(g);
  gameList.appendChild(img);
});

const modal = document.getElementById("game-modal");
const detail = document.getElementById("game-detail");
const closeBtn = document.getElementById("close-modal");
closeBtn.onclick = ()=> modal.classList.add("hidden");

function openModal(game) {
  detail.innerHTML = `
    <h2>${game.name}</h2>
    <p>${game.description}</p>
    <div class="nominal-list">
      ${game.items.map(item =>
        `<button onclick="topup('${game.id}','${item.name}',${item.price})">
          ${item.name} — Rp ${item.price.toLocaleString()}
        </button>`
      ).join("")}
    </div>
    <div class="payment-method">
      <p>Pilih metode pembayaran:</p>
      <button onclick="generateQRCode('${game.id}')">QRIS</button>
      <button onclick="sendEmail('${game.id}')">Email</button>
    </div>
    <div id="qrcode"></div>
  `;
  modal.classList.remove("hidden");
}

function topup(gameId, itemName, price) {
  alert(`Kamu memilih ${itemName} (${price.toLocaleString()}) untuk ${gameId}`);
}

function generateQRCode(gameId) {
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, {
    text: `${baseLink}/pay?game=${gameId}`,
    width: 128,
    height: 128
  });
}

function sendEmail(gameId) {
  const subject = encodeURIComponent(`Request TopUp: ${gameId}`);
  const body = encodeURIComponent(`Halo, saya ingin top-up game ${gameId}.\nNominal: ...\nID/UID: ...`);
  window.location.href = `mailto:support@mytopupgame.com?subject=${subject}&body=${body}`;
}
