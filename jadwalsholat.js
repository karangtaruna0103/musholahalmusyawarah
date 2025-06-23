// ==========================
// 🕌 DATA JADWAL SHOLAT (Manual - Jakarta)
// ==========================
const jadwalSholat = {
  Imsak: "04:30",
  Subuh: "04:40",
  Dzuhur: "11:55",
  Ashar: "15:20",
  Maghrib: "17:50",
  Isya: "19:04"
};

// ==========================
// 🕰️ TAMPILKAN JADWAL SHOLAT
// ==========================
function loadJadwalSholat() {
  const container = document.getElementById("jadwal-sholat");
  container.innerHTML = "";

  const icons = {
    Imsak: "🌙", Subuh: "🕌", Dzuhur: "☀️", Ashar: "🌤️", Maghrib: "🌇", Isya: "🌌"
  };

  for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2";

    col.innerHTML = `
      <div class="card border-success text-center shadow-sm">
        <div class="card-body">
          <div class="fs-2">${icons[sholat] || "🕒"}</div>
          <h6 class="card-title text-success mt-2">${sholat}</h6>
          <p class="card-text fw-bold">${waktu}</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  }

  startCountdownToNextAdzan();
}

// ==========================
// ⏳ COUNTDOWN KE ADZAN SELANJUTNYA
// ==========================
function startCountdownToNextAdzan() {
function tampilkanNotifikasiAdzan(namaSholat) {
  // Minta izin jika belum
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  // Jika diizinkan, tampilkan notifikasi
  if (Notification.permission === "granted") {
    const notif = new Notification("Waktu Sholat", {
      body: `Waktu ${namaSholat} telah tiba. Ayo sholat!`,
      icon: "img/adzan-icon.png" // Tambahkan ikon di folder /img jika ada
    });
  }
}
  const countdownEl = document.getElementById("countdown-adzan");

  function hitungCountdown() {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    let nextTime = null;
    let nextLabel = "";

    for (let [nama, waktu] of Object.entries(jadwalSholat)) {
      const targetTime = new Date(`${today}T${waktu}:00`);
      if (targetTime > now) {
        nextTime = targetTime;
        nextLabel = nama;
        break;
      }
    }

    // Jika semua waktu telah lewat hari ini → ambil Imsak besok
    if (!nextTime) {
      const besok = new Date(now);
      besok.setDate(now.getDate() + 1);
      nextTime = new Date(`${besok.toISOString().split("T")[0]}T${jadwalSholat.Imsak}:00`);
      nextLabel = "Imsak";
    }

    const selisih = nextTime - now;

    if (selisih <= 1000) {
  countdownEl.textContent = `Waktu ${nextLabel} telah tiba.`;
  tampilkanNotifikasiAdzan(nextLabel);
  return;
}


    const jam = Math.floor(selisih / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `⏳ Menuju <strong>${nextLabel}</strong>: ${jam}j ${menit}m ${detik}d`;
  }

  hitungCountdown();
  setInterval(hitungCountdown, 1000);
}

// ==========================
// 🧎 JADWAL IMAM MINGGUAN
// ==========================
const jadwalImam = {
  Senin:   { Subuh: "Ust. Fajar", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Selasa:  { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Rabu:    { Subuh: "Ust. Fajar", Dzuhur: "Ust. Ali", Ashar: "Ust. Iqbal", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Kamis:   { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Jumat:   { Subuh: "Ust. Fajar", Dzuhur: "KH. Ahmad (Khutbah)", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Sabtu:   { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  Minggu:  { Subuh: "Ust. Fajar", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Iqbal", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" }
};

// ==========================
// 📋 TAMPILKAN JADWAL IMAM MINGGUAN
// ==========================
function tampilkanImamHariIni() {
  const elemen = document.getElementById("imam-hari-ini");
  if (!elemen) return;

  const hari = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const imam = jadwalImam[hari];

  if (!imam) {
    elemen.innerHTML = `<p class="text-danger">Jadwal imam untuk hari ini belum tersedia.</p>`;
    return;
  }

  for (let [sholat, nama] of Object.entries(imam)) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2";
    col.innerHTML = `
      <div class="card border-info text-center shadow-sm">
        <div class="card-body">
          <h6 class="text-primary mb-1">${sholat}</h6>
          <p class="fw-semibold mb-0">${nama}</p>
        </div>
      </div>
    `;
    elemen.appendChild(col);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  tampilkanImamHariIni();
});
