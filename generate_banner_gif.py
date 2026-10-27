import os
import math
import random
from PIL import Image, ImageDraw, ImageFont

os.makedirs('github-profile/assets', exist_ok=True)
os.makedirs('public', exist_ok=True)

width = 900
height = 260
num_frames = 20

frames = []

def draw_lightning(draw, x1, y1, x2, y2, color, width=2, branches=3):
    points = [(x1, y1)]
    cur_x, cur_y = x1, y1
    steps = 12
    dx = (x2 - x1) / steps
    dy = (y2 - y1) / steps
    
    for i in range(1, steps):
        cur_x += dx + random.uniform(-14, 14)
        cur_y += dy + random.uniform(-10, 10)
        points.append((cur_x, cur_y))
    points.append((x2, y2))
    
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=color, width=width)
        if branches > 0 and random.random() > 0.65:
            bx = points[i][0] + random.uniform(-35, 35)
            by = points[i][1] + random.uniform(15, 45)
            draw.line([points[i], (bx, by)], fill=color, width=max(1, width-1))

for f in range(num_frames):
    img = Image.new('RGB', (width, height), color=(4, 8, 18))
    draw = ImageDraw.Draw(img)
    
    # 1. Subtle radial gradient & background scanlines
    for y in range(0, height, 4):
        draw.line([(0, y), (width, y)], fill=(7, 14, 28), width=1)
        
    # 2. Glowing cyan cybernetic borders & corner brackets
    border_color = (14, 165, 233)
    draw.rectangle([10, 10, width - 11, height - 11], outline=(15, 28, 56), width=1)
    
    # Corner brackets
    bracket_len = 24
    # Top-left
    draw.line([(10, 10), (10 + bracket_len, 10)], fill=(0, 240, 255), width=2)
    draw.line([(10, 10), (10, 10 + bracket_len)], fill=(0, 240, 255), width=2)
    # Top-right
    draw.line([(width - 11, 10), (width - 11 - bracket_len, 10)], fill=(0, 240, 255), width=2)
    draw.line([(width - 11, 10), (width - 11, 10 + bracket_len)], fill=(0, 240, 255), width=2)
    # Bottom-left
    draw.line([(10, height - 11), (10 + bracket_len, height - 11)], fill=(0, 240, 255), width=2)
    draw.line([(10, height - 11), (10, height - 11 - bracket_len)], fill=(0, 240, 255), width=2)
    # Bottom-right
    draw.line([(width - 11, height - 11), (width - 11 - bracket_len, height - 11)], fill=(0, 240, 255), width=2)
    draw.line([(width - 11, height - 11), (width - 11, height - 11 - bracket_len)], fill=(0, 240, 255), width=2)

    # 3. Dynamic lightning bolts flashing in frames 2, 3, 4, 12, 13
    if f in [2, 3, 4, 12, 13]:
        # Background flash
        draw.rectangle([0, 0, width, height], fill=(12, 28, 58) if f in [3, 12] else (8, 18, 38))
        # Left lightning strike to Mjolnir
        draw_lightning(draw, random.uniform(100, 300), 0, random.uniform(220, 280), 170, color=(255, 255, 255), width=3)
        draw_lightning(draw, random.uniform(600, 800), 0, random.uniform(620, 720), 160, color=(0, 240, 255), width=2)
    
    # 4. Mjolnir Hammer Icon / Silhouette on left
    hx, hy = 120, 130
    # Head
    draw.rectangle([hx - 40, hy - 25, hx + 40, hy + 25], fill=(30, 41, 59), outline=(56, 189, 248), width=2)
    # Inner glowing runes
    rune_glow = (0, 240, 255) if f in [2, 3, 4, 12, 13] else (14, 165, 233)
    draw.line([hx - 25, hy, hx + 25, hy], fill=rune_glow, width=2)
    draw.line([hx, hy - 15, hx, hy + 15], fill=rune_glow, width=2)
    # Shaft & Handle
    draw.rectangle([hx - 5, hy + 26, hx + 5, hy + 85], fill=(69, 26, 3), outline=(100, 116, 139), width=1)
    # Pommel cap
    draw.ellipse([hx - 8, hy + 83, hx + 8, hy + 97], fill=(203, 213, 225))
    
    # 5. Central Typography
    # Try default fonts or clean text
    # Top eyebrow tag
    draw.text((220, 36), "// ASGARDIAN PROTOCOL // SYSTEM ONLINE", fill=(56, 189, 248))
    
    # Title: BARATH P
    # Title shadow / glow
    pulse_color = (0, 240, 255) if f in [2, 3, 4, 12, 13] else (255, 255, 255)
    draw.text((220, 68), "BARATH P  ⚡  GOD OF THUNDER & CODE", fill=pulse_color)
    
    # Subtitle
    draw.text((220, 115), "M.SC DATA SCIENCE SCHOLAR  •  MACHINE LEARNING ARCHITECT", fill=(203, 213, 225))
    
    # Domains / tags
    tags_text = "[ PYTHON ]   [ SCIKIT-LEARN ]   [ FASTAPI ]   [ IOT AGRI-TECH ]   [ SQL ]   [ REACT ]"
    draw.text((220, 155), tags_text, fill=(14, 165, 233))
    
    # Bottom status / coordinates
    coord_text = "COORD: 11.0168° N, 76.9558° E // REPOSITORIES: 07 // STATUS: READY FOR MISSIONS"
    draw.text((220, 195), coord_text, fill=(100, 116, 139))
    
    # Runes decoration on the right
    runes = "ᚦ ᚢ ᚱ ᛁ ᛋ ᚨ ᛉ ᛏ"
    draw.text((width - 130, 120), runes, fill=(56, 189, 248))

    frames.append(img)

# Save animated GIF
gif_path = 'github-profile/assets/thor-banner.gif'
frames[0].save(
    gif_path,
    save_all=True,
    append_images=frames[1:],
    duration=100,
    loop=0,
    optimize=True
)

# Also copy to public directory for direct portfolio use
frames[0].save(
    'public/thor-banner.gif',
    save_all=True,
    append_images=frames[1:],
    duration=100,
    loop=0,
    optimize=True
)

print(f"Generated {gif_path} successfully. Total frames: {len(frames)}")
