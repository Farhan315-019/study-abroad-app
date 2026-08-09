import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def show(path, a, b, label):
    l = open(path, encoding="utf-8").read().splitlines()
    print(f"=== {label} ===")
    for i, x in enumerate(l):
        if a <= i < b:
            print(f"{i+1}: {x}")
show("src/components/home/Countries.tsx", 25, 40, "home/Countries.tsx :31")
show("src/components/home/AiDemo.tsx", 25, 33, "AiDemo :29")
show("src/components/home/AiDemo.tsx", 296, 303, "AiDemo :300")
show("src/components/ai-tools/ToolsHero.tsx", 42, 50, "ToolsHero :46")
show("src/components/ai-tools/data.ts", 527, 535, "ai-tools/data.ts :531")
show("src/pages/StudyIn.tsx", 62, 70, "StudyIn :66")
show("src/pages/Press.tsx", 5, 12, "Press :9")
