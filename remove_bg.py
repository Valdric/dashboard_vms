from PIL import Image
import numpy as np

def remove_white_bg_smart(input_path, output_path):
    """
    Smart white background removal:
    1. Sample warna background dari 4 sudut gambar
    2. Gunakan color distance untuk menentukan transparansi setiap piksel
    """
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    h, w = data.shape[:2]

    # Sample background dari pojok-pojok gambar (5x5 area tiap pojok)
    corners = [
        data[0:5, 0:5, :3],
        data[0:5, w-5:w, :3],
        data[h-5:h, 0:5, :3],
        data[h-5:h, w-5:w, :3],
    ]
    bg_color = np.median(np.concatenate([c.reshape(-1,3) for c in corners], axis=0), axis=0)
    print(f"     Background color terdeteksi: RGB({int(bg_color[0])}, {int(bg_color[1])}, {int(bg_color[2])})")

    # Hitung jarak warna setiap piksel dari background
    r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]
    
    # Euclidean distance dari background color
    dist = np.sqrt(
        (r - bg_color[0])**2 +
        (g - bg_color[1])**2 +
        (b - bg_color[2])**2
    )

    # Threshold: piksel yang "dekat" dengan bg → transparan
    # Gradasi lembut antara 0 dan 30 unit distance
    sensitivity = 35.0   # makin kecil = makin sedikit yg dihapus
    feather     = 15.0   # zona transisi (anti-aliasing)

    alpha = np.clip((dist - sensitivity) / feather * 255, 0, 255).astype(np.uint8)

    # Alpha baru
    data[:,:,3] = alpha

    result = Image.fromarray(data.astype(np.uint8), "RGBA")
    result.save(output_path, "PNG", optimize=True)

    transparent = np.sum(alpha < 10)
    semi = np.sum((alpha >= 10) & (alpha < 245))
    total = h * w
    print(f"     Fully transparent: {transparent}/{total} ({100*transparent//total}%)")
    print(f"     Semi-transparent : {semi}/{total} ({100*semi//total}%)")
    print(f"[OK] Saved -> {output_path}")

remove_white_bg_smart(
    "images (12).png",
    "public/logo-danantara.png"
)
print("Selesai!")
