from PIL import Image, ImageDraw

OUT = "public/favicon.png"
SIZE = 512
PADDING = 80


def is_content(r: int, g: int, b: int, a: int) -> bool:
    if a < 128:
        return False
    return r + g + b < 740


def main() -> None:
    img = Image.open(OUT).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if is_content(*pixels[x, y]):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    bbox_h = max_y - min_y
    icon_max_y = min_y + int(bbox_h * 0.6)
    icon = img.crop((min_x, min_y, max_x, icon_max_y))

    scale = min((SIZE - 2 * PADDING) / icon.width, (SIZE - 2 * PADDING) / icon.height)
    nw, nh = int(icon.width * scale), int(icon.height * scale)
    logo = icon.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).ellipse((2, 2, SIZE - 3, SIZE - 3), fill=(255, 255, 255, 255))

    ox = (SIZE - nw) // 2
    oy = (SIZE - nh) // 2
    canvas.paste(logo, (ox, oy), logo)

    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, SIZE - 1, SIZE - 1), fill=255)
    final = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    final.paste(canvas, (0, 0), mask)
    final.save(OUT, "PNG", optimize=True)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
