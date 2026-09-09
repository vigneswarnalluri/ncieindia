import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.pdfgen import canvas
import fitz  # PyMuPDF

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        self.setTitle("NCIE India - Faculty Course Content Submission Form")
        self.setAuthor("National Council for Innovation & Entrepreneurship")
        self.setSubject("Faculty Curriculum Content Submission Form")

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setTitle("NCIE India - Faculty Course Content Submission Form")
        # Header rule & text (only on page 2)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#0F172A"))
            self.drawString(40, 760, "NCIE INDIA | Faculty Curriculum Content Submission Form")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(572, 760, "Online LMS Academic Coordination Desk")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(40, 753, 572, 753)

        # Footer (both pages)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 36, 572, 36)

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(40, 24, "National Council for Innovation & Entrepreneurship (NCIE India) - Academic Governance")
        self.drawRightString(572, 24, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def generate_pdf(output_path):
    # Total width: 612pt, Margins: 40pt left/right => Content width = 532pt
    # Total height: 792pt, Margins: 38pt top/bottom => Content height = 716pt
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=36,
        bottomMargin=36,
        title="NCIE India - Faculty Course Content Submission Form",
        author="National Council for Innovation & Entrepreneurship",
        subject="Faculty Curriculum Content Submission Form"
    )

    styles = getSampleStyleSheet()

    header_title_style = ParagraphStyle(
        'HeaderTitle',
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=16,
        textColor=colors.HexColor("#0B2545")
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#0F172A")
    )

    body_style = ParagraphStyle(
        'CustomBody',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#334155")
    )

    bold_label_style = ParagraphStyle(
        'BoldLabel',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#1E293B")
    )

    italic_hint_style = ParagraphStyle(
        'ItalicHint',
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#64748B")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.white
    )

    callout_bold_style = ParagraphStyle(
        'CalloutBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor("#1E3A8A")
    )

    story = []

    # ==================== PAGE 1 ====================
    # Title Banner Block
    story.append(Paragraph("NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP (NCIE INDIA)", header_title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Faculty Content Submission Form: Recorded Video Lectures & 10 Weekly Assessment Questions", ParagraphStyle('SubSub', fontName='Helvetica-Bold', fontSize=9.5, leading=12, textColor=colors.HexColor("#1D4ED8"))))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Please use this standardized form to submit your assigned weekly module materials. Each week requires recorded video lectures shared via Google Drive and 10 multiple-choice assessment questions.", body_style))
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor("#2563EB"), spaceAfter=6))

    # MANDATORY REQUIREMENTS NOTICE BOX
    notice_text = (
        "<b>MANDATORY SUBMISSION REQUIREMENTS:</b><br/>"
        "1. <b>Recorded Videos via Google Drive:</b> Upload recorded lecture videos (.mp4 / 1080p or 720p) to a dedicated Google Drive folder with sharing set to <i>'Anyone with the link can view'</i>.<br/>"
        "2. <b>10 Questions for Each Week:</b> Submit exactly 10 multiple-choice assessment questions per week with 4 options, the correct answer, and an explanatory solution."
    )
    t_notice = Table([[Paragraph(notice_text, callout_bold_style)]], colWidths=[532])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#3B82F6")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 8))

    # SECTION 1: Course & Instructor Details
    story.append(Paragraph("SECTION 1: COURSE & MODULE IDENTIFICATION", section_heading_style))
    story.append(Spacer(1, 3))

    sec1_data = [
        [Paragraph("Course Title:", bold_label_style), Paragraph("Innovation Leadership & Entrepreneurship (or specify course)", body_style)],
        [Paragraph("Assigned Week / Module:", bold_label_style), Paragraph("Week Number (e.g., Week 1, Week 2, Week 3...)", body_style)],
        [Paragraph("Module Theme / Topic:", bold_label_style), Paragraph("e.g., Value Proposition Design & Customer Discovery", body_style)],
        [Paragraph("Instructor / Faculty Name:", bold_label_style), Paragraph("Full Name & Academic Designation", body_style)],
        [Paragraph("Contact Email & Phone:", bold_label_style), Paragraph("Email address and mobile number for LMS coordination", body_style)],
        [Paragraph("Weekly Google Drive Folder URL:", bold_label_style), Paragraph("https://drive.google.com/drive/folders/... <i>(Set permission to: Anyone with link can view)</i>", italic_hint_style)]
    ]

    t1 = Table(sec1_data, colWidths=[140, 392])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t1)
    story.append(Spacer(1, 8))

    # SECTION 2: Lecture Units & Recorded Video Drive Links
    story.append(Paragraph("SECTION 2: LECTURE UNITS & RECORDED VIDEO DRIVE LINKS", section_heading_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Each module typically consists of 3 to 5 units. Provide the recorded video link from your Google Drive folder for each unit.", italic_hint_style))
    story.append(Spacer(1, 3))

    unit_table_data = [
        [
            Paragraph("Unit Details", table_header_style),
            Paragraph("Unit 1", table_header_style),
            Paragraph("Unit 2", table_header_style)
        ],
        [
            Paragraph("Unit Title", bold_label_style),
            Paragraph("e.g., Unit 1: Foundations of Market Validation", body_style),
            Paragraph("e.g., Unit 2: Customer Interview Methodologies", body_style)
        ],
        [
            Paragraph("Duration", bold_label_style),
            Paragraph("e.g., 22 mins", body_style),
            Paragraph("e.g., 20 mins", body_style)
        ],
        [
            Paragraph("Google Drive Video Link", bold_label_style),
            Paragraph("https://drive.google.com/file/d/.../view", italic_hint_style),
            Paragraph("https://drive.google.com/file/d/.../view", italic_hint_style)
        ],
        [
            Paragraph("Lecture Summary (1 Para)", bold_label_style),
            Paragraph("Summary of concepts, framework, and industry application covered in this video.", body_style),
            Paragraph("Summary of concepts, framework, and industry application covered in this video.", body_style)
        ],
        [
            Paragraph("Learning Objectives", bold_label_style),
            Paragraph("1. Core principle A<br/>2. Core principle B", body_style),
            Paragraph("1. Practical method A<br/>2. Practical method B", body_style)
        ],
        [
            Paragraph("Key Takeaways", bold_label_style),
            Paragraph("1. Actionable takeaway 1<br/>2. Actionable takeaway 2", body_style),
            Paragraph("1. Actionable takeaway 1<br/>2. Actionable takeaway 2", body_style)
        ]
    ]

    t2 = Table(unit_table_data, colWidths=[130, 201, 201])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1E293B")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t2)
    story.append(Spacer(1, 8))

    # SECTION 3: Reading Notes & Downloads
    story.append(Paragraph("SECTION 3: READING MATERIAL & SLIDE ATTACHMENTS", section_heading_style))
    story.append(Spacer(1, 2))

    reading_data = [
        [Paragraph("Reading Document Overview:", bold_label_style), Paragraph("Comprehensive introductory reading text accompanying the lecture.", italic_hint_style)],
        [Paragraph("Section 1 (Heading & Content):", bold_label_style), Paragraph("<b>Heading:</b> 1. Theoretical Concepts & Evidence<br/><b>Body:</b> Detailed notes, definitions, diagrams, and industry examples.", body_style)],
        [Paragraph("Section 2 (Heading & Content):", bold_label_style), Paragraph("<b>Heading:</b> 2. Practical Case Application & Tools<br/><b>Body:</b> Real-world case study, calculation steps, and practical checklists.", body_style)],
        [Paragraph("Supplementary Drive Files:", bold_label_style), Paragraph("Slide deck (.pptx / .pdf), spreadsheet models (.xlsx), or reading handouts placed in the same Google Drive folder.", body_style)]
    ]

    t3 = Table(reading_data, colWidths=[140, 392])
    t3.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t3)

    # Clean PageBreak for perfect alignment of Page 2
    story.append(PageBreak())

    # ==================== PAGE 2 ====================
    # SECTION 4: 10 Weekly Assessment Questions
    story.append(Paragraph("SECTION 4: 10 WEEKLY ASSESSMENT QUESTIONS (MANDATORY)", section_heading_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Each week must have 10 scored multiple-choice questions (MCQs) for student evaluation and consolidated grading.", italic_hint_style))
    story.append(Spacer(1, 5))

    q_table_data = [
        [
            Paragraph("No.", table_header_style),
            Paragraph("Question Stem & 4 Options (A, B, C, D)", table_header_style),
            Paragraph("Key", table_header_style),
            Paragraph("Brief Solution / Explanation", table_header_style)
        ],
        [
            Paragraph("Q1", bold_label_style),
            Paragraph("<b>Question:</b> Which of the following best defines product-market fit?<br/>A) High social media impressions | B) Repeat purchases & organic referral retention<br/>C) Filing initial patents | D) Raising seed capital", body_style),
            Paragraph("<b>B</b>", bold_label_style),
            Paragraph("Retention and organic advocacy validate true value delivery over vanity metrics.", italic_hint_style)
        ],
        [
            Paragraph("Q2", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem covering core lecture concept]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[1-2 sentences explaining why the correct option is right]", italic_hint_style)
        ],
        [
            Paragraph("Q3", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q4", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q5", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q6", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q7", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q8", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q9", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ],
        [
            Paragraph("Q10", bold_label_style),
            Paragraph("<b>Question:</b> [Enter question stem]<br/>A) [Option A] | B) [Option B] | C) [Option C] | D) [Option D]", italic_hint_style),
            Paragraph("[Key]", italic_hint_style),
            Paragraph("[Brief conceptual rationale]", italic_hint_style)
        ]
    ]

    t4 = Table(q_table_data, colWidths=[26, 310, 36, 160])
    t4.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1E293B")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 2.2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.2),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t4)
    story.append(Spacer(1, 10))

    # SECTION 5: Submission Guidelines
    story.append(Paragraph("SECTION 5: SUBMISSION INSTRUCTIONS & WORKFLOW", section_heading_style))
    story.append(Spacer(1, 3))

    instructions_text = (
        "<b>1. Google Drive Folder Setup:</b> Create a Google Drive folder named <code>[CourseName]_Week[X]_[FacultyName]</code>. "
        "Place all recorded video files (.mp4) and lecture slide decks (.pptx / .pdf) in this folder. Set sharing permissions to <b>'Anyone with the link can view'</b>.<br/>"
        "<b>2. Document Submission:</b> Send your completed Word document or Google Doc containing the 10 assessment questions, "
        "lecture summaries, and Drive folder link to your designated Course Coordinator.<br/>"
        "<b>3. Technical Ingestion:</b> The NCIE LMS technical team will ingest your videos, reading materials, "
        "and 10 assessment questions directly into the student portal and configure automated grading."
    )

    t5 = Table([[Paragraph(instructions_text, body_style)]], colWidths=[532])
    t5.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#93C5FD")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t5)

    doc.build(story, canvasmaker=NumberedCanvas)
    print("Clean 2-page PDF generated successfully at:", output_path)

if __name__ == "__main__":
    out_dir = r"c:\Users\vigne\Desktop\ncieindia-main (3)"
    out_file = os.path.join(out_dir, "Faculty_Course_Content_Submission_Form.pdf")
    generate_pdf(out_file)

    desktop_file = r"c:\Users\vigne\Desktop\Faculty_Course_Content_Submission_Form.pdf"
    public_file = r"c:\Users\vigne\Desktop\ncieindia-main (3)\standalone-lms\public\Faculty_Course_Content_Submission_Form.pdf"
    try:
        import shutil
        shutil.copyfile(out_file, desktop_file)
        shutil.copyfile(out_file, public_file)
        print("Copied updated PDF to Desktop and public directory.")
    except Exception as e:
        print("Copy failed:", e)
