import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def show(path, a, b, label):
    l = open(path, encoding="utf-8").read().splitlines()
    print(f"=== {label} ===")
    for i, x in enumerate(l):
        if a <= i < b:
            print(f"{i+1}: {x}")
show("src/components/home/data.ts", 28, 36, "home/data.ts HERO_STATS")
show("src/components/home/data.ts", 64, 70, "home/data.ts :67")
show("src/components/home/data.ts", 140, 160, "home/data.ts COUNTRIES")
show("src/components/home/data.ts", 198, 202, "home/data.ts :200")
show("src/components/home/data.ts", 397, 401, "home/data.ts :399")
