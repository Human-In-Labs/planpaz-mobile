import json
from pathlib import Path
from PIL import Image, ImageDraw

def create_round_icon(img: Image.Image) -> Image.Image:
    """Cria versão com máscara circular para o Android roundIcon."""
    # Trabalha em alta resolução antes de salvar
    size = img.size[0]
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rgba_img = img.convert("RGBA")
    output.paste(rgba_img, (0, 0), mask=mask)
    return output

def generate_android_icons(base_img: Image.Image, res_dir: Path):
    densities = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }
    
    round_base = create_round_icon(base_img)
    
    for folder, size in densities.items():
        target_dir = res_dir / folder
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # Quadrado
        square = base_img.resize((size, size), Image.Resampling.LANCZOS)
        square.save(target_dir / "ic_launcher.png", format="PNG")
        
        # Redondo
        rounded = round_base.resize((size, size), Image.Resampling.LANCZOS)
        rounded.save(target_dir / "ic_launcher_round.png", format="PNG")
    
    print("[OK] Icones Android gerados com sucesso.")

def generate_ios_icons(base_img: Image.Image, appiconset_dir: Path):
    contents_path = appiconset_dir / "Contents.json"
    if not contents_path.exists():
        print(f"Aviso: {contents_path} nao encontrado.")
        return

    with open(contents_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # iOS nao permite transparencia no icone da App Store / appiconset
    rgb_base = base_img.convert("RGB")

    for item in data.get("images", []):
        size_w, size_h = map(float, item["size"].split("x"))
        scale = float(item["scale"].replace("x", ""))
        px = int(round(size_w * scale))
        
        filename = f"icon-{item['idiom']}-{item['size']}@{item['scale']}.png"
        item["filename"] = filename
        
        resized = rgb_base.resize((px, px), Image.Resampling.LANCZOS)
        resized.save(appiconset_dir / filename, format="PNG")

    with open(contents_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print("[OK] Icones iOS gerados com sucesso.")

def main():
    root = Path(__file__).resolve().parent.parent
    src_img_path = root / "src" / "assets" / "images" / "app-icon.png"
    
    if not src_img_path.exists():
        raise FileNotFoundError(f"Imagem não encontrada em: {src_img_path}")

    base_img = Image.open(src_img_path)
    print(f"Carregada imagem base: {src_img_path.name} ({base_img.size[0]}x{base_img.size[1]})")

    # Android
    android_res = root / "android" / "app" / "src" / "main" / "res"
    generate_android_icons(base_img, android_res)

    # iOS
    ios_appiconset = root / "ios" / "Teste" / "Images.xcassets" / "AppIcon.appiconset"
    generate_ios_icons(base_img, ios_appiconset)

if __name__ == "__main__":
    main()
