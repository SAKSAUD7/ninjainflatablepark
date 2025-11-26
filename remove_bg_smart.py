from PIL import Image
import sys

def is_background_color(pixel):
    # Check if pixel is light (white or light gray checkerboard)
    # Adjust threshold if needed. 
    # Checkerboard is usually (255,255,255) and (204,204,204) or similar.
    r, g, b, a = pixel
    return r > 200 and g > 200 and b > 200

def remove_background_floodfill(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # Stack for flood fill
        stack = []
        
        # Start from all four corners (assuming they are background)
        corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        for x, y in corners:
            if is_background_color(pixels[x, y]):
                stack.append((x, y))
        
        visited = set()
        
        while stack:
            x, y = stack.pop()
            
            if (x, y) in visited:
                continue
            
            visited.add((x, y))
            
            # Make transparent
            pixels[x, y] = (255, 255, 255, 0)
            
            # Check neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        # If neighbor is also background color, continue flood fill
                        if is_background_color(pixels[nx, ny]):
                            stack.append((nx, ny))
                            
        img.save(output_path, "PNG")
        print("Successfully removed background using flood fill")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Use the latest uploaded logo
    remove_background_floodfill("apps/web/public/logo_final.png", "apps/web/public/logo_transparent.png")
