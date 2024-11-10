const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const target = path.resolve(__dirname, '../../public/images/heros');
const destination = path.resolve(__dirname, '../../public/images/heros'); // Simpan di folder yang sama

// Membuat direktori destination jika belum ada
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Proses resize gambar
fs.readdirSync(target)
  .forEach((image) => {
    // Skip if file is already a processed version
    if (image.includes('-large') || image.includes('-small')) {
      return;
    }

    // Mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(600)
      .toFile(path.resolve(
        destination,
        `${image.split('.').slice(0, -1).join('.')}-large.jpg`,
      ))
      .catch(err => {
        console.error(`Error processing large version of ${image}:`, err);
      });

    // Mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    sharp(`${target}/${image}`)
      .resize(400)
      .toFile(path.resolve(
        destination,
        `${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ))
      .catch(err => {
        console.error(`Error processing small version of ${image}:`, err);
      });
  });