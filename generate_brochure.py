from fpdf import FPDF
import os

class DinterioBrochure(FPDF):
    def __init__(self):
        super().__init__()
        self.GOLD = (184, 145, 70)
        self.DARK = (17, 17, 17)
        self.WHITE = (255, 255, 255)
        self.GRAY = (245, 245, 245)
        self.TEXT_GRAY = (80, 80, 80)

    def header(self):
        # Adding a subtle gold line at the top of every page except cover
        if self.page_no() > 1:
            self.set_fill_color(*self.GOLD)
            self.rect(0, 0, 210, 2, "F")

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("helvetica", "I", 8)
            self.set_text_color(*self.GOLD)
            self.cell(0, 10, f"D'Interio Design Studio | Ultra-Luxury Turnkey Interiors | Page {self.page_no()}", 0, 0, "C")

    def add_section_title(self, title):
        self.set_font("helvetica", "B", 24)
        self.set_text_color(*self.DARK)
        self.cell(0, 15, title.upper(), 0, 1, "L")
        self.set_draw_color(*self.GOLD)
        self.set_line_width(1)
        self.line(self.get_x(), self.get_y(), self.get_x() + 40, self.get_y())
        self.ln(10)

    def add_body_text(self, text):
        self.set_font("helvetica", "", 11)
        self.set_text_color(*self.TEXT_GRAY)
        self.multi_cell(0, 7, text)
        self.ln(5)

def create_brochure():
    pdf = DinterioBrochure()
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # --- PAGE 1: REFINED COVER ---
    pdf.add_page()
    # Gradient-like effect with boxes
    pdf.set_fill_color(250, 250, 250) # Very light gray for visibility
    pdf.rect(0, 0, 210, 297, "F")
    
    # Gold decorative border
    pdf.set_draw_color(*pdf.GOLD)
    pdf.set_line_width(0.5)
    pdf.rect(5, 5, 200, 287, "D")
    
    # Logo - centered on light background
    if os.path.exists("public/images/logo.png"):
        pdf.image("public/images/logo.png", x=55, y=50, w=100)
    
    pdf.set_y(150)
    pdf.set_font("helvetica", "B", 40)
    pdf.set_text_color(*pdf.DARK)
    pdf.cell(0, 20, "THE ART OF", 0, 1, "C")
    pdf.set_text_color(*pdf.GOLD)
    pdf.cell(0, 15, "ULTRA-LUXURY", 0, 1, "C")
    
    pdf.set_y(200)
    pdf.set_font("helvetica", "", 16)
    pdf.set_text_color(*pdf.TEXT_GRAY)
    pdf.cell(0, 10, "Bespoke Turnkey Interior Masterpieces", 0, 1, "C")
    
    pdf.set_y(250)
    pdf.set_font("helvetica", "B", 12)
    pdf.set_text_color(*pdf.DARK)
    pdf.cell(0, 10, "ESTD. 2014 | HYDERABAD | PAN INDIA", 0, 1, "C")

    # --- PAGE 2: THE PHILOSOPHY ---
    pdf.add_page()
    pdf.add_section_title("The D'Interio Philosophy")
    
    # Decorative Image Box
    if os.path.exists("public/images/hero-1.png"):
        pdf.image("public/images/hero-1.png", x=110, y=55, w=90, h=60)
        
    pdf.set_right_margin(110)
    pdf.add_body_text(
        "Luxury is not just an aesthetic; it is an experience of comfort, exclusivity, and flawlessly executed design. "
        "At D'Interio, we view every project as a canvas to express the unique identity of our clients."
    )
    pdf.add_body_text(
        "Our approach is rooted in the belief that true luxury lies in the details - the choice of a specific Italian marble, "
        "the curve of a custom-designed sofa, the perfect placement of architectural lighting."
    )
    pdf.set_right_margin(10)
    pdf.ln(10)
    
    pdf.set_font("helvetica", "B", 14)
    pdf.set_text_color(*pdf.GOLD)
    pdf.cell(0, 10, "MINIMUM PROJECT ENGAGEMENT: INR 50,00,000")
    pdf.ln(10) # Added manual ln to avoid deprecation warning and fix layout
    pdf.add_body_text(
        "This threshold allows us to maintain the highest standards of quality and exclusivity, sourcing materials from the "
        "finest global suppliers and employing only the most skilled artisans."
    )

    # --- PAGE 3: TURNKEY EXCELLENCE ---
    pdf.add_page()
    pdf.add_section_title("Turnkey Excellence")
    
    services = [
        ("Architectural Planning & 3D Visualization", "We create digital twins of your futura home, allowing you to walk through every room before a single brick is laid. Our visualizations include lighting, texture, and furniture curation."),
        ("Bespoke Modular Solutions", "Our specialized modular unit produces high-precision kitchens and wardrobes using premium marine-grade plywood and high-end finishes like PU, Acrylic, and Veneer."),
        ("Full-Scale Site Execution", "From structural modifications to electrical, plumbing, and HVAC, our turnkey service ensures you only deal with one partner. We handle the complexity; you enjoy the results."),
        ("Luxury Furniture Curation", "We source and design custom loose furniture, selecting fabrics, leathers, and metals that complement your overarching design theme.")
    ]
    
    for title, desc in services:
        pdf.set_font("helvetica", "B", 13)
        pdf.set_text_color(*pdf.GOLD)
        pdf.cell(0, 8, f"- {title}")
        pdf.ln(8)
        pdf.set_font("helvetica", "", 10)
        pdf.set_text_color(*pdf.TEXT_GRAY)
        pdf.multi_cell(0, 6, desc)
        pdf.ln(4)
        
    if os.path.exists("public/images/hero-2.png"):
        pdf.image("public/images/hero-2.png", x=10, y=200, w=190, h=80)

    # --- PAGE 4: PROCESS & QUALITY ---
    pdf.add_page()
    pdf.add_section_title("Our Process")
    
    process_steps = [
        ("01. Vision Discovery", "In-depth consultation to understand your lifestyle, tastes, and functional requirements."),
        ("02. Concept Design", "Moodboards, material palettes, and initial layout proposals for your review."),
        ("03. Detail Engineering", "Complete technical drawings, 3D renders, and cost estimations."),
        ("04. Precise Execution", "On-site work managed by dedicated site engineers with daily progress tracking."),
        ("05. Handover", "The final reveal of your completed masterpiece, delivered on time and as promised.")
    ]
    
    for i, (title, desc) in enumerate(process_steps):
        pdf.set_fill_color(*pdf.GRAY)
        pdf.rect(10, pdf.get_y(), 190, 20, "F")
        pdf.set_font("helvetica", "B", 12)
        pdf.set_text_color(*pdf.GOLD)
        pdf.set_x(20)
        pdf.cell(180, 10, title)
        pdf.ln(10)
        pdf.set_font("helvetica", "", 9)
        pdf.set_x(20)
        pdf.set_text_color(*pdf.TEXT_GRAY)
        pdf.cell(180, 5, desc)
        pdf.ln(10)

    if os.path.exists("public/images/hero-3.png"):
        pdf.image("public/images/hero-3.png", x=110, y=30, w=90, h=60)

    # --- PAGE 5: THE D'INTERIO ADVANTAGE ---
    pdf.add_page()
    pdf.set_fill_color(*pdf.DARK)
    pdf.rect(0, 0, 210, 297, "F")
    
    pdf.set_y(60)
    pdf.set_font("helvetica", "B", 30)
    pdf.set_text_color(*pdf.GOLD)
    pdf.cell(0, 20, "WHY D'INTERIO?", align="C")
    pdf.ln(20)
    
    advantages = [
        "10+ Years of Design Excellence",
        "Expertise in Premium Villa Projects",
        "Transparent Fixed Pricing Policy",
        "Dedicated Relationship Managers",
        "Turnkey - From Design to Decor",
        "Presence in Hyderabad, Bangalore & Mumbai"
    ]
    
    pdf.set_font("helvetica", "", 18)
    pdf.set_text_color(*pdf.WHITE)
    for adv in advantages:
        pdf.cell(0, 15, f" - {adv}", align="C")
        pdf.ln(15)
        
    pdf.set_y(220)
    pdf.set_font("helvetica", "B", 14)
    pdf.set_text_color(*pdf.GOLD)
    pdf.cell(0, 10, "ESTIMATED PROJECT TIMELINE: 4-6 MONTHS", align="C")
    pdf.ln(10)

    # --- PAGE 6: CONTACT & CONCLUSION ---
    pdf.add_page()
    # Light gray sidebar
    pdf.set_fill_color(*pdf.GRAY)
    pdf.rect(0, 0, 70, 297, "F")
    
    pdf.set_y(50)
    pdf.set_font("helvetica", "B", 24)
    pdf.set_text_color(*pdf.DARK)
    pdf.set_x(80)
    pdf.cell(0, 15, "READY TO TRANSFORM?", 0, 1)
    
    pdf.set_x(80)
    pdf.set_font("helvetica", "", 12)
    pdf.set_text_color(*pdf.TEXT_GRAY)
    pdf.multi_cell(0, 8, "Our experts are ready to bring your luxury vision to life. Contact us for a private consultation at our experience centers.")
    
    # Contact Info with Icons (simple text labels)
    pdf.ln(20)
    contact_info = [
        ("VISIT US", "303, Kochar Towers, Begumpet,\nHyderabad, Telangana 500016"),
        ("CALL US", "+91 9100222233"),
        ("EMAIL", "support@dinterio.in"),
        ("WEB", "www.dinterio.in"),
        ("SOCIAL", "@dinteriodesignstudio")
    ]
    
    for title, info in contact_info:
        pdf.set_x(80)
        pdf.set_font("helvetica", "B", 10)
        pdf.set_text_color(*pdf.GOLD)
        pdf.cell(0, 5, title, 0, 1)
        pdf.set_x(80)
        pdf.set_font("helvetica", "", 11)
        pdf.set_text_color(*pdf.DARK)
        pdf.multi_cell(0, 7, info)
        pdf.ln(5)

    if os.path.exists("public/images/p-1.png"):
        pdf.image("public/images/p-1.png", x=10, y=200, w=50, h=50)
    if os.path.exists("public/images/p-2.png"):
        pdf.image("public/images/p-2.png", x=80, y=200, w=110, h=50)

    pdf.output("public/dinterio-luxury-brochure.pdf")

if __name__ == "__main__":
    create_brochure()
