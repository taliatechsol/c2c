from fpdf import FPDF

def generate_student_pdf(student_data: dict, assessment_data: dict) -> bytes:
    class PDF(FPDF):
        def header(self):
            self.set_font("helvetica", "B", 15)
            self.cell(0, 10, "campus2corporate (c2c) Professional Legend", align="C", new_x="LMARGIN", new_y="NEXT")
            self.ln(10)

        def footer(self):
            self.set_y(-15)
            self.set_font("helvetica", "I", 8)
            self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    pdf = PDF()
    pdf.add_page()
    pdf.set_font("helvetica", size=12)

    # Student Info
    pdf.set_font("helvetica", "B", 14)
    name = student_data.get("name", "Unknown Student")
    pdf.cell(0, 10, f"Name: {name}", new_x="LMARGIN", new_y="NEXT")
    
    university = student_data.get("university", "Unknown University")
    pdf.set_font("helvetica", size=12)
    pdf.cell(0, 8, f"University: {university}", new_x="LMARGIN", new_y="NEXT")
    
    degree = student_data.get("degree", "Unknown Degree")
    pdf.cell(0, 8, f"Degree: {degree}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)

    # Assessment Results
    if assessment_data:
        # Founder Fit Profile
        founder_fit = assessment_data.get("founder_fit", {})
        if founder_fit:
            pdf.set_font("helvetica", "B", 14)
            pdf.cell(0, 10, "Founder Fit Profile", new_x="LMARGIN", new_y="NEXT")
            pdf.set_font("helvetica", size=12)
            pdf.multi_cell(0, 8, f"Profile: {founder_fit.get('profile', 'N/A')}")
            pdf.multi_cell(0, 8, f"Description: {founder_fit.get('description', 'N/A')}")
            pdf.ln(5)

        # Dimension Scores
        dimensions = assessment_data.get("dimensions", {})
        if dimensions:
            pdf.set_font("helvetica", "B", 14)
            pdf.cell(0, 10, "Dimension Scores", new_x="LMARGIN", new_y="NEXT")
            pdf.set_font("helvetica", size=12)
            for dim, score in dimensions.items():
                pdf.cell(0, 8, f"{dim.upper()}: {score}", new_x="LMARGIN", new_y="NEXT")
            pdf.ln(5)

        # Development Report
        development_report = assessment_data.get("development_report", {})
        if development_report:
            pdf.set_font("helvetica", "B", 14)
            pdf.cell(0, 10, "Development Report", new_x="LMARGIN", new_y="NEXT")
            pdf.set_font("helvetica", size=12)
            
            strengths = development_report.get("strengths", [])
            if strengths:
                pdf.set_font("helvetica", "B", 12)
                pdf.cell(0, 8, "Strengths:", new_x="LMARGIN", new_y="NEXT")
                pdf.set_font("helvetica", size=12)
                for s in strengths:
                    pdf.multi_cell(0, 8, f"- {s}")
                pdf.ln(3)
                
            areas_for_improvement = development_report.get("areas_for_improvement", [])
            if areas_for_improvement:
                pdf.set_font("helvetica", "B", 12)
                pdf.cell(0, 8, "Areas for Improvement:", new_x="LMARGIN", new_y="NEXT")
                pdf.set_font("helvetica", size=12)
                for a in areas_for_improvement:
                    pdf.multi_cell(0, 8, f"- {a}")
                pdf.ln(3)
                
            recommended_roles = development_report.get("recommended_roles", [])
            if recommended_roles:
                pdf.set_font("helvetica", "B", 12)
                pdf.cell(0, 8, "Recommended Roles:", new_x="LMARGIN", new_y="NEXT")
                pdf.set_font("helvetica", size=12)
                for r in recommended_roles:
                    pdf.multi_cell(0, 8, f"- {r}")
                pdf.ln(3)
    else:
        pdf.cell(0, 10, "No assessment data available.", new_x="LMARGIN", new_y="NEXT")

    return bytes(pdf.output())
