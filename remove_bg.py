from PIL import Image

def remove_bg(input_path, output_path, bg_color):
    img = Image.open(input_path).convert('RGBA')
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate distance to background color
        dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
        
        if dist < 40: # tolerance for JPEG artifacts
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, 'PNG')

remove_bg('public/logo1.jpeg', 'public/logo1_transparent.png', (0,0,0))
remove_bg('public/logo2.jpeg', 'public/logo2_transparent.png', (255,255,255))
remove_bg('public/logo3.jpeg', 'public/logo3_transparent.png', (255,255,255))
print('Done!')
