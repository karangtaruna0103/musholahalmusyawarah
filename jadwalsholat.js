// Data jadwal salat manual per kota (contoh Jakarta)
// Kamu bisa sesuaikan berdasarkan lokasi atau gunakan API eksternal seperti Aladhan
const jadwalSholat = {
  Imsak: "04:30",
  Subuh: "04:40",
  Dzuhur: "11:55",
  Ashar: "15:18",
  Maghrib: "17:50",
  Isya: "19:04"
};

function loadJadwalSholat() {
  const container = document.getElementById("jadwal-sholat");
  container.innerHTML = "";

  for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
    const col = document.createElement("div");
    col.className = "col-auto box-jadwal";
    col.innerHTML = `
      <strong>${sholat}</strong>
      <span>${waktu}</span>
    `;
    container.appendChild(col);
  }

  startCountdownToNextAdzan();
}

function startCountdownToNextAdzan() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10); // format YYYY-MM-DD
  let nextAdzan = null;
  let nextLabel = "";

  // Cari waktu adzan terdekat
  for (let [nama, jam] of Object.entries(jadwalSholat)) {
    const waktuAdzan = new Date(`${today}T${jam}:00`);
    if (waktuAdzan > now) {
      nextAdzan = waktuAdzan;
      nextLabel = nama;
      break;
    }
  }

  // Jika tidak ada lagi hari ini, pakai jadwal pertama besok
  if (!nextAdzan) {
    const besok = new Date(now);
    besok.setDate(now.getDate() + 1);
    const besokTanggal = besok.toISOString().slice(0, 10);
    const waktuPertama = jadwalSholat["Imsak"];
    nextAdzan = new Date(`${besokTanggal}T${waktuPertama}:00`);
    nextLabel = "Imsak";
  }

  const countdownElement = document.getElementById("countdown-adzan");

  function updateCountdown() {
    const now = new Date();
    const selisih = nextAdzan - now;

    if (selisih <= 0) {
      countdownElement.innerText = `Waktu ${nextLabel} telah tiba`;
      return;
    }

    const jam = Math.floor(selisih / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    countdownElement.innerText =
      `Menuju ${nextLabel}: ${jam}j ${menit}m ${detik}d`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
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
