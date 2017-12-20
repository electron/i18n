# Objek info memory

*  pid </ 0>  Integer - Proses id proses.</li>
<li><code> workingSetSize </ 0>  Integer - Jumlah memori yang saat ini disematkan pada RAM fisik sebenarnya.</li>
<li><code> peakWorkingSetSize </ 0>  Integer - Jumlah maksimum memori yang pernah disematkan ke RAM fisik sebenarnya. Pada macOS nilainya akan selalu 0.</li>
<li><code> privateBytes </ 0>  Integer - Jumlah memori yang tidak dibagi oleh proses lain, seperti tumpukan JS atau konten HTML.</li>
<li><code> sharedBytes </ 0>  Integer - Jumlah memori yang dibagi antara proses, biasanya memori yang dikonsumsi oleh kode Elektron itu sendiri.</li>
</ul>

<p>Perhatikan bahwa semua statistik dilaporkan di Kilobytes.</p>