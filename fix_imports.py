import os
import re

# Directory to search
cms_dir = r"c:\Users\saksa\OneDrive\Desktop\ninja\ninjainflatablepark-4\frontend\app\(admin-portal)\admin\cms"

# Replacement patterns
replacements = [
    (r"from '../../../../actions/", r"from '@/app/actions/"),
    (r"from '../../../../components/", r"from '@/components/"),
    (r"from '../../../../lib/", r"from '@/lib/"),
]

# Counter
files_fixed = 0

# Walk through all .tsx files
for root, dirs, files in os.walk(cms_dir):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            
            # Read file
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Apply replacements
            original_content = content
            for pattern, replacement in replacements:
                content = re.sub(pattern, replacement, content)
            
            # Write back if changed
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_fixed += 1
                print(f"Fixed: {filepath}")

print(f"\nTotal files fixed: {files_fixed}")
