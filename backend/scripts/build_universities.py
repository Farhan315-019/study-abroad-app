"""One-off generator for data/universities.csv. Run: python scripts/build_universities.py"""
import csv
import os

U = []


def add(name, country, city, ielts, pte, toefl, gpa, fees, min_usd, max_usd,
        app_fee, docs, deadlines, website, admit=None, rank=None, *extra):
    """Positional layout: rank, then optional notes, then optional status."""
    notes = extra[0] if len(extra) >= 1 else ""
    status = extra[1] if len(extra) >= 2 else "approx"
    intake = "Fall/Spring"
    U.append([
        name, country, city, rank, intake, ielts, pte, toefl, gpa, fees,
        min_usd, max_usd, app_fee, ", ".join(docs), deadlines, website,
        admit or website, notes, status,
    ])


D = ["Academic transcripts", "English proficiency", "Passport copy",
     "Statement of purpose", "Reference letters"]
D_US = ["Academic transcripts", "English proficiency", "Passport copy",
        "Statement of purpose", "Reference letters", "SAT/ACT (program dependent)"]
D_CA = ["Academic transcripts", "English proficiency", "Passport copy",
        "Statement of purpose", "Reference letters", "Study permit after offer"]
D_AU = ["Academic transcripts", "English proficiency", "Passport copy",
        "Statement of purpose", "Reference letters", "Confirmation of Enrolment (CoE)"]
D_DE = ["Academic transcripts", "English proficiency", "Passport copy",
        "Statement of purpose", "APS certificate", "Visa block account for study permit"]
D_UK = ["Academic transcripts", "English proficiency", "Passport copy",
        "Personal statement", "Reference letters", "CAS for visa"]

# --- USA (22) ---
add("Massachusetts Institute of Technology (MIT)", "USA", "Cambridge", 7.0, 65, 100, "3.8/4.0 (top 5% of class)", "USD 55,000-60,000/year", 55000, 60000, "USD 75", D_US, "Fall: Jan (EA) / Mar (RD)", "https://www.mit.edu", "https://mitadmissions.org", 3, "Need-based financial aid for international students", "verified")
add("Harvard University", "USA", "Cambridge", 7.0, 65, 100, "3.8/4.0", "USD 54,000/year", 54000, 57000, "USD 85", D_US, "Fall: Nov (EA) / Jan (RD)", "https://www.harvard.edu", "https://college.harvard.edu/admissions", 4, "Very competitive; holistic review", "verified")
add("Stanford University", "USA", "Stanford", 7.0, 65, 100, "3.8/4.0", "USD 56,000/year", 56000, 59000, "USD 90", D_US, "Fall: Nov (REA) / Jan (RD)", "https://www.stanford.edu", "https://admission.stanford.edu", 7, "Great financial aid for internationals", "approx")
add("California Institute of Technology (Caltech)", "USA", "Pasadena", 7.0, 65, 100, "3.8/4.0", "USD 56,000/year", 56000, 60000, "USD 75", D_US, "Fall: Nov / Jan", "https://www.caltech.edu", "https://admissions.caltech.edu", 9, "STEM-focused; strong math/physics background needed", "approx")
add("University of California, Berkeley", "USA", "Berkeley", 7.0, 65, 80, "3.7/4.0", "USD 45,000/year (out-of-state)", 45000, 50000, "USD 80", D_US, "Fall: Nov", "https://www.berkeley.edu", "https://admissions.berkeley.edu", 10, "Public university; strong engineering and sciences", "approx")
add("University of California, Los Angeles (UCLA)", "USA", "Los Angeles", 7.0, 65, 80, "3.7/4.0", "USD 44,000/year (out-of-state)", 44000, 49000, "USD 80", D_US, "Fall: Nov", "https://www.ucla.edu", "https://admission.ucla.edu", 14, "Public research university", "approx")
add("University of Michigan", "USA", "Ann Arbor", 7.0, 65, 100, "3.7/4.0", "USD 50,000/year (out-of-state)", 50000, 55000, "USD 75", D_US, "Fall: Feb", "https://umich.edu", "https://admissions.umich.edu", 21, "Strong engineering, business and Ross programs", "approx")
add("University of Texas at Austin", "USA", "Austin", 6.5, 58, 79, "3.5/4.0", "USD 38,000-42,000/year (out-of-state)", 38000, 42000, "USD 75", D_US, "Fall: Dec", "https://www.utexas.edu", "https://admissions.utexas.edu", 38, "Public flagship with strong CS program", "approx")
add("Georgia Institute of Technology", "USA", "Atlanta", 7.0, 65, 100, "3.6/4.0", "USD 30,000-33,000/year (out-of-state)", 30000, 33000, "USD 85", D_US, "Fall: Oct (EA) / Jan (RD)", "https://www.gatech.edu", "https://admission.gatech.edu", 34, "Top engineering school; affordable vs privates", "approx")
add("Purdue University", "USA", "West Lafayette", 6.5, 58, 80, "3.5/4.0", "USD 29,000-33,000/year (out-of-state)", 29000, 33000, "USD 60", D_US, "Fall: Nov (EA) / Jan (RD)", "https://www.purdue.edu", "https://admissions.purdue.edu", 62, "Excellent engineering at moderate cost", "approx")
add("University of Illinois Urbana-Champaign", "USA", "Urbana-Champaign", 6.5, 58, 80, "3.6/4.0", "USD 35,000-40,000/year (out-of-state)", 35000, 40000, "USD 75", D_US, "Fall: Nov", "https://illinois.edu", "https://admissions.illinois.edu", 72, "Top CS/engineering program", "approx")
add("University of Washington", "USA", "Seattle", 7.0, 65, 92, "3.5/4.0", "USD 38,000-42,000/year (out-of-state)", 38000, 42000, "USD 80", D_US, "Fall: Nov", "https://www.washington.edu", "https://admissions.uw.edu", 63, "Strong CS, medical and engineering", "approx")
add("Pennsylvania State University", "USA", "University Park", 6.5, 58, 80, "3.4/4.0", "USD 34,000-38,000/year (out-of-state)", 34000, 38000, "USD 65", D_US, "Fall: Nov (EA) / Feb (RD)", "https://www.psu.edu", "https://admissions.psu.edu", 89, "Large flagship; rolling-ish decisions", "approx")
add("Arizona State University", "USA", "Tempe", 6.0, 50, 79, "3.0/4.0", "USD 28,000-32,000/year (out-of-state)", 28000, 32000, "USD 70", D_US, "Fall: Jan / Spring: Oct", "https://www.asu.edu", "https://admission.asu.edu", 179, "Very international-friendly; multiple intakes", "approx")
add("University of Houston", "USA", "Houston", 6.5, 58, 79, "3.0/4.0", "USD 24,000-27,000/year (out-of-state)", 24000, 27000, "USD 90", D_US, "Fall: Apr / Spring: Oct / Summer: Mar", "https://www.uh.edu", "https://uh.edu/admissions", 425, "Affordable; strong engineering/energy programs", "approx")
add("University of Texas at Dallas", "USA", "Richardson", 6.5, 58, 80, "3.0/4.0", "USD 27,000-30,000/year (out-of-state)", 27000, 30000, "USD 75", D_US, "Fall: May / Spring: Oct / Summer: Mar", "https://www.utdallas.edu", "https://admissions.utdallas.edu", 405, "Budget-friendly with strong STEM", "approx")
add("New York University (NYU)", "USA", "New York", 7.0, 65, 100, "3.7/4.0", "USD 53,000/year", 53000, 58000, "USD 80", D_US, "Fall: Nov (ED) / Jan (RD)", "https://www.nyu.edu", "https://www.nyu.edu/admissions", 38, "Generous scholarships via NYU 1831 Fund", "approx")
add("Boston University", "USA", "Boston", 7.0, 65, 90, "3.5/4.0", "USD 55,000/year", 55000, 60000, "USD 80", D_US, "Fall: Nov (ED) / Jan (RD)", "https://www.bu.edu", "https://www.bu.edu/admissions", 105, "Strong international community", "approx")
add("Ohio State University", "USA", "Columbus", 6.5, 58, 79, "3.4/4.0", "USD 33,000-36,000/year (out-of-state)", 33000, 36000, "USD 60", D_US, "Fall: Nov (EA) / Jan (RD)", "https://www.osu.edu", "https://admissions.osu.edu", 94, "Large flagship with many majors", "approx")
add("University of Florida", "USA", "Gainesville", 6.5, 58, 80, "3.6/4.0", "USD 29,000-31,000/year (out-of-state)", 29000, 31000, "USD 30", D_US, "Fall: Nov", "https://www.ufl.edu", "https://admissions.ufl.edu", 98, "Public Ivy at lower cost", "approx")
add("Illinois Institute of Technology (IIT)", "USA", "Chicago", 6.5, 58, 80, "3.0/4.0", "USD 45,000-48,000/year", 45000, 48000, "USD 50", D_US, "Fall: Jan / Spring: Oct", "https://www.iit.edu", "https://www.iit.edu/admissions", 385, "High merit scholarships for internationals", "approx")
add("San Jose State University", "USA", "San Jose", 6.0, 50, 80, "3.0/4.0", "USD 21,000-24,000/year (out-of-state)", 21000, 24000, "USD 70", D_US, "Fall: Apr / Spring: Sep", "https://www.sjsu.edu", "https://www.sjsu.edu/admissions", 1421, "Located in Silicon Valley; strong tech placement", "approx")

# --- UK (18) ---
add("University of Oxford", "United Kingdom", "Oxford", 7.0, 66, 100, "A*AA - AAA (A-levels)", "GBP 30,000-40,000/year", 22500, 30000, "GBP 75", D_UK, "Fall: Oct 15", "https://www.ox.ac.uk", "https://www.ox.ac.uk/admissions/undergraduate", 1, "Collegiate system; interviews required", "verified")
add("University of Cambridge", "United Kingdom", "Cambridge", 7.0, 66, 100, "A*AA - AAA (A-levels)", "GBP 30,000-38,000/year", 22500, 28500, "GBP 60", D_UK, "Fall: Oct 15", "https://www.cam.ac.uk", "https://www.undergraduate.study.cam.ac.uk", 2, "Collegiate system; written assessment", "verified")
add("Imperial College London", "United Kingdom", "London", 7.0, 65, 100, "AAA - A*AA (A-levels)", "GBP 35,000-40,000/year", 26500, 30000, "GBP 75", D_UK, "Fall: Oct 15", "https://www.imperial.ac.uk", "https://www.imperial.ac.uk/study", 6, "STEM specialist; strong for engineering", "approx")
add("University College London (UCL)", "United Kingdom", "London", 6.5, 62, 92, "ABB - AAA (A-levels)", "GBP 29,000-35,000/year", 22000, 26500, "GBP 90", D_UK, "Fall: Jan", "https://www.ucl.ac.uk", "https://www.ucl.ac.uk/prospective-students", 9, "Wide range of programs", "approx")
add("London School of Economics (LSE)", "United Kingdom", "London", 7.0, 66, 100, "AAB - AAA (A-levels)", "GBP 25,000-30,000/year", 19000, 22500, "GBP 80", D_UK, "Fall: Jan", "https://www.lse.ac.uk", "https://www.lse.ac.uk/study", 45, "Social sciences focused", "approx")
add("University of Edinburgh", "United Kingdom", "Edinburgh", 6.5, 62, 92, "ABB - AAA (A-levels)", "GBP 24,000-30,000/year", 18000, 22500, "GBP 22", D_UK, "Fall: Jan", "https://www.ed.ac.uk", "https://www.ed.ac.uk/studying", 27, "Beautiful city; strong research", "approx")
add("University of Manchester", "United Kingdom", "Manchester", 6.5, 60, 90, "BBB - AAB (A-levels)", "GBP 24,000-29,000/year", 18000, 22000, "GBP 25", D_UK, "Fall: Jan", "https://www.manchester.ac.uk", "https://www.manchester.ac.uk/study", 32, "Large international student body", "approx")
add("King's College London", "United Kingdom", "London", 7.0, 65, 100, "BBB - AAA (A-levels)", "GBP 25,000-30,000/year", 19000, 22500, "GBP 20", D_UK, "Fall: Jan", "https://www.kcl.ac.uk", "https://www.kcl.ac.uk/study", 35, "Central London; health and law strengths", "approx")
add("University of Bristol", "United Kingdom", "Bristol", 6.5, 62, 90, "ABB - A*AA (A-levels)", "GBP 24,000-28,000/year", 18000, 21000, "GBP 24", D_UK, "Fall: Jan", "https://www.bristol.ac.uk", "https://www.bristol.ac.uk/study", 61, "Redbrick university; strong engineering", "approx")
add("University of Warwick", "United Kingdom", "Coventry", 6.5, 60, 92, "AAB - A*AA (A-levels)", "GBP 25,000-30,000/year", 19000, 22500, "GBP 24", D_UK, "Fall: Jan", "https://warwick.ac.uk", "https://warwick.ac.uk/study", 62, "Strong business and maths", "approx")
add("University of Glasgow", "United Kingdom", "Glasgow", 6.5, 60, 90, "BBB - AAB (A-levels)", "GBP 22,000-27,000/year", 16500, 20500, "GBP 26", D_UK, "Fall: Jan", "https://www.gla.ac.uk", "https://www.gla.ac.uk/study", 76, "Historic Scottish university", "approx")
add("University of Leeds", "United Kingdom", "Leeds", 6.5, 60, 87, "BBB - AAB (A-levels)", "GBP 22,000-27,000/year", 16500, 20500, "GBP 25", D_UK, "Fall: Jan", "https://www.leeds.ac.uk", "https://www.leeds.ac.uk/study", 81, "Strong arts and engineering", "approx")
add("University of Sheffield", "United Kingdom", "Sheffield", 6.5, 60, 88, "BBB - AAB (A-levels)", "GBP 22,000-26,000/year", 16500, 19500, "GBP 22", D_UK, "Fall: Jan", "https://www.sheffield.ac.uk", "https://www.sheffield.ac.uk/study", 105, "Steel City; strong engineering", "approx")
add("University of Birmingham", "United Kingdom", "Birmingham", 6.5, 60, 88, "BBB - AAB (A-levels)", "GBP 22,000-26,000/year", 16500, 19500, "GBP 24", D_UK, "Fall: Jan", "https://www.birmingham.ac.uk", "https://www.birmingham.ac.uk/study", 84, "Large campus university", "approx")
add("University of Nottingham", "United Kingdom", "Nottingham", 6.5, 60, 90, "BBB - AAB (A-levels)", "GBP 22,000-26,000/year", 16500, 19500, "GBP 26", D_UK, "Fall: Jan", "https://www.nottingham.ac.uk", "https://www.nottingham.ac.uk/study", 100, "Has Malaysia and China campuses", "approx")
add("Queen Mary University of London", "United Kingdom", "London", 6.5, 60, 92, "BBB - AAB (A-levels)", "GBP 24,000-28,000/year", 18000, 21000, "GBP 22", D_UK, "Fall: Jan", "https://www.qmul.ac.uk", "https://www.qmul.ac.uk/study", 122, "Russell Group in London", "approx")
add("University of Liverpool", "United Kingdom", "Liverpool", 6.0, 56, 88, "BBB - ABB (A-levels)", "GBP 21,000-25,000/year", 15800, 18800, "GBP 22", D_UK, "Fall: Jan", "https://www.liverpool.ac.uk", "https://www.liverpool.ac.uk/study", 176, "Affordable Russell Group option", "approx")
add("Cardiff University", "United Kingdom", "Cardiff", 6.5, 60, 90, "BBB - AAB (A-levels)", "GBP 21,000-25,000/year", 15800, 18800, "GBP 22", D_UK, "Fall: Jan", "https://www.cardiff.ac.uk", "https://www.cardiff.ac.uk/study", 154, "Wales' leading research university", "approx")

# --- Canada (13) ---
add("University of Toronto", "Canada", "Toronto", 6.5, 60, 89, "75-85% (regional)", "CAD 45,000-60,000/year (international)", 33000, 44000, "CAD 120", D_CA, "Fall: Jan (rolling)", "https://www.utoronto.ca", "https://www.utoronto.ca/admissions", 25, "Top Canadian research university", "approx")
add("University of British Columbia (UBC)", "Canada", "Vancouver", 6.5, 60, 90, "75-85% (regional)", "CAD 40,000-55,000/year (international)", 29000, 40000, "CAD 125", D_CA, "Fall: Jan", "https://www.ubc.ca", "https://you.ubc.ca", 40, "Beautiful Vancouver campus; strong scholarships", "approx")
add("McGill University", "Canada", "Montreal", 6.5, 60, 90, "85%+ competitive", "CAD 42,000-55,000/year (international)", 31000, 40000, "CAD 100", D_CA, "Fall: Jan", "https://www.mcgill.ca", "https://www.mcgill.ca/undergraduate-admissions", 29, "Research intensive; French-English city", "approx")
add("University of Alberta", "Canada", "Edmonton", 6.5, 61, 90, "70-80% (regional)", "CAD 27,000-35,000/year (international)", 20000, 26000, "CAD 130", D_CA, "Fall: Mar (rolling)", "https://www.ualberta.ca", "https://www.ualberta.ca/admissions", 119, "Strong engineering and sciences", "approx")
add("University of Waterloo", "Canada", "Waterloo", 6.5, 62, 90, "80-90% (regional)", "CAD 45,000-55,000/year (international)", 33000, 40000, "CAD 130", D_CA, "Fall: Feb", "https://uwaterloo.ca", "https://uwaterloo.ca/find-out-more/admissions", 112, "Famous co-op program", "approx")
add("Western University", "Canada", "London", 6.5, 60, 90, "80%+ (regional)", "CAD 38,000-45,000/year (international)", 28000, 33000, "CAD 130", D_CA, "Fall: Feb (rolling)", "https://www.uwo.ca", "https://www.uwo.ca/admissions", 210, "Ivey business school pathway", "approx")
add("McMaster University", "Canada", "Hamilton", 6.5, 60, 90, "80%+ (regional)", "CAD 35,000-45,000/year (international)", 26000, 33000, "CAD 100", D_CA, "Fall: Feb (rolling)", "https://www.mcmaster.ca", "https://www.mcmaster.ca/future-students", 168, "Strong health sciences", "approx")
add("University of Calgary", "Canada", "Calgary", 6.5, 60, 90, "75-85% (regional)", "CAD 25,000-35,000/year (international)", 18000, 26000, "CAD 130", D_CA, "Fall: Feb (rolling)", "https://www.ucalgary.ca", "https://www.ucalgary.ca/future-students", 187, "Growing engineering sector city", "approx")
add("University of Ottawa", "Canada", "Ottawa", 6.5, 60, 90, "75-85% (regional)", "CAD 28,000-38,000/year (international)", 20000, 28000, "CAD 110", D_CA, "Fall: Apr (rolling)", "https://www.uottawa.ca", "https://www.uottawa.ca/prospective-students", 213, "Bilingual university in capital", "approx")
add("University of Saskatchewan", "Canada", "Saskatoon", 6.5, 60, 86, "70-80% (regional)", "CAD 25,000-33,000/year (international)", 18000, 24000, "CAD 90", D_CA, "Fall: May (rolling)", "https://www.usask.ca", "https://admissions.usask.ca", 340, "Affordable; agriculture and engineering", "approx")
add("Simon Fraser University (SFU)", "Canada", "Burnaby", 6.5, 60, 88, "80%+ (regional)", "CAD 32,000-40,000/year (international)", 23000, 29000, "CAD 100", D_CA, "Fall: Jan (rolling)", "https://www.sfu.ca", "https://www.sfu.ca/students/admission", 328, "Co-op and CS strengths", "approx")
add("Dalhousie University", "Canada", "Halifax", 6.5, 60, 90, "70-80% (regional)", "CAD 30,000-38,000/year (international)", 22000, 28000, "CAD 90", D_CA, "Fall: Mar (rolling)", "https://www.dal.ca", "https://www.dal.ca/admissions", 302, "East coast; reasonable cost", "approx")
add("York University", "Canada", "Toronto", 6.5, 60, 88, "70-80% (regional)", "CAD 30,000-38,000/year (international)", 22000, 28000, "CAD 120", D_CA, "Fall: Feb (rolling)", "https://www.yorku.ca", "https://futurestudents.yorku.ca", 353, "Large; strong business/law", "approx")

# --- Australia (13) ---
add("University of Melbourne", "Australia", "Melbourne", 6.5, 58, 79, "85%+ (competitive)", "AUD 40,000-50,000/year", 26000, 32500, "AUD 100", D_AU, "Intake 1: Nov (close) / Intake 2: Apr", "https://www.unimelb.edu.au", "https://study.unimelb.edu.au", 13, "Melbourne Model degrees", "approx")
add("University of Sydney", "Australia", "Sydney", 6.5, 58, 85, "80%+ (competitive)", "AUD 45,000-55,000/year", 29000, 36000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.sydney.edu.au", "https://www.sydney.edu.au/study", 18, "Historic campus; strong humanities", "approx")
add("University of New South Wales (UNSW)", "Australia", "Sydney", 6.5, 64, 90, "80%+ (competitive)", "AUD 44,000-52,000/year", 29000, 34000, "AUD 125", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.unsw.edu.au", "https://www.unsw.edu.au/study", 19, "Engineering and commerce focus", "approx")
add("Australian National University (ANU)", "Australia", "Canberra", 6.5, 60, 80, "80%+ (competitive)", "AUD 42,000-50,000/year", 27000, 32500, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.anu.edu.au", "https://www.anu.edu.au/study", 30, "Research-focused; in capital", "approx")
add("Monash University", "Australia", "Melbourne", 6.5, 58, 79, "75%+", "AUD 40,000-48,000/year", 26000, 31000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.monash.edu", "https://www.monash.edu/study", 37, "Has Malaysia campus too", "approx")
add("University of Queensland (UQ)", "Australia", "Brisbane", 6.5, 58, 87, "75%+", "AUD 38,000-48,000/year", 25000, 31000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.uq.edu.au", "https://study.uq.edu.au", 40, "Brisbane lifestyle; strong research", "approx")
add("University of Adelaide", "Australia", "Adelaide", 6.5, 58, 79, "70%+", "AUD 36,000-45,000/year", 23500, 29000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.adelaide.edu.au", "https://www.adelaide.edu.au/study", 89, "Group of Eight; affordable living", "approx")
add("University of Western Australia (UWA)", "Australia", "Perth", 6.5, 58, 82, "75%+", "AUD 36,000-46,000/year", 23500, 30000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.uwa.edu.au", "https://www.uwa.edu.au/study", 92, "Perth; mining/energy links", "approx")
add("University of Technology Sydney (UTS)", "Australia", "Sydney", 6.5, 58, 79, "70%+", "AUD 38,000-45,000/year", 25000, 29000, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.uts.edu.au", "https://www.uts.edu.au/study", 90, "Practical, city campus", "approx")
add("Queensland University of Technology (QUT)", "Australia", "Brisbane", 6.5, 58, 79, "70%+", "AUD 33,000-42,000/year", 21500, 27500, "AUD 50", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.qut.edu.au", "https://www.qut.edu.au/study", 213, "Industry connections", "approx")
add("Deakin University", "Australia", "Geelong", 6.0, 50, 65, "65%+", "AUD 32,000-40,000/year", 21000, 26000, "AUD 55", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.deakin.edu.au", "https://www.deakin.edu.au/study", 233, "Strong scholarships for internationals", "approx")
add("Griffith University", "Australia", "Brisbane", 6.5, 58, 79, "65%+", "AUD 32,000-40,000/year", 21000, 26000, "AUD 50", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.griffith.edu.au", "https://www.griffith.edu.au/study", 248, "Good medical/dentistry programs", "approx")
add("Curtin University", "Australia", "Perth", 6.5, 58, 79, "65%+", "AUD 33,000-42,000/year", 21500, 27500, "AUD 100", D_AU, "Intake 1: Nov / Intake 2: Apr", "https://www.curtin.edu.au", "https://www.curtin.edu.au/study", 194, "Strong minerals and mining", "approx")

# --- Germany (13) ---
add("Technical University of Munich (TUM)", "Germany", "Munich", 6.5, 65, 88, "Program dependent (Numerus Clausus)", "EUR 0-3,000/semester (public, small admin fee)", 1500, 3500, "No fee / varies", D_DE, "Winter: May | Summer: Jan", "https://www.tum.de", "https://www.tum.de/en/studies/degree-programs", 26, "Public; most bachelor programs tuition-free", "verified")
add("LMU Munich", "Germany", "Munich", 6.5, 65, 88, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.lmu.de", "https://www.lmu.de/en/study", 32, "Public; strong humanities and sciences", "approx")
add("RWTH Aachen University", "Germany", "Aachen", 6.5, 65, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.rwth-aachen.de", "https://www.rwth-aachen.de/cms/-/en/Study", 99, "Top engineering university", "approx")
add("Karlsruhe Institute of Technology (KIT)", "Germany", "Karlsruhe", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.kit.edu", "https://www.kit.edu/english/studies.php", 119, "Strong CS and engineering", "approx")
add("Technical University of Berlin (TU Berlin)", "Germany", "Berlin", 6.5, 62, 87, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: May | Summer: Jan", "https://www.tu.berlin", "https://www.tu.berlin/en/studying", 147, "Public; Berlin lifestyle", "approx")
add("Heidelberg University", "Germany", "Heidelberg", 6.0, 50, 85, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-heidelberg.de", "https://www.uni-heidelberg.de/en/studying", 60, "Germany's oldest university", "approx")
add("University of Freiburg", "Germany", "Freiburg", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-freiburg.de", "https://www.uni-freiburg.de/en/study", 192, "Excellence university", "approx")
add("University of Stuttgart", "Germany", "Stuttgart", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-stuttgart.de", "https://www.uni-stuttgart.de/en/studies", 230, "Strong aerospace and automotive", "approx")
add("Technical University of Darmstadt", "Germany", "Darmstadt", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.tu-darmstadt.de", "https://www.tu-darmstadt.de/studieren/index.en.jsp", 275, "Strong in mechanical engineering", "approx")
add("University of Bonn", "Germany", "Bonn", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-bonn.de", "https://www.uni-bonn.de/en/studying", 100, "Excellence in mathematics", "approx")
add("University of Cologne", "Germany", "Cologne", 6.0, 50, 85, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-koeln.de", "https://www.uni-koeln.de/en/studies", 169, "Large public university", "approx")
add("University of Hamburg", "Germany", "Hamburg", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.uni-hamburg.de", "https://www.uni-hamburg.de/en/studieren.html", 205, "Major port-city university", "approx")
add("Friedrich-Alexander University (FAU) Erlangen-Nurnberg", "Germany", "Erlangen", 6.5, 62, 90, "Program dependent", "EUR 0-3,000/semester (public)", 1500, 3500, "No fee / varies", D_DE, "Winter: Jul | Summer: Jan", "https://www.fau.eu", "https://www.fau.eu/study", 224, "Strong engineering cluster", "approx")

# --- Malaysia (8) ---
add("Universiti Malaya (UM)", "Malaysia", "Kuala Lumpur", 6.0, 50, 80, "65%+ (STPM/Matriculation)", "MYR 45,000-60,000/year (international)", 10500, 14000, "MYR 200", D, "Intake: Oct | Feb", "https://www.um.edu.my", "https://study.um.edu.my", 60, "Top Malaysian public university", "approx")
add("Universiti Kebangsaan Malaysia (UKM)", "Malaysia", "Bangi", 6.0, 50, 80, "65%+", "MYR 40,000-55,000/year (international)", 9000, 13000, "MYR 150", D, "Intake: Oct | Feb", "https://www.ukm.my", "https://www.ukm.my/portal/study-at-ukm", 138, "Public research university", "approx")
add("Monash University Malaysia", "Malaysia", "Subang Jaya", 6.5, 58, 79, "70%+", "MYR 55,000-80,000/year", 13000, 18500, "MYR 300", D, "Intake: Feb | Jul | Oct", "https://www.monash.edu.my", "https://www.monash.edu.my/study", 37, "Australian degree in Malaysia; lower cost", "approx")
add("Taylor's University", "Malaysia", "Subang Jaya", 6.0, 50, 79, "65%+", "MYR 50,000-80,000/year", 11500, 18500, "MYR 300", D, "Intake: Jan | Mar | Aug", "https://taylors.edu.my", "https://university.taylors.edu.my", 251, "Top private Malaysian university", "approx")
add("UCSI University", "Malaysia", "Kuala Lumpur", 5.5, 42, 61, "60%+", "MYR 40,000-65,000/year", 9000, 15000, "MYR 250", D, "Intake: Jan | May | Sep", "https://www.ucsiuniversity.edu.my", "https://www.ucsiuniversity.edu.my", 265, "Good music and medical programs", "approx")
add("INTI International University", "Malaysia", "Nilai", 5.5, 42, 61, "60%+", "MYR 35,000-55,000/year", 8000, 13000, "MYR 200", D, "Intake: Jan | Apr | Aug", "https://newinti.edu.my", "https://newinti.edu.my", 551, "Twinning programs with UK/AU unis", "approx")
add("Universiti Teknologi Malaysia (UTM)", "Malaysia", "Johor Bahru", 6.0, 50, 80, "65%+", "MYR 40,000-55,000/year (international)", 9000, 13000, "MYR 150", D, "Intake: Oct | Feb", "https://www.utm.my", "https://www.utm.my/international", 181, "Engineering-focused public university", "approx")
add("Universiti Putra Malaysia (UPM)", "Malaysia", "Serdang", 6.0, 50, 80, "65%+", "MYR 40,000-55,000/year (international)", 9000, 13000, "MYR 150", D, "Intake: Oct | Feb", "https://www.upm.edu.my", "https://www.upm.edu.my", 132, "Agriculture and engineering strengths", "approx")

# --- Ireland (6) ---
add("Trinity College Dublin (TCD)", "Ireland", "Dublin", 6.5, 62, 90, "70%+ (competitive)", "EUR 20,000-30,000/year (non-EU)", 22000, 33000, "EUR 55", D_UK, "Fall: Apr", "https://www.tcd.ie", "https://www.tcd.ie/study", 87, "Ireland's oldest university", "approx")
add("University College Dublin (UCD)", "Ireland", "Dublin", 6.5, 62, 90, "65%+", "EUR 18,000-26,000/year (non-EU)", 20000, 29000, "EUR 50", D_UK, "Fall: Apr (rolling)", "https://www.ucd.ie", "https://www.ucd.ie/study", 126, "Largest Irish university", "approx")
add("University of Galway", "Ireland", "Galway", 6.5, 60, 88, "65%+", "EUR 15,000-22,000/year (non-EU)", 16500, 24000, "EUR 45", D_UK, "Fall: Jun (rolling)", "https://www.universityofgalway.ie", "https://www.universityofgalway.ie/study", 273, "Coastal campus in west Ireland", "approx")
add("University College Cork (UCC)", "Ireland", "Cork", 6.5, 60, 88, "65%+", "EUR 15,000-22,000/year (non-EU)", 16500, 24000, "EUR 45", D_UK, "Fall: Jun (rolling)", "https://www.ucc.ie", "https://www.ucc.ie/en/study", 300, "Strong pharma and food science", "approx")
add("Dublin City University (DCU)", "Ireland", "Dublin", 6.5, 60, 88, "65%+", "EUR 14,000-20,000/year (non-EU)", 15500, 22000, "EUR 45", D_UK, "Fall: Apr (rolling)", "https://www.dcu.ie", "https://www.dcu.ie/study-at-dcu", 351, "Industry-focused", "approx")
add("University of Limerick", "Ireland", "Limerick", 6.5, 60, 88, "65%+", "EUR 14,000-20,000/year (non-EU)", 15500, 22000, "EUR 45", D_UK, "Fall: Jun (rolling)", "https://www.ul.ie", "https://www.ul.ie/study", 426, "Co-op education tradition", "approx")

# --- New Zealand (5) ---
add("University of Auckland", "New Zealand", "Auckland", 6.5, 58, 90, "70%+", "NZD 35,000-45,000/year", 21000, 27000, "NZD 85", D_AU, "Intake 1: Nov | Intake 2: Apr", "https://www.auckland.ac.nz", "https://www.auckland.ac.nz/en/study.html", 65, "Largest NZ university", "approx")
add("University of Otago", "New Zealand", "Dunedin", 6.5, 58, 90, "70%+", "NZD 30,000-40,000/year", 18000, 24000, "NZD 85", D_AU, "Intake 1: Nov | Intake 2: Apr", "https://www.otago.ac.nz", "https://www.otago.ac.nz/study", 214, "Strong health sciences", "approx")
add("Victoria University of Wellington", "New Zealand", "Wellington", 6.5, 58, 90, "65%+", "NZD 30,000-40,000/year", 18000, 24000, "NZD 85", D_AU, "Intake 1: Nov | Intake 2: Apr", "https://www.wgtn.ac.nz", "https://www.wgtn.ac.nz/study", 241, "Capital city campus", "approx")
add("University of Canterbury", "New Zealand", "Christchurch", 6.5, 58, 90, "65%+", "NZD 30,000-40,000/year", 18000, 24000, "NZD 85", D_AU, "Intake 1: Nov | Intake 2: Apr", "https://www.canterbury.ac.nz", "https://www.canterbury.ac.nz/study", 261, "Engineering and Antarctic research", "approx")
add("Massey University", "New Zealand", "Palmerston North", 6.0, 50, 80, "60%+", "NZD 28,000-38,000/year", 17000, 23000, "NZD 85", D_AU, "Intake 1: Nov | Intake 2: Apr", "https://www.massey.ac.nz", "https://www.massey.ac.nz/study", 361, "Agriculture and aviation", "approx")

# --- UAE (4) ---
add("American University of Sharjah (AUS)", "UAE", "Sharjah", 6.5, 58, 79, "80%+ (high school)", "USD 20,000-25,000/year", 20000, 25000, "AED 500", D_US, "Fall: Jun | Spring: Nov", "https://www.aus.edu", "https://www.aus.edu/admission", 484, "US-style education in UAE", "approx")
add("Khalifa University", "UAE", "Abu Dhabi", 6.5, 62, 90, "85%+ (science stream)", "AED 20,000-30,000/year (most get full scholarships)", 15000, 22000, "AED 300", D, "Fall: Apr | Spring: Oct", "https://www.ku.ac.ae", "https://www.ku.ac.ae/admissions", 230, "Graduate programs often fully funded", "approx")
add("University of Sharjah", "UAE", "Sharjah", 6.0, 50, 80, "75%+", "AED 35,000-50,000/year", 9500, 14000, "AED 300", D, "Fall: Jul | Spring: Dec", "https://www.sharjah.ac.ae", "https://www.sharjah.ac.ae/en/Admission", 352, "Largest non-profit UAE university", "approx")
add("University of Dubai", "UAE", "Dubai", 6.0, 50, 80, "70%+", "AED 45,000-60,000/year", 12500, 16500, "AED 400", D, "Fall: Aug | Spring: Jan", "https://www.ud.ac.ae", "https://www.ud.ac.ae", 1001, "Business and IT focus", "approx")

# --- Singapore (4) ---
add("National University of Singapore (NUS)", "Singapore", "Singapore", 6.5, 62, 92, "Top 10% of cohort", "SGD 35,000-40,000/year (tuition grant eligible)", 47000, 54000, "SGD 20", D, "Fall: Feb (varies)", "https://www.nus.edu.sg", "https://www.nus.edu.sg/oam", 8, "Top Asian university; government tuition grants", "approx")
add("Nanyang Technological University (NTU)", "Singapore", "Singapore", 6.5, 62, 92, "Top 10% of cohort", "SGD 32,000-38,000/year", 43000, 51000, "SGD 20", D, "Fall: Feb (varies)", "https://www.ntu.edu.sg", "https://www.ntu.edu.sg/admissions", 12, "Strong engineering", "approx")
add("Singapore Management University (SMU)", "Singapore", "Singapore", 6.5, 62, 92, "Top 10% of cohort", "SGD 30,000-35,000/year", 40000, 47000, "SGD 20", D, "Fall: Feb (varies)", "https://www.smu.edu.sg", "https://admissions.smu.edu.sg", 585, "Business school focus", "approx")
add("Singapore University of Technology and Design (SUTD)", "Singapore", "Singapore", 6.5, 60, 90, "Top 15% of cohort", "SGD 28,000-33,000/year", 38000, 44500, "SGD 15", D, "Fall: Mar (varies)", "https://www.sutd.edu.sg", "https://www.sutd.edu.sg/Admissions", 440, "MIT-collaborated design-tech university", "approx")

# --- Netherlands (4) ---
add("Delft University of Technology (TU Delft)", "Netherlands", "Delft", 6.5, 62, 90, "Strong math/science record", "EUR 12,000-18,000/year (non-EU)", 13000, 20000, "EUR 100", D_UK, "Intake 1: Jan (close)", "https://www.tudelft.nl", "https://www.tudelft.nl/en/education/admission", 49, "Top engineering in EU", "approx")
add("University of Amsterdam (UvA)", "Netherlands", "Amsterdam", 6.5, 62, 90, "70%+ (competitive)", "EUR 10,000-15,000/year (non-EU)", 11000, 16500, "EUR 100", D_UK, "Intake 1: Jan | Intake 2: Apr", "https://www.uva.nl", "https://www.uva.nl/en/study", 55, "Strong social sciences", "approx")
add("Eindhoven University of Technology (TU/e)", "Netherlands", "Eindhoven", 6.5, 62, 90, "Strong math/science record", "EUR 12,000-16,000/year (non-EU)", 13000, 18000, "EUR 100", D_UK, "Intake 1: Jan (close)", "https://www.tue.nl", "https://www.tue.nl/en/education", 136, "Philips-born tech campus", "approx")
add("University of Groningen", "Netherlands", "Groningen", 6.5, 62, 90, "70%+", "EUR 10,000-14,000/year (non-EU)", 11000, 15500, "EUR 100", D_UK, "Intake 1: Jan | Intake 2: May", "https://www.rug.nl", "https://www.rug.nl/education", 159, "International community", "approx")

# --- Pakistan (3) ---
add("Lahore University of Management Sciences (LUMS)", "Pakistan", "Lahore", 6.5, 58, 88, "70%+ (FSc/HSSC)", "PKR 1,200,000-1,500,000/year", 4200, 5200, "PKR 5,000", D, "Fall: Jan (rolling)", "https://lums.edu.pk", "https://lums.edu.pk/admissions", 701, "Top private Pakistani university", "approx")
add("National University of Sciences and Technology (NUST)", "Pakistan", "Islamabad", 6.5, 58, 88, "70%+ (FSc/HSSC)", "PKR 500,000-800,000/year", 1800, 2800, "PKR 3,000", D, "Fall: Apr (rolling)", "https://www.nust.edu.pk", "https://www.nust.edu.pk", 651, "Leading engineering university", "approx")
add("Institute of Business Administration (IBA)", "Pakistan", "Karachi", 6.5, 58, 88, "70%+ (FSc/HSSC)", "PKR 900,000-1,200,000/year", 3200, 4200, "PKR 3,000", D, "Fall: Apr (rolling)", "https://www.iba.edu.pk", "https://www.iba.edu.pk", 851, "Business and CS strength", "approx")

# --- Italy (3) ---
add("Politecnico di Milano", "Italy", "Milan", 6.0, 50, 80, "70%+ (math/science)", "EUR 3,800/year (non-EU, capped)", 4200, 6000, "EUR 50", D_UK, "Fall: Mar | Spring: Jul", "https://www.polimi.it", "https://www.polimi.it/en/international-prospective-students", 111, "Top Italian engineering school; low fees", "approx")
add("University of Bologna", "Italy", "Bologna", 6.0, 50, 80, "65%+", "EUR 2,500-4,500/year (non-EU)", 2800, 5000, "EUR 30", D_UK, "Fall: Apr (varies)", "https://www.unibo.it", "https://www.unibo.it/en/teaching", 133, "World's oldest university", "approx")
add("Sapienza University of Rome", "Italy", "Rome", 6.0, 50, 80, "65%+", "EUR 2,000-3,500/year (non-EU)", 2200, 4000, "EUR 30", D_UK, "Fall: Apr (varies)", "https://www.uniroma1.it", "https://www.uniroma1.it/en/pagina-strutturale/admissions", 132, "Large historic university", "approx")

# --- France (3) ---
add("Sorbonne University", "France", "Paris", 6.5, 58, 85, "65%+ (sciences stream)", "EUR 3,000-10,000/year (non-EU)", 3300, 11000, "EUR 30", D_UK, "Fall: Apr (varies)", "https://www.sorbonne-universite.fr", "https://www.sorbonne-universite.fr/en", 63, "Strong in sciences and medicine", "approx")
add("Ecole Polytechnique (ParisTech)", "France", "Palaiseau", 7.0, 65, 95, "Top 5% of cohort", "EUR 15,000-20,000/year", 16500, 22000, "EUR 90", D_UK, "Fall: Nov (competitive)", "https://www.polytechnique.edu", "https://www.polytechnique.edu/en", 38, "Elite engineering grand ecole", "approx")
add("Universite PSL (Paris Sciences et Lettres)", "France", "Paris", 6.5, 58, 90, "70%+", "EUR 4,000-12,000/year (non-EU)", 4400, 13200, "EUR 30", D_UK, "Fall: Apr (varies)", "https://psl.eu", "https://psl.eu/en", 24, "College de France cluster", "approx")

# --- Switzerland (2) ---
add("ETH Zurich", "Switzerland", "Zurich", 7.0, 66, 100, "Top 10% of cohort", "CHF 1,300/year (public)", 1500, 2000, "CHF 100", D_UK, "Fall: Apr (varies)", "https://ethz.ch", "https://ethz.ch/en/studies.html", 7, "World-class STEM at tiny cost", "verified")
add("EPFL (Lausanne)", "Switzerland", "Lausanne", 7.0, 66, 100, "Top 10% of cohort", "CHF 1,300/year (public)", 1500, 2000, "CHF 100", D_UK, "Fall: Apr (varies)", "https://www.epfl.ch", "https://www.epfl.ch/education/admission", 28, "Top European tech institute", "approx")

# --- South Korea (3) ---
add("Seoul National University (SNU)", "South Korea", "Seoul", 6.0, 50, 80, "Top 15% of cohort", "USD 4,000-7,000/year", 4000, 7000, "KRW 100,000", D, "Fall: Feb (varies)", "https://www.snu.ac.kr", "https://en.snu.ac.kr/admission", 41, "Top Korean university; affordable", "approx")
add("KAIST", "South Korea", "Daejeon", 6.0, 50, 83, "Top 15% of cohort", "USD 4,000-6,000/year", 4000, 6000, "KRW 100,000", D, "Fall: Feb (varies)", "https://www.kaist.ac.kr", "https://admission.kaist.ac.kr/intl", 53, "Strong STEM; many scholarships", "approx")
add("Yonsei University", "South Korea", "Seoul", 6.0, 50, 80, "Top 20% of cohort", "USD 5,000-8,000/year", 5000, 8000, "KRW 100,000", D, "Fall: Feb (varies)", "https://www.yonsei.ac.kr", "https://www.yonsei.ac.kr/en_welcome", 56, "Underwood International College in English", "approx")

# --- Japan (3) ---
add("University of Tokyo", "Japan", "Tokyo", 6.5, 62, 90, "Top 10% of cohort", "JPY 540,000/year (about USD 3,600)", 3600, 5000, "JPY 17,000", D, "Fall: Jan (varies)", "https://www.u-tokyo.ac.jp", "https://www.u-tokyo.ac.jp/en/admissions", 28, "English-taught PEAK program", "approx")
add("Kyoto University", "Japan", "Kyoto", 6.5, 62, 90, "Top 10% of cohort", "JPY 540,000/year", 3600, 5000, "JPY 17,000", D, "Fall: Jan (varies)", "https://www.kyoto-u.ac.jp", "https://www.kyoto-u.ac.jp/en", 47, "Research powerhouse", "approx")
add("Waseda University", "Japan", "Tokyo", 6.0, 50, 80, "Top 20% of cohort", "JPY 1,200,000-1,500,000/year", 8000, 10000, "JPY 35,000", D, "Fall: Jan (varies)", "https://www.waseda.jp", "https://www.waseda.jp/top/en", 203, "Many English-taught programs", "approx")

# --- China (2) ---
add("Tsinghua University", "China", "Beijing", 6.5, 58, 90, "Top 10% of cohort", "CNY 40,000-80,000/year", 5500, 11000, "CNY 600", D, "Fall: Jan (varies)", "https://www.tsinghua.edu.cn", "https://www.tsinghua.edu.cn/en", 20, "CSC scholarships widely available", "approx")
add("Peking University", "China", "Beijing", 6.5, 58, 90, "Top 10% of cohort", "CNY 40,000-80,000/year", 5500, 11000, "CNY 600", D, "Fall: Jan (varies)", "https://english.pku.edu.cn", "https://english.pku.edu.cn", 17, "Leading humanities and sciences", "approx")

# --- Saudi Arabia (2) ---
add("King Abdullah University of Science and Technology (KAUST)", "Saudi Arabia", "Thuwal", 6.5, 60, 79, "Strong research background (grad)", "Fully funded (MSc/PhD)", 0, 0, "No fee", D, "Rolling", "https://www.kaust.edu.sa", "https://www.kaust.edu.sa/en/study", 102, "All students get full scholarship + stipend", "verified")
add("King Fahd University of Petroleum and Minerals (KFUPM)", "Saudi Arabia", "Dhahran", 6.5, 60, 79, "80%+ (science stream)", "SAR 60,000-70,000/year", 16000, 19000, "SAR 500", D, "Fall: May | Spring: Oct", "https://www.kfupm.edu.sa", "https://www.kfupm.edu.sa", 180, "Energy and engineering focus", "approx")

# --- Turkey (2) ---
add("Koc University", "Turkey", "Istanbul", 6.5, 58, 79, "80%+ (competitive)", "USD 15,000-20,000/year (mostly merit scholarship)", 15000, 20000, "USD 50", D, "Fall: Mar (varies)", "https://www.ku.edu.tr", "https://www.ku.edu.tr/en/apply", 428, "High merit scholarships for internationals", "approx")
add("Bilkent University", "Turkey", "Ankara", 6.5, 58, 79, "75%+ (competitive)", "USD 14,000-18,000/year", 14000, 18000, "USD 50", D, "Fall: Mar (varies)", "https://www.bilkent.edu.tr", "https://www.bilkent.edu.tr/en", 595, "Strong engineering and CS", "approx")

# --- Spain (2) ---
add("Universitat Politecnica de Catalunya (UPC)", "Spain", "Barcelona", 6.0, 50, 80, "65%+ (science stream)", "EUR 2,000-4,000/year (non-EU)", 2200, 4400, "EUR 30", D, "Fall: Jul (varies)", "https://www.upc.edu", "https://www.upc.edu/en", 343, "Engineering in Barcelona", "approx")
add("IE University", "Spain", "Madrid", 7.0, 66, 100, "Competitive (holistic)", "EUR 25,000-30,000/year", 27500, 33000, "EUR 100", D_UK, "Fall: Rolling", "https://www.ie.edu", "https://www.ie.edu/study", 850, "Business and innovation; English-taught", "approx")

# --- Sweden (2) ---
add("KTH Royal Institute of Technology", "Sweden", "Stockholm", 6.5, 62, 90, "70%+ (competitive)", "SEK 170,000-200,000/year (non-EU)", 16000, 19000, "SEK 900", D_UK, "Intake 1: Jan", "https://www.kth.se", "https://www.kth.se/en/studies", 74, "Top Swedish engineering school", "approx")
add("Uppsala University", "Sweden", "Uppsala", 6.5, 62, 90, "65%+", "SEK 100,000-150,000/year (non-EU)", 9500, 14500, "SEK 900", D_UK, "Intake 1: Jan", "https://www.uu.se", "https://www.uu.se/en/study", 103, "Historic research university", "approx")

# --- Norway (2) ---
add("University of Oslo", "Norway", "Oslo", 6.5, 62, 90, "65%+", "EUR 1,000-4,000/year (non-EEA fees)", 1100, 4500, "NOK 500", D_UK, "Fall: Apr (varies)", "https://www.uio.no", "https://www.uio.no/english/studies", 119, "Tuition-free for most EEA; low fees otherwise", "approx")
add("Norwegian University of Science and Technology (NTNU)", "Norway", "Trondheim", 6.5, 62, 90, "65%+", "EUR 1,000-4,000/year (non-EEA fees)", 1100, 4500, "NOK 500", D_UK, "Fall: Apr (varies)", "https://www.ntnu.edu", "https://www.ntnu.edu/studies", 292, "Leading Norwegian engineering", "approx")

# --- Denmark (2) ---
add("Technical University of Denmark (DTU)", "Denmark", "Kgs. Lyngby", 6.5, 62, 90, "70%+ (competitive)", "EUR 12,000-16,000/year (non-EU)", 13000, 18000, "DKK 400", D_UK, "Intake 1: Jan", "https://www.dtu.dk", "https://www.dtu.dk/english/education", 121, "Top Nordic engineering", "approx")
add("University of Copenhagen", "Denmark", "Copenhagen", 6.5, 62, 90, "70%+ (competitive)", "EUR 8,000-14,000/year (non-EU)", 8800, 15500, "DKK 300", D_UK, "Intake 1: Jan", "https://www.ku.dk", "https://www.ku.dk/english/study", 91, "Nordic research leader", "approx")

HDR = ["id", "name", "country", "city", "rank_world", "intake_seasons",
       "ielts_min", "pte_min", "toefl_min", "gpa_requirement", "tuition_fees",
       "tuition_min_usd", "tuition_max_usd", "application_fee",
       "documents_required", "deadlines", "official_website", "admissions_page",
       "notes", "status"]

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "data", "universities.csv")

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(HDR)
    for i, row in enumerate(U, start=1):
        w.writerow([i] + row)

print(f"Wrote {len(U)} universities to {OUT}")
