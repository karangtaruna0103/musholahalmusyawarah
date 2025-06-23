// Data jadwal salat manual per kota (contoh Jakarta)
// Kamu bisa sesuaikan berdasarkan lokasi atau gunakan API eksternal seperti Aladhan
const jadwalSholat = {
  Imsak: "04:30",
  Subuh: "04:40",
  Dzuhur: "11:55",
  Ashar: "15:20",
  Maghrib: "17:50",
  Isya: "19:04"
};

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


function startCountdownToNextAdzan() {
  const countdownEl = document.getElementById("countdown-adzan");

  function hitungCountdown() {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    let nextLabel = "";
    let nextTime = null;

    for (let [nama, waktu] of Object.entries(jadwalSholat)) {
      const targetTime = new Date(`${today}T${waktu}:00`);
      if (targetTime > now) {
        nextTime = targetTime;
        nextLabel = nama;
        break;
      }
    }

    // Jika sudah lewat semua jadwal hari ini → kembali ke Imsak besok
    if (!nextTime) {
      const besok = new Date(now);
      besok.setDate(now.getDate() + 1);
      nextTime = new Date(`${besok.toISOString().split("T")[0]}T${jadwalSholat.Imsak}:00`);
      nextLabel = "Imsak";
    }

    const selisih = nextTime - now;

    if (selisih <= 0) {
      countdownEl.textContent = `Waktu ${nextLabel} telah tiba.`;
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

  const jadwalImam = {
    "Senin":   { Subuh: "Ust. Fajar", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Selasa":  { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Rabu":    { Subuh: "Ust. Fajar", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Kamis":   { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Jumat":   { Subuh: "Ust. Fajar", Dzuhur: "KH. Ahmad (Khutbah)", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Sabtu":   { Subuh: "Ust. Rahmat", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
    "Minggu":  { Subuh: "Ust. Fajar", Dzuhur: "Ust. Hasyim", Ashar: "Ust. Rudi", Maghrib: "Ust. Deni", Isya: "Ust. Yusuf" },
  };

  function tampilkanJadwalImam() {
    const tbody = document.getElementById("jadwal-imam-body");
    for (let hari in jadwalImam) {
      const imam = jadwalImam[hari];
      const row = `
        <tr>
          <td><strong>${hari}</strong></td>
          <td>${imam.Subuh}</td>
          <td>${imam.Dzuhur}</td>
          <td>${imam.Ashar}</td>
          <td>${imam.Maghrib}</td>
          <td>${imam.Isya}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    }
  }

  // Panggil fungsi saat halaman selesai dimuat
  document.addEventListener("DOMContentLoaded", tampilkanJadwalImam);
