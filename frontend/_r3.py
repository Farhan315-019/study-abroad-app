import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def show(path, a, b, label):
    l = open(path, encoding="utf-8").read().splitlines()
    print(f"=== {label} ===")
    for i, x in enumerate(l):
        if a <= i < b:
            print(f"{i+1}: {x}")
show("src/data/study.ts", 0, 26, "StudyDestination interface")
show("src/pages/VisaGuides.tsx", 28, 90, "VisaGuides VISAS")
show("src/components/home/Countries.tsx", 40, 90, "home/Countries COUNTRIES usage")
