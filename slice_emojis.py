from PIL import Image
import os
import json

img_path = r"public/emojis/spritesheet.png"
output_dir = r"public/emojis"

img = Image.open(img_path).convert("RGBA")
w, h = img.size

rows, cols = 5, 5
cell_w = w / cols
cell_h = h / rows

emoji_names = [
    # Row 1
    ("happy", "bounce & pulse"),
    ("laughing", "shake & giggle"),
    ("smile", "gentle scale"),
    ("heart-eyes", "pulse hearts"),
    ("cool", "slide down & tilt"),
    # Row 2
    ("thinking", "float & tilt"),
    ("surprised", "pop & scale"),
    ("crying", "tear drop pulse"),
    ("angry", "shake & red glow"),
    ("party", "confetti burst"),
    # Row 3
    ("sleeping", "zzz float"),
    ("excited", "star pulse & clap"),
    ("coding", "typing & terminal spark"),
    ("laptop", "screen glow"),
    ("coffee", "steam float"),
    # Row 4
    ("graduation", "cap toss & confetti"),
    ("rocket", "launch trajectory"),
    ("thankyou", "heart float"),
    ("thumbsup", "pop & thumbs up"),
    ("clapping", "hands clap pulse"),
    # Row 5
    ("waving", "hand wave loop"),
    ("namaste", "gentle bow"),
    ("winner", "trophy glow"),
    ("focus", "bullseye pulse"),
    ("fire", "flame flicker")
]

metadata = []

for idx, (name, anim) in enumerate(emoji_names):
    r = idx // 5
    c = idx % 5
    
    left = c * cell_w
    top = r * cell_h
    right = (c + 1) * cell_w
    # Exclude text label at bottom of cell (bottom 18%)
    bottom = top + (cell_h * 0.83)
    
    crop_img = img.crop((int(left), int(top), int(right), int(bottom)))
    
    # Process image to make white / near-white background transparent
    datas = crop_img.getdata()
    new_data = []
    for item in datas:
        r_val, g_val, b_val, a_val = item
        # If color is near white
        if r_val > 235 and g_val > 235 and b_val > 235:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r_val, g_val, b_val, a_val))
            
    crop_img.putdata(new_data)
    
    # Trim transparent edges to center subject perfectly
    bbox = crop_img.getbbox()
    if bbox:
        cropped = crop_img.crop(bbox)
        # Create square canvas
        max_dim = max(cropped.width, cropped.height) + 16
        square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        offset = ((max_dim - cropped.width) // 2, (max_dim - cropped.height) // 2)
        square_img.paste(cropped, offset)
        final_img = square_img
    else:
        final_img = crop_img
        
    out_file = f"{name}.png"
    out_path = os.path.join(output_dir, out_file)
    final_img.save(out_path, "PNG")
    
    metadata.append({
        "name": name,
        "filename": out_file,
        "path": f"/emojis/{out_file}",
        "width": final_img.width,
        "height": final_img.height,
        "recommendedAnimation": anim
    })

json_path = os.path.join(output_dir, "emojis.json")
with open(json_path, "w") as f:
    json.dump(metadata, f, indent=2)

print(f"Successfully exported {len(metadata)} emojis and metadata JSON!")
