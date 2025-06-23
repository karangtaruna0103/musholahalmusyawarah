const pengumumanList = [
  {
    tanggal: "22 Juni 2025",
    isi: "Akan diadakan kerja bakti membersihkan lingkungan mushola jam 07.00 WIB."
  },
  {
    tanggal: "23 Juni 2025",
    isi: "Kajian rutin malam Selasa bersama Ust. Hasyim di Mushola pukul 19.30 WIB."
  },
  {
    tanggal: "25 Juni 2025",
    isi: "Shalat Jumat akan dipimpin oleh KH. Ahmad Mustofa."
  }
];

window.onload = function () {
  const container = document.getElementById("daftar-pengumuman");

  pengumumanList.forEach(p => {
    const el = document.createElement("div");
    el.className = "card-pengumuman";
    el.innerHTML = `
      <strong>${p.tanggal}</strong><br>
      <p>${p.isi}</p>
    `;
    container.appendChild(el);
  });
};
