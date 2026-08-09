import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
t = open("src/data/study.ts", encoding="utf-8").read()
for name in ["Germany", "Canada", "Australia", "USA", "UK", "Malaysia"]:
    m = re.search(r"\{\s*slug: \"" + name.lower() + r"\".*?\n  \}", t, re.S)
    if m:
        block = m.group(0)
        vals = {}
        for k in ["name", "flag", "unis", "tuition", "work", "visaTime", "streams"]:
            mm = re.search(k + r":\s*([^\n]+),", block)
            if mm:
                vals[k] = mm.group(1).strip()
        print(name, "->", vals)
    else:
        print(name, "NOT FOUND")
