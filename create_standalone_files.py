#!/usr/bin/env python3
"""
Convert Shukla & Co website files to standalone HTML files
- Inlines CSS from css/styles.css
- Inlines JavaScript from js/main.js
- Removes image references
- Creates self-contained files ready for GitHub upload
"""

import os
import re
from pathlib import Path

# Get current directory
base_dir = Path(__file__).parent
css_file = base_dir / "css" / "styles.css"
js_file = base_dir / "js" / "main.js"
output_dir = base_dir / "standalone-files"

# Read CSS content
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Read JavaScript content
with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# List of HTML files to convert
html_files = [
    "index.html",
    "about.html",
    "services.html",
    "contact.html",
    "service-tax-planning.html",
    "service-audit-assurance.html",
    "service-fractional-cfo.html",
    "service-roc-compliance.html",
    "service-international-taxation.html",
    "service-wealth-management.html",
    "privacy-policy.html",
    "terms-of-service.html"
]

def convert_html_to_standalone(html_file):
    """Convert an HTML file to standalone version"""

    input_path = base_dir / html_file
    output_path = output_dir / html_file

    print(f"Converting {html_file}...")

    # Read HTML content
    with open(input_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Remove CSS link and add inline style
    html_content = re.sub(
        r'<link rel="stylesheet" href="css/styles\.css">',
        f'<style>\n{css_content}\n</style>',
        html_content
    )

    # Remove JavaScript link and add inline script
    html_content = re.sub(
        r'<script src="js/main\.js"></script>',
        f'<script>\n{js_content}\n</script>',
        html_content
    )

    # Remove image tags but keep logo text
    # Replace logo image with just the brand text
    html_content = re.sub(
        r'<img src="assets/images/logo-placeholder\.png"[^>]*>',
        '',
        html_content
    )

    # Remove welcome screen logo image
    html_content = re.sub(
        r'<div class="welcome-logo-container">\s*<img[^>]*>\s*</div>',
        '<div class="welcome-logo-container">\n        <h1 class="welcome-title" style="margin-top: 2rem;">Shukla & Co.</h1>\n      </div>',
        html_content
    )

    # Remove photo placeholder
    html_content = re.sub(
        r'<img src="assets/images/shiv-shukla\.jpg"[^>]*>',
        '<div style="width: 320px; height: 320px; margin: 0 auto; border-radius: 50%; background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(22, 59, 111, 0.3) 100%); border: 6px solid rgba(255,255,255,0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 4rem; color: var(--gold-light);">👤</div>',
        html_content
    )

    # Save standalone file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"✅ Created {output_path}")

def main():
    """Main conversion function"""

    # Create output directory if it doesn't exist
    output_dir.mkdir(exist_ok=True)

    print("=" * 60)
    print("Shukla & Co. - Standalone File Generator")
    print("=" * 60)
    print()

    # Convert each HTML file
    for html_file in html_files:
        try:
            convert_html_to_standalone(html_file)
        except FileNotFoundError:
            print(f"⚠️  Skipping {html_file} (file not found)")
        except Exception as e:
            print(f"❌ Error converting {html_file}: {e}")

    print()
    print("=" * 60)
    print("✅ CONVERSION COMPLETE!")
    print("=" * 60)
    print()
    print(f"All standalone files are in: {output_dir}")
    print()
    print("Next steps:")
    print("1. Test the files by opening standalone-files/index.html in a browser")
    print("2. Upload all files from standalone-files/ to GitHub")
    print("3. Enable GitHub Pages in repository settings")
    print()

if __name__ == "__main__":
    main()
