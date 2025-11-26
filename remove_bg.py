from PIL import Image
import sys

def remove_background(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        # Define the checkerboard colors (approximate)
        # White: (255, 255, 255)
        # Gray: (204, 204, 204) or similar. Let's use a threshold.
        
        for item in datas:
            # Check if pixel is white-ish or gray-ish (checkerboard pattern)
            # Adjust thresholds as needed. 
            # Checkerboard gray is often around 204 or 230.
            if (item[0] > 200 and item[1] > 200 and item[2] > 200):
                # Make it transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Successfully removed background")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_background("apps/web/public/logo.png", "apps/web/public/logo_transparent.png")
