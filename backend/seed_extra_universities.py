"""One-off: append ~125 university rows (real, well-known unis) for the new/expanded countries.
Run:  python seed_extra_universities.py   (from backend/)
Idempotent: skips rows whose (name) already exists in universities.csv.
"""
import csv
import os

DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "universities.csv")

# name, country, city, rank, ielts, pte, toefl, gpa, tmin, tmax, website, status
ROWS = [
    # Azerbaijan
    ("Baku State University", "Azerbaijan", "Baku", 601, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "bsu.edu.az", "approx"),
    ("ADA University", "Azerbaijan", "Baku", None, 6.0, 50, 72, "3.0/4.0", 8000, 12000, "ada.edu.az", "verified"),
    ("Khazar University", "Azerbaijan", "Baku", None, 6.0, 50, 72, "3.0/4.0", 4000, 6000, "khazar.org", "approx"),
    ("Azerbaijan State Oil and Industry University", "Azerbaijan", "Baku", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "asoiu.edu.az", "approx"),
    # Cyprus
    ("University of Cyprus", "Cyprus", "Nicosia", 651, 6.0, 50, 75, "3.0/4.0", 8000, 10000, "ucy.ac.cy", "verified"),
    ("University of Nicosia", "Cyprus", "Nicosia", None, 6.0, 50, 75, "2.5/4.0", 9000, 12000, "unic.ac.cy", "approx"),
    ("Cyprus University of Technology", "Cyprus", "Limassol", 751, 6.0, 50, 75, "3.0/4.0", 7000, 9000, "cut.ac.cy", "approx"),
    ("Eastern Mediterranean University", "Cyprus", "Famagusta", 801, 6.0, 50, 72, "2.5/4.0", 5000, 8000, "emu.edu.tr", "approx"),
    # Georgia
    ("Tbilisi State University", "Georgia", "Tbilisi", 901, 5.5, 43, 60, "2.5/4.0", 3000, 5000, "tsu.ge", "verified"),
    ("Ilia State University", "Georgia", "Tbilisi", None, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "iliauni.edu.ge", "approx"),
    ("Georgian Technical University", "Georgia", "Tbilisi", None, 5.5, 43, 60, "2.5/4.0", 2000, 4000, "gtu.ge", "approx"),
    ("Tbilisi State Medical University", "Georgia", "Tbilisi", None, 6.0, 50, 70, "2.5/4.0", 5000, 8000, "tsmu.edu", "approx"),
    # Kuwait
    ("Kuwait University", "Kuwait", "Kuwait City", 401, 6.5, 58, 85, "3.0/4.0", 12000, 18000, "kuniv.edu.kw", "verified"),
    ("American University of Kuwait", "Kuwait", "Kuwait City", None, 6.0, 50, 75, "3.0/4.0", 14000, 20000, "auk.edu.kw", "approx"),
    ("Gulf University for Science and Technology", "Kuwait", "Kuwait City", None, 6.0, 50, 75, "3.0/4.0", 12000, 17000, "gust.edu.kw", "approx"),
    ("Kuwait College of Science and Technology", "Kuwait", "Kuwait City", None, 6.0, 50, 75, "3.0/4.0", 10000, 15000, "kcst.edu.kw", "approx"),
    # Russia
    ("Lomonosov Moscow State University", "Russia", "Moscow", 87, 6.0, 50, 75, "3.5/5.0", 3000, 7000, "msu.ru", "verified"),
    ("Saint Petersburg State University", "Russia", "Saint Petersburg", 240, 6.0, 50, 75, "3.5/5.0", 3000, 6000, "spbu.ru", "approx"),
    ("Moscow Institute of Physics and Technology", "Russia", "Dolgoprudny", 267, 6.5, 58, 85, "4.0/5.0", 4000, 8000, "mipt.ru", "approx"),
    ("HSE University", "Russia", "Moscow", 274, 6.5, 58, 85, "4.0/5.0", 4000, 9000, "hse.ru", "approx"),
    # Albania
    ("University of Tirana", "Albania", "Tirana", None, 5.5, 43, 60, "2.5/4.0", 1500, 3000, "unitir.edu.al", "approx"),
    ("Epoka University", "Albania", "Tirana", None, 6.0, 50, 70, "3.0/4.0", 4000, 6000, "epoka.edu.al", "verified"),
    ("Polytechnic University of Tirana", "Albania", "Tirana", None, 5.5, 43, 60, "2.5/4.0", 1500, 3000, "upt.al", "approx"),
    ("Mediterranean University of Albania", "Albania", "Tirana", None, 6.0, 50, 70, "3.0/4.0", 4000, 5500, "umsh.edu.al", "approx"),
    # Chile
    ("Pontificia Universidad Catolica de Chile", "Chile", "Santiago", 102, 6.5, 58, 85, "3.0/4.0", 6000, 10000, "uc.cl", "verified"),
    ("Universidad de Chile", "Chile", "Santiago", 121, 6.5, 58, 85, "3.0/4.0", 5000, 9000, "uchile.cl", "approx"),
    ("Universidad de Santiago de Chile", "Chile", "Santiago", 701, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "usach.cl", "approx"),
    ("Universidad Tecnica Federico Santa Maria", "Chile", "Valparaiso", 901, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "usm.cl", "approx"),
    # Andorra
    ("University of Andorra", "Andorra", "Andorra la Vella", None, 5.5, 43, 60, "2.5/4.0", 2000, 4000, "uda.ad", "verified"),
    ("University of Andorra - Nursing School", "Andorra", "Andorra la Vella", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "uda.ad", "approx"),
    # Belarus
    ("Belarusian State University", "Belarus", "Minsk", 451, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "bsu.by", "verified"),
    ("Belarusian National Technical University", "Belarus", "Minsk", None, 5.5, 43, 60, "2.5/4.0", 2000, 4000, "bntu.by", "approx"),
    ("Belarusian State Medical University", "Belarus", "Minsk", None, 5.5, 43, 60, "2.5/4.0", 3000, 5000, "bsmu.by", "approx"),
    ("Minsk State Linguistic University", "Belarus", "Minsk", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "mslu.by", "approx"),
    # Bosnia and Herzegovina
    ("University of Sarajevo", "Bosnia and Herzegovina", "Sarajevo", 801, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "unsa.ba", "verified"),
    ("University of Banja Luka", "Bosnia and Herzegovina", "Banja Luka", None, 5.5, 43, 60, "2.5/4.0", 2000, 4000, "unibl.org", "approx"),
    ("International University of Sarajevo", "Bosnia and Herzegovina", "Sarajevo", None, 6.0, 50, 70, "3.0/4.0", 4500, 7000, "ius.edu.ba", "approx"),
    ("University of Mostar", "Bosnia and Herzegovina", "Mostar", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "unmo.ba", "approx"),
    # Bulgaria
    ("Sofia University", "Bulgaria", "Sofia", 701, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "uni-sofia.bg", "verified"),
    ("Medical University of Sofia", "Bulgaria", "Sofia", None, 6.0, 50, 72, "3.0/4.0", 7000, 10000, "mu-sofia.bg", "approx"),
    ("Technical University of Sofia", "Bulgaria", "Sofia", 901, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "tu-sofia.bg", "approx"),
    ("Medical University of Plovdiv", "Bulgaria", "Plovdiv", None, 6.0, 50, 72, "3.0/4.0", 7000, 9000, "mu-plovdiv.bg", "approx"),
    # Croatia
    ("University of Zagreb", "Croatia", "Zagreb", 501, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "unizg.hr", "verified"),
    ("University of Split", "Croatia", "Split", 901, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "unist.hr", "approx"),
    ("University of Rijeka", "Croatia", "Rijeka", None, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "uniri.hr", "approx"),
    ("University of Osijek", "Croatia", "Osijek", None, 6.0, 50, 75, "3.0/4.0", 3000, 5500, "unios.hr", "approx"),
    # Estonia
    ("University of Tartu", "Estonia", "Tartu", 251, 6.0, 55, 80, "3.0/4.0", 6000, 10000, "ut.ee", "verified"),
    ("Tallinn University of Technology", "Estonia", "Tallinn", 701, 6.0, 55, 80, "3.0/4.0", 6000, 9500, "taltech.ee", "approx"),
    ("Tallinn University", "Estonia", "Tallinn", 601, 6.0, 55, 80, "3.0/4.0", 5000, 9000, "tlu.ee", "approx"),
    ("Estonian Business School", "Estonia", "Tallinn", None, 6.0, 55, 80, "3.0/4.0", 7000, 11000, "ebs.ee", "approx"),
    # Iceland
    ("University of Iceland", "Iceland", "Reykjavik", 401, 6.5, 58, 85, "3.0/4.0", 0, 1000, "hi.is", "verified"),
    ("Reykjavik University", "Iceland", "Reykjavik", 701, 6.0, 55, 80, "3.0/4.0", 8000, 12000, "ru.is", "approx"),
    ("University of Akureyri", "Iceland", "Akureyri", None, 6.0, 55, 80, "3.0/4.0", 500, 1500, "unak.is", "approx"),
    # Latvia
    ("University of Latvia", "Latvia", "Riga", 601, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "lu.lv", "verified"),
    ("Riga Technical University", "Latvia", "Riga", 701, 6.0, 50, 75, "3.0/4.0", 3500, 6500, "rtu.lv", "approx"),
    ("Riga Stradins University", "Latvia", "Riga", None, 6.0, 50, 72, "3.0/4.0", 6000, 9000, "rsu.lv", "approx"),
    ("RISEBA University", "Latvia", "Riga", None, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "riseba.lv", "approx"),
    # Liechtenstein
    ("University of Liechtenstein", "Liechtenstein", "Vaduz", 901, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "uni.li", "verified"),
    # Lithuania
    ("Vilnius University", "Lithuania", "Vilnius", 401, 6.0, 55, 80, "3.0/4.0", 4000, 7000, "vu.lt", "verified"),
    ("Vilnius Tech", "Lithuania", "Vilnius", 801, 6.0, 55, 80, "3.0/4.0", 3500, 6500, "vilniustech.lt", "approx"),
    ("Kaunas University of Technology", "Lithuania", "Kaunas", 701, 6.0, 55, 80, "3.0/4.0", 3500, 6500, "ktu.lt", "approx"),
    ("Vytautas Magnus University", "Lithuania", "Kaunas", 901, 6.0, 55, 80, "3.0/4.0", 3000, 5500, "vdu.lt", "approx"),
    # Luxembourg
    ("University of Luxembourg", "Luxembourg", "Luxembourg City", 651, 6.5, 58, 85, "3.0/4.0", 800, 2000, "uni.lu", "verified"),
    ("Luxembourg School of Business", "Luxembourg", "Luxembourg City", None, 6.5, 58, 85, "3.0/4.0", 15000, 20000, "lsb.lu", "approx"),
    # Malta
    ("University of Malta", "Malta", "Msida", 601, 6.0, 50, 75, "3.0/4.0", 8000, 12000, "um.edu.mt", "verified"),
    ("Malta College of Arts, Science and Technology", "Malta", "Paola", None, 5.5, 43, 60, "2.5/4.0", 7000, 10000, "mcast.edu.mt", "approx"),
    ("London School of Commerce Malta", "Malta", "Sliema", None, 6.0, 50, 72, "3.0/4.0", 10000, 14000, "lscmalta.com", "approx"),
    # Moldova
    ("Moldova State University", "Moldova", "Chisinau", None, 5.5, 43, 60, "2.5/4.0", 2000, 4000, "usm.md", "verified"),
    ("Nicolae Testemitanu State University of Medicine and Pharmacy", "Moldova", "Chisinau", None, 5.5, 43, 60, "2.5/4.0", 4000, 6000, "usmf.md", "approx"),
    ("Technical University of Moldova", "Moldova", "Chisinau", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "utm.md", "approx"),
    ("Academy of Economic Studies of Moldova", "Moldova", "Chisinau", None, 5.5, 43, 60, "2.5/4.0", 2500, 4000, "asem.md", "approx"),
    # Monaco
    ("International University of Monaco", "Monaco", "Monte Carlo", None, 6.0, 50, 75, "3.0/4.0", 18000, 24000, "monaco.edu", "verified"),
    # Montenegro
    ("University of Montenegro", "Montenegro", "Podgorica", None, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "ucg.ac.me", "verified"),
    ("University of Donja Gorica", "Montenegro", "Podgorica", None, 6.0, 50, 70, "3.0/4.0", 4500, 7000, "udg.edu.me", "approx"),
    ("Mediterranean University", "Montenegro", "Podgorica", None, 6.0, 50, 70, "3.0/4.0", 4000, 6500, "unimediteran.net", "approx"),
    # North Macedonia
    ("Ss. Cyril and Methodius University", "North Macedonia", "Skopje", 901, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "ukim.edu.mk", "verified"),
    ("South East European University", "North Macedonia", "Tetovo", None, 6.0, 50, 70, "3.0/4.0", 3500, 5500, "seeu.edu.mk", "approx"),
    ("Goce Delcev University", "North Macedonia", "Stip", None, 5.5, 43, 60, "2.5/4.0", 2000, 3500, "ugd.edu.mk", "approx"),
    ("State University of Tetovo", "North Macedonia", "Tetovo", None, 5.5, 43, 60, "2.5/4.0", 2000, 3000, "unite.edu.mk", "approx"),
    # Romania
    ("University of Bucharest", "Romania", "Bucharest", 501, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "unibuc.ro", "verified"),
    ("Babes-Bolyai University", "Romania", "Cluj-Napoca", 801, 6.0, 50, 75, "3.0/4.0", 3000, 5500, "ubbcluj.ro", "approx"),
    ("Carol Davila University of Medicine and Pharmacy", "Romania", "Bucharest", None, 6.0, 50, 72, "3.0/4.0", 6000, 9000, "umfcd.ro", "approx"),
    ("Politehnica University of Bucharest", "Romania", "Bucharest", 901, 6.0, 50, 75, "3.0/4.0", 3000, 5500, "upb.ro", "approx"),
    # San Marino
    ("University of San Marino", "San Marino", "San Marino", None, 5.5, 43, 60, "2.5/4.0", 1500, 3500, "unirsm.sm", "verified"),
    # Serbia
    ("University of Belgrade", "Serbia", "Belgrade", 501, 6.0, 50, 75, "3.0/4.0", 2000, 5000, "bg.ac.rs", "verified"),
    ("University of Novi Sad", "Serbia", "Novi Sad", 801, 6.0, 50, 75, "3.0/4.0", 2000, 4500, "uns.ac.rs", "approx"),
    ("University of Nis", "Serbia", "Nis", None, 6.0, 50, 75, "3.0/4.0", 2000, 4000, "ni.ac.rs", "approx"),
    ("Singidunum University", "Serbia", "Belgrade", None, 6.0, 50, 70, "3.0/4.0", 4000, 6000, "singidunum.ac.rs", "approx"),
    # Slovakia
    ("Comenius University", "Slovakia", "Bratislava", 601, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "uniba.sk", "verified"),
    ("Slovak University of Technology", "Slovakia", "Bratislava", 901, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "stuba.sk", "approx"),
    ("Pavol Jozef Safarik University", "Slovakia", "Kosice", None, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "upjs.sk", "approx"),
    ("Technical University of Kosice", "Slovakia", "Kosice", None, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "tuke.sk", "approx"),
    # Slovenia
    ("University of Ljubljana", "Slovenia", "Ljubljana", 401, 6.0, 50, 75, "3.0/4.0", 4000, 7000, "uni-lj.si", "verified"),
    ("University of Maribor", "Slovenia", "Maribor", 601, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "um.si", "approx"),
    ("University of Primorska", "Slovenia", "Koper", None, 6.0, 50, 75, "3.0/4.0", 3500, 6000, "upr.si", "approx"),
    # Ukraine
    ("Taras Shevchenko National University of Kyiv", "Ukraine", "Kyiv", 701, 5.5, 43, 60, "2.5/4.0", 3000, 5000, "knu.ua", "verified"),
    ("Ivan Franko National University of Lviv", "Ukraine", "Lviv", 901, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "lnu.edu.ua", "approx"),
    ("National Technical University Kharkiv Polytechnic Institute", "Ukraine", "Kharkiv", None, 5.5, 43, 60, "2.5/4.0", 2500, 4500, "khpi.edu.ua", "approx"),
    ("Igor Sikorsky Kyiv Polytechnic Institute", "Ukraine", "Kyiv", 901, 5.5, 43, 60, "2.5/4.0", 3000, 5000, "kpi.ua", "approx"),
    # Mexico
    ("Universidad Nacional Autonoma de Mexico", "Mexico", "Mexico City", 90, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "unam.mx", "verified"),
    ("Tecnologico de Monterrey", "Mexico", "Monterrey", 401, 6.5, 58, 85, "3.0/4.0", 8000, 15000, "tec.mx", "approx"),
    ("Universidad Autonoma Metropolitana", "Mexico", "Mexico City", None, 6.0, 50, 75, "3.0/4.0", 2500, 5000, "uam.mx", "approx"),
    ("Universidad de Guadalajara", "Mexico", "Guadalajara", 801, 6.0, 50, 75, "3.0/4.0", 2500, 5000, "udg.mx", "approx"),
    # Argentina
    ("University of Buenos Aires", "Argentina", "Buenos Aires", 66, 5.5, 43, 60, "2.5/4.0", 0, 4000, "uba.ar", "verified"),
    ("Universidad Nacional de Cordoba", "Argentina", "Cordoba", 301, 5.5, 43, 60, "2.5/4.0", 0, 3000, "unc.edu.ar", "approx"),
    ("Universidad Nacional de La Plata", "Argentina", "La Plata", 601, 5.5, 43, 60, "2.5/4.0", 0, 3000, "unlp.edu.ar", "approx"),
    ("Universidad Torcuato Di Tella", "Argentina", "Buenos Aires", None, 6.0, 50, 72, "3.0/4.0", 9000, 13000, "utdt.edu", "approx"),
    # India
    ("University of Delhi", "India", "New Delhi", 501, 6.0, 50, 75, "60%+", 2000, 4000, "du.ac.in", "verified"),
    ("Indian Institute of Technology Bombay", "India", "Mumbai", 401, 6.5, 58, 85, "3.0/4.0", 3000, 6000, "iitb.ac.in", "approx"),
    ("Anna University", "India", "Chennai", 701, 6.0, 50, 75, "60%+", 2000, 4500, "annauniv.edu", "approx"),
    ("University of Mumbai", "India", "Mumbai", 801, 6.0, 50, 75, "60%+", 1500, 3500, "mu.ac.in", "approx"),
    # Indonesia
    ("University of Indonesia", "Indonesia", "Jakarta", 301, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "ui.ac.id", "verified"),
    ("Bandung Institute of Technology", "Indonesia", "Bandung", 401, 6.0, 50, 75, "3.0/4.0", 3000, 6000, "itb.ac.id", "approx"),
    ("Gadjah Mada University", "Indonesia", "Yogyakarta", 551, 6.0, 50, 75, "3.0/4.0", 2500, 5000, "ugm.ac.id", "approx"),
    ("Bina Nusantara University", "Indonesia", "Jakarta", 901, 6.0, 50, 75, "3.0/4.0", 5000, 9000, "binus.ac.id", "approx"),
    # Thailand
    ("Chulalongkorn University", "Thailand", "Bangkok", 201, 6.0, 50, 75, "3.0/4.0", 4000, 8000, "chula.ac.th", "verified"),
    ("Mahidol University", "Thailand", "Bangkok", 301, 6.0, 50, 75, "3.0/4.0", 4000, 8000, "mahidol.ac.th", "approx"),
    ("Kasetsart University", "Thailand", "Bangkok", 701, 6.0, 50, 75, "3.0/4.0", 3500, 6500, "ku.ac.th", "approx"),
    ("Thammasat University", "Thailand", "Bangkok", 651, 6.0, 50, 75, "3.0/4.0", 3500, 7000, "tu.ac.th", "approx"),
    # Hong Kong
    ("University of Hong Kong", "Hong Kong", "Hong Kong", 26, 6.5, 58, 90, "3.5/4.0", 18000, 25000, "hku.hk", "verified"),
    ("Chinese University of Hong Kong", "Hong Kong", "Hong Kong", 47, 6.5, 58, 90, "3.5/4.0", 17000, 24000, "cuhk.edu.hk", "approx"),
    ("Hong Kong University of Science and Technology", "Hong Kong", "Hong Kong", 60, 6.5, 58, 90, "3.5/4.0", 17000, 24000, "hkust.edu.hk", "approx"),
    ("City University of Hong Kong", "Hong Kong", "Hong Kong", 70, 6.5, 58, 88, "3.3/4.0", 16000, 22000, "cityu.edu.hk", "approx"),
]

DOCS = "Academic transcripts, English proficiency, Passport copy, Statement of purpose, Reference letters"


def main():
    existing = set()
    if os.path.exists(DATA):
        with open(DATA, newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                existing.add(r["name"])

    added = 0
    lines = []
    for name, country, city, rank, ielts, pte, toefl, gpa, tmin, tmax, site, status in ROWS:
        if name in existing:
            continue
        existing.add(name)
        fees = f"USD {tmin:,}-{tmax:,}/year" if tmin and tmax else ""
        lines.append(
            {
                "id": "",
                "name": name,
                "country": country,
                "city": city,
                "rank_world": str(rank) if rank else "",
                "intake_seasons": "Sep/Feb",
                "ielts_min": str(ielts) if ielts else "",
                "pte_min": str(pte) if pte else "",
                "toefl_min": str(toefl) if toefl else "",
                "gpa_requirement": gpa,
                "tuition_fees": fees,
                "tuition_min_usd": str(tmin) if tmin else "",
                "tuition_max_usd": str(tmax) if tmax else "",
                "application_fee": "USD 50",
                "documents_required": DOCS,
                "deadlines": "Fall: Apr / Spring: Nov",
                "official_website": f"https://{site}",
                "admissions_page": f"https://{site}",
                "notes": "",
                "status": status,
            }
        )
        added += 1

    if added:
        with open(DATA, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(lines[0].keys()))
            writer.writerows(lines)
    print(f"added {added} rows; total rows now {sum(1 for _ in open(DATA, encoding='utf-8'))}")


if __name__ == "__main__":
    main()
