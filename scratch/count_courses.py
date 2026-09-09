import re
import os

filepath = os.path.join('src', 'data', 'programsData.ts')
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)"'
matches = re.findall(pattern, text)

print(f"Total Programs/Courses in programsData.ts: {len(matches)}")
for idx, (cid, title) in enumerate(matches, 1):
    print(f"{idx}. [{cid}] {title}")
