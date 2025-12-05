import subprocess
import os

PATHS_TO_TRY = [
    # Data
    "frontend/data/activities.ts",
    "frontend/src/data/activities.ts",

    # Home Page
    "frontend/app/page.tsx",
    "frontend/src/app/page.tsx",
    "frontend/app/(main)/page.tsx",
    "frontend/src/app/(main)/page.tsx",
    "frontend/app/(landing)/page.tsx",

    # Layout/Footer
    "frontend/app/layout.tsx",
    "frontend/src/app/layout.tsx",
    "frontend/components/Footer.tsx",
    "frontend/src/components/Footer.tsx",

    # About Page
    "frontend/app/about/page.tsx",
    "frontend/src/app/about/page.tsx",
    "frontend/app/(main)/about/page.tsx",
    
    # Pricing Page
    "frontend/app/pricing/page.tsx",
    "frontend/src/app/pricing/page.tsx",
    "frontend/app/(main)/pricing/page.tsx",

    # Parties Page
    "frontend/app/parties/page.tsx",
    "frontend/src/app/parties/page.tsx",
    "frontend/app/(main)/parties/page.tsx",
    
    # Contact Page
    "frontend/app/contact/page.tsx",
    "frontend/src/app/contact/page.tsx",
    "frontend/app/(main)/contact/page.tsx",
]

BRANCH = "feature/new-achitecture-and-backend"
OUTPUT_DIR = "legacy_content"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

found_files = []

print(f"Scanning branch: {BRANCH}")

for path in PATHS_TO_TRY:
    cmd = ["git", "show", f"{BRANCH}:{path}"]
    try:
        # Run git show
        result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if result.returncode == 0 and result.stdout.strip():
            # Sanitize paths for filename
            safe_name = path.replace("/", "__")
            out_file = os.path.join(OUTPUT_DIR, safe_name)
            
            with open(out_file, "w", encoding='utf-8') as f:
                f.write(result.stdout)
                
            print(f"[FOUND] {path} -> {out_file} ({len(result.stdout)} chars)")
            found_files.append(path)
        else:
            # print(f"[MISSING] {path}")
            pass

    except Exception as e:
        print(f"[ERROR] {path}: {e}")

print(f"\nTotal files found: {len(found_files)}")
print("Found paths:")
for p in found_files:
    print(f"- {p}")
