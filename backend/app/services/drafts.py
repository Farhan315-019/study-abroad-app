"""SOP / email / checklist drafts: AI-enhanced with template fallback."""
from .. import models
from ..services import ai


def _student_bits(profile) -> str:
    if profile is None:
        return "A motivated student"
    bits = []
    if profile.current_country:
        bits.append(f"from {profile.current_country}")
    if profile.highest_education:
        bits.append(f"with a {profile.highest_education.lower()} background")
    if profile.gpa:
        bits.append(f"and a GPA of {profile.gpa}")
    return " ".join(bits) if bits else "A motivated student"


def _goal(profile) -> str:
    if profile and profile.goal:
        return profile.goal
    return "the program"


def sop_draft(settings: dict, profile, uni: models.University) -> str:
    if ai.ai_configured(settings):
        prompt = (
            f"Write a concise statement of purpose for {_student_bits(profile)} "
            f"applying to {uni.name} in {uni.country} to study {_goal(profile)}. "
            f"The university is ranked #{uni.rank_world or 'n/a'} worldwide. "
            "Keep it 3-4 short paragraphs, first person, no placeholders to fill."
        )
        text = ai.complete(
            settings,
            [
                {"role": "system", "content": "You are an expert academic application consultant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=600,
        )
        if text:
            return text

    return (
        f"Statement of Purpose\n"
        f"Applicant: {_student_bits(profile)}.\n\n"
        f"Paragraph 1 - Introduction:\n"
        f"I am applying to {uni.name} in {uni.country} because it offers the exact "
        f"academic environment I need to pursue {_goal(profile)}. Its strong standing"
        f"{f' (ranked #{uni.rank_world})' if uni.rank_world else ''} and international "
        f"community make it my first choice.\n\n"
        f"Paragraph 2 - Academic background:\n"
        f"Describe your coursework, projects, grades and anything that shaped your "
        f"interest in this field. Connect them to the program at {uni.name}.\n\n"
        f"Paragraph 3 - Why this university and future goals:\n"
        f"Reference specific modules, professors, labs or facilities at {uni.name}. "
        f"Explain how the degree fits your 5-10 year plan after graduation.\n\n"
        f"Paragraph 4 - Conclusion:\n"
        f"Summarize why you are a good fit and thank the admissions committee for "
        f"considering your application."
    )


def email_draft(settings: dict, profile, uni: models.University, purpose: str) -> str:
    subject = f"Inquiry: {_goal(profile)} at {uni.name}"
    if ai.ai_configured(settings):
        prompt = (
            f"Write a professional but warm email from {_student_bits(profile)} to the "
            f"admissions office of {uni.name} asking about {purpose}. Use plain text, "
            "a clear subject line, greeting, 3-4 short paragraphs and a polite closing "
            "with a signature placeholder."
        )
        text = ai.complete(
            settings,
            [
                {"role": "system", "content": "You are an assistant writing formal university emails."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=400,
        )
        if text:
            return f"Subject: {subject}\n\n{text}"

    return (
        f"To: [admissions office email]\n"
        f"Subject: {subject}\n\n"
        f"Dear Admissions Team,\n\n"
        f"Greetings from {profile.current_country if profile and profile.current_country else 'abroad'}. "
        f"I am very interested in {_goal(profile)} at {uni.name}. Before applying, I would like "
        f"to ask about {purpose}.\n\n"
        f"I would be grateful for any information you can share, and for details on application "
        f"requirements and deadlines for the upcoming intake.\n\n"
        f"Thank you for your time.\n\n"
        f"Best regards,\n"
        f"[Your full name]\n"
        f"[Email] | [Phone] | [City, Country]"
    )


def checklist_for(uni: models.University) -> list[str]:
    items = [
        "Official transcripts (translated & attested if not in English)",
        "Degree certificates / provisional certificates",
        "Passport copy (valid for at least 2 years)",
        "English proficiency result",
        "Statement of purpose",
        "Two letters of recommendation",
        "Updated CV / resume",
        "Financial documents / bank statement",
        "Application fee payment",
    ]
    if uni and uni.documents_required:
        extra = [d.strip() for d in uni.documents_required.split(",") if d.strip()]
        items = extra + items
    seen, out = set(), []
    for i in items:
        key = i.lower()
        if key not in seen:
            seen.add(key)
            out.append(i)
    return out


def build_checklist(db, profile, uni: models.University) -> str:
    lines = checklist_for(uni)
    extras = []
    if uni.ielts_min:
        extras.append(f"Confirm IELTS at least {uni.ielts_min} (aim higher if possible)")
    if uni.pte_min:
        extras.append(f"Confirm PTE at least {uni.pte_min}")
    if uni.tuition_min_usd:
        extras.append(f"Verify tuition budget of ${uni.tuition_min_usd:,}/yr or more")
    if uni.application_fee:
        extras.append(f"Application fee: {uni.application_fee}")
    if uni.deadlines:
        extras.append(f"Key deadlines: {uni.deadlines}")
    all_lines = lines + extras
    return "\n".join(f"- {l}" for l in all_lines)
