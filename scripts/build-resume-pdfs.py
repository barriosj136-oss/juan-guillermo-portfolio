"""Build bilingual, text-based, single-column résumé PDFs from resume-content.json."""

import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
CONTENT_FILE = ROOT / "app" / "resume" / "resume-content.json"
OUTPUT_DIR = ROOT / "public" / "cv"
FONT_DIR = Path(r"C:\Windows\Fonts")


def register_fonts():
    regular = FONT_DIR / "arial.ttf"
    bold = FONT_DIR / "arialbd.ttf"
    if not regular.exists() or not bold.exists():
        raise FileNotFoundError("Arial fonts were not found in C:\\Windows\\Fonts.")
    pdfmetrics.registerFont(TTFont("ResumeArial", str(regular)))
    pdfmetrics.registerFont(TTFont("ResumeArial-Bold", str(bold)))


def p(text, style):
    return Paragraph(escape(str(text), quote=False).replace("\n", "<br/>"), style)


def build(language, content, output_path):
    page_width, page_height = letter
    doc = SimpleDocTemplate(
        str(output_path), pagesize=letter,
        rightMargin=0.62 * inch, leftMargin=0.62 * inch,
        topMargin=0.52 * inch, bottomMargin=0.55 * inch,
        title=f"Juan Guillermo Barrios Villamil - {content['label']}",
        author="Juan Guillermo Barrios Villamil",
        subject=content["headline"],
    )
    blue = colors.HexColor("#234875")
    gray = colors.HexColor("#555F6D")
    styles = getSampleStyleSheet()
    name_style = ParagraphStyle("ResumeName", parent=styles["Title"], fontName="ResumeArial-Bold", fontSize=19, leading=22, alignment=TA_LEFT, textColor=colors.HexColor("#17212F"), spaceAfter=4)
    headline_style = ParagraphStyle("ResumeHeadline", parent=styles["Normal"], fontName="ResumeArial-Bold", fontSize=9.3, leading=12, textColor=blue, spaceAfter=6)
    label_style = ParagraphStyle("ResumeLabel", parent=styles["Normal"], fontName="ResumeArial-Bold", fontSize=7.5, leading=9, textColor=gray, spaceAfter=3)
    body_style = ParagraphStyle("ResumeBody", parent=styles["BodyText"], fontName="ResumeArial", fontSize=8.35, leading=10.7, textColor=colors.HexColor("#252A31"), spaceAfter=3)
    contact_style = ParagraphStyle("ResumeContact", parent=body_style, fontSize=7.7, leading=10, textColor=gray, spaceAfter=7)
    section_style = ParagraphStyle("ResumeSection", parent=styles["Heading2"], fontName="ResumeArial-Bold", fontSize=10.7, leading=13, textColor=blue, spaceBefore=7, spaceAfter=4, keepWithNext=True)
    title_style = ParagraphStyle("ResumeItemTitle", parent=body_style, fontName="ResumeArial-Bold", fontSize=8.9, leading=11, spaceBefore=3, spaceAfter=1, keepWithNext=True)
    meta_style = ParagraphStyle("ResumeMeta", parent=body_style, fontSize=7.8, leading=9.5, textColor=gray, spaceAfter=2, keepWithNext=True)
    bullet_style = ParagraphStyle("ResumeBullet", parent=body_style, leftIndent=10, firstLineIndent=-7, fontSize=8.15, leading=10.25, spaceAfter=1.5)
    project_style = ParagraphStyle("ResumeProject", parent=body_style, fontSize=8.05, leading=10.2, spaceAfter=2)
    skills_style = ParagraphStyle("ResumeSkill", parent=body_style, fontSize=8.1, leading=10.25, spaceAfter=3)
    story = [p("Juan Guillermo Barrios Villamil", name_style), p(content["label"], label_style), p(content["headline"], headline_style)]
    contact = " | ".join(f"{item['label']}: {item['value']}" for item in content["contact"])
    story.extend([p(contact, contact_style), p(content["summary"], body_style), Spacer(1, 3)])

    story.append(p(content["experienceHeading"], section_style))
    for role in content["experience"]:
        section = [p(role["title"], title_style), p(f"{role['company']} · {role['dates']}", meta_style)]
        section.extend(p(f"• {bullet}", bullet_style) for bullet in role["bullets"])
        story.append(KeepTogether(section))

    story.append(p(content["projectsHeading"], section_style))
    for project in content["projects"]:
        section = [p(project["title"], title_style), p(project["description"], project_style), p(f"Tools: {project['tools']}", meta_style)]
        story.append(KeepTogether(section))

    story.append(p(content["educationHeading"], section_style))
    for item in content["education"]:
        section = [p(item["title"], title_style), p(f"{item['organization']} · {item['dates']}", meta_style), p(item["detail"], body_style)]
        story.append(KeepTogether(section))

    story.append(p(content["skillsHeading"], section_style))
    for skill in content["skills"]:
        story.append(p(f"{skill['label']}: {skill['value']}", skills_style))

    story.append(p(content["credentialsHeading"], section_style))
    for credential in content["credentials"]:
        story.append(p(f"• {credential}", bullet_style))
    story.extend([p(content["languagesHeading"], section_style), p(content["languages"], body_style)])

    def footer(canvas, _doc):
        canvas.saveState()
        canvas.setFont("ResumeArial", 7)
        canvas.setFillColor(gray)
        canvas.drawRightString(page_width - doc.rightMargin, 0.30 * inch, f"Juan Guillermo Barrios Villamil · {canvas.getPageNumber()}")
        canvas.restoreState()

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def main():
    register_fonts()
    content = json.loads(CONTENT_FILE.read_text(encoding="utf-8"))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    build("en", content["en"], OUTPUT_DIR / "Juan-Guillermo-Barrios-Resume.pdf")
    build("es", content["es"], OUTPUT_DIR / "Juan-Guillermo-Barrios-Hoja-de-Vida.pdf")
    print("Created text-based, single-column English and Spanish résumé PDFs.")


if __name__ == "__main__":
    main()
