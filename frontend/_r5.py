l = open("src/components/home/data.ts", encoding="utf-8").read().splitlines()
print("\n".join(f"{i+1}: {x}" for i, x in enumerate(l[:8])))
